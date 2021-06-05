import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home/Home';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ChannelDetails from './pages/ChannelDetails/ChannelDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SubHeader from './components/Header/SubHeader';
// https://reactrouter.com/web/guides/quick-start

function App() {
  return (
    <Router>
      <div className="blackBg">
        <Header />
      </div>
      <div className="pinkBg">
        <SubHeader />
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/channelDetails/:id" component={ChannelDetails} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
