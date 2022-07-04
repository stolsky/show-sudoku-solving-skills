
import { EventType, hasProperty, isNumber, isString } from "../lib/JST/native/type_check.js";
import Application from "../lib/JST/dom/application.js";
import Cache from "../lib/JST/resource/cache.js";
import Container from "../lib/JST/dom/container.js";
import { JSONLoader } from "../lib/JST/resource/loaders.js";
import TextComponent from "../lib/JST/dom/text_component.js";


const app = new Application("Sudoku");
let puzzleTitle = null;

const createUI = () => {

    const main = new Container("Main");

    puzzleTitle = new TextComponent("", "Title");

    main.append(
        puzzleTitle,
        SpeechBubble.get(),
        Board.get()
    );

    app.addToRootPane(main);

};

const setPuzzleTitle = (text) => {
    if (puzzleTitle instanceof TextComponent) {
        puzzleTitle.text = text;
    }
};

JSONLoader("dat/veryhard84.json").then((data) => {

    SpeechBubble.init();
    Board.init();

    createUI();

    setPuzzleTitle(data.title);
    Board.loadPuzzle(data.board);
    Explanation.start(data.steps);

});
