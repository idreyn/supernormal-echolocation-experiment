import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { calibrationFilename, getRandomHeadphoneCheck } from '../headphoneCheck';

import { useAudio } from './hooks/useAudio';

const HeadphoneCheck = ({ onFinish, testLength, permittedFailures }) => {
    const [hasCalibrated, setHasCalibrated] = useState(false);
    const [testIndex, setTestIndex] = useState(-1);
    const [failureCount, setFailureCount] = useState(0);
    const testElements = useMemo(() => getRandomHeadphoneCheck(testLength), []);
    const currentElement = testElements[testIndex];
    const { playFile, isPlaying } = useAudio();
    const isCalibrating = testIndex === -1;
    const isFinished = testIndex === testElements.length;
    const isPassing = failureCount <= permittedFailures;

    const handlePlayCalibration = useCallback(() => {
        playFile(calibrationFilename);
        setHasCalibrated(true);
    });

    const handleResponseClick = useCallback((response) => {
        if (currentElement.correctAnswer !== response) {
            setFailureCount((c) => c + 1);
        }
        setTestIndex((i) => i + 1);
    });

    useEffect(() => {
        if (currentElement) {
            playFile(currentElement.filename);
        }
    }, [currentElement]);

    const renderInner = () => {
        if (isFinished) {
            if (isPassing) {
                return (
                    <>
                        <h1>All set!</h1>
                        <button className="jspsych-btn primary" onClick={onFinish}>
                            Continue
                        </button>
                    </>
                );
            }
            return (
                <>
                    <h1>Sorry.</h1>
                    <p>It appears you're not wearing headphones.</p>
                </>
            );
        }

        if (isCalibrating) {
            return (
                <>
                    <h1>Check your headphones</h1>
                    <p>
                        You'll need to wear headphones or earbuds to participate in this experiment.
                    </p>
                    <p>
                        On the following screens, we will perform a quick check of your headphone
                        capability. Press <b>Test Volume</b> to play a sound. Make sure your
                        headphones are working properly and are at a good volume. Then press{' '}
                        <b>Start Test</b> to begin.
                    </p>
                    <div className="button-set">
                        <button className="jspsych-btn" onClick={handlePlayCalibration}>
                            Test Volume
                        </button>
                        <button
                            disabled={!hasCalibrated || isPlaying}
                            className="jspsych-btn primary"
                            onClick={() => setTestIndex(0)}
                        >
                            Start Test
                        </button>
                    </div>
                </>
            );
        }

        return (
            <>
                <h1>
                    Which sound is the quietest? ({testIndex + 1}/{testElements.length})
                </h1>
                <div className="button-set">
                    <button
                        disabled={isPlaying}
                        className="jspsych-btn"
                        onClick={() => handleResponseClick(1)}
                    >
                        First
                    </button>
                    <button
                        disabled={isPlaying}
                        className="jspsych-btn"
                        onClick={() => handleResponseClick(2)}
                    >
                        Second
                    </button>
                    <button
                        disabled={isPlaying}
                        className="jspsych-btn"
                        onClick={() => handleResponseClick(3)}
                    >
                        Third
                    </button>
                </div>
            </>
        );
    };

    return <div className="text-content centered">{renderInner()}</div>;
};

export default HeadphoneCheck;
