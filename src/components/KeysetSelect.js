import React, { useEffect, useState } from 'react';

import { setChosenKeyset, keysetOptions } from '../keyset';

import { Choice, ChoiceSet } from './Choice';
import { Keyset } from './KeyboardResponse';

const KeysetSelect = ({ onFinish }) => {
    const [keysetName, setKeysetName] = useState(null);

    useEffect(() => {
        setChosenKeyset(keysetOptions[keysetName]);
    }, [keysetName]);

    const renderChoiceSet = () => {
        return (
            <ChoiceSet name="volume-calibration" value={keysetName} onChange={setKeysetName}>
                {Object.entries(keysetOptions).map(([name, keyset]) => (
                    <Choice title={keyset.title} value={name} key={name}>
                        Use the <Keyset triggers={keyset.keys} /> keys to respond
                    </Choice>
                ))}
            </ChoiceSet>
        );
    };

    return (
        <div className="text-content">
            <h1>Choose your keyboard controls</h1>
            <p>
                In this experiment you will use the keyboard to choose between five options. You may
                choose which hand to use on a QWERTY keyboard here.
            </p>
            {renderChoiceSet()}
            <button className="jspsych-btn primary" onClick={onFinish} disabled={!keysetName}>
                Continue
            </button>
        </div>
    );
};

export default KeysetSelect;
