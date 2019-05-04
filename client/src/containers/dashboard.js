import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import "./dashboard.css";

import userPhoto from "../assets/icon.png";

var data = [
  { id: 1, name: "Java", value: "2" },
  { id: 2, name: "Python", value: "5" },
  { id: 3, name: "Javascript ", value: "4" }
];

const TableExamplePagination = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Session ID</Table.HeaderCell>
        <Table.HeaderCell>Language</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>{data[0].id}</Label>
        </Table.Cell>
        <Table.Cell>{data[0].name}</Table.Cell>
        <Table.Cell>{data[0].value}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>{data[1].id}</Table.Cell>
        <Table.Cell>{data[1].name}</Table.Cell>
        <Table.Cell>{data[1].value}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>{data[2].id}</Table.Cell>
        <Table.Cell>{data[2].name}</Table.Cell>
        <Table.Cell>{data[2].value}</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3">
          <Menu floated="right" pagination>
            <Menu.Item as="a" icon>
              <Icon name="chevron left" />
            </Menu.Item>
            <Menu.Item as="a">1</Menu.Item>
            <Menu.Item as="a">2</Menu.Item>
            <Menu.Item as="a">3</Menu.Item>
            <Menu.Item as="a">4</Menu.Item>
            <Menu.Item as="a" icon>
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMatching = this.handleMatching.bind(this);
  }

  handleMatching = () => {
    alert("handling matching");
  };

  render() {
    return (
      <div className={"interviewSessionContainer"}>
        <div className={"startSession"}>
          <div className={"left"}>
            <img src={userPhoto} width="75" height="75" alt="cartoon person" />
          </div>
          <div className={"right"}>
            <div className="startButton">
              <Button onClick={this.handleMatching} color="red">
                Join Session
              </Button>
            </div>
          </div>
        </div>
        <div className={"sessionDashboard"}>
          <p>Previous Sessions:</p>
          <br />
          <TableExamplePagination />
        </div>
      </div>
    );
  }
}

// function Lobby() {

//   this.lobby = new HashMap();

//   addUser(userId){

//   }

//   removeUser(){

//   }

//   matchUsers(){

//   }

//   updateUsers(){

//   }
// }

export default Dashboard;
