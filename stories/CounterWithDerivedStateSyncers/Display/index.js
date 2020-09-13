import React from 'react';
import { connect } from '../../../src';
import './style.scss';

const Display = ({ count, color }) => {
    console.log('rendered Display', { count, color });

    return (
        <div className="display" style={{ color }}>
            {count}
        </div>
    )
};

const mapStateToProps = ({ count, color }) => ({ count, color });

export default connect(mapStateToProps)(Display);