import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../Image/Image';

import './ResourceEntry.css';

const resourceEntry = props => {
  return (
    <article className="entry">
      <div className="entry__image">
        <Link to={props.id}>
          <Image
            imageUrl="https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png"
            contain
            left
          />
        </Link>
      </div>
      <div className="entry__content">
        <h3 className="entry__title">
          <Link to={props.id}>Titulo</Link>
        </h3>
        <h4 className="entry__author">por Autor</h4>
        <div className="entry__ratings">
          <div className="entry__rating">
            <i className="fas fa-star" />7
          </div>
          <div className="entry__rating">
            <i className="far fa-star" />-
          </div>
        </div>
        <div>Description</div>
      </div>
    </article>
  );
};

export default resourceEntry;
