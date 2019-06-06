import React, { Fragment } from './node_modules/react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../Backdrop/Backdrop';
import './MobileNavigation.css';

const mobileNavigation = props => (
  <Fragment>
    {props.open && <Backdrop onClick={props.onChooseItem} />}
    <nav className={['mobile-nav', props.open ? 'open' : ''].join(' ')}>
      <ul
        className={['mobile-nav__items', props.mobile ? 'mobile' : ''].join(
          ' '
        )}
      >
        <NavigationItems
          mobile
          onChoose={props.onChooseItem}
          isAuth={props.isAuth}
          onLogout={props.onLogout}
        />
      </ul>
    </nav>
  </Fragment>
);

export default mobileNavigation;
