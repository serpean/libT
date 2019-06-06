import React, { Component, Fragment } from './node_modules/react';
import { connect } from './node_modules/react-redux';

import Toolbar from '../Toolbar/Toolbar';
import MainNavigation from '../Navigation/MainNavigation/MainNavigation';
import MobileNavigation from '../Navigation/MobileNavigation/MobileNavigation';

import * as actions from '../../store/actions/index';

import './Layout.css';

class Layout extends Component {
  state = {
    showMobileNav: false
  };

  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  render() {
    return (
      <Fragment>
        <header className="main-header">
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
              onLogout={this.logoutHandler}
              isAuth={this.props.isAuth}
            />
          </Toolbar>
        </header>
        <MobileNavigation
          open={this.state.showMobileNav}
          mobile
          onChooseItem={this.mobileNavHandler.bind(this, false)}
          onLogout={this.props.onLogout}
          isAuth={this.props.isAuth}
        />
        <main className="content">{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
