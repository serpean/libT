import React, { Component, Fragment } from 'react';

import LibraryMenu from '../../components/Library/LibraryMenu/LibraryMenu';
import ResourceEntry from '../../components/Library/ResourceEntry/ResourceEntry';

import './Library.css';

class Library extends Component {
  render() {
    return (
      <Fragment className="page">
        <section className="libraries">
          <LibraryMenu />
        </section>
        <section className="actual-library">
          <header className="actual-library__header">
            <div className="actual-library__controls">
              <h1>Título</h1>
              <i className="fas fa-edit" />
              <i className="fas fa-trash-alt" />
            </div>
            <div>Description</div>
          </header>
          <ResourceEntry />
        </section>
      </Fragment>
    );
  }
}

export default Library;
