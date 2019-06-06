import React from './node_modules/react';
import { NavLink } from './node_modules/react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'home', text: 'Home', link: '/', auth: true },
  { id: 'library', text: 'My libraries', link: '/library', auth: true },
  { id: 'perfil', text: 'Profile', link: '/profile', auth: true },
  { id: 'login', text: 'Login', link: '/login', auth: false },
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
    <li className="navigation-item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  )
];

export default navigationItems;
