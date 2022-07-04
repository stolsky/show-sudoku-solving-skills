
import { InputComponent, InputType } from "./input_component.js";
import Container from "./container.js";
import FormLabel from "./form_label.js";
import { isString } from "../native/type_check.js";


const RadioButton = class extends Container {

    /**
     * @param {string} label
     * @param {any} value
     * @param {EventListener} action
     */
    constructor(label, value, action = null) {

        super("RadioButton");

        this.input = new InputComponent(InputType.RadioButton);
        this.input.id = label;
        this.input.value = String(value);

        this.input.addEventListener("change", () => action(this.value));

        this.addComponent(new FormLabel(label));
        this.addComponent(this.input);

    }

    set groupName(name) {
        if (this.input && isString(name)) {
            this.input.name = name;
        }
    }

    get groupName() {
        return this.input.name;
    }

};


export default RadioButton;
