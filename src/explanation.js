
import { hasProperty, isNumber, isString } from "../lib/JST/native/type_check.js";
import { addMark, clearFocus, clearMark, crossMark, focus, setDigit } from "./board.js";
import { setText, setTitle } from "./speech_bubble.js";


let store = null;
let index = -1;

const marksToClear = [];

const clearCrossedMarks = () => {
    while (marksToClear.length > 0) {
        const mark = marksToClear.pop();
        clearMark(mark.id, mark.number);
    }
};

const executeCurrentStep = () => {

    clearFocus();
    clearCrossedMarks();

    const currentStep = store[`${index}`];

    if (hasProperty(currentStep, "title")) {
        setTitle(currentStep.title);
    }

    if (hasProperty(currentStep, "text")) {
        setText(currentStep.text);
    }

    if (hasProperty(currentStep, "focus")) {

        if (hasProperty(currentStep.focus, "digits") && currentStep.focus.digits instanceof Array) {
            currentStep.focus.digits.forEach((cellId) => focus(cellId, "FocusGreen"));
        }

        if (hasProperty(currentStep.focus, "cells") && currentStep.focus.cells instanceof Array) {
            currentStep.focus.cells.forEach((cellId) => focus(cellId, "FocusBlue"));
        }

        if (hasProperty(currentStep.focus, "new") && currentStep.focus.new instanceof Array) {
            currentStep.focus.new.forEach((data) => {
                const split = data.split(":");
                const id = parseInt(split[0], 10);
                focus(id, "FocusRed");
                setDigit(id, split[1]);
            });
        }

        if (hasProperty(currentStep.focus, "marks") && currentStep.focus.marks instanceof Array) {
            currentStep.focus.marks.forEach((data) => {
                if (isString(data)) {
                    const split = data.split(":");
                    const id = parseInt(split[0], 10);
                    let number = parseInt(split[1], 10);

                    focus(id, "FocusPink");

                    if (number > 0) {
                        addMark(id, number);
                    } else if (number < 0) {
                        number = Math.abs(number);
                        marksToClear.push({ id, number });
                        crossMark(id, number);
                    }

                } else if (isNumber(data)) {
                    focus(data, "FocusPink");
                }
            });
        }

    }

};

const next = () => {

    index = index + 1;
    if (index > store.length - 1) {
        index = store.length - 1;
        return false;
    }

    executeCurrentStep();

    return true;
};

const start = (steps) => {

    if (steps instanceof Array) {
        store = steps;
        index = -1;
        next();
    }
};

const prev = () => {

    index = index - 1;
    if (index < 0) {
        index = 0;
        return false;
    }

    executeCurrentStep();

    return true;
};


export {
    next,
    prev,
    start
};
