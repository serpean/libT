import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../Components/Form/Input/Input';
import Loader from '../../Components/Loader/Loader';
import Paginator from '../../Components/Paginator/Paginator';
import ResourceEntry from '../../Components/Library/ResourceEntry/ResourceEntry';

import './Search.css';

class Search extends Component {
  componentDidMount() {
    if (
      this.props.doneList === null &&
      this.props.inProgressList === null &&
      this.props.wantList === null
    ) {
      const user = localStorage.getItem('userId');
      this.props.onLoadLists(user, null);
    }
  }
  render() {
    const searchResults = !this.props.loading ? (
      <Paginator
        onNext={this.props.onSearch.bind(
          this,
          null,
          this.props.query,
          'more',
          this.props.resourcePage
        )}
        lastPage={Math.ceil(this.props.totalResources / 10)}
        currentPage={this.props.resourcePage}
      >
        {this.props.res
          .filter(resource => {
            let res = false;
            if (this.props.filterBy !== 'all') {
              if (this.props.filterBy === resource.type) {
                res = true;
              }
            } else {
              res = true;
            }
            return res;
          })
          .map(resource => (
            <article key={resource.id} className="search__item">
              <ResourceEntry
                id={resource.id}
                title={resource.title}
                description={resource.description}
                image={resource.image}
                authors={resource.authors ? resource.authors : []}
                type={resource.type}
              />
            </article>
          ))}
      </Paginator>
    ) : (
      <Loader />
    );
    return (
      <div className="search">
        <h1>Search</h1>
        <div className="search__options">
          <Input
            id="search"
            placeholder="Search"
            onChange={this.props.onSearch}
            type="text"
            control="input"
          />
          <label htmlFor="type_selector">Type: </label>
          <select
            id="type_selector"
            value={this.props.filterBy}
            onChange={this.props.onChange}
          >
            <option value="all">All</option>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="game">Game</option>
          </select>
          <div>{searchResults}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    res: state.search.res,
    query: state.search.query,
    loading: state.search.loading,
    totalResources: state.search.totalResources,
    resourcePage: state.search.resourcePage,
    filterBy: state.search.filterBy,
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
    onSearch: (id, value, direction, page) =>
      dispatch(actions.onSearch(id, value, direction, page)),
    onChange: event => dispatch(actions.handleFilter(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
