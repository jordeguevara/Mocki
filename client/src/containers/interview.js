import React, { Component } from "react";
import AceEditor from "react-ace";
import brace from "brace";
import './interview.css'
import QuestionPrompt from '../componets/QuestionPrompt/questionPrompt'

import "brace/mode/java";
import "brace/mode/javascript";

import "brace/theme/monokai";

class Interview extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }
  render() {
    return (
     
      <div className="Interview">
        <div className={'left'}>
        <AceEditor
          placeholder="Placeholder Text"
          mode="javascript"
          theme="monokai"
          name="blah2"
          height='1000px'
          width='850px'
          // onLoad={this.onLoad}
          // onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={`const helloWorld = () => {console.log('Hello World')}`}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
        </div>
         <div className={'right'}>
         <QuestionPrompt/>
         </div>
      </div>
    );
  }
}

export default Interview;
