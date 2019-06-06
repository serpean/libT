import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Image from '../../Image/Image';
import Button from '../../Button/Button';
import ResourceButton from '../../Button/ResourceButton/ResourceButton';
import Loader from '../../Loader/Loader';

import './ResourceEntry.css';

class ResourceEntry extends Component {
  state = {
    actualState: null,
    loadingStatus: false,
    lists: []
  };

  async componentDidMount() {
    this.setState({ loadingStatus: true });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/info/status/${this.props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status !== 200 && res.status !== 201 && res.status !== 304) {
        throw new Error('Error!');
      }
      const resData = await res.json();
      this.setState({
        actualState: resData.status,
        lists: resData.lists.map(list => list._id),
        loadingStatus: false
      });
    } catch (err) {
      console.log(err);
    }
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
        id: this.props.id,
        searchId: this.props.id,
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
    let authors =
      this.props.authors.length !== 0 ? (
        <h4 className="entry__author">
          by {this.props.authors.map(a => ` ${a}`)}
        </h4>
      ) : null;
    const resourceButton = this.state.loadingStatus ? (
      <Loader />
    ) : (
      <ResourceButton
        mode="flat"
        lists={this.state.lists}
        actualState={this.state.actualState}
        onClick={this.resourceHandler.bind(this)}
      />
    );
    return (
      <div className="entry">
        <div className="entry__image">
          <Link to={`/resource/${this.props.type}/${this.props.id}`}>
            <Image imageUrl={this.props.image} />
          </Link>
        </div>
        <div className="entry__content">
          <div>Type: {this.props.type}</div>
          <h3 className="entry__title">
            <Link to={`/resource/${this.props.type}/${this.props.id}`}>
              {this.props.title}
            </Link>
          </h3>
          {authors}
          <div className="entry__status">
            {resourceButton}
            <div className="entry__ratings">
              <div className="entry__rating">
                <i className="fas fa-star" />7
              </div>
              <div className="entry__rating">
                <i className="far fa-star" />-
              </div>
            </div>
          </div>
          <div className="entry__description">
            <div className="entry__description-content">
              {this.props.description}
            </div>
            <div className="entry__description-more">
              <Button
                design="flat"
                mode="none"
                link={`/resource/${this.props.type}/${this.props.id}`}
              >
                Show more +
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceEntry;

// <main className="post__main">
// <div className="post__image">
//   <Link to={`/resource/${this.props.type}/${this.props.searchId}`}>
//     <Image imageUrl={this.props.image} contain left />
//   </Link>
// </div>
// <div className="post__content">
//   <h1 className="post__title">
//     <Link to={`/resource/${this.props.type}/${this.props.searchId}`}>
//       {this.props.title}
//     </Link>
//   </h1>
//   <h2 className="post__author">{authors}</h2>

//   <div className="post__description">
//     <div className="post__description-content">
//       {this.props.content}
//     </div>
//     <div className="post__description-more">
//     <Button
//       design="flat"
//       mode="none"
//       link={`/resource/${this.props.type}/${this.props.searchId}`}
//     >
//       Show more +
//     </Button>
//     </div>
//   </div>
// </div>
// </main>
