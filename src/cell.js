
import Container from "../lib/JST/dom/container.js";
import TextComponent from "../lib/JST/dom/text_component.js";


const Cell = class {

    constructor() {

        this.cell = new Container("Cell");
        this.digit = new TextComponent(null, "Digit");

        this.marks = new Cache();

        this.cell.addComponent(this.digit);

    }

    getContainer() {
        return this.cell;
    }

    setDigit(digit, isNew = false) {
        this.digit.text = digit;
        if (isNew) {
            this.clearMarks();
            this.digit.addClass("New");
        }
    }

    addMark(mark, isNew = false) {

        const newMark = new TextComponent(mark, `Mark Mark${mark}`);

        if (isNew) {
            newMark.addClass("New");
        }

        this.cell.addComponent(newMark);
        this.marks.setItem(mark, newMark);

    }

    clearMark(number) {
        /** @type {TextComponent} */
        const mark = this.marks.getItem(number);
        mark.remove();
        this.marks.deleteItem(number);
    }

    crossMark(number) {

        const mark = this.marks.getItem(number);
        mark.addClass("Crossed");

    }

    focus(colorClass) {
        this.cell.addClass(colorClass);
    }

    reset() {
        this.cell.removeClass();
        this.cell.addClass("Cell");
    }

    clearMarks() {
        const keys = this.marks.getKeys();
        keys.forEach((key) => this.clearMark(key));
    }

};


export default Cell;
