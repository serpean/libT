import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import LibraryMenu from '../../components/Library/LibraryMenu/LibraryMenu';
import ResourceEntry from '../../components/Library/ResourceEntry/ResourceEntry';
import Loader from '../../components/Loader/Loader';
import ListEditor from '../../components/Library/LibraryEditor/LibraryEditor';

import './Library.css';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';

class Library extends Component {
  state = {
    openSideNav: false,
    userId: null,
    listId: null
  };
  componentDidMount() {
    const user = this.props.match.params.username || this.props.userId;
    const list = this.props.match.params.list;
    this.setState({ userId: user, listId: list });
    this.props.onLoadLists(user, list);
  }

  componentDidUpdate() {
    const user = this.props.match.params.username || this.props.userId;
    const list = this.props.match.params.list;
    if (
      (!user && this.state.userId !== user) ||
      (!list && this.state.listId !== list)
    ) {
      this.setState({ userId: user, listId: list });
      this.props.onLoadLists(user, list);
    } else if (this.state.userId !== user || this.state.listId !== list) {
      this.setState({ userId: user, listId: list });
      this.props.onLoadList(list);
    }
  }

  chevronHandler(update) {
    this.setState({ openSideNav: !update });
  }

  render() {
    let library = <Loader />;
    let libraries = <Loader />;
    if (!this.props.loadingList) {
      if (this.props.actualList !== null) {
        library = (
          <div>
            <header className="actual-library__header">
              <div className="actual-library__title">
                <h1>{this.props.actualList.name}</h1>
                {this.props.actualList.type === 0 ? (
                  <div className="actual-library__controls">
                    <i
                      className="fas fa-edit pointer"
                      onClick={() =>
                        this.props.onUpdateList(this.props.actualList)
                      }
                    />
                    <i
                      className="fas fa-trash-alt pointer"
                      onClick={() => {
                        this.props.onDeleteList(
                          this.props.actualList._id,
                          this.props.doneList._id
                        );
                      }}
                    />
                  </div>
                ) : null}
                <div
                  className="sideNav__mobile-control"
                  onClick={() => this.chevronHandler(this.state.openSideNav)}
                >
                  Libraries{' '}
                  {this.state.openSideNav ? (
                    <i className="fas fa-chevron-down" />
                  ) : (
                    <i className="fas fa-chevron-up" />
                  )}
                </div>
              </div>
              <div>{this.props.actualList.description}</div>
            </header>
            <div className="actual-library__content">
              {this.props.actualList.resources.length > 0 ? (
                this.props.actualList.resources.map(resource => (
                  <ResourceEntry
                    key={resource.searchId}
                    id={resource.searchId}
                    title={resource.title}
                    description={resource.description}
                    image={resource.image}
                    authors={resource.authors}
                    type={resource.type}
                  />
                ))
              ) : (
                <p>Not resources found.</p>
              )}
            </div>
          </div>
        );
      } else {
        library = <h1>La lista no existe</h1>;
      }
    }
    if (!this.props.loadingLists) {
      if (
        this.props.doneList !== null &&
        this.props.inProgressList !== null &&
        this.props.wantList !== null
      ) {
        libraries = <LibraryMenu userId={this.state.userId} />;
      } else {
        libraries = null;
        library = <h1>El usuario no existe</h1>;
      }
    }
    return (
      <Fragment>
        <ErrorHandler
          error={this.props.error}
          onHandle={this.props.onErrorHandler}
        />
        <ListEditor />
        <section
          className={['libraries', this.state.openSideNav ? 'active' : ''].join(
            ' '
          )}
        >
          {libraries}
        </section>
        <section className="actual-library">{library}</section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    doneList: state.library.doneList,
    wantList: state.library.wantList,
    inProgressList: state.library.inProgressList,
    extraLists: state.library.extraLists,
    error: state.library.error,
    actualList: state.library.actualList,
    loadingList: state.library.loadingList,
    loadingLists: state.library.loadingLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (username, listId) =>
      dispatch(actions.loadLists(username, listId)),
    onLoadList: listId => dispatch(actions.loadList(listId)),
    onUpdateList: list => dispatch(actions.updateLibraryHandler(list)),
    onDeleteList: (list, nextList) =>
      dispatch(actions.deletePostHandler(list, nextList)),
    onErrorHandler: () => dispatch(actions.errorHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
