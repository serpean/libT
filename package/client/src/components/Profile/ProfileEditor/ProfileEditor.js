import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
import FilePicker from '../../Form/Input/FilePicker';
import Image from '../../Image/Avatar';
import { generateBase64FromImage } from '../../../util/image';
import { required, length } from '../../../util/validators';
import * as actions from '../../../store/actions/index';

const PROFILE_FORM = {
  username: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 3 })]
  },
  name: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 3 })]
  },
  bio: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 3 })]
  },
  image: {
    value: true,
    valid: true,
    touched: true,
    validators: []
  }
};

class FeedEdit extends Component {
  state = {
    profileForm: PROFILE_FORM,
    formIsValid: false,
    imagePreview: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      this.props.editProfile &&
      prevProps.editing !== this.props.editing &&
      prevProps.editProfile !== this.props.editProfile
    ) {
      const profileForm = {
        username: {
          ...prevState.profileForm.username,
          value: this.props.editProfile.username,
          valid: true
        },
        name: {
          ...prevState.profileForm.name,
          value: this.props.editProfile.name,
          valid: true
        },
        bio: {
          ...prevState.profileForm.bio,
          value: this.props.editProfile.bio,
          valid: true
        },
        image: {
          ...prevState.profileForm.image,
          value: this.props.editProfile.imagePath,
          valid: true
        }
      };
      this.setState({ profileForm: profileForm, formIsValid: true });
    }
  }

  profileInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.profileForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.profileForm,
        [input]: {
          ...prevState.profileForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        profileForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        profileForm: {
          ...prevState.profileForm,
          [input]: {
            ...prevState.profileForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelProfileChangeHandler = () => {
    this.setState({
      profileForm: PROFILE_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptProfileChangeHandler = () => {
    const profile = {
      username: this.state.profileForm.username.value,
      name: this.state.profileForm.name.value,
      bio: this.state.profileForm.bio.value,
      image: this.state.profileForm.image.value
    };
    this.props.onFinishEdit(profile);
    this.setState({
      profileForm: PROFILE_FORM,
      formIsValid: false
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelProfileChangeHandler} />
        <Modal
          title="Edit profile"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelProfileChangeHandler}
          onAcceptModal={this.acceptProfileChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="username"
              label="Name"
              control="input"
              onChange={this.profileInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'username')}
              valid={this.state.profileForm['username'].valid}
              touched={this.state.profileForm['username'].touched}
              value={this.state.profileForm['username'].value}
            />
            <Input
              id="name"
              label="Name"
              control="input"
              onChange={this.profileInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'name')}
              valid={this.state.profileForm['name'].valid}
              touched={this.state.profileForm['name'].touched}
              value={this.state.profileForm['name'].value}
            />
            <Input
              id="bio"
              label="Bio"
              control="textarea"
              rows="5"
              onChange={this.profileInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'bio')}
              valid={this.state.profileForm['bio'].valid}
              touched={this.state.profileForm['bio'].touched}
              value={this.state.profileForm['bio'].value}
            />
            <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.profileInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'image')}
              valid={this.state.profileForm['image'].valid}
              touched={this.state.profileForm['image'].touched}
            />
            <div className="new-post__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image
                  src={this.state.imagePreview}
                  alt={this.state.profileForm['username'].value}
                />
              )}
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
    editing: state.profile.isEditing,
    loading: state.profile.editLoading,
    editProfile: state.profile.editProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFinishEdit: profile =>
      dispatch(actions.finishProfileEditHandler(profile)),
    onCancelEdit: () => dispatch(actions.cancelProfileEditHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedEdit);
