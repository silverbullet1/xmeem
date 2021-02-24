import React from "react";
import * as RequestHandler from "./../utils/RequestHandler";
import { Form, Item, Button, Modal, Image, Icon } from "semantic-ui-react";
import eventBus from "../utils/EventBus";
class MemeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
      url: "",
      caption: "",
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  
  handleSubmit = async (event) => {
    event.preventDefault();
    // Close the popup
    this.setState({ open: false });
    const id = this.props.id;
    const url = this.state.url? this.state.url: this.props.url;
    const caption = this.state.caption? this.state.caption: this.props.caption;
    const body = JSON.stringify({
      url: url,
      caption: caption,
    });
    await RequestHandler.PATCH(id, body);
    const updatedMeme = {id : id, url: body.url, caption: body.caption};
    eventBus.dispatch("addMeme",updatedMeme);
  }

  render() {
    const {url, caption, name} = this.props.details;
    return (
      <Item>
        <Item.Image size="large" src={url} onError={(e)=>{e.target.onerror = null; e.target.src="404-meme-not-found.jpg"}} />            
        <Item.Content verticalAlign="middle" style={{ marginLeft: "0.5em" }}>
          <Item.Header as="a">{caption}</Item.Header>
          <Item.Meta>
            <span className="cinema">{name}</span>
            <Item.Extra>
              <Modal
                size="large"
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
                open={this.state.open}
                trigger={
                  <Button primary floated="right">
                    Edit
                    <Icon name="right chevron" />
                  </Button>
                }
              >
                <Modal.Header>Enter image URL</Modal.Header>
                <Modal.Content image>
                  <Image src={url} onError={(e)=>{e.target.onerror = null; e.target.src="404-meme-not-found.jpg"}} wrapped />
                  <Modal.Description>
                    <p>Edit this meme</p>
                    <Form
                      style={{ width: "500px" }}
                      onSubmit={this.handleSubmit}
                    >
                      <Form.Input
                        disabled
                        fluid
                        name="name"
                        label="Name"
                        defaultValue={name}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        required
                        fluid
                        name="url"
                        label="Meme URL"
                        defaultValue={url}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        required
                        fluid
                        name="caption"
                        label="Caption"
                        defaultValue={caption}
                        onChange={this.handleChange}
                      />
                      <Button onClick={() => {
                          this.setState({ open: false });
                        }}>
                        Cancel
                      </Button>
                      <Button primary type="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions></Modal.Actions>
              </Modal>
            </Item.Extra>
          </Item.Meta>
        </Item.Content>
      </Item>
    );
  }
}

export default MemeComponent;
