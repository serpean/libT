import React, { Fragment } from 'react';
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
        {props.actualState === 1 ? null : (
          <li
            key={props.wantList._id}
            onClick={() => props.onClick(props.wantList._id)}
          >
            {props.wantList.name}
          </li>
        )}
        {props.actualState === 2 ? null : (
          <li
            key={props.inProgressList._id}
            onClick={() => props.onClick(props.inProgressList._id)}
          >
            {props.inProgressList.name}
          </li>
        )}
        {props.actualState === 3 ? null : (
          <li
            key={props.doneList._id}
            onClick={() => props.onClick(props.doneList._id)}
          >
            {props.doneList.name}
          </li>
        )}
        {props.extraLists.map((item, index) => (
          <Fragment key={index}>
            {index === 0 ? <hr /> : null}
            <li key={item._id} onClick={() => props.onClick(item._id)}>
              {props.lists.indexOf(item._id) !== -1 ? (
                <i
                  className="far fa-check-circle"
                  style={{ marginRight: '0.5rem' }}
                />
              ) : (
                <i
                  className="far fa-check-circle"
                  style={{ color: '#ccc', marginRight: '0.5rem' }}
                />
              )}
              {item.name}
            </li>
          </Fragment>
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
          `button--${props.mode}`,
          `status--${props.actualState}`
        ].join(' ')}
        disabled={props.disabled || props.loading}
        onClick={() => props.onClick(props.wantList._id)}
      >
        {listName[props.actualState]}{' '}
        {props.actualState !== 0 ? (
          <i className="far fa-check-circle" style={{ marginLeft: '0.5rem' }} />
        ) : null}
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
    loadingLists: state.library.loadingLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLists: (username, listId) =>
      dispatch(actions.loadLists(username, listId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resourceButton);
