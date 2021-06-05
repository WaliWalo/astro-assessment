import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ChannelDetails from './pages/ChannelDetails/ChannelDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/channelDetails">Foo</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/channelDetails/:id" component={ChannelDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
