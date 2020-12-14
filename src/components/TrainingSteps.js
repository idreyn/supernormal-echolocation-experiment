import React, { useCallback, useState } from 'react';
import { createPresentationWithChoices } from '../trials';
import EchoTrial from './EchoTrial';
import EchoVisualization from './EchoVisualization';
import { KeyboardResponse, PressSpaceToContinue } from './KeyboardResponse';
import TrainingEchoPresentation from './TrainingEchoPresentation';

const presentations = {
    first: createPresentationWithChoices(
        {
            receiverOrientationType: 'matched',
            azimuth: 45,
            compensationDenominator: 1,
            slowdown: 21,
        },
        [30, 35, 40, 45, 50]
    ),
    second: createPresentationWithChoices({
        receiverOrientationType: 'matched',
        azimuth: -60,
        compensationDenominator: 1,
        slowdown: 21,
    }),
    third: createPresentationWithChoices({
        receiverOrientationType: 'matched',
        azimuth: 15,
        compensationDenominator: 1,
        slowdown: 7,
    }),
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
        <p>
            There are still some things that we don't know, like how much to slow down the sound, or
            how the device's ears should be positioned. Our goal is to make it as easy as possible
            to tell where the echoes are coming from.
        </p>
        <p>We need your judgement to help build the best possible version of this device.</p>
        <p>
            <KeyboardResponse delaySeconds={0}>
                <PressSpaceToContinue handler={next} />
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
                    <PressSpaceToContinue handler={next} />
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
        presentation={presentations.first}
        onFinish={next}
    />
);

const secondSample = (next) => (
    <TrainingEchoPresentation
        key="different-azimuth-presentation"
        description={<>These can come from different positions...</>}
        presentation={presentations.second}
        onFinish={next}
    />
);

const thirdSample = (next) => (
    <TrainingEchoPresentation
        key="different-speeds-presentation"
        description={<>...and may be played at different speeds.</>}
        presentation={presentations.third}
        onFinish={next}
    />
);

const readyToTry = (next) => (
    <EchoVisualization
        azimuthChoiceMap={{ 1: 10, 2: 15, 3: 20, 4: 25, 5: 30 }}
        description={
            <>
                After each sound, you will be asked to estimate which angle the echo came from. You
                will choose from a set of five closely-spaced choices. Let's try an example.{' '}
                <KeyboardResponse delaySeconds={2}>
                    <PressSpaceToContinue handler={next} />
                </KeyboardResponse>
            </>
        }
    />
);

const sampleTrial = (next) => (
    <EchoTrial prefix="Ready? " presentation={presentations.first} onFinish={next} />
);

const readyToBegin = (next) => (
    <EchoVisualization
        description={
            <>
                Perfect! You're ready to begin. <PressSpaceToContinue handler={next} />
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
    readyToTry,
    sampleTrial,
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
