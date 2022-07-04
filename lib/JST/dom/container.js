
import AbstractContainer from "./abstract_container.js";


const Container = class extends AbstractContainer {

    /** @param {string} className */
    constructor(className = null) {

        super("div", className);

    }

};


export default Container;
