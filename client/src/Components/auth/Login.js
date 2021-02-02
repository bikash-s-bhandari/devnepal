import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../redux/Actions/alertActions'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/Actions/authActions'
import PropTypes from 'prop-types'

const Login = (props) => {
    const { setAlert, loginUser, isAuthenticated } = props;
    console.log('auth', isAuthenticated)
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value,
        }));


    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.email == '') {
            setAlert('Please enter email! ', 'danger')
        } else if (values.password == '') {

        } else {
            loginUser(values);

        }

    }

    //redirect of login
    if (isAuthenticated) {
        return < Redirect to="/dashboard" />
    }
    return (
        <>

            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}


                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}

                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

        </>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

});
const mapActionsToProps = {
    setAlert,
    loginUser
};



export default connect(mapStateToProps, mapActionsToProps)(Login)
