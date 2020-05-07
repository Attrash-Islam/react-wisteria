import React, { Profiler } from 'react';
import _ from 'lodash';
import { connect } from '../../../src';
import './style.scss';

const callback = (id, phase, actualTime, baseTime, startTime, commitTime) => {
    console.log(`${id}'s ${phase} phase:`);
    console.log(`Actual time: ${actualTime}`);
    console.log(`Base time: ${baseTime}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
};

const Display = ({ count }) => {
    return (
        <Profiler id="DisplayPerformance" onRender={callback}>
            <div className="display">
                <table>
                    {_.range(100).map((i) => (
                        <tr key={i}>
                            {_.range(100).map((j) => (
                                <td key={j}>{count}</td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
        </Profiler>
    )
};

const mapStateToProps = ({ context }) => ({
    count: context.count
});

export default connect(mapStateToProps)(Display);