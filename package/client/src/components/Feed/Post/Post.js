import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ResourceButton from '../../Button/ResourceButton/ResourceButton';
import Image from '../../Image/Image';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import './Post.css';

const action = ['quiere', 'quiere', 'está', 'terminó'];
const actionType = {
  book: ['leer', 'leer', 'leyendo', 'de leer'],
  movie: ['ver', 'ver', 'viendo', 'de ver'],
  game: ['jugar', 'jugar', 'jugando', 'de jugar']
};

class Post extends Component {
  state = {
    actualState: null,
    loadingStatus: false,
    lists: []
  };

  componentDidMount() {
    this.setState({
      actualState: this.props.actualState,
      lists: this.props.lists
    });
  }

  resourceHandler = listId => {
    const token = localStorage.getItem('token');
    this.setState({ loadingStatus: true });
    fetch(`/api/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        listId: listId,
        id: this.props.searchId,
        type: this.props.type,
        title: this.props.title,
        description: this.props.description,
        image: this.props.image
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201 && res.status !== 304) {
          throw new Error('Error!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          actualState: resData.info.actualState,
          lists: resData.info.lists.map(list => list._id),
          loadingStatus: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let authors = null;
    if (this.props.authors.length > 0) {
      authors = 'by ' + this.props.authors.map(a => ` ${a}`);
    }

    return (
      <article className="post">
        <header className="post__header">
          <h3 className="post__meta">
            {this.props.name} {action[this.props.action]}{' '}
            {actionType[this.props.type]
              ? actionType[this.props.type][this.props.action]
              : ''}
            <div className="post__date">{this.props.date}</div>
          </h3>
        </header>
        <main className="post__main">
          <div className="post__image">
            <Link to={`/resource/${this.props.type}/${this.props.searchId}`}>
              <Image imageUrl={this.props.image} contain left />
            </Link>
          </div>
          <div className="post__content">
            <h1 className="post__title">
              <Link to={`/resource/${this.props.type}/${this.props.searchId}`}>
                {this.props.title}
              </Link>
            </h1>
            <h2 className="post__author">{authors}</h2>
            {this.state.loadingStatus ? (
              <Loader />
            ) : (
              <ResourceButton
                mode="flat"
                lists={this.state.lists}
                actualState={this.state.actualState}
                onClick={this.resourceHandler.bind(this)}
              />
            )}
            <div className="post__description">
              <div className="post__description-content">
                {this.props.content}
              </div>
              {this.props.content !== null ? (
                <div className="post__description-more">
                  <Button
                    design="flat"
                    mode="none"
                    link={`/resource/${this.props.type}/${this.props.searchId}`}
                  >
                    Show more +
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </main>
        <div className="post__actions">{/*TODO: Commentarios*/}</div>
      </article>
    );
  }
}

export default Post;
