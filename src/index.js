
import {EventType, hasProperty, isNumber, isString} from "../lib/native/typecheck.js";
import {Application} from "../lib/dom/application.js";
import {Cache} from "../lib/res/cache.js";
import {Container} from "../lib/dom/container.js";
import {JSONLoader} from "../lib/res/loaders.js";
import {TextComponent} from "../lib/dom/textcomponent.js";


const app = new Application("Sudoku");
let puzzleTitle = null;

let Board = null;
let SpeechBubble = null;

const Explanation = (function () {

    let store = null;
    let index = -1;

    const marksToClear = [];

    const clearCrossedMarks = function () {
        while (marksToClear.length > 0) {
            const mark = marksToClear.pop();
            Board.clearMark(mark.id, mark.number);
        }
    };

    const executeCurrentStep = function () {

        Board.clearFocus();
        clearCrossedMarks();

        const currentStep = store[index];

        if (hasProperty(currentStep, "title")) {
            SpeechBubble.setTitle(currentStep.title);
        }

        if (hasProperty(currentStep, "text")) {
            SpeechBubble.setText(currentStep.text);
        }

        if (hasProperty(currentStep, "focus")) {

            if (hasProperty(currentStep.focus, "digits") && currentStep.focus.digits instanceof Array) {
                currentStep.focus.digits.forEach(cellId => Board.focus(cellId, "FocusGreen"));
            }

            if (hasProperty(currentStep.focus, "cells") && currentStep.focus.cells instanceof Array) {
                currentStep.focus.cells.forEach(cellId => Board.focus(cellId, "FocusBlue"));
            }

            if (hasProperty(currentStep.focus, "new") && currentStep.focus.new instanceof Array) {
                currentStep.focus.new.forEach(data => {
                    const split = data.split(":");
                    const id = parseInt(split[0], 10);
                    Board.focus(id, "FocusRed");
                    Board.setDigit(id, split[1]);
                });
            }

            if (hasProperty(currentStep.focus, "marks") && currentStep.focus.marks instanceof Array) {
                currentStep.focus.marks.forEach(data => {
                    if (isString(data)) {
                        const split = data.split(":");
                        const id = parseInt(split[0], 10);
                        let number = parseInt(split[1], 10);

                        Board.focus(id, "FocusPink");

                        if (number > 0) {
                            Board.addMark(id, number);
                        } else if (number < 0) {
                            number = Math.abs(number);
                            marksToClear.push({id, number});
                            Board.crossMark(id, number);
                        }

                    } else if (isNumber(data)) {
                        Board.focus(data, "FocusPink");
                    }
                });
            }

        }

    };

    const core = {};

    core.start = function (steps) {

        if (steps instanceof Array) {
            store = steps;
            index = -1;
            core.next();
        }
    };

    core.next = function () {

        index = index + 1;
        if (index > store.length - 1) {
            index = store.length - 1;
            return false;
        }

        executeCurrentStep();

        return true;
    };

    core.prev = function () {

        index = index - 1;
        if (index < 0) {
            index = 0;
            return false;
        }

        executeCurrentStep();

        return true;
    };

    return Object.freeze(core);
})();

SpeechBubble = (function () {

    /** @type {Container} */
    let container = null;
    /** @type {TextComponent} */
    let title = null;
    /** @type {TextComponent} */
    let text = null;

    const core = {};

    core.init = function () {

        container = new Container("Description");
        title = new TextComponent("", "Title");
        text = new TextComponent("", "Text");

        const buttonPrev = new TextComponent("", "Button Prev");
        buttonPrev.addEventListener(EventType.click, () => {
            Explanation.prev();
        });

        const buttonNext = new TextComponent("", "Button Next");
        buttonNext.addEventListener(EventType.click, () => {
            Explanation.next();
        });

        container.append(title, text, buttonPrev, buttonNext);
    };

    core.setTitle = function (val) {
        title.text = val;
    };

    core.setText = function (val) {
        text.text = val;
    };

    core.get = () => container;

    return Object.freeze(core);
})();

