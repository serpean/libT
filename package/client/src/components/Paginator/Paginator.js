import React from 'react';

import './Paginator.css';

const paginator = props => (
  <div className="paginator">
    {props.children}
    <hr />

    <div className="paginator__controls">
      {props.currentPage < props.lastPage ? (
        <button className="paginator__control" onClick={props.onNext}>
          More
        </button>
      ) : (
        <div>Not more post</div>
      )}
    </div>
  </div>
);

export default paginator;
