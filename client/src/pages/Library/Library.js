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
          <header>
            <h1>
              Título <i class="fas fa-edit" />
              <i class="fas fa-trash-alt" />
            </h1>
            <div>Description</div>
          </header>
          <ResourceEntry />
        </section>
      </Fragment>
    );
  }
}

export default Library;
