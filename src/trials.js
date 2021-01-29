/* global jsPsych */
import { range } from './util';
import { queryManifestEntries } from './manifest';
import { getProlificIds } from './prolific';
import {
    RECEIVER_ORIENTATION_TYPES,
    BLOCK_CENTER_AZIMUTHS,
    AZIMUTHS_PER_BLOCK,
    REPEATS_PER_BLOCK,
    compensationDescriptor,
    slowdown,
    isTiny,
} from './params';

const getPositionsAroundCenterAzimuth = (center) => {
    const val = range(center - 20, center + 20, 10);
    if (val.length !== AZIMUTHS_PER_BLOCK) {
        throw new Error('Expected azimuth range length to equal AZIMUTHS_PER_BLOCK');
    }
    return val;
};

const maybeMakeTiny = (items) => {
    if (isTiny) {
        return items.slice(0, 3);
    }
    return items;
};

export const createPresentationWithChoices = (params, choices) => {
    return {
        choices,
        ...queryManifestEntries(params),
    };
};

jsPsych.data.addProperties({ ...getProlificIds(), userAgent: navigator.userAgent });

export const createTrialBlocks = () => {
    const blockCenters = jsPsych.randomization.repeat(BLOCK_CENTER_AZIMUTHS, 2);

    return blockCenters.map((center) => {
        const azimuthsAroundCenter = getPositionsAroundCenterAzimuth(center);
        const params = jsPsych.randomization.factorial(
            {
                slowdown: [slowdown],
                compensationDescriptor: [compensationDescriptor],
                receiverOrientationType: RECEIVER_ORIENTATION_TYPES,
                azimuth: azimuthsAroundCenter,
            },
            REPEATS_PER_BLOCK
        );
        return {
            presentations: maybeMakeTiny(params).map((p) =>
                createPresentationWithChoices(p, azimuthsAroundCenter)
            ),
            azimuths: azimuthsAroundCenter,
        };
    });
};

export const getAudioFilesForTrialBlocks = (trialBlocks) =>
    new Set(trialBlocks.map((block) => block.presentations.map((pres) => pres.filename)).flat());

export const getDataEntryForTrial = (presentation, responseAzimuth, responseDelay) => {
    return {
        ...presentation,
        responseAzimuth,
        responseDelay,
    };
};
