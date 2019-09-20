import React, { Component } from "react";
import AceEditor from "react-ace";
// import brace from "brace";
import "./interview.css";
import QuestionPrompt from "../componets/QuestionPrompt/questionPrompt";
import axios from "axios";
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/theme/monokai";
const io = require("socket.io-client");
let socket = io.connect();

class Interview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      initialCode: `const helloWorld = () => {console.log('Hello World')}`,
      code: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }
  componentDidMount() {
       socket.on('chat', function(data) {
      socket.emit('join', 'hello world from the client!');
      this.setState({ initialCode: data })
    });
        
    // socket.on("chat", data => this.setState({ initialCode: data }));
  }

  handleKeyPress = event => {
    if (event.key === 13) {
    }
  };

  handleTextChange(payload) {
    this.setState({ code: payload });
    this.setState({ initialCode: this.state.code });
    socket.emit("chat", payload);
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
