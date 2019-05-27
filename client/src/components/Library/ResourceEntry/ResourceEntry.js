import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../Image/Image';

import './ResourceEntry.css';

const resourceEntry = props => {
  let authors = null;
  if (props.authors.length !== 0) {
    authors = (
      <h4 className="entry__author">
        by {props.authors.map(author => author)}
      </h4>
    );
  }
  return (
    <article className="entry">
      <div className="entry__image">
        <Link to={`/resource/${props.type}/${props.id}`}>
          <Image imageUrl={props.image} contain left />
        </Link>
      </div>
      <div className="entry__content">
        <h3 className="entry__title">
          <Link to={`/resource/${props.type}/${props.id}`}>{props.title}</Link>
        </h3>
        {authors}
        <div className="entry__ratings">
          <div className="entry__rating">
            <i className="fas fa-star" />7
          </div>
          <div className="entry__rating">
            <i className="far fa-star" />-
          </div>
        </div>
        <div className="entry__description">{props.description}</div>
      </div>
    </article>
  );
};

export default resourceEntry;
