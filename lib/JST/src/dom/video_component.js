
import AbstractMediaComponent from "./abstract_media_component.js";


const VideoComponent = class extends AbstractMediaComponent {

    /**
     * @param {string} resourcePath
     * @param {string} className
     */
    constructor(resourcePath = null, className = null) {

        super("video", className);
        super.src = resourcePath;

    }

};


export default VideoComponent;
