import React, { useCallback, useState } from 'react';

import { createPresentationWithChoices } from '../trials';
import { getOrdinalChoiceMap, range } from '../util';

import EchoTrial from './EchoTrial';
import EchoVisualization from './EchoVisualization';
import { KeyboardResponse, ContinueKey } from './KeyboardResponse';
import TrainingEchoPresentation from './TrainingEchoPresentation';

const choiceRange = range(30, 50, 5);

const presentations = {
    first: createPresentationWithChoices({ azimuth: 45 }, choiceRange),
    second: createPresentationWithChoices({ azimuth: -60 }),
    third: createPresentationWithChoices({ azimuth: 60 }),
    fourth: createPresentationWithChoices({ azimuth: 30 }, choiceRange),
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
        presentation={presentations.first}
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
        presentation={presentations.second}
        onFinish={next}
    />
);

const thirdSample = (next) => (
    <TrainingEchoPresentation
        key="different-speeds-presentation"
        description={<>...or in the right ear.</>}
        presentation={presentations.third}
        onFinish={next}
    />
);

const readyToTry = (next) => (
    <EchoVisualization
        azimuthChoiceMap={getOrdinalChoiceMap(choiceRange)}
        description={
            <>
                After each sound, you will be asked to estimate where the echo came from, within a
                narrow highlighted area. Let's try a few examples.{' '}
                <KeyboardResponse delaySeconds={2}>
                    <ContinueKey handler={next} />
                </KeyboardResponse>
            </>
        }
    />
);

const sampleTrial = (next) => (
    <EchoTrial
        key="first-trial"
        prefix="Ready? "
        presentation={presentations.first}
        onFinish={next}
        timeoutAfterMs={null}
    />
);

const secondSampleTrial = (next) => (
    <EchoTrial
        key="second-trial"
        prefix={
            <>
                We will present blocks of echoes in a row that appear to come from similar
                positions. Try your best to distinguish them!{' '}
            </>
        }
        presentation={presentations.fourth}
        onFinish={next}
        timeoutAfterMs={null}
    />
);

const readyToBegin = (next) => (
    <EchoVisualization
        description={
            <>
                Perfect! You're ready to begin. <ContinueKey handler={next} />
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
