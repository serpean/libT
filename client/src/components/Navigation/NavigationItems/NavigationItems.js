import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchButton from '../SearchButton/SearchButton';

import './NavigationItems.css';

const navItems = [
  { id: 'home', text: 'Home', link: '/', auth: true },
  { id: 'library', text: 'Bibliotecas', link: '/library', auth: true },
  { id: 'perfil', text: 'Perfil', link: '/profile', auth: true },
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
