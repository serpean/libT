import React from 'react';
import { Link } from 'react-router-dom';

import '../Button.css';
import './ResourceButton.css';

const button = props => (
  <div className="dropdown">
    <button
      className={[
        'button',
        `button--${props.design}`,
        `button--${props.mode}`
      ].join(' ')}
      disabled={props.disabled || props.loading}
    >
      {props.actualState}
    </button>
    <ul className="dropdown-content">
      {props.content.map((item, index) => {
        return (
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        );
      })}
    </ul>
  </div>
);
export default button;
