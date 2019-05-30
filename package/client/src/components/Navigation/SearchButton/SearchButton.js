import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Input from '../../Form/Input/Input';
import Loader from '../../Loader/Loader';

import './SearchButton.css';

class SearchButton extends Component {
  state = {
    res: [],
    loading: false
  };
  onChange = (data, value) => {};

  render() {
    let results = null;
    if (this.props.loading) {
      results = (
        <ul className="search-dropdown-content">
          <li className="saerch-dropdown-content__loader" key="loader">
            <Loader />
          </li>
          <li className="search-dropdown-content__search" key="search">
            <Link to={`/search/${this.props.query}`}>
              See all results for {this.props.query}
            </Link>
          </li>
        </ul>
      );
    } else if (this.props.res.length !== 0) {
      results = (
        <ul className="search-dropdown-content">
          {this.props.res.map((item, index) => {
            return (
              <li key={`${item.type}_${item.id}`}>
                <Link to={`/resource/${item.type}/${item.id}`}>
                  <img
                    className="search-dropdown__img"
                    src={
                      item.image !== 'N/A'
                        ? item.image
                        : 'http://www.clker.com/cliparts/t/r/j/z/w/i/no-camera-allowed-hi.png'
                    }
                    alt={item.title}
                  />
                  <div className="search-dropdown__card">
                    <div className="search-dropdown__card-type">
                      Type {item.type}
                    </div>
                    <div className="search-dropdown__card-title">
                      {item.title}
                    </div>
                    {item.authors && item.authors.length >= 1 ? (
                      <div className="search-dropdown__card-authors">
                        by{' '}
                        {item.authors.map((a, index) =>
                          index !== item.authors.length - 1 ? `${a}, ` : a
                        )}
                      </div>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}

          <li className="search-dropdown-content__search" key="search">
            <Link to={`/search/${this.props.query}`}>
              See all results for "{this.props.query}"
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <li className="navigation-item search-dropdown" key="search">
        <Input
          id="search"
          placeholder="Search"
          onChange={this.props.onChange}
          type="text"
          control="input"
        />
        {results}
      </li>
    );
  }
}
const mapStateToProps = state => {
  return {
    res: state.search.res,
    query: state.search.query,
    loading: state.search.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (id, value) => dispatch(actions.onSearch(id, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchButton);
