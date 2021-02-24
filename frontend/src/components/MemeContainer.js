import React from "react";
import Meme from "./MemeComponent";
import * as RequestHandler from "../utils/RequestHandler";
import { Item, Segment } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eventBus from "../utils/EventBus";

class MemeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memes: {},
    };
  }

  componentDidMount() {
    this.getMemes();
    eventBus.on("addMeme", (data) => {
      this.getMemes();
    });
  }

  getMemes = async () => {
    const data = await RequestHandler.GET();
    var memes = [];
    for (let i = 0; i < data.length; i++) {
      const { name, caption, url, id } = data[i];
      var meme = {
        name: name,
        caption: caption,
        url: url,
      };
      memes[id] = meme;
    }
    this.setState({
      memes: memes,
    });
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <Item.Group divided>
          {Object.keys(this.state.memes).map((key) => (
            <Meme key={key} id={key} details={this.state.memes[key]} />
          ))}
        </Item.Group>
      </div>
    );
  }
}
export default MemeContainer;
