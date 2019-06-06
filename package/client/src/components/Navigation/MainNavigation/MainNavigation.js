import React from './node_modules/react';
import { NavLink } from './node_modules/react-router-dom';
import { connect } from './node_modules/react-redux';

import MobileToggle from '../MobileToggle/MobileToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SearchButton from '../SearchButton/SearchButton';

import * as actions from '../../../store/actions/index';

import './MainNavigation.css';
import SearchMobile from '../SearchButton/SearchMobile/SearchMobile';

const mainNavigation = props => (
  <nav className="main-nav">
    <div className="main-nav__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>
    <div className="main-nav__search">{props.isAuth && <SearchButton />}</div>

    {props.isAuth && <SearchMobile />}
    <MobileToggle onOpen={props.onOpenMobileNav} />
    <ul className="main-nav__items">
      <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul>
  </nav>
);

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
)(mainNavigation);
