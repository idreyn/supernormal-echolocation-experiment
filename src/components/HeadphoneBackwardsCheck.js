import React, { useState } from 'react';

import { stereoFilenames } from '../headphoneCheck';

import { useAudio } from './hooks/useAudio';

const LEFT = 0;
const RIGHT = 1;

const HeadphoneBackwardsCheck = ({ onFinish }) => {
    const { playFile, isPlaying } = useAudio();
    const [correctResponse, setCorrectIndex] = useState(null);
    const [isResponding, setIsResponding] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);
    const [failureCount, setFailureCount] = useState(0);

    const handlePlayClick = () => {
        const correctIndex = Math.random() > 0.5 ? LEFT : RIGHT;
        setCorrectIndex(correctIndex);
        setShowCorrection(false);
        playFile(stereoFilenames[correctIndex], () => setIsResponding(true));
    };

    const handleResponse = (response) => {
        if (response === correctResponse) {
            onFinish(failureCount);
        } else {
            setIsResponding(false);
            setShowCorrection(true);
            setFailureCount((c) => c + 1);
        }
    };

    const renderButtonSet = () => {
        if (isResponding) {
            return (
                <div className="button-set">
                    <button className="jspsych-btn" onClick={() => handleResponse(LEFT)}>
                        Left
                    </button>
                    <button className="jspsych-btn" onClick={() => handleResponse(RIGHT)}>
                        Right
                    </button>
                </div>
            );
        } else {
            return (
                <>
                    <div className="button-set">
                        <button
                            className="jspsych-btn primary"
                            onClick={handlePlayClick}
                            disabled={isPlaying}
                        >
                            Play
                        </button>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="text-content">
            <h1>Check your headphone orientation</h1>
            <p>
                Let's quickly ensure your headphones aren't on backwards. Press "Play" to play a
                sound, and pay attention to which ear it appears louder in.
            </p>
            {isResponding && (
                <p>
                    <b>In which ear did you hear the tone?</b>
                </p>
            )}
            {showCorrection && (
                <p>
                    <b>Please swap your earbuds or headphones around and try again.</b>
                </p>
            )}
            {renderButtonSet()}
        </div>
    );
};

export default HeadphoneBackwardsCheck;
