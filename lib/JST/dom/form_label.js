
import AbstractTextComponent from "./abstract_text_component.js";


const FormLabel = class extends AbstractTextComponent {

    /** @param {string} text */
    constructor(text) {

        super("label");

        this.tag.setAttribute("for", text);
        this.text = text;

    }

};


export default FormLabel;
