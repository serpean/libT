import React from 'react';
import { Link } from 'react-router-dom';

import './LibraryEntry.css';

const libraryEntry = props => {
  return (
    <div className="profile-lib__entry">
      <div className="profile-lib__entry-title">
        <Link to={`/library/${props.user}/${props.list._id}`}>
          {props.list.name}
        </Link>
      </div>
      <div className="profile-lib__entry-number">
        Number of resources: {props.list.resources.length}
      </div>
      <div className="profile-lib__entry-description">
        {props.list.description}
      </div>
    </div>
  );
};

export default libraryEntry;
