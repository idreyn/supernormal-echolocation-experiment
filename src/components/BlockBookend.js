import React from 'react';

import { KeyboardTrigger, ContinueKey } from './KeyboardResponse';
import EchoBoundariesVisualization from './EchoBoundariesVisualization';

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

const BlockBookendBefore = ({ blockNumber, blockCount, onFinish, center }) => {
    const renderInstructions = ({ start, isFinished }) => {
        if (isFinished) {
            return (
                <>
                    When you're ready, press <KeyboardTrigger trigger="enter" handler={onFinish} />{' '}
                    to begin.
                </>
            );
        }
        return (
            <>
                <b>
                    Block {blockNumber} of {blockCount}:
                </b>{' '}
                All of the sounds you'll hear in this block will come from the highlighted range.
                Press <KeyboardTrigger trigger="enter" handler={start} /> to hear an example sound
                from each end of this range.
            </>
        );
    };

    return <EchoBoundariesVisualization center={center} renderDescription={renderInstructions} />;
};

const BlockBookend = (props) => {
    const { isEnd, ...restProps } = props;
    if (isEnd) {
        return <BlockBookendAfter {...restProps} />;
    }
    return <BlockBookendBefore {...restProps} />;
};

export default BlockBookend;
