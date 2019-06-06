import React from 'react';
import { NavLink } from 'react-router-dom';

import './SearchMobile.css';

const searchMobile = () => {
  return (
    <NavLink to="/search">
      <h1 className="search__icon">
        <i className="fas fa-search" />
      </h1>
    </NavLink>
  );
};

export default searchMobile;
