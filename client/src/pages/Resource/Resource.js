import React, { Component } from 'react';
import Button from '../../components/Button/Button';
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
  }
  componentDidUpdate() {
    const id = this.props.match.params.id.split('__')[0];
    if (this.state.id !== id) {
      this.loadResource();
    }
  }

  loadResource() {
    const type = this.props.match.params.type;
    const id = this.props.match.params.id.split('__')[0];
    this.setState({ type: type, id: id });
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
            actualState="Terminado"
            content={mockLibrary}
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

export default Resource;
