
import Component from "./component.js";
import { isNumber } from "../native/type_check.js";


const AbstractContainer = class extends Component {

    /**
     * @param {Component} component
     * @param {number} index
     */
    addComponent(component, index = -1) {
        if (component instanceof Component) {

            const new_child = component;
            new_child.parent = this;

            if (isNumber(index)) {
                if (index === -1) {
                    this.tag.appendChild(new_child.getHTMLElement());
                } else if (index === 0) {
                    this.tag.insertBefore(new_child.getHTMLElement(), this.tag.firstChild);
                } else {
                    // TODO
                }
            }
        }
    }

    /**
     * @param {Component} newComponent
     * @param {Component} oldComponent
     */
    replaceComponent(newComponent, oldComponent) {
        if (newComponent instanceof Component && oldComponent instanceof Component) {
            this.tag.replaceChild(newComponent.getHTMLElement(), oldComponent.getHTMLElement());
        }
    }

    /** @param {Array<Component>} components */
    append(...components) {
        components.forEach((comp) => this.addComponent(comp));
    }

    /** @returns {HTMLCollection} */
    getChildren() {
        return this.tag.children;
    }

    clear() {
        this.tag.innerHTML = "";
    }

};


export default AbstractContainer;
