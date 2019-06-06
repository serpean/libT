import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';

import Avatar from '../../Image/Avatar';
import Button from '../../Button/Button';

import './UserEntry.css';

const userEntry = props => {
  return (
    <div className="profile-usr__entry">
      <div className="profile-usr__entry-avatar">
        <Avatar src={props.image} alt={props.username} size={3} />
      </div>
      <div className="profile-usr__entry-name">
        <Link to={`/profile/${props.username}`}>{props.username}</Link>
      </div>
      <div className="profile-usr__entry-library">
        <Button
          mode="raised"
          design="accent"
          to={`/library/${props.username}`}
        >{`${props.username}'s libraries`}</Button>
      </div>
    </div>
  );
};

export default userEntry;
