
import { isString } from "../native/type_check.js";
import Container from "./container.js";
import RadioButton from "./radio_button.js";


const RadioButtonGroup = class extends Container {

    /**
     * @param {string} groupName
     * @param {string} className
     */
    constructor(groupName, className = null) {

        super(className);

        this.name = (isString(groupName)) ? groupName : "RadioButtonGroup";

    }

    /**
     * @override
     *
     * @param {RadioButton} element
     */
    addElement(element) {
        if (element instanceof RadioButton) {
            const new_child = element;
            new_child.groupName = this.name;
            super.addComponent(new_child);
        }
    }

    /**
     * @override
     *
     * @param {Array<RadioButton>} elements
     */
    append(...elements) {
        if (elements instanceof Array) {
            elements.forEach((button) => this.addElement(button));
        }
    }

};


export default RadioButtonGroup;