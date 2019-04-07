import React, { Component } from 'react';
import logo from './logo.svg';
import LoginContainer from './containers/login'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginContainer isNew={true}/>
        </header>
      </div>
    );
  }
}


export default App;
