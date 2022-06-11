
import {FormLabel, TextLabel} from "./dom_connectors.js";
import {InputComponent, InputType} from "./input_component.js";
import {Container} from "./container.js";
import {isString} from "../native/typecheck.js";


export const LabeledContainer = class extends Container {

    /**
     * @param {string} labelText
     * @param {string} className
     */
    constructor (labelText, className = null) {

        super(className);

        if (isString(labelText)) {
            this.label = new TextLabel(labelText);
            this.addComponent(this.label);
        }

    }

    /** @param {string} text */
    setLabel (text) {
        if (isString(text)) {
            if (!this.label) {
                this.label = new TextLabel(text);
            }
            this.label.text = text;
        }
    }

};

export const RadioButton = class extends Container {

    /**
     * @param {string} label
     * @param {any} value
     * @param {EventListener} action
     */
    constructor (label, value, action = null) {

        super("RadioButton");

        this.input = new InputComponent(InputType.RadioButton);
        this.input.id = label;
        this.input.value = String(value);


        this.input.addEventListener("change", function () {
            action(this.value);
        });

        this.addComponent(new FormLabel(label));
        this.addComponent(this.input);

    }

    set groupName (name) {
        if (this.input && isString(name)) {
            this.input.name = name;
        }
    }

    get groupName () {
        return this.input.name;
    }

};

export const RadioButtonGroup = class extends Container {

    /**
     * @param {string} groupName
     * @param {string} className
     */
    constructor (groupName, className = null) {

        super(className);

        this.name = (isString(groupName)) ? groupName : "RadioButtonGroup";

    }

    /**
     * @override
     *
     * @param {RadioButton} element
     */
    addElement (element) {
        if (element instanceof RadioButton) {
            super.addComponent(element);
            element.groupName = this.name;
        }
    }

    /**
     * @override
     *
     * @param {Array<RadioButton>} elements
     */
    append (...elements) {
        if (elements instanceof Array) {
            elements.forEach(button => this.addElement(button));
        }
    }

};

export const TextField = class extends InputComponent {

    /**
     * @param {string} text
     * @param {string} className
     */
    constructor (text = null, className = null) {

        super(InputType.TextField, className);

        if (isString(text)) {
            this.value = text;
        }

    }

    set text (text) {
        if (isString(text)) {
            this.value = text;
        }
    }
    get text () {
        return this.value;
    }

};
