import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import SideBar from '../sidebar/sidebar';
import LandingPage from '../landing-page/landing-page';
import RegistrationPage from '../registration-page/registration-page';
import Settings from '../settings/settings';
import Dashboard from '../dashboard/dashboard';
import {refreshAuthToken} from '../actions/auth';

import './App.css';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
      if (!prevProps.loggedIn && this.props.loggedIn) {
          // When we are logged in, refresh the auth token periodically
          this.startPeriodicRefresh();
      } else if (prevProps.loggedIn && !this.props.loggedIn) {
          // Stop refreshing when we log out
          this.stopPeriodicRefresh();
      }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }

  render() {
      return (
          <div className="app">
          <Switch>
              <SideBar>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/settings" component={Settings}/>
          </SideBar>
          </Switch>
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/" component={LandingPage} />
          </div>
      );
  }
}

const mapStateToProps = state => ({

  hasAuthToken: state.auth.authToken !== null ,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
