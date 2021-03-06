import React, { useEffect, useMemo, useRef, useState } from 'react';

import { getChosenKeyset } from '../keyset';
import { getKeyChoiceMap } from '../util';

import EchoPresentation from './EchoPresentation';
import EchoVisualization from './EchoVisualization';
import ResponseKeyset from './ResponseKeyset';
import { KeyboardTrigger } from './KeyboardResponse';

const EchoTrial = ({ presentation, onFinish, prefix = null, timeoutAfterMs = null }) => {
    const { responseKeys, triggerKey } = getChosenKeyset();
    const timeoutRef = useRef(null);
    const [presentationState, setPresentationState] = useState('waiting');
    const [chosenKey, setChosenKey] = useState(null);
    const [playStartTime, setPlayStartTime] = useState(null);
    const { choices } = presentation;

    const azimuthChoiceMap = useMemo(() => getKeyChoiceMap(responseKeys, choices), [
        responseKeys,
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
        if (chosenKey) {
            return;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const responseDelay = Date.now() - playStartTime;
        const chosenAzimuth = azimuthChoiceMap[key];
        if (typeof chosenAzimuth !== 'number') {
            throw new Error('Got invalid choice of azimuth.');
        }
        setChosenKey(key);
        setTimeout(() => onFinish({ chosenAzimuth, responseDelay }), 500);
    };

    const renderResponseKeyset = () => {
        return (
            <>
                Where in the indicated area did the echo come from? (Remember that _ is the
                spacebar)
                <ResponseKeyset triggers={responseKeys} onSelect={handleChoiceByKey} />
            </>
        );
    };

    if (presentationState === 'played') {
        return <EchoVisualization description={renderResponseKeyset()} azimuths={choices} />;
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

    return (
        <EchoVisualization
            description={
                <>
                    {prefix}Press the{' '}
                    <KeyboardTrigger
                        trigger={triggerKey}
                        handler={() => setPresentationState('playing')}
                    />{' '}
                    key to play.
                </>
            }
        />
    );
};

export default EchoTrial;
