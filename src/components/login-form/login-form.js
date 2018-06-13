import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../../input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../../validators';
import './login-form.css';
import {Link} from 'react-router-dom';

export class LoginForm extends React.Component{
    onSubmit(values){
        return this.props.dispatch(login(values.username, values.password));

    }
    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return(
            <form
            className="login-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            {error}
            <div className="links-container">
            <Link className="link-to-login-on-login" to="/"><button type="button">Login</button></Link>
            <Link className="link-to-register" to="/register"><button type="button">Register</button></Link>
            </div>
            <h1>Login</h1>
            <br />
            <div className="fields-container">
            <label htmlFor="username">Username</label>
            <Field
            
                component={Input}
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                validate={[required, nonEmpty]}
            />
            <label htmlFor="password">Password</label>
            <Field
                component={Input}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                validate={[required, nonEmpty]}
            />
            <div className="testing-acc-info">Demo Account:
                <br/>
                <span>User:</span> testing / <span>Pass:</span> 1234567890
                </div>
            <button className="submit-bttn-login" type="submit" disabled={this.props.pristine || this.props.submitting}>
            Login
            </button>
            </div>
        </form>

        );
    }
}


export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
