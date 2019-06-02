import React from 'react';

import LibraryEntry from '../LibraryEntry/LibraryEntry';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import './ProfileTabs.css';

const profileTabs = props => {
  return (
    <div className="profile__tabs">
      <ul className="profile__tabs-control">
        <li
          className={props.tab === 0 && 'open'}
          onClick={props.handleTabs.bind(this, 0)}
        >
          Overview
        </li>
        <li
          className={props.tab === 1 && 'open'}
          onClick={props.handleTabs.bind(this, 1)}
        >
          Followers
        </li>
        <li
          className={props.tab === 2 && 'open'}
          onClick={props.handleTabs.bind(this, 2)}
        >
          Following
        </li>
      </ul>
      <ul className={`profile__tabs-content ${props.tab === 0 && 'open'}`}>
        <li className="tab__title">Libraries</li>
        {props.user.lists.map(list => (
          <li className="tab__content">
            <LibraryEntry list={list} user={props.user.username} />
          </li>
        ))}
      </ul>
      <ul className={`profile__tabs-content ${props.tab === 1 && 'open'}`}>
        <li className="tab__title">Followers</li>
        {props.user.followers.map(user => (
          <li>{user.username}</li>
        ))}
      </ul>
      <ul className={`profile__tabs-content ${props.tab === 2 && 'open'}`}>
        <li className="tab__title">Following</li>
        {props.user.following.map(user => (
          <li>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tab: state.profile.tab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTabs: tab => dispatch(actions.handleTab(tab))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profileTabs);
