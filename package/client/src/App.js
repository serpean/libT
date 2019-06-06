import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Backdrop from './components/Backdrop/Backdrop';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import FeedPage from './Pages/Feed/Feed';
import LibraryPage from './Pages/Library/Library';
import LoginPage from './Pages/Auth/Login';
import SignupPage from './Pages/Auth/Signup';
import ProfilePage from './Pages/Profile/Profile';
import ResourcePage from './Pages/Resource/Resource';
import SearchPage from './Pages/Search/Search';
import Home from './Pages/Home/Home';
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
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/" component={Home} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={FeedPage} />
          <Route path="/library/:username?/:list?" component={LibraryPage} />
          <Route path="/profile/:username?" component={ProfilePage} />
          <Route path="/resource/:type/:id" component={ResourcePage} />
          <Route path="/search/:query?" component={SearchPage} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler
          error={this.props.error}
          onHandle={this.props.onErrorHandler}
        />
        <Layout>{routes}</Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.error,
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
