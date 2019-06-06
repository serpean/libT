import React, { Component } from './node_modules/react';
import { connect } from './node_modules/react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../Components/Button/Button';
import Loader from '../../Components/Loader/Loader';
import Image from '../../Components/Image/Image';
import ResourceButton from '../../Components/Button/ResourceButton/ResourceButton';

import './Resource.css';

class Resource extends Component {
  state = {
    moreDescription: false,
    resourceLoad: false
  };
  componentDidMount() {
    const type = this.props.match.params.type;
    const searchId = this.props.match.params.id;
    this.props.onLoadResource(type, searchId);
    this.props.onLoadLists(this.props.userId);
    this.props.onLoadStatus(this.props.match.params.id);
  }
  componentDidUpdate() {
    const searchId = this.props.match.params.id;
    if (searchId && this.props.id !== null && this.props.id !== searchId) {
      const type = this.props.match.params.type;
      this.props.onLoadResource(type, searchId);
      this.props.onLoadStatus(searchId);
      this.props.onLoadLists(this.props.userId);
    }
  }

  readMoreHandler(update) {
    this.setState({ moreDescription: !update });
  }

  resourceHandler(listId) {
    const token = localStorage.getItem('token');
    fetch(`/api/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        listId: listId,
        id: this.props.id,
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
        this.props.onLoadStatus(this.props.id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let authors = null;
    if (this.props.authors.length > 0) {
      authors = 'by ' + this.props.authors.map(a => ` ${a}`);
    }
    let resourcePage = !this.props.loadingResource ? (
      this.props.title === null ? (
        <h1>Not resource found!</h1>
      ) : (
        <div className="resource">
          <div className="resource-img">
            <Image
              className="resource-img__img"
              imageUrl={
                this.props.image !== 'N/A'
                  ? this.props.image
                  : 'http://www.clker.com/cliparts/t/r/j/z/w/i/no-camera-allowed-hi.png'
              }
              alt={this.props.title}
            />
            {this.props.loadingStatus ? (
              <Loader />
            ) : (
              <ResourceButton
                mode="flat"
                actualState={this.props.status}
                lists={this.props.lists}
                onClick={this.resourceHandler.bind(this)}
              />
            )}
          </div>

          <div className="resource-content">
            <div className="resource-content__type">
              Type: {this.props.type}
            </div>
            <h1 className="resource-content__title">{this.props.title}</h1>
            <div className="resource-content__authors">{authors}</div>
            <div
              className={[
                'resource-content__description',
                this.state.moreDescription ? 'expanded' : null
              ].join(' ')}
            >
              {this.props.description}
            </div>

            {this.props.description && this.props.description.length > 250 ? (
              <div className="align-rigth">
                <Button
                  mode="flat"
                  onClick={() =>
                    this.readMoreHandler(this.state.moreDescription)
                  }
                >
                  {this.state.moreDescription ? 'Show less -' : 'Show more +'}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )
    ) : (
      <Loader />
    );
    return resourcePage;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    status: state.resource.status,
    lists: state.resource.lists,
    id: state.resource.id,
    type: state.resource.type,
    title: state.resource.title,
    authors: state.resource.authors,
    image: state.resource.image,
    description: state.resource.description,
    loadingResource: state.resource.loadingResource,
    loadingStatus: state.resource.loadingStatus,
    error: state.common.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (username, listId) =>
      dispatch(actions.loadLists(username, listId)),
    onLoadStatus: resourceId => dispatch(actions.getResourceStatus(resourceId)),
    onLoadResource: (type, resourceId) =>
      dispatch(actions.loadResource(type, resourceId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resource);
