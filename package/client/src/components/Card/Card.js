import React from 'react';

import './Card.css';

const card = props => {
  return (
    <div class="card">
      <div className="card-image__content">
        <img src={props.image} alt={props.title} style={{ width: '100%' }} />
      </div>
      <div class="container">
        <h4>
          <b>{props.title}</b>
        </h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default card;
