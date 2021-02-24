import React, { Component } from "react";
import Typewriter from "typewriter-effect";

class HeaderComponent extends Component {
  render() {
    return (
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(
              '<strong> <span style="width: auto; color: #008080; margin:2em 0em 2em 0em; font-size: 3em; font-family: Roboto; font-style: italic";>Submit your meme!</span></strong>'
            )
            .callFunction(() => {
              console.log("String typed out!");
            })
            .pauseFor(60000)
            .callFunction(() => {
              console.log("All strings were deleted");
            })
            .start();
        }}
      />
    );
  }
}

export default HeaderComponent;
