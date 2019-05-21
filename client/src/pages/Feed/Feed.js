import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Post from '../../components/Feed/Post/Post';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import './Feed.css';

class Feed extends Component {
  componentDidMount() {
    this.props.loadPosts(this.props.token);
  }

  render() {
    return (
      <Fragment>
        <ErrorHandler
          error={this.props.error}
          onHandle={this.props.onErrorHandler}
        />
        <section className="feed">
          {this.props.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.props.posts.length <= 0 && !this.props.postsLoading ? (
            <h1 style={{ textAlign: 'center' }}>No posts found.</h1>
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
                  name={post.creator.name}
                  date={new Date().toLocaleDateString()}
                  title={post.resource.title}
                  author={post.resource.author}
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
    postsLoading: state.feed.postsLoading,
    error: state.feed.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: () => dispatch(actions.loadPosts()),
    onErrorHandler: () => dispatch(actions.errorHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
