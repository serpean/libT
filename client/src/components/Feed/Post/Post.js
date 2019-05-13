import React from 'react';

import Button from '../../Button/Button';
import Image from '../../Image/Image';
import './Post.css';

const action = ['quiere', 'está', 'terminó'];
const actionType = {
  book: ['leer', 'leyendo', 'de leer'],
  movie: ['ver', 'viendo', 'de ver'],
  game: ['jugar', 'jugando', 'de jugar']
};

const post = props => (
  <article className="post">
    <header className="post__header">
      <h3 className="post__meta">
        {props.author} {action[props.action]}{' '}
        {actionType[props.type] ? actionType[props.type][props.action] : ''} el{' '}
        {props.date}
      </h3>
      <h1 className="post__title">{props.title}</h1>
    </header>
    <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div>
    <div className="post__actions">
      <Button mode="flat" link={props.id}>
        View
      </Button>
    </div>
  </article>
);

export default post;
