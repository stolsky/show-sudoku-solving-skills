
import { appendToBody, disableContextMenu, setDocumentTitle } from "./basic.js";
import Container from "./container.js";
import { isString } from "../native/type_check.js";


const AbstractApplication = class extends Container {

    /** @param {string} title */
    constructor(title = null) {

        super("Application");

        this.setTitle(title);
        this.addClass((isString(title)) ? title.replace(/\s/g, "_") : title);

        appendToBody(this.tag);
    }

    /** @param {string} title */
    static setTitle(title) {
        setDocumentTitle(title);
    }

    /** @param {boolean} enable */
    static setContextMenuEnabled(enable = true) {
        if (!enable) {
            disableContextMenu();
        }
    }

};


export default AbstractApplication;
