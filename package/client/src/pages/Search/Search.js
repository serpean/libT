import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import ResourceEntry from '../../components/Library/ResourceEntry/ResourceEntry';

const search = props => {
  return (
    <div>
      <h1>Search</h1>
      <div>
        <Input
          id="search"
          placeholder="Search"
          onChange={props.onSearch}
          type="text"
          control="input"
          value={props.match.params.query}
        />
      </div>
      <div>
        {!props.loading && (
          <Paginator
            onNext={props.onSearch.bind(
              this,
              null,
              props.query,
              'more',
              props.resourcePage
            )}
            lastPage={Math.ceil(props.totalResources / 10)}
            currentPage={props.resourcePage}
          >
            {props.res.map(resource => (
              <ResourceEntry
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                image={resource.image}
                authors={resource.authors ? resource.authors : []}
                type={resource.type}
              />
            ))}
          </Paginator>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    res: state.search.res,
    query: state.search.query,
    loading: state.search.loading,
    totalResources: state.search.totalResources,
    resourcePage: state.search.resourcePage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: (id, value, direction, page) =>
      dispatch(actions.onSearch(id, value, direction, page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(search);
