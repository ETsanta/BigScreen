import React from 'react';
import '@/css/Progress.less';

const ProgressBar = ({ percentage=0, context="" }) => {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}>
                {
                    percentage > 50 &&
                    (<span className="progress-text">{`${percentage}% ${context}`}</span>)
                }
            </div>
            {
                percentage <= 50 &&
                (<span className="progress-bar-text">{`${percentage}% ${context}`}</span>)
            }
        </div>
    );
};

export default ProgressBar;