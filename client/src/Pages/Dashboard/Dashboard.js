import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardMenu from './DashboardMenu'
import EducationList from './EducationList'
import ExperienceList from './ExperienceList'
import { getCurrentProfile, deleteAccount } from '../../redux/Actions/profileActions'

const Dashboard = (props) => {
    const { auth: { user }, profile: { profile }, getCurrentProfile, deleteAccount } = props;

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <>
            <h1 className="large text-primary">
                Dashboard
      </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>

            {profile !== null ? (
                <>
                    <DashboardMenu />
                    <ExperienceList experience={profile.experience} />
                    <EducationList education={profile.education} />

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus" /> Delete My Account
            </button>
                    </div>
                </>
            ) : (
                    <>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
          </Link>
                    </>
                )}



        </>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile

});

const mapActionsToProps = {
    getCurrentProfile,
    deleteAccount
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
