
import {Component} from "./component.js";


const AbstractTextComponent = class extends Component {

    /** @param {string} text */
    set text (text) {
        if (text !== null) {
            this.tag.textContent = String(text);
        }
    }

    get text () {
        return this.tag.textContent;
    }

};


export {AbstractTextComponent};
