import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../redux/Actions/alertActions'
import { registerUser } from '../../redux/Actions/authActions'
import PropTypes from 'prop-types'


const Register = (props) => {

    const { setAlert, registerUser } = props;
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value,
        }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.password !== values.confirmPassword) {
            setAlert('Confirm password did not match! ', 'danger')
        } else {
            registerUser(values);
        }


    }


    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    )
}

{/* const mapStateToProps = (state) => ({

}); */}

const mapActionsToProps = {
    setAlert,
    registerUser
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
}

export default connect(null, mapActionsToProps)(Register)
