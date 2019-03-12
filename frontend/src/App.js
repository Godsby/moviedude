import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  state={
    users: []
  }

  componentDidMount() {
    axios('/users')
    .then(res => this.setState({users: res.data}))
  }
  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user => 
          <div key={user.id}> {user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
