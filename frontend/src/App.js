import "./App.css";
import React from "react";
import { Container, Divider, Header } from "semantic-ui-react";
import FormComponent from "./components/FormComponent";
import HeaderComponent from "./components/HeaderComponent";
import MemeContainer from "./components/MemeContainer";
import "typeface-roboto";
const style = {
  h1: {
    fontFamily: "Roboto",
    fontStyle: "latin",
    fontWeight: "300",
    fontSize: "2em"
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    padding: '0em 1em', 
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: "300",
    fontSize: "4em"
  },
  h4: {
    padding: '1em 1em', 
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: "300",
    fontSize: "4em"
  },
  last: {
    marginBottom: '300px',
  },
}
class App extends React.Component {
  render() {
    return (
      <div className="App">
      <Header content='XMeme' style={style.h3} textAlign='center' />
        <Container>
          <HeaderComponent />
          <FormComponent />
          <Divider horizontal style={style.h1}>Browse & edit recent memes</Divider>
          <MemeContainer />
        </Container>
      </div>
    );
  }
}

export default App;
