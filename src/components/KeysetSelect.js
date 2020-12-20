import React, { useEffect, useState } from 'react';

import { LEFTY_KEYSET, RIGHTY_KEYSET, chooseKeyset } from '../keyset';

import { Choice, ChoiceSet } from './Choice';
import { Keyset } from './KeyboardResponse';

const KeysetSelect = ({ onFinish }) => {
    const [keyset, setKeyset] = useState('left');

    useEffect(() => {
        chooseKeyset(keyset === 'left' ? LEFTY_KEYSET : RIGHTY_KEYSET);
    }, [keyset]);

    const renderChoiceSet = () => {
        return (
            <ChoiceSet name="volume-calibration" value={keyset} onChange={setKeyset}>
                <Choice title="Left hand" value="left">
                    Use the <Keyset triggers={LEFTY_KEYSET} /> keys to respond
                </Choice>
                <Choice title="Right hand" value="right">
                    Use the <Keyset triggers={RIGHTY_KEYSET} /> keys to respond
                </Choice>
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
            <button className="jspsych-btn primary" onClick={onFinish}>
                Continue
            </button>
        </div>
    );
};

export default KeysetSelect;
