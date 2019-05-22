import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Form/Input/Input';
import Loader from '../../Loader/Loader';

import './SearchButton.css';

class SearchButton extends Component {
  state = {
    res: [],
    loading: false
  };
  onChange = (data, value) => {
    this.setState({ res: [] });
    if (value.length >= 3) {
      this.setState({ loading: true });
      fetch(`http://localhost:3030/?name=${value}`)
        .then(res => {
          if (res.status !== 200 && res.status !== 201 && res.status !== 301) {
            throw new Error('Could not authenticate you!');
          }
          return res.json();
        })
        .then(resData => {
          if (resData.response) {
            this.setState({ res: resData.search, loading: false });
          }
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    let results = null;
    if (this.state.loading)
      results = (
        <ul className="search-dropdown-content">
          <li className="saerch-dropdown-content__loader" key="loader">
            <Loader />
          </li>
        </ul>
      );
    if (this.state.res.length !== 0) {
      results = (
        <ul className="search-dropdown-content">
          {this.state.res.map((item, index) => {
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
        </ul>
      );
    }
    return (
      <li className="navigation-item search-dropdown" key="search">
        <Input
          id="search"
          placeholder="Search"
          onChange={this.onChange}
          type="text"
          control="input"
        />
        {results}
      </li>
    );
  }
}

export default SearchButton;
