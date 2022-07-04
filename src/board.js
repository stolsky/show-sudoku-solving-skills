
import Container from "../lib/JST/dom/container.js";
import Cell from "./cell.js";
import { isString } from "../lib/JST/native/type_check.js";


const boxes = new Cache();
const cells = new Cache();

const changes = [];

let board = null;

const addEmptyBoxes = () => {
    for (let i = 0; i < 9; i = i + 1) {
        const box = new Container("Box");
        boxes.setItem(i, box);
        board.addComponent(box);
    }
};

const calculateBoxID = (number) => {

    const x = Math.floor(number / 3) % 3;
    const y = Math.floor(number / 27);

    return y * 3 + x;
};

const addEmptyCells = () => {

    for (let i = 0; i < 81; i = i + 1) {

        const cell = new Cell();
        cells.setItem(i, cell);

        /** @type {Container} */
        const box = boxes.getItem(calculateBoxID(i));
        box.addComponent(cell.getContainer());

    }

};

const init = () => {

    board = new Container("Board");

    addEmptyBoxes();

    addEmptyCells();

    return board;
};

const loadPuzzle = (puzzle) => {

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

const focus = (id, colorClass) => {
    const cell = cells.getItem(id);
    cell.focus(colorClass);
    changes.push(cell);
};

const clearFocus = () => {
    while (changes.length > 0) {
        const cell = changes.pop();
        cell.reset();
    }
};

const setDigit = (cellId, digit) => {
    const cell = cells.getItem(cellId);
    cell.setDigit(digit, true);
};

const addMark = (cellId, mark) => {
    const cell = cells.getItem(cellId);
    cell.addMark(mark, true);
};

const clearMark = (cellId, mark) => {
    const cell = cells.getItem(cellId);
    cell.clearMark(mark);
};

const crossMark = (cellId, mark) => {
    const cell = cells.getItem(cellId);
    cell.crossMark(mark);
};

const clear = () => {
    //
};

const get = () => board;


export {
    addMark,
    clear,
    clearFocus,
    clearMark,
    crossMark,
    focus,
    get,
    init,
    loadPuzzle,
    setDigit
};
