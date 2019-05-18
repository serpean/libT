import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
import { required, length } from '../../../util/validators';
import * as actions from '../../../store/actions/index';

const LIBRARY_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  description: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  public: {
    value: true,
    valid: true,
    touched: true,
    validators: []
  }
};

class FeedEdit extends Component {
  state = {
    libraryForm: LIBRARY_FORM,
    formIsValid: false,
    imagePreview: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      this.props.editList &&
      prevProps.editing !== this.props.editing &&
      prevProps.editList !== this.props.editList
    ) {
      const libraryForm = {
        title: {
          ...prevState.libraryForm.title,
          value: this.props.editList.name,
          valid: true
        },
        description: {
          ...prevState.libraryForm.description,
          value: this.props.editList.description,
          valid: true
        },
        public: {
          ...prevState.libraryForm.public,
          value: this.props.editList.public,
          valid: true
        }
      };
      this.setState({ libraryForm: libraryForm, formIsValid: true });
    }
  }

  libraryInputChangeHandler = (input, value) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.libraryForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.libraryForm,
        [input]: {
          ...prevState.libraryForm[input],
          valid: isValid,
          value: value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        libraryForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  libraryCheckboxChangeHandler = (input, value) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.libraryForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.libraryForm,
        [input]: {
          ...prevState.libraryForm[input],
          valid: isValid,
          value: !prevState.libraryForm[input].value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        libraryForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        libraryForm: {
          ...prevState.libraryForm,
          [input]: {
            ...prevState.libraryForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelLibraryChangeHandler = () => {
    this.setState({
      libraryForm: LIBRARY_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptLibraryChangeHandler = () => {
    const library = {
      title: this.state.libraryForm.title.value,
      description: this.state.libraryForm.description.value,
      public: this.state.libraryForm.public.value
    };
    this.props.onFinishEdit(library, this.props.editList, this.props.token);
    this.setState({
      libraryForm: LIBRARY_FORM,
      formIsValid: false
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelLibraryChangeHandler} />
        <Modal
          title="New Library"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelLibraryChangeHandler}
          onAcceptModal={this.acceptLibraryChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.libraryInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'title')}
              valid={this.state.libraryForm['title'].valid}
              touched={this.state.libraryForm['title'].touched}
              value={this.state.libraryForm['title'].value}
            />
            <Input
              id="description"
              label="Descripción"
              control="textarea"
              rows="5"
              onChange={this.libraryInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'description')}
              valid={this.state.libraryForm['description'].valid}
              touched={this.state.libraryForm['description'].touched}
              value={this.state.libraryForm['description'].value}
            />
            <div>
              <Input
                id="public"
                name="public"
                label="Público"
                control="checkbox"
                type="checkbox"
                checked={this.state.libraryForm['public'].value}
                onChange={this.libraryCheckboxChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, 'public')}
                valid={this.state.libraryForm['public'].valid}
                touched={this.state.libraryForm['public'].touched}
                value={this.state.libraryForm['public'].value}
              />
            </div>
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    editing: state.library.isEditing,
    loading: state.library.editLoading,
    editList: state.library.editList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFinishEdit: (list, editList, token) =>
      dispatch(actions.finishEditHandler(list, editList, token)),
    onCancelEdit: () => dispatch(actions.cancelEditHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedEdit);
