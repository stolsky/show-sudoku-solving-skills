
import AbstractContainer from "./abstract_container.js";


const TextContainer = class extends AbstractContainer {

    /** @param {string} className */
    constructor(className = null) {
        super("p", className);
    }

};


export default TextContainer;
