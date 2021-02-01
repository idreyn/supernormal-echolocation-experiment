import React, { useEffect, useState } from 'react';

import { setChosenKeyset, keysetOptions } from '../keyset';

import { Choice, ChoiceSet } from './Choice';
import { KeyboardTrigger, Keyset } from './KeyboardResponse';

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
                        Use the <KeyboardTrigger trigger={keyset.triggerKey} /> key to play sounds
                        and the <Keyset triggers={keyset.responseKeys} /> keys to respond
                    </Choice>
                ))}
            </ChoiceSet>
        );
    };

    return (
        <div className="text-content">
            <h1>Choose your keyboard controls</h1>
            <p>
                In this experiment you will use the keyboard to choose between five options with one
                hand, and play sounds with the other. You may choose which hand to use on a QWERTY
                keyboard here.
            </p>
            {renderChoiceSet()}
            <button className="jspsych-btn primary" onClick={onFinish} disabled={!keysetName}>
                Continue
            </button>
        </div>
    );
};

export default KeysetSelect;
