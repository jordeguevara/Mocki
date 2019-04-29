import React, { Component } from "react";
import AceEditor from "react-ace";
// import brace from "brace";
import "./interview.css";
import QuestionPrompt from "../componets/QuestionPrompt/questionPrompt";
import axios from "axios";
import Pusher from "pusher-js";
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/theme/monokai";

class Interview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      initialCode: `const helloWorld = () => {console.log('Hello World')}`
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }
  componentDidMount() {
  }

  handleKeyPress = event => {
    console.log("event", event);
    if (event.key === 13) {
      console.log("enter press here! ");
    }
  };

  handleTextChange(payload) {
    console.log('payload',payload)
    axios.post("http://localhost:3001/message", { code: payload });

    const pusher = new Pusher("6b07cbe48cd4b864a86a", {
      cluster: "us3",
      encrypted: true
    });
    var self = this;
    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function(data) {
      self.setState({ initialCode: data.code.code });
    });
  }
  render() {
    return (
      <div className="Interview">
        <div className={"left"}>
          <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            name="blah2"
            height="1000px"
            width="850px"
            // onLoad={this.onLoad}
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.initialCode}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </div>
        <div className={"right"}>
          <QuestionPrompt />
        </div>
      </div>
    );
  }
}

export default Interview;
