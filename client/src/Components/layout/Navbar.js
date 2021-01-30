import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../redux/Actions/authActions'

const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {

    const authLinks = (
        <ul>
            <li>
                <a onClick={logoutUser} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>


        </ul>


    )

    const guestLinks = (
        <ul>
            <li>
                <a href="">Developers</a>

            </li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>

        </ul>


    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> Dev Nepal</Link>
            </h1>
            {!loading && (<>
                {isAuthenticated ? authLinks : guestLinks}
            </>)}

        </nav>
    )
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth

});

const mapActionsToProps = {

    logoutUser
};




export default connect(mapStateToProps, mapActionsToProps)(Navbar)
