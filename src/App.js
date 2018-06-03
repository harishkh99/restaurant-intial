import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Home from './Containers/Home';
import Restaurants from './Containers/Restaurants';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/restaurants' component={Restaurants} />
        </Switch>
      </div>
    );
  }
}

export default App;
