import React, { useState } from 'react';

import { getBlockBookendFilesForCenterAzimuth } from '../blockBookends';
import { getChosenKeyset } from '../keyset';
import { getOrdinalChoiceMap } from '../util';

import EchoVisualization from './EchoVisualization';
import ResponseKeyset from './ResponseKeyset';
import { useAudio } from './hooks/useAudio';
import { getPositionsAroundCenterAzimuth } from '../params';

const EchoBoundariesVisualization = ({ center, onFinish, renderDescription }) => {
    const { playFile } = useAudio();
    const [playState, setPlayState] = useState('ready');
    const { responseKeys } = getChosenKeyset();
    const [firstInRange, lastInRange] = getBlockBookendFilesForCenterAzimuth(center);
    const azimuths = getPositionsAroundCenterAzimuth(center);

    const playRangeStims = () => {
        if (playState !== 'ready') {
            return;
        }
        setPlayState('first');
        playFile(firstInRange, () => {
            setTimeout(() => {
                setPlayState('last');
                playFile(lastInRange, () => {
                    setTimeout(() => {
                        setPlayState('done');
                        onFinish && onFinish();
                    }, 400);
                });
            }, 1000);
        });
    };

    return (
        <EchoVisualization
            azimuthChoiceMap={getOrdinalChoiceMap(azimuths)}
            description={
                <>
                    {renderDescription({ start: playRangeStims, isFinished: playState === 'done' })}
                    <ResponseKeyset
                        triggers={responseKeys}
                        emphasizeLeftmost={playState === 'first'}
                        emphasizeRightmost={playState === 'last'}
                    />
                </>
            }
        />
    );
};

export default EchoBoundariesVisualization;
