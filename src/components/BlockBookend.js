import React, { useState } from 'react';

import { getBlockBookendFilesForCenterAzimuth } from '../blockBookends';
import { getOrdinalChoiceMap } from '../util';

import EchoVisualization from './EchoVisualization';
import { KeyboardTrigger, ContinueKey } from './KeyboardResponse';
import { useAudio } from './hooks/useAudio';

const BlockBookendAfter = ({ blockNumber, blockCount, onFinish }) => {
    if (blockNumber === blockCount) {
        return (
            <div className="text-content">
                <p>
                    <b>
                        Finished block {blockNumber} of {blockCount}.
                    </b>{' '}
                    Nice work! Please do not close this browser tab yet.
                </p>
                <p>
                    <ContinueKey handler={onFinish} />
                </p>
            </div>
        );
    }
    const nextOrFinal = blockNumber + 1 === blockCount ? 'final' : 'next';
    return (
        <div className="text-content">
            <p>
                <b>
                    Finished block {blockNumber} of {blockCount}.
                </b>{' '}
                Nice work. Take a moment, and when you're ready, press{' '}
                <KeyboardTrigger trigger="enter" handler={onFinish} /> to continue to the{' '}
                {nextOrFinal} block.
            </p>
        </div>
    );
};

const BlockBookendBefore = ({ blockNumber, blockCount, onFinish, azimuths, center }) => {
    const [playState, setPlayState] = useState('ready');
    const { playFile } = useAudio();
    const [firstInRange, lastInRange] = getBlockBookendFilesForCenterAzimuth(center);

    const playRangeStims = () => {
        if (playState !== 'ready') {
            return;
        }
        playFile(firstInRange, () => {
            setTimeout(() => {
                playFile(lastInRange, () => setPlayState('done'));
            }, 1000);
        });
    };

    const renderInstructions = () => {
        if (playState === 'done') {
            return (
                <>
                    When you're ready, press <KeyboardTrigger trigger="enter" handler={onFinish} />{' '}
                    to begin.
                </>
            );
        }
        return (
            <>
                All of the sounds you'll hear in this block will come from the highlighted range.
                Press <KeyboardTrigger trigger="enter" handler={playRangeStims} /> to hear an
                example sound from each end of this range.
            </>
        );
    };

    return (
        <EchoVisualization
            azimuthChoiceMap={getOrdinalChoiceMap(azimuths)}
            description={
                <p>
                    <b>
                        Block {blockNumber} of {blockCount}:
                    </b>{' '}
                    {renderInstructions()}
                </p>
            }
        />
    );
};

const BlockBookend = (props) => {
    const { isEnd, ...restProps } = props;
    if (isEnd) {
        return <BlockBookendAfter {...restProps} />;
    }
    return <BlockBookendBefore {...restProps} />;
};

export default BlockBookend;
