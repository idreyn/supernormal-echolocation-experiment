import React, { useEffect } from 'react';
import EchoVisualization from './EchoVisualization';

import { useAudio } from './hooks/useAudio';

const EchoPresentation = ({
    description,
    presentation,
    showPulseAnimation = true,
    showAzimuth = false,
    onFinish,
}) => {
    const { playFile } = useAudio();

    useEffect(() => playFile(presentation.filename, onFinish), []);

    return (
        <EchoVisualization
            showPulseAnimation={showPulseAnimation}
            description={description}
            echoAnimationSlowdown={presentation.slowdown}
            echoAnimationAzimuth={showAzimuth ? presentation.azimuth : null}
        />
    );
};

export default EchoPresentation;
