import React from 'react';
import { Link } from 'react-router-dom';

import ResourceButton from '../../Button/ResourceButton/ResourceButton';
import Image from '../../Image/Image';
import './Post.css';

const action = ['quiere', 'está', 'terminó'];
const actionType = {
  book: ['leer', 'leyendo', 'de leer'],
  movie: ['ver', 'viendo', 'de ver'],
  game: ['jugar', 'jugando', 'de jugar']
};

const mockLibrary = [
  { link: '/', text: 'Lo quiero' },
  { link: '/', text: 'En proceso' },
  { link: '/', text: 'Terminado' }
];

const post = props => (
  <article className="post">
    <header className="post__header">
      <h3 className="post__meta">
        {props.name} {action[props.action]}{' '}
        {actionType[props.type] ? actionType[props.type][props.action] : ''} el{' '}
        {props.date}
      </h3>
    </header>
    <main className="post__main">
      <div className="post__image">
        <Link to={props.id}>
          <Image imageUrl={props.image} contain left />
        </Link>
      </div>
      <div className="post__content">
        <h1 className="post__title">
          <Link to={props.id}>{props.title}</Link>
        </h1>
        <h2 className="post__author">por {props.author}</h2>
        <ResourceButton
          mode="flat"
          actualState="Terminado"
          content={mockLibrary}
        />
        <div className="post__description">{props.content}</div>
      </div>
    </main>
    <div className="post__actions">{/*TODO: Commentarios*/}</div>
  </article>
);

export default post;
