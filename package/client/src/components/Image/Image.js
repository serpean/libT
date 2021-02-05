import React from 'react';

import './Image.css';

const image = props => (
  <img src={props.imageUrl} alt={props.alt} className="image" />
);

export default image;
