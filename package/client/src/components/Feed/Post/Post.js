import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import ResourceButton from '../../Button/ResourceButton/ResourceButton';
import Image from '../../Image/Image';
import './Post.css';

const action = ['quiere', 'está', 'terminó'];
const actionType = {
  book: ['leer', 'leyendo', 'de leer'],
  movie: ['ver', 'viendo', 'de ver'],
  game: ['jugar', 'jugando', 'de jugar']
};

const post = props => {
  const resourceHandler = listId => {
    const token = localStorage.getItem('token');
    fetch(`/api/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        listId: listId,
        id: props.id,
        type: props.type,
        title: props.title,
        description: props.description,
        image: props.image
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201 && res.status !== 304) {
          throw new Error('Error!');
        }
        this.props.onLoadStatus(this.props.id);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          {props.name} {action[props.action]}{' '}
          {actionType[props.type] ? actionType[props.type][props.action] : ''}{' '}
          el {props.date}
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
            actualState={props.actualState}
            onClick={resourceHandler.bind(this)}
          />
          <div className="post__description">{props.content}</div>
        </div>
      </main>
      <div className="post__actions">{/*TODO: Commentarios*/}</div>
    </article>
  );
};

const mapStateToProps = state => {
  return {
    loadingStatus: state.resource.loadingStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadStatus: resourceId => dispatch(actions.getResourceStatus(resourceId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(post);
