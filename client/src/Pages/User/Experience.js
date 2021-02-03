import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/Actions/profileActions';

const initialValues = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
}
const Experience = ({ addExperience, history }) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values)
        addExperience(values, history);

    }

    return (
        <>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={values.company}
                        onChange={handleChange}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={values.from} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={values.current}
                            value={values.current}
                            onChange={() => {
                                setValues({ ...values, current: !values.current });
                            }}
                        />{' '}
            Current Job
          </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={values.to}
                        onChange={handleChange}
                        disabled={values.current}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={values.description}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
        </Link>
            </form>

        </>
    )
}
Experience.propTypes = {
    addExperience: PropTypes.func.isRequired
};
const mapActionsToProps = {
    addExperience
}

export default connect(null, mapActionsToProps)(Experience)
