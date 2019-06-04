import React from 'react';

import './Avatar.css';

const avatar = props => (
  <div
    className="avatar"
    style={{
      width: props.size + 'rem',
      height: props.size + 'rem'
    }}
  >
    <img
      style={{
        color: 'black',
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
      alt={props.alt}
      src={props.src}
    />
  </div>
);

export default avatar;
