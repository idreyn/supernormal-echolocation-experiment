import React, { useCallback, useEffect, useState } from 'react';

import { setGlobalVolume } from '../audio';

import { Choice, ChoiceSet } from './Choice';
import { useAudio } from './hooks/useAudio';

const VolumeCalibration = ({ filename, onFinish }) => {
    const [volume, setVolume] = useState(0.3);
    const [highestPlayedVolume, setHighestPlayedVolume] = useState(0);
    const { isPlaying, playFile } = useAudio();

    const handlePlaySample = useCallback(
        (sampleVolume) =>
            playFile(filename, () => setHighestPlayedVolume(sampleVolume), sampleVolume),
        [filename]
    );

    useEffect(() => {
        setGlobalVolume(volume);
    }, [volume]);

    const renderChoiceSet = () => {
        return (
            <ChoiceSet name="volume-calibration" value={volume} onChange={setVolume}>
                <Choice title="Quiet" value={0.3}>
                    <div className="volume-choice">
                        Play sounds at 30% device volume
                        <button
                            className="jspsych-btn"
                            disabled={isPlaying}
                            onClick={() => handlePlaySample(0.3)}
                        >
                            Play sample
                        </button>
                    </div>
                </Choice>
                <Choice title="Louder" value={0.7} disabled={highestPlayedVolume < 0.3}>
                    <div className="volume-choice">
                        Play sounds at 70% device volume
                        <button
                            className="jspsych-btn"
                            disabled={isPlaying}
                            onClick={() => handlePlaySample(0.7)}
                        >
                            Play sample
                        </button>
                    </div>
                </Choice>
                <Choice title="Full" value={1} disabled={highestPlayedVolume < 0.7}>
                    <div className="volume-choice">
                        Play sounds at full device volume
                        <button
                            className="jspsych-btn"
                            disabled={isPlaying}
                            onClick={() => handlePlaySample(1)}
                        >
                            Play sample
                        </button>
                    </div>
                </Choice>
            </ChoiceSet>
        );
    };

    return (
        <div className="text-content">
            <h1>Check your headphone volume</h1>
            <div className="warning">⚠️ Please read this section carefully.</div>
            <p>
                The sounds used in this experiment are higher-pitched and can be unpleasant at a
                high volume. You may choose an option for the sound volume here. You may also adjust
                your computer's volume at any time.
            </p>
            {renderChoiceSet()}
            <button
                className="jspsych-btn primary"
                disabled={highestPlayedVolume === 0}
                onClick={onFinish}
            >
                Continue
            </button>
        </div>
    );
};

export default VolumeCalibration;
