
import { EventType } from "../lib/JST/native/type_check.js";
import Container from "../lib/JST/dom/container.js";
import TextComponent from "../lib/JST/dom/text_component.js";


/** @type {Container} */
let container = null;
/** @type {TextComponent} */
let title = null;
/** @type {TextComponent} */
let text = null;


const init = function () {

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

const setTitle = function (val) {
    title.text = val;
};

const setText = function (val) {
    text.text = val;
};

const get = () => container;


export {
    get,
    init,
    setText,
    setTitle
};
