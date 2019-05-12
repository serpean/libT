import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Backdrop from './components/Backdrop/Backdrop';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import FeedPage from './pages/Feed/Feed';
import SinglePostPage from './pages/Feed/SinglePost/SinglePost';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import * as actions from './store/actions/index';
import './App.css';

class App extends Component {
  state = {
    showBackdrop: false
  };
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  backdropClickHandler = () => {
    this.props.onErrorHandler();
    this.setState({ showBackdrop: false });
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={FeedPage} />
          <Route path="/:postId" component={SinglePostPage} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler />
        <Layout />
        {routes}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onErrorHandler: () => dispatch(actions.errorHandler())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
