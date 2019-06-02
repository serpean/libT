import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/Button/Button';
import Avatar from '../../components/Image/Avatar';
import Loader from '../../components/Loader/Loader';

import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';

import './Profile.css';
import ProfileEditor from '../../components/Profile/ProfileEditor/ProfileEditor';

class Profile extends Component {
  componentDidMount() {
    const user = this.props.match.params.username || this.props.userId;
    this.props.onLoadProfile(user);
  }

  componentDidUpdate() {
    const user = this.props.match.params.username || this.props.userId;
    if (
      this.props.match.params.username &&
      this.props.user !== null &&
      this.props.match.params.username !== this.props.user.username
    )
      this.props.onLoadProfile(user);
  }

  handleEdit() {}

  handleFollow() {}

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
                {this.props.user.username === this.props.userId ? (
                  <Button
                    mode=""
                    onClick={this.props.onEditProfile.bind(
                      this,
                      this.props.user
                    )}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    design=""
                    mode={this.props.user.isFollowing ? 'danger' : 'success'}
                    onClick={this.handleFollow}
                  >
                    {this.props.user.isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
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
    loadingProfile: state.profile.loadingProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadProfile: username => dispatch(actions.loadProfile(username)),
    onEditProfile: username => dispatch(actions.updateProfileHandler(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
