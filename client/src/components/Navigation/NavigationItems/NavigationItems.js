import React from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../../Form/Input/Input';

import './NavigationItems.css';

const navItems = [
  { id: 'home', text: 'Home', link: '/', auth: true },
  { id: 'library', text: 'Bibliotecas', link: '/library', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

const navigationItems = props => [
  ...navItems
    .filter(item => item.auth === props.isAuth)
    .map(item => (
      <li
        key={item.id}
        className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
      >
        <NavLink to={item.link} exact onClick={props.onChoose}>
          {item.text}
        </NavLink>
      </li>
    )),
  props.isAuth && (
    <li className="navigation-item" key="search">
      <Input id="search" placeholder="Search" type="text" control="input" />
    </li>
  ),
  props.isAuth && (
    <li className="navigation-item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  )
];

export default navigationItems;
