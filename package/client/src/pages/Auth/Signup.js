import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import * as actions from '../../store/actions/index';
import Auth from './Auth';

class Signup extends Component {
  state = {
    signupForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
      },
      username: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },
      formIsValid: false
    }
  };

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true
          }
        }
      };
    });
  };

  render() {
    return (
      <Auth>
        <h1>Signup</h1>
        <form onSubmit={e => this.props.onSignup(e, this.state)}>
          <Input
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'email')}
            value={this.state.signupForm['email'].value}
            valid={this.state.signupForm['email'].valid}
            touched={this.state.signupForm['email'].touched}
          />

          <Input
            id="username"
            label="Your Username"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'username')}
            value={this.state.signupForm['username'].value}
            valid={this.state.signupForm['username'].valid}
            touched={this.state.signupForm['username'].touched}
          />
          <Input
            id="name"
            label="Your Name"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'name')}
            value={this.state.signupForm['name'].value}
            valid={this.state.signupForm['name'].valid}
            touched={this.state.signupForm['name'].touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'password')}
            value={this.state.signupForm['password'].value}
            valid={this.state.signupForm['password'].valid}
            touched={this.state.signupForm['password'].touched}
          />

          <div className="auth-form__controls">
            <Button design="raised" type="submit" loading={this.props.loading}>
              Signup
            </Button>
          </div>
        </form>
      </Auth>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSignup: (event, authData) => {
      event.preventDefault();
      const params = {
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        username: authData.signupForm.username.value,
        name: authData.signupForm.name.value,
        isSignUp: false
      };
      dispatch(actions.auth(params));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
