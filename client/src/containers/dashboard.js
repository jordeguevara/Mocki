
import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import "./dashboard.css";

import userPhoto from "../assets/icon.png";
import BarChart from "../componets/BarChart/barchart";
import PieChart from "../componets/PieChart/piechart";

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
    this.state = {
      userId: "",
      isReady: false,
      reviewCompleted: false
    };
    this.handleMatching = this.handleMatching.bind(this);
    this.lobby = new Lobby();
  }

  handleMatching = () => {
    this.lobby.matchOnClick();
    //jo:
  };

  render() {
    return (
      <div className={"interviewSessionContainer"}>
        <div className={"startSession"}>
          <div className={"left1"}>
            <img src={userPhoto} width="75" height="75" alt="cartoon person" className='profilePhoto' />
          </div>
          <div className={"right1"}>
            <div className="startButton">
              <Button onClick={this.handleMatching} color="red">
                Join Session
              </Button>
            </div>
          </div>
        </div>
        <div className='analytics'>
          <div class="ui stackable three column grid">

            <div class="column">
              <div class="some">
              <PieChart/>
              </div>
            </div>

            <div class="column">
              <div class="some">
              </div>
            </div>

            <div class="column">
              <div class="some">
              </div>
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

class Lobby {
  constructor() {
    this.lobby = new Map();
    this.initalizeMap(this.lobby);
  }

  mapToJson = map => {
    return JSON.stringify([...map]);
  };

  initalizeMap(lobby) {
    for (let i = 1; i <= 5; i++) {
      this.lobby.set(i, []);
    }

    fetch("/lobby/checkExisits", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: this.mapToJson(this.lobby)
    }).then(res => res.text());
  }

  addUser() {
    fetch("/addUserToLobby", {
      method: "POST",
      body: JSON.stringify({ userId: this.state.userId })
    });
  }

  removeUser() {
    fetch("/lobby/removeUserFromLobby", {
      method: "DELETE",
      body: JSON.stringify({ userId: this.state.user.userId })
    });
  }

  matchOnClick() {
    let matchingInterval = setInterval(this.matchUser, 5000);
    setTimeout(stopMatching(matchingInterval), 30000);

    function stopMatching(interval) {
      clearInterval(interval);
    }
  }

  matchUser() {
    fetch("/lobby/available", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: this.state.userId })
    }).then(matchedUsers => {
      if (
        this.state.user.id === matchedUsers[0].id ||
        this.state.user.id === matchedUsers[1].id
      )
        window.location = `/interview/${matchedUsers.interviewID}`;
    });
  }
}

export default Dashboard;
