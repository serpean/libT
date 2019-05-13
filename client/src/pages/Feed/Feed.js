import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Post from '../../components/Feed/Post/Post';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/index';
import './Feed.css';

class Feed extends Component {
  componentDidMount() {
    this.props.loadPosts(this.props.token);
  }

  render() {
    return (
      <Fragment>
        <section className="feed">
          {this.props.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.props.posts.length <= 0 && !this.props.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!this.props.postsLoading && (
            <Paginator
              onPrevious={this.props.loadPosts.bind(this, 'previous')}
              onNext={this.props.loadPosts.bind(this, 'next')}
              lastPage={Math.ceil(this.props.totalPosts / 2)}
              currentPage={this.props.postPage}
            >
              {this.props.posts.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  action={post.action}
                  type={post.resource.type}
                  author={post.creator.name}
                  date={new Date().toLocaleDateString()}
                  title={post.resource.title}
                  image={post.resource.image}
                  content={post.resource.description}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    posts: state.feed.posts,
    totalPosts: state.feed.totalPosts,
    postPage: state.feed.postPage,
    postsLoading: state.feed.postsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(actions.loadPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
