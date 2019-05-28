import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Button from '../../Button/Button';

import './LibraryMenu.css';
const library = props => {
  return (
    <div className="sideNav">
      <ul className="sideNav-list">
        <li>
          <h2>Libraries</h2>
        </li>
        <li key={props.wantList._id} className="sideNav__link">
          <Link to={`/library/${props.userId}/${props.wantList._id}`}>
            {props.wantList.name}
          </Link>
        </li>
        <li key={props.inProgressList._id} className="sideNav__link">
          <Link to={`/library/${props.userId}/${props.inProgressList._id}`}>
            {props.inProgressList.name}
          </Link>
        </li>
        <li key={props.doneList._id} className="sideNav__link">
          <Link to={`/library/${props.userId}/${props.doneList._id}`}>
            {props.doneList.name}
          </Link>
        </li>
        <hr />
        <li>
          <Button design="success" onClick={() => props.addList(props.token)}>
            + New
          </Button>
        </li>
        {props.extraLists.map(list => {
          return (
            <li key={list._id} className="sideNav__link">
              <Link to={`/library/${props.userId}/${list._id}`}>
                {list.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    wantList: state.library.wantList,
    inProgressList: state.library.inProgressList,
    doneList: state.library.doneList,
    extraLists: state.library.extraLists,
    actualList: state.library.actualList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getList: listId => dispatch(actions.loadList(listId)),
    addList: () => dispatch(actions.newLibraryHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(library);
