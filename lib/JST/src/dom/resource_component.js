
import { isString } from "../native/type_check.js";
import Component from "./component.js";


const ResourceComponent = class extends Component {

    /** @param {string} path */
    set src(path) {
        if (isString(path)) {
            this.tag.setAttribute("src", path);
        }
    }

    get src() {
        return this.tag.getAttribute("src");
    }

};


export default ResourceComponent;
