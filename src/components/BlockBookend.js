import React from 'react';

import { getOrdinalChoiceMap } from '../util';

import EchoVisualization from './EchoVisualization';
import { KeyboardTrigger, ContinueKey } from './KeyboardResponse';

const BlockBookend = ({ isEnd, blockNumber, blockCount, onFinish, azimuths }) => {
    if (isEnd) {
        if (blockNumber === blockCount) {
            return (
                <div className="text-content">
                    <h1>
                        Finished block {blockNumber} of {blockCount}
                    </h1>
                    <p>Nice work! Please do not close this browser tab yet.</p>
                    <p>
                        <ContinueKey handler={onFinish} />
                    </p>
                </div>
            );
        }
        const nextOrFinal = blockNumber + 1 === blockCount ? 'final' : 'next';
        return (
            <div className="text-content">
                <h1>
                    Finished block {blockNumber} of {blockCount}
                </h1>
                <p>
                    Nice work. Take a moment, and when you're ready, press{' '}
                    <KeyboardTrigger trigger="enter" handler={onFinish} /> to continue to the{' '}
                    {nextOrFinal} block.
                </p>
            </div>
        );
    }

    return (
        <EchoVisualization
            azimuthChoiceMap={getOrdinalChoiceMap(azimuths)}
            description={
                <>
                    <h1>
                        Block {blockNumber} of {blockCount}
                    </h1>
                    <p>
                        All of the sounds you'll hear in this block will come from this range of
                        angles. When you're ready, press{' '}
                        <KeyboardTrigger trigger="enter" handler={onFinish} /> to begin.
                    </p>
                </>
            }
        />
    );
};

export default BlockBookend;
