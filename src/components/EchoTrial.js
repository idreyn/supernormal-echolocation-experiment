import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getChosenKeyset } from '../keyset';
import EchoPresentation from './EchoPresentation';
import EchoVisualization from './EchoVisualization';
import { KeyboardTrigger, Keyset } from './KeyboardResponse';

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
    responseKeyset = getChosenKeyset(),
    timeoutAfterMs = 5000,
}) => {
    const timeoutRef = useRef(null);
    const [presentationState, setPresentationState] = useState('waiting');
    const [chosenAzimuth, setChosenAzimuth] = useState(null);
    const [playStartTime, setPlayStartTime] = useState(null);
    const { choices } = presentation;

    const azimuthChoiceMap = useMemo(() => mapChoicesToResponseKeys(responseKeyset, choices), [
        responseKeyset,
        choices,
    ]);

    useEffect(() => {
        if (presentationState === 'playing') {
            setPlayStartTime(Date.now());
            if (typeof timeoutAfterMs === 'number') {
                timeoutRef.current = setTimeout(
                    () => onFinish({ timedOut: 'true' }),
                    timeoutAfterMs
                );
            }
        }
    }, [presentationState]);

    const handleChoiceByKey = (key) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const responseDelay = Date.now() - playStartTime;
        const chosenAzimuth = azimuthChoiceMap[key];
        if (typeof chosenAzimuth !== 'number') {
            throw new Error('Got invalid choice of azimuth.');
        }
        setChosenAzimuth(chosenAzimuth);
        setTimeout(() => onFinish({ chosenAzimuth, responseDelay }), 500);
    };

    const renderChoiceKeysDescription = () => (
        <>
            Use the <Keyset triggers={responseKeyset} onSelect={handleChoiceByKey} /> keys to pick
            the direction closest to where you heard the echo from.
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
