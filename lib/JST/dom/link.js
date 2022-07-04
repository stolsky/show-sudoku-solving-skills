
import { isString } from "../native/type_check.js";
import AbstractTextComponent from "./abstract_text_component.js";


export const Link = class extends AbstractTextComponent {

    constructor(url, className = null) {

        super("a", className);

        this.setURL(url);
        this.setTarget("_blank");

    }

    /** @param {string} target */
    setTarget(target) {
        if (target === "_blank" || target === "_top" || target === "_self") {
            this.tag.setAttribute("target", target);
        }
    }

    /** @param {string} url */
    setURL(url) {
        if (isString(url)) {
            this.tag.setAttribute("href", url);
        }
    }

};


export default Link;
