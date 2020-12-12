import React, { useMemo, useState } from 'react';
import EchoPresentation from './EchoPresentation';
import EchoVisualization from './EchoVisualization';
import { KeyboardTrigger } from './KeyboardResponse';

const defaultResponseKeys = ['N', 'U', 'I', 'O', 'P'];

const mapChoicesToResponseKeys = (responseKeys, choices) => {
    if (choices.length !== responseKeys.length) {
        throw new Error('Need number of choices and keys to match');
    }
    const res = {};
    responseKeys.forEach((key, index) => {
        res[key] = choices[index];
    });
    return res;
};

const EchoTrial = ({
    prefix = null,
    presentation,
    onFinish,
    responseKeys = defaultResponseKeys,
}) => {
    const [presentationState, setPresentationState] = useState('waiting');
    const [chosenAzimuth, setChosenAzimuth] = useState(null);
    const { choices } = presentation;

    const azimuthChoiceMap = useMemo(() => mapChoicesToResponseKeys(responseKeys, choices), [
        responseKeys,
        choices,
    ]);

    const handleChoiceByKey = (key) => {
        const chosenAzimuth = azimuthChoiceMap[key];
        if (typeof chosenAzimuth !== 'number') {
            throw new Error('Got invalid choice of azimuth.');
        }
        setChosenAzimuth(chosenAzimuth);
        setTimeout(() => onFinish(chosenAzimuth), 500);
    };

    const renderChoiceKeysDescription = () => (
        <>
            Use the{' '}
            {responseKeys
                .map((trigger) => [
                    <KeyboardTrigger
                        key={trigger}
                        trigger={trigger}
                        handler={() => handleChoiceByKey(trigger)}
                    />,
                    ' ',
                ])
                .flat()}
            keys to pick the direction closest to where you heard the echo from.
        </>
    );

    if (presentationState === 'played') {
        return (
            <EchoVisualization
                description={renderChoiceKeysDescription()}
                azimuthChoiceMap={azimuthChoiceMap}
                chosenAzimuth={chosenAzimuth}
            />
        );
    }

    if (presentationState === 'playing') {
        return (
            <EchoPresentation
                presentation={presentation}
                onFinish={() => setPresentationState('played')}
            />
        );
    }

    return (
        <EchoVisualization
            description={
                <>
                    {prefix}Press{' '}
                    <KeyboardTrigger
                        trigger="space"
                        handler={() => setPresentationState('playing')}
                    />{' '}
                    to play.
                </>
            }
        />
    );
};

export default EchoTrial;
