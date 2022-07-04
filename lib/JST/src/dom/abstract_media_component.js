
import { setAttributesFromOptions } from "./basic.js";
import ResourceComponent from "./resource_component.js";


const MediaAttributes = ["autoplay", "controls", "loop", "muted"];
const AbstractMediaComponent = class extends ResourceComponent {

    play() {
        this.tag.play();
    }

    pause() {
        this.tag.pause();
    }

    setOptions(options) {
        setAttributesFromOptions(this.tag, options, MediaAttributes);
    }

};


export default AbstractMediaComponent;
