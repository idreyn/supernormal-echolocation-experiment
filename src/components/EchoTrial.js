import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getChosenKeyset } from '../keyset';
import { getKeyChoiceMap } from '../util';
import EchoPresentation from './EchoPresentation';
import EchoVisualization from './EchoVisualization';
import { Keyset } from './KeyboardResponse';

const EchoTrial = ({ prefix = null, presentation, onFinish, timeoutAfterMs = 5000 }) => {
    const { keys: responseKeys } = getChosenKeyset();
    const timeoutRef = useRef(null);
    const [presentationState, setPresentationState] = useState('waiting');
    const [chosenAzimuth, setChosenAzimuth] = useState(null);
    const [playStartTime, setPlayStartTime] = useState(null);
    const { choices } = presentation;

    const azimuthChoiceMap = useMemo(() => getKeyChoiceMap(responseKeys, choices), [
        responseKeys,
        choices,
    ]);

    useEffect(() => {
        if (presentationState === 'waiting') {
            const listener = () => setPresentationState('playing');
            window.addEventListener('keypress', listener);
            return () => window.removeEventListener('keypress', listener);
        }
    }, [presentationState]);

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
        if (chosenAzimuth) {
            return;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const responseDelay = Date.now() - playStartTime;
        const nextChosenAzimuth = azimuthChoiceMap[key];
        if (typeof nextChosenAzimuth !== 'number') {
            throw new Error('Got invalid choice of azimuth.');
        }
        setChosenAzimuth(nextChosenAzimuth);
        setTimeout(() => onFinish({ chosenAzimuth: nextChosenAzimuth, responseDelay }), 500);
    };

    const renderChoiceKeysDescription = () => (
        <>
            Use the{' '}
            <Keyset triggers={responseKeys} onSelect={handleChoiceByKey} showSpaceAsUnderscore />{' '}
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
                showPulseAnimation={false}
                presentation={presentation}
                onFinish={() => setPresentationState('played')}
            />
        );
    }

    return <EchoVisualization description={<>{prefix}Press any key to play.</>} />;
};

export default EchoTrial;
