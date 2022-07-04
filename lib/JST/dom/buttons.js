
import {AbstractContainer} from "./abstract_container.js";
import {AbstractTextComponent} from "./abstract_text_component.js";
import {Component} from "./component.js";
import {Container} from "./container.js";
import {isString} from "../native/type_check.js";


/* where ??
    const DISABLED = "disabled";
    setEnabled (enable) {
        console.log(this.tag.getAttribute(DISABLED), this.tag);
        // check for <button>, <command>, <fieldset>, <keygen>, <optgroup>, <option>, <select>, <textarea>, <input> ??
        if (enable) {
            if (this.tag.getAttribute(DISABLED) === DISABLED) {
                this.tag.removeAttribute(DISABLED);
            }
        } else {
            this.tag.setAttribute(DISABLED, DISABLED);
        }
    }
*/



export const TextButton = class extends AbstractTextComponent {

    /**
     * @param {string} text
     * @param {EventListener} actionListener
     */
    constructor (text, actionListener = null) {

        super("button");

        this.text = text;
        this.addEventListener("click", actionListener);

    }

};

export const IconButton = class extends Component {

    /**
     * @param {string} iconId
     * @param {EventListener} listener
     */
    constructor (iconId, listener) {

        super("button", "Button Icon");

        this.addClass(iconId);

        this.addEventListener("click", listener);

    }

};

