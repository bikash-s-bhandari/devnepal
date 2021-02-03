import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt="Loading..."
        />
        <p style={{ textAlign: 'center' }}> Unauthenticated,Please login! </p>
    </Fragment>
);

export default Spinner;
