import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';
import Predict from './components/pages/Predict';
import UserPredictions from './components/pages/UserPredictions';
import DashBoard from './components/pages/Dashboard';
import MyTeam from './components/pages/MyTeam';
import DailyPlayerScores from './components/pages/DailyPlayerScores'

import './App.css';

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-753244.okta.com/oauth2/default"
          client_id="0oawhx4eolDyyKD0z4x6"
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/dashboard" exact={true} component={DashBoard} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-753244.okta.com" />
                )}
              />
              <SecureRoute path="/predict" exact={true} component={Predict} />
              <SecureRoute path="/predictions" exact={true} component={UserPredictions} />
              <SecureRoute path="/myTeam" exact={true} component={MyTeam} />
              <SecureRoute path="/playerPoints" exact={true} component={DailyPlayerScores} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
