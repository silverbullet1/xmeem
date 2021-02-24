import React, { Component } from "react";
import * as RequestHandler from "./../utils/RequestHandler";
import { Form, Button, Segment, Grid } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import eventBus from "../utils/EventBus";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", url: "", caption: "", id: "" };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, url, caption } = this.state;
    const body = JSON.stringify({
      name: name,
      url: url,
      caption: caption,
    });
    const result = await RequestHandler.POST(body);
    console.log(result);
    if(result) {
      console.log("Dispatching result..");
      const newMeme = {...this.state, id : result.id};
      console.log(newMeme);
      eventBus.dispatch("addMeme",newMeme);
    }
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <Grid
          textAlign="center"
          style={{ marginTop: "2em" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{  }}>
            <Form size = "large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  label="Name"
                  name="name"
                  placeholder="Enter your full name"
                  id="form-input-first-name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  required
                  fluid
                  name="url"
                  label="Meme URL"
                  placeholder="https://media.sproutsocial.com/uploads/meme-example.jpg"
                  onChange={this.handleChange}
                />
                <Form.Input
                  required
                  fluid
                  name="caption"
                  label="Caption"
                  placeholder="Enter a creative caption"
                  onChange={this.handleChange}
                />
                <Button primary type="submit">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default FormComponent;
