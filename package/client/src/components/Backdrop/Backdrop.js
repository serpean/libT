import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';

import './Backdrop.css';

const backdrop = props =>
  ReactDOM.createPortal(
    <div
      className={['backdrop', props.open ? 'open' : ''].join(' ')}
      onClick={props.onClick}
    />,
    document.getElementById('backdrop-root')
  );

export default backdrop;
