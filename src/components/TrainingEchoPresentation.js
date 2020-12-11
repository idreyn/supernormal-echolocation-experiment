import React, { useState } from 'react';
import EchoPresentation from './EchoPresentation';
import { KeyboardTrigger } from './KeyboardResponse';

const TrainingEchoPresentation = ({ onFinish, presentation, description }) => {
    const [playKey, setPlayKey] = useState(0);
    const [hasPlayed, setHasPlayed] = useState(false);

    const totalDescription = (
        <>
            {description}
            {hasPlayed && (
                <>
                    <br />
                    Press <KeyboardTrigger
                        trigger="R"
                        handler={() => setPlayKey((k) => k + 1)}
                    />{' '}
                    to replay, or <KeyboardTrigger trigger="space" handler={onFinish} /> to
                    continue.
                </>
            )}
        </>
    );

    return (
        <EchoPresentation
            key={playKey}
            onFinish={() => setHasPlayed(true)}
            description={totalDescription}
            presentation={presentation}
            showAzimuth
        />
    );
};

export default TrainingEchoPresentation;
