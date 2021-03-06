import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../../input';
import {login} from '../actions/auth';
import { registerUser } from "../actions/users";
import {Link} from 'react-router-dom';
import { required, nonEmpty, matches, length, isTrimmed } from "../../validators";
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");



export class RegistrationForm extends React.Component {
    onSubmit(values) {
      const { username, password, firstName, lastName, height } = values;
      const user = { username, password, firstName, lastName, height };
      return this.props
        .dispatch(registerUser(user))
        .then(() => this.props.dispatch(login(username, password)));
    }
  
    render() {
      return (
        <form
          className="register-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="links-container">
          <Link className="link-to-register-on-register" to="/register">
              <button type="button">Register</button>
            </Link>
            <Link className="link-to-login" to="/">
              <button type="button">Login</button>
            </Link>
          </div>
          <h1>Register</h1>
          <div className="fields-container">
            <label htmlFor="firstName">First name</label>
            <Field
              component={Input}
              type="text"
              name="firstName"
            />
            <label htmlFor="lastName">Last name</label>
            <Field component={Input} type="text" name="lastName" id="lastName" />
            <label htmlFor="username">Username</label>
            <Field
              component={Input}
              type="text"
              name="username"
              validate={[required, nonEmpty, isTrimmed]}
            />
            <label htmlFor="password">Password</label>
            <Field
              component={Input}
              type="password"
              name="password"
              validate={[required, passwordLength, isTrimmed]}
            />
            <label htmlFor="passwordConfirm">Confirm password</label>
            <Field
              component={Input}
              type="password"
              name="passwordConfirm"
              validate={[required, nonEmpty, matchesPassword]}
            />
            <button
              className="submit-bttn-register"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Register
            </button>
          </div>
        </form>
      );
    }
  }
  export default reduxForm({
    form: "registration",
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus("registration", Object.keys(errors)[0]))
  })(RegistrationForm);
  