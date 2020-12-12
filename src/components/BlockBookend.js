import React from 'react';
import { KeyboardTrigger, PressSpaceToContinue } from './KeyboardResponse';

const describeSlowdown = (slowdown) => {
    if (slowdown > 15) {
        return 'slow';
    } else if (slowdown > 10) {
        return 'slower';
    } else {
        return 'fast';
    }
};

const BlockBookend = ({ isEnd, blockNumber, blockCount, slowdown, onFinish }) => {
    const renderInner = () => {
        if (isEnd) {
            if (blockNumber === blockCount) {
                return (
                    <>
                        <h1>
                            Finished block {blockNumber} of {blockCount}
                        </h1>
                        <p>
                            <PressSpaceToContinue handler={onFinish} />
                        </p>
                    </>
                );
            }
            const nextOrFinal = blockNumber + 1 === blockCount ? 'final' : 'next';
            return (
                <>
                    <h1>
                        Finished block {blockNumber} of {blockCount}
                    </h1>
                    <p>
                        Nice work. This is be a good time to take a short break, but do not close
                        this browser tab.
                    </p>
                    <p>
                        When you're ready, press{' '}
                        <KeyboardTrigger trigger="space" handler={onFinish} /> to continue to the{' '}
                        {nextOrFinal} block.
                    </p>
                </>
            );
        }
        return (
            <>
                <h1>
                    Block {blockNumber} of {blockCount}
                </h1>
                <p>
                    The echoes you will hear in this block are <b>{describeSlowdown(slowdown)}</b>.
                </p>
                <p>
                    When you're ready, press <KeyboardTrigger trigger="space" handler={onFinish} />{' '}
                    to begin.
                </p>
            </>
        );
    };

    return <div className="text-content">{renderInner()}</div>;
};

export default BlockBookend;
