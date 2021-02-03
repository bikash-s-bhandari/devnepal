import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile, createProfile } from '../../redux/Actions/profileActions'
const initialValue = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
};

const ProfileForm = (props) => {
    const history = useHistory();
    const { profile: { profile, loading }, getCurrentProfile, createProfile } = props;
    const [values, setValues] = useState(initialValue);
    const [displaySocialInputs, toggleSocialInputs] = useState(false);



    useEffect(() => {
        if (!profile) {
            getCurrentProfile();
        }
        if (!loading && profile) {
            const profileData = { ...initialValue };
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }

            for (const key in profile.social) {
                if (key in profileData) profileData[key] = profile.social[key];
            }
            if (Array.isArray(profileData.skills)) {
                profileData.skills = profileData.skills.join(', ');

            }
            setValues(profileData);

        }


    }, [profile, loading, getCurrentProfile])

    console.log('profile', profile)



    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('values', values)
        createProfile(values, history, profile ? true : false);


    }


    return (
        <>
            <h1 className="large text-primary">
                Edit Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <select name="status" value={values.status} onChange={handleChange}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={values.company}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={values.website}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={values.skills}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={values.githubusername}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
            username</small
                    >
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                    ></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                        Add Social Network Links
          </button>
                    <span>Optional</span>
                </div>
                {
                    displaySocialInputs && (
                        <>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Twitter URL"
                                    name="twitter"
                                    value={values.twitter}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Facebook URL"
                                    name="facebook"
                                    value={values.facebook}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="YouTube URL"
                                    name="youtube"
                                    value={values.youtube}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Linkedin URL"
                                    name="linkedin"
                                    value={values.linkedin}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input type="text" placeholder="Instagram URL" name="instagram" />
                            </div>



                        </>




                    )


                }


                <input type="submit" value="Update" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>

        </>
    )
}


ProfileForm.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    profile: state.profile

});

const mapActionsToProps = {
    getCurrentProfile,
    createProfile

}

export default connect(mapStateToProps, mapActionsToProps)(ProfileForm)
