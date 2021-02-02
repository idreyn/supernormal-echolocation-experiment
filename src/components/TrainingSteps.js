import React, { useCallback, useState } from 'react';

import { createPresentationWithChoices } from '../trials';
import { getPositionsAroundCenterAzimuth, TRAINING_CENTER_AZIMUTH } from '../params';

import EchoTrial from './EchoTrial';
import EchoVisualization from './EchoVisualization';
import EchoBoundariesVisualization from './EchoBoundariesVisualization';
import TrainingEchoPresentation from './TrainingEchoPresentation';
import { KeyboardResponse, ContinueKey, KeyboardTrigger } from './KeyboardResponse';

const choiceRange = getPositionsAroundCenterAzimuth(TRAINING_CENTER_AZIMUTH);

const presentations = {
    trainingOne: createPresentationWithChoices({ azimuth: choiceRange[2] }, choiceRange),
    trainingTwo: createPresentationWithChoices({ azimuth: choiceRange[0] }, choiceRange),
    farLeft: createPresentationWithChoices({ azimuth: -60 }),
    farRight: createPresentationWithChoices({ azimuth: 60 }),
    nearCenter: createPresentationWithChoices({ azimuth: 15 }),
};

export const trainingFiles = Object.values(presentations).map((pr) => pr.filename);

const background = (next) => (
    <div className="text-content">
        <p>We are building a device to help blind people navigate by sound.</p>
        <p>
            Inspired by bats, it emits bursts of sound too high-pitched to hear. It has two
            artificial ears that slow down the echoes they pick up, so the wearer of the device can
            hear them. The echoes are in stereo, so it's possible to tell what direction they are
            coming from.
        </p>
        <p>We need your judgement to help build the best possible version of this device.</p>
        <p>
            <KeyboardResponse delaySeconds={0}>
                <ContinueKey handler={next} />
            </KeyboardResponse>
        </p>
    </div>
);

const stageLayout = (next) => (
    <EchoVisualization
        description={
            <>
                This black dot represents your head, seen from above. All of the sounds you will
                hear are echoes from targets on the ring in front of you.{' '}
                <KeyboardResponse delaySeconds={2}>
                    <ContinueKey handler={next} />
                </KeyboardResponse>
            </>
        }
    />
);

const firstSample = (next) => (
    <TrainingEchoPresentation
        description={
            <>
                You'll hear two sounds: a "chirp" from your device, and then the echo from a target.
            </>
        }
        presentation={presentations.nearCenter}
        onFinish={next}
    />
);

const secondSample = (next) => (
    <TrainingEchoPresentation
        key="different-azimuth-presentation"
        description={
            <>
                Depending on what direction they are played from, you may hear them more strongly in
                the left ear...
            </>
        }
        presentation={presentations.farLeft}
        onFinish={next}
    />
);

const thirdSample = (next) => (
    <TrainingEchoPresentation
        key="different-speeds-presentation"
        description={<>...or in the right ear.</>}
        presentation={presentations.farRight}
        onFinish={next}
    />
);

const boundaries = (next) => (
    <EchoBoundariesVisualization
        center={TRAINING_CENTER_AZIMUTH}
        onFinish={() => setTimeout(next, 500)}
        renderDescription={({ start }) => (
            <>
                After each sound, you will be asked to estimate where the echo came from, within a
                narrow highlighted area. Press <KeyboardTrigger trigger="enter" handler={start} />{' '}
                to hear example sounds from each end of this area.
            </>
        )}
    />
);

const sampleTrial = (next) => (
    <EchoTrial
        key="first-trial"
        prefix={<>Now let's try to locate a target in the indicated area based on its echo. </>}
        presentation={presentations.trainingOne}
        onFinish={next}
        timeoutAfterMs={null}
    />
);

const secondSampleTrial = (next) => (
    <EchoTrial
        key="second-trial"
        prefix={<>Here is another sound from a different position in the indicated area. </>}
        presentation={presentations.trainingTwo}
        onFinish={next}
        timeoutAfterMs={null}
    />
);

const readyToBegin = (next) => (
    <EchoVisualization
        description={
            <>
                Nice job. You're ready to begin. <ContinueKey handler={next} />
            </>
        }
    />
);

const steps = [
    background,
    stageLayout,
    firstSample,
    secondSample,
    thirdSample,
    boundaries,
    sampleTrial,
    secondSampleTrial,
    readyToBegin,
];

const TrainingSteps = ({ onFinish }) => {
    const [stepIndex, setStepIndex] = useState(0);

    const next = useCallback(() => {
        if (stepIndex === steps.length - 1) {
            onFinish();
        } else {
            setStepIndex((i) => i + 1);
        }
    }, [stepIndex]);

    return steps[stepIndex](next);
};

export default TrainingSteps;
