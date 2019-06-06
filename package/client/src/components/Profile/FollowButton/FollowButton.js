import React from 'react';

import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';

const followButton = props => {
  const userId = localStorage.getItem('userId');
  return props.user.username === userId ? (
    <Button mode="" onClick={props.onEditProfile.bind(this, props.user)}>
      Edit
    </Button>
  ) : !props.loadingFollowing ? (
    <Button
      design=""
      mode={props.isFollowing ? 'danger' : 'success'}
      onClick={props.onFollow.bind(this, props.user.username)}
    >
      {props.isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  ) : (
    <Loader />
  );
};

export default followButton;
