import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

import * as actions from '../../store/actions/index';

const errorHandler = props => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p>{props.error.message}</p>
      </Modal>
    )}
  </Fragment>
);

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandle: () => dispatch(actions.errorHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler);
