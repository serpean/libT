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
  componentDidMount() {
    const user = this.props.match.params.username || this.props.userId;
    this.props.onLoadLists(user);
  }

  render() {
    let library = <Loader />;
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
              </div>
              <div>{this.props.actualList.description}</div>
            </header>
            <ResourceEntry id="1" />
          </div>
        );
      } else {
        library = <h1>List doesn't exists</h1>;
      }
    }
    return (
      <Fragment>
        <ErrorHandler
          error={this.props.error}
          onHandle={this.props.onErrorHandler}
        />
        <ListEditor />
        <section className="libraries">
          <LibraryMenu />
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
    extraLists: state.library.extraLists,
    error: state.library.error,
    actualList: state.library.actualList,
    loadingList: state.library.loadingList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (token, userId) => dispatch(actions.loadLists(token, userId)),
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
