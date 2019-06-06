import React from './node_modules/react';

import './Post.css';
import ResourceEntry from '../../Library/ResourceEntry/ResourceEntry';

const action = ['quiere', 'quiere', 'está', 'terminó'];
const actionType = {
  book: ['leer', 'leer', 'leyendo', 'de leer'],
  movie: ['ver', 'ver', 'viendo', 'de ver'],
  game: ['jugar', 'jugar', 'jugando', 'de jugar']
};

const post = props => {
  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          {props.name} {action[props.action]}{' '}
          {actionType[props.type] ? actionType[props.type][props.action] : ''}
          <div className="post__date">{props.date}</div>
        </h3>
      </header>
      <main className="post__main">
        <ResourceEntry
          key={props.searchId}
          id={props.searchId}
          title={props.title}
          description={props.content}
          image={props.image}
          authors={props.authors}
          type={props.type}
        />
      </main>
      <div className="post__actions">{/*TODO: Commentarios*/}</div>
    </article>
  );
};

export default post;
