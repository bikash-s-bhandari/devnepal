import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/Actions/profileActions';


const initialValues = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
}
const Education = ({ addEducation, history }) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values)
        addEducation(values, history);

    }
    return (
        <>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any school or bootcamp that you
        have attended
      </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School"
                        name="school"
                        value={values.school}
                        onChange={handleChange}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree"
                        name="degree"
                        value={values.degree}
                        onChange={handleChange}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstudy"
                        value={values.fieldofstudy}
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
                            onChange={() => setValues({ ...values, current: !values.current })}
                        />{' '}
            Current School
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
                        placeholder="Program Description"
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

Education.propTypes = {
    addEducation: PropTypes.func.isRequired
};
const mapActionsToProps = {
    addEducation
}

export default connect(null, mapActionsToProps)(Education)