Board = (function () {

    const boxes = new Cache();
    const cells = new Cache();

    const changes = [];

    let board = null;

    const Cell = class {

        constructor () {

            this.cell = new Container("Cell");
            this.digit = new TextComponent(null, "Digit");

            this.marks = new Cache();

            this.cell.addComponent(this.digit);

        }

        getContainer () {
            return this.cell;
        }

        setDigit (digit, isNew = false) {
            this.digit.text = digit;
            if (isNew) {
                this.clearMarks();
                this.digit.addClass("New");
            }
        }

        addMark (mark, isNew = false) {

            const newMark = new TextComponent(mark, "Mark Mark" + mark);

            if (isNew) {
                newMark.addClass("New");
            }

            this.cell.addComponent(newMark);
            this.marks.setItem(mark, newMark);

        }

        clearMark (number) {
            /** @type {TextComponent} */
            const mark = this.marks.getItem(number);
            mark.remove();
            this.marks.deleteItem(number);
        }

        crossMark (number) {

            const mark = this.marks.getItem(number);
            mark.addClass("Crossed");

        }

        focus (colorClass) {
            this.cell.addClass(colorClass);
        }

        reset () {
            this.cell.removeClass();
            this.cell.addClass("Cell");
        }

        clearMarks () {
            const keys = this.marks.getKeys();
            keys.forEach(key => this.clearMark(key));
        }

    };

    const addEmptyBoxes = function () {
        for (let i = 0; i < 9; i = i + 1) {
            const box = new Container("Box");
            boxes.setItem(i, box);
            board.addComponent(box);
        }
    };

    const calculateBoxID = function (number) {

        const x = Math.floor(number / 3) % 3;
        const y = Math.floor(number / 27);

        return y * 3 + x;
    };

    const addEmptyCells = function () {

        for (let i = 0; i < 81; i = i + 1) {

            const cell = new Cell();
            cells.setItem(i, cell);

            /** @type {Container} */
            const box = boxes.getItem(calculateBoxID(i));
            box.addComponent(cell.getContainer());

        }

    };

    const core = {};

    core.init = function () {

        board = new Container("Board");

        addEmptyBoxes(board);

        addEmptyCells();

        return board;
    };

    core.loadPuzzle = function (puzzle) {

        if (isString(puzzle)) {
            for (let i = 0; i < puzzle.length; i = i + 1) {
                const val = puzzle[i];
                if (val !== "0") {

                    const cell = cells.getItem(i);

                    cell.setDigit(val);

                }
            }
        }

    };

    core.focus = function (id, colorClass) {
        const cell = cells.getItem(id);
        cell.focus(colorClass);
        changes.push(cell);
    };

    core.clearFocus = function () {
        while (changes.length > 0) {
            const cell = changes.pop();
            cell.reset();
        }
    };

    core.setDigit = function (cellId, digit) {
        const cell = cells.getItem(cellId);
        cell.setDigit(digit, true);
    };

    core.addMark = function (cellId, mark) {
        const cell = cells.getItem(cellId);
        cell.addMark(mark, true);
    };

    core.clearMark = function (cellId, mark) {
        const cell = cells.getItem(cellId);
        cell.clearMark(mark);
    };

    core.crossMark = function (cellId, mark) {
        const cell = cells.getItem(cellId);
        cell.crossMark(mark);
    };

    core.clear = function () {
        //
    };

    core.get = () => board;

    return Object.freeze(core);
})();

const createUI = function () {

    const main = new Container("Main");

    puzzleTitle = new TextComponent("", "Title");

    main.append(
        puzzleTitle,
        SpeechBubble.get(),
        Board.get()
    );

    app.addToRootPane(main);

};

const setPuzzleTitle = function (text) {
    if (puzzleTitle instanceof TextComponent) {
        puzzleTitle.text = text;
    }
};

JSONLoader("dat/veryhard84.json").then(data => {

    SpeechBubble.init();
    Board.init();

    createUI();

    setPuzzleTitle(data.title);
    Board.loadPuzzle(data.board);
    Explanation.start(data.steps);

});
