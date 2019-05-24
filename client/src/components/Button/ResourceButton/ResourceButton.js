import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import '../Button.css';
import './ResourceButton.css';

const listName = ['Want it', 'Want it', 'In progress', 'Done'];

const resourceButton = props => {
  let lists = null;

  if (props.wantList && props.inProgressList && props.doneList) {
    lists = (
      <Fragment>
        <li
          key={props.wantList._id}
          onClick={() => props.onClick(props.wantList._id)}
        >
          {props.wantList.name}
        </li>
        <li
          key={props.inProgressList._id}
          onClick={() => props.onClick(props.inProgressList._id)}
        >
          {props.inProgressList.name}
        </li>
        <li
          key={props.doneList._id}
          onClick={() => props.onClick(props.doneList._id)}
        >
          {props.doneList.name}
        </li>
        <hr />
        {props.extraLists.map(item => (
          <li key={item._id} onClick={() => props.onClick(item._id)}>
            {item.name}
          </li>
        ))}
      </Fragment>
    );
  }

  return (
    <div className="dropdown">
      <button
        className={[
          'button',
          `button--${props.design}`,
          `button--${props.mode}`
        ].join(' ')}
        disabled={props.disabled || props.loading}
      >
        {listName[props.actualState]}
      </button>
      <ul className="dropdown-content">{lists}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    doneList: state.library.doneList,
    wantList: state.library.wantList,
    inProgressList: state.library.inProgressList,
    extraLists: state.library.extraLists,
    error: state.library.error,
    loadingLists: state.library.loadingLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (username, listId) =>
      dispatch(actions.loadLists(username, listId)),
    onErrorHandler: () => dispatch(actions.errorHandler())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resourceButton);
