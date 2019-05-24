import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import ResourceButton from '../../components/Button/ResourceButton/ResourceButton';

import './Resource.css';

const mockLibrary = [
  { link: '/', text: 'Lo quiero' },
  { link: '/', text: 'En proceso' },
  { link: '/', text: 'Terminado' }
];

class Resource extends Component {
  state = {
    id: null,
    type: null,
    title: null,
    authors: [],
    description: null,
    moreDescription: false,
    image: null
  };
  componentDidMount() {
    this.loadResource();
    this.props.onLoadLists(this.props.userId);
    console.log(this.props.status);
    this.props.onLoadStatus();
  }
  componentDidUpdate() {
    const id = this.props.match.params.id;
    if (this.state.id !== id) {
      this.loadResource();
      this.props.onLoadLists(this.props.userId);
      this.props.onLoadStatus();
    }
  }

  loadResource() {
    const type = this.props.match.params.type;
    const searchId = this.props.match.params.id;
    const id = searchId.split('__')[0];
    console.log(id);
    this.setState({ type: type, id: searchId });
    fetch(`http://localhost:3030/${type}/${id}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201 && res.status !== 304) {
          throw new Error('Error!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.response) {
          this.setState({
            title: resData.title,
            image: resData.image,
            authors: resData.authors,
            description: resData.description,
            loading: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  readMoreHandler(update) {
    this.setState({ moreDescription: !update });
  }

  infoHandler(listId) {
    const token = localStorage.getItem('token');
    fetch(`/api/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        listId: listId,
        id: this.state.id,
        type: this.state.type,
        title: this.state.title,
        description: this.state.description
      })
    });
  }

  render() {
    let authors = null;
    if (this.state.authors.length > 0) {
      authors = 'by ' + this.state.authors.map(a => ` ${a}`);
    }
    return (
      <div className="resource">
        <div className="resource-img">
          <img
            className="resource-img__img"
            src={
              this.state.image !== 'N/A'
                ? this.state.image
                : 'http://www.clker.com/cliparts/t/r/j/z/w/i/no-camera-allowed-hi.png'
            }
            alt={this.state.title}
          />
          <ResourceButton
            mode="flat"
            actualState={this.props.status}
            onClick={this.infoHandler.bind(this)}
          />
        </div>

        <div className="resource-content">
          <div className="resource-content__type">Type: {this.state.type}</div>
          <h1 className="resource-content__title">{this.state.title}</h1>
          <div className="resource-content__authors">{authors}</div>
          <div
            className={[
              'resource-content__description',
              this.state.moreDescription ? 'expanded' : null
            ].join(' ')}
          >
            {this.state.description}
          </div>

          {this.state.description && this.state.description.length > 250 ? (
            <Button
              onClick={() => this.readMoreHandler(this.state.moreDescription)}
            >
              {this.state.moreDescription ? 'Show less -' : 'Show more +'}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    doneList: state.library.doneList,
    wantList: state.library.wantList,
    inProgressList: state.library.inProgressList,
    extraLists: state.library.extraLists,
    error: state.library.error,
    loadingLists: state.library.loadingLists,
    status: state.resource.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (username, listId) =>
      dispatch(actions.loadLists(username, listId)),
    onErrorHandler: () => dispatch(actions.errorHandler()),
    onLoadStatus: () => dispatch(actions.getResourceStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resource);
