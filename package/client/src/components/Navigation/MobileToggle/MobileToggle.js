import React from './node_modules/react';

import './MobileToggle.css';

const mobileToggle = props => (
  <button className="mobile-toggle" onClick={props.onOpen}>
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
  </button>
);

export default mobileToggle;
