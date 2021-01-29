import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div class="alert alert-danger">
                Invalid credentials
             </div>
            <h1 class="large text-primary">Sign In</h1>
            <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
            <form class="form" action="dashboard.html">
                <div class="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </form>
            <p class="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

        </>
    )
}

export default Login
