import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Avatar from '../../components/Image/Avatar';
import Loader from '../../components/Loader/Loader';

import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';

import './Profile.css';
import ProfileEditor from '../../components/Profile/ProfileEditor/ProfileEditor';
import FollowButton from '../../components/Profile/FollowButton/FollowButton';

class Profile extends Component {
  componentDidMount() {
    const user = this.props.match.params.username || this.props.userId;
    this.props.onLoadProfile(user);
    this.props.userId !== user && this.props.isFollowing(user);
  }

  componentDidUpdate() {
    const user = this.props.match.params.username || this.props.userId;
    if (user && this.props.user !== null && user !== this.props.user.username) {
      this.props.onLoadProfile(user);
      this.props.userId !== user && this.props.isFollowing(user);
    }
  }

  render() {
    const profilePage = !this.props.loadingProfile ? (
      this.props.user !== null ? (
        <div className="profile">
          <div className="profile__sidenav">
            <Avatar alt={this.props.username} src={this.props.user.image} />
            <div className="profile__meta">
              <div className="profile__username">
                {this.props.user.username}
              </div>
              <div className="profile__bio">{this.props.user.bio}</div>
              <div className="profile__controls">
                <FollowButton
                  user={this.props.user}
                  onEditProfile={this.props.onEditProfile}
                  onFollow={this.props.onFollow}
                  isFollowing={this.props.isUserFollowing}
                />
              </div>
            </div>
          </div>
          <div className="profile__main">
            <ProfileTabs user={this.props.user} />
          </div>
        </div>
      ) : (
        <h1>Not profile found!</h1>
      )
    ) : (
      <Loader />
    );

    return (
      <Fragment>
        <ProfileEditor />
        {profilePage}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    user: state.profile.user,
    loadingProfile: state.profile.loadingProfile,
    loadingFollowing: state.profile.loadingFollowing,
    isUserFollowing: state.profile.isFollowing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadProfile: username => dispatch(actions.loadProfile(username)),
    onEditProfile: username => dispatch(actions.updateProfileHandler(username)),
    onFollow: username => dispatch(actions.onFollow(username)),
    isFollowing: username => dispatch(actions.isFollowing(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
