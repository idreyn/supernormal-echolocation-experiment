import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { calibrationFilename, getRandomHeadphoneCheck } from '../headphoneCheck';
import { getCompletionUrl } from '../prolific';

import { useAudio } from './hooks/useAudio';
import { KeyboardTrigger, Keyset, ContinueKey } from './KeyboardResponse';
import VolumeCalibration from './VolumeCalibration';

const HeadphoneCheck = ({ onFinish, testLength, permittedFailures }) => {
    const [stage, setStage] = useState('intro');
    const [testIndex, setTestIndex] = useState(-1);
    const [failureCount, setFailureCount] = useState(0);
    const [hasStartedTest, setHasStartedTest] = useState(false);
    const testElements = useMemo(() => getRandomHeadphoneCheck(testLength), []);
    const { playFile, isPlaying } = useAudio();
    const isFinished = testIndex === testElements.length;
    const isPassing = failureCount <= permittedFailures;
    const canRespond = !isPlaying && hasStartedTest;

    const handleFinish = () => {
        onFinish({ failureCount, testIndex });
    };

    const handleResponseClick = useCallback(
        (response) => {
            const currentElement = testElements[testIndex];
            if (currentElement.correctAnswer !== response) {
                setFailureCount((c) => c + 1);
            }
            setTestIndex((i) => i + 1);
        },
        [testIndex]
    );

    useEffect(() => {
        if (testIndex > -1 && testIndex < testElements.length) {
            const delay = testIndex === 0 ? 1000 : 0;
            setTimeout(() => {
                setHasStartedTest(true);
                playFile(testElements[testIndex].filename);
            }, delay);
        }
    }, [testIndex]);

    useEffect(() => {
        if (stage === 'test') {
            setTestIndex(0);
        }
    }, [stage]);

    const renderInner = () => {
        if (isFinished) {
            if (isPassing) {
                return (
                    <>
                        <h1>All set!</h1>
                        <p>Please keep your headphones on for the duration of the experiment.</p>
                        <p>
                            <ContinueKey handler={handleFinish} />
                        </p>
                    </>
                );
            }
            return (
                <>
                    <h1>Sorry.</h1>
                    <p>
                        Based on your responses, it appears that you're not wearing headphones.
                        <br />
                        <a href={getCompletionUrl()}>Return to Prolific</a>
                    </p>
                </>
            );
        }

        if (stage === 'intro') {
            return (
                <>
                    <h1>Check your headphones</h1>
                    <p>
                        You'll need to wear headphones or earbuds to participate in this experiment.
                        On the following screens, we will perform a quick check of your headphones'
                        capability.
                    </p>
                    <ContinueKey handler={() => setStage('volume')} />
                </>
            );
        }

        if (stage === 'volume') {
            return (
                <VolumeCalibration
                    filename={calibrationFilename}
                    onFinish={() => setStage('test')}
                />
            );
        }

        return (
            <>
                <h1>
                    Which sound is the quietest? ({testIndex + 1}/{testElements.length})
                </h1>
                <p>
                    You can click the buttons or use the <Keyset triggers={['1', '2', '3']} /> keys
                    to respond.
                </p>
                <div className="button-set">
                    <button
                        disabled={!canRespond}
                        className="jspsych-btn"
                        onClick={() => handleResponseClick(1)}
                    >
                        <KeyboardTrigger
                            disabled={!canRespond}
                            trigger="1"
                            handler={() => handleResponseClick(1)}
                        />
                        &nbsp; First
                    </button>
                    <button
                        disabled={!canRespond}
                        className="jspsych-btn"
                        onClick={() => handleResponseClick(2)}
                    >
                        <KeyboardTrigger
                            disabled={!canRespond}
                            trigger="2"
                            handler={() => handleResponseClick(2)}
                        />
                        &nbsp; Second
                    </button>
                    <button
                        disabled={!canRespond}
                        className="jspsych-btn"
                        onClick={() => handleResponseClick(3)}
                    >
                        <KeyboardTrigger
                            disabled={!canRespond}
                            trigger="3"
                            handler={() => handleResponseClick(3)}
                        />
                        &nbsp; Third
                    </button>
                </div>
            </>
        );
    };

    return <div className="text-content">{renderInner()}</div>;
};

export default HeadphoneCheck;
