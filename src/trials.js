/* global jsPsych */
import { getUrlParam, range } from './util';
import { queryManifestEntries } from './manifest';
import { getProlificIds } from './prolific';

const RECEIVER_ORIENTATION_TYPES = ['matched'];
const COMPENSATION_DENOMINATORS = [0, 1, 2]; // slowdown = 20 -> 1, 20, 10
const SLOWDOWNS = [7, 14, 21];
const BLOCK_CENTER_AZIMUTHS = [-60, -30, 0, 30, 60];
const AZIMUTHS_PER_BLOCK = 5;

const tiny = getUrlParam('tiny');

const getPositionsAroundCenterAzimuth = (center) => {
    const val = range(center - 10, center + 10, 5);
    if (val.length !== AZIMUTHS_PER_BLOCK) {
        throw new Error('Expected azimuth range length to equal AZIMUTHS_PER_BLOCK');
    }
    return val;
};

const maybeMakeTiny = (items) => {
    if (tiny) {
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

export const createTrialBlocks = ({ numRepeats }) => {
    const blockCenters = jsPsych.randomization.repeat(BLOCK_CENTER_AZIMUTHS, 1);

    const slowdowns = jsPsych.randomization.repeat(
        SLOWDOWNS,
        Math.ceil(blockCenters.length / SLOWDOWNS.length)
    );

    const compensationDenominators = jsPsych.randomization.repeat(
        COMPENSATION_DENOMINATORS,
        Math.ceil(blockCenters.length / SLOWDOWNS.length)
    );

    return blockCenters.map((center, index) => {
        const slowdown = slowdowns[index];
        const compensationDenominator = compensationDenominators[index];
        const positionsAroundCenter = getPositionsAroundCenterAzimuth(center);
        const params = jsPsych.randomization.factorial(
            {
                slowdown: [slowdown],
                compensationDenominator: [compensationDenominator],
                receiverOrientationType: RECEIVER_ORIENTATION_TYPES,
                azimuth: positionsAroundCenter,
            },
            numRepeats
        );
        return {
            presentations: maybeMakeTiny(params).map((p) =>
                createPresentationWithChoices(p, positionsAroundCenter)
            ),
            slowdown,
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
