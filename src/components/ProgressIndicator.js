import React from 'react';
import { range } from '../util';

const ProgressIndicator = ({ progress }) => {
    const { blockNumber, blockCount, trialNumber, trialCount } = progress;
    return (
        <div className="progress-indicator">
            <div className="label">
                {trialNumber} of {trialCount} in this block
            </div>
            <div className="bar">
                {range(1, blockCount).map((block) => {
                    let progress;
                    if (block === blockNumber) {
                        progress = trialNumber / trialCount;
                    } else {
                        progress = block > blockNumber ? 0 : 1;
                    }
                    return (
                        <div className="block" key={block}>
                            <div
                                className="block-progress"
                                style={{ width: `${100 * progress}%` }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressIndicator;
