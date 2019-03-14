import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import '../src/stylesheets/App.css';
//export default do not need {} 
//Route and Link do not need in one component



class App extends Component {

  render() {
    return (
      <div className="App">
        <nav>
          <Link to = '/' className='home-left'> Home </Link> {" "}
          <Link to = '/movies' className = 'home-right' > All Movies </Link> {" "}
          <Link to = '/movies/bygenre' className = 'home-right' > By Genre </Link> {" "}
          {/* <Link to = "/movies/:id" className = 'home-right' > Single Movie </Link> */}
        </nav>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/movies' component={Movies}/>
        </Switch>
      </div>
    );
  }
}

export default App;
