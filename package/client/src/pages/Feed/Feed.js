import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import LibraryMenu from '../../components/Library/LibraryMenu/LibraryMenu';
import Post from '../../components/Feed/Post/Post';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import './Feed.css';

class Feed extends Component {
  componentDidMount() {
    this.props.loadPosts();
    const user = localStorage.getItem('userId');
    this.props.onLoadLists(user, null);
  }

  render() {
    let libraries = <Loader />;
    if (!this.props.loadingLists) {
      if (
        this.props.doneList !== null &&
        this.props.inProgressList !== null &&
        this.props.wantList !== null
      ) {
        libraries = <LibraryMenu userId={localStorage.getItem('userId')} />;
      } else {
        libraries = null;
      }
    }
    return (
      <Fragment>
        <ErrorHandler
          error={this.props.error}
          onHandle={this.props.onErrorHandler}
        />
        <div className="lib-nav">{libraries}</div>
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
                  name={post.creator}
                  date={new Date().toLocaleDateString()}
                  title={post.resource.title}
                  author={post.resource.author}
                  image={post.resource.image}
                  content={post.resource.description}
                  actualState={post.resource.actualState}
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
    posts: state.feed.posts,
    totalPosts: state.feed.totalPosts,
    postPage: state.feed.postPage,
    postsLoading: state.feed.postsLoading,
    error: state.feed.error,
    doneList: state.library.doneList,
    wantList: state.library.wantList,
    inProgressList: state.library.inProgressList,
    extraLists: state.library.extraLists,
    loadingLists: state.library.loadingLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (username, listId) =>
      dispatch(actions.loadLists(username, listId)),
    loadPosts: (direction, page) =>
      dispatch(actions.loadPosts(direction, page)),
    onErrorHandler: () => dispatch(actions.errorHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
