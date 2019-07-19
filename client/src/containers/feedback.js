import React, { Component } from "react";
import {  Button, Form} from "semantic-ui-react";

import "./feedback.css";

const FeedbackForm = () => (
  <div>
    <h1>Feed Back Survey</h1>
    <Form>
      <Form.Field>
        <label>Technical Communication</label>
        <input placeholder="Great, needs work, ie" />
      </Form.Field>
      <Form.Field>
        <label>Problem Solving Ability</label>
        <input placeholder="Excellent, could use more test cases, ie" />
      </Form.Field>
      <Form.Field>
        <label>Coding Ability</label>
        <input placeholder="fast and effiecent, slow but logically, ie" />
      </Form.Field>
      <Button positive className={"surveyBtn"} type="submit">
        Submit
      </Button>
    </Form>
  </div>
);

class Feedback extends Component {
  render() {
    return (
      <div className={"feedbackContainer"}>
        <FeedbackForm />
      </div>
    );
  }
}
export default Feedback;
