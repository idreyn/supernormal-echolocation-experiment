/* global jsPsych */
import { range } from './util';
import { queryManifestEntries } from './manifest';

const RECEIVER_ORIENTATION_TYPES = ['matched'];
const COMPENSATION_DENOMINATORS = [0, 1, 2, 4];
const SLOWDOWNS = [7, 14, 21];
const BLOCK_CENTER_AZIMUTHS = [-60, -30, 0, 30, 60];
const AZIMUTHS_PER_BLOCK = 5;

const getPositionsAroundCenterAzimuth = (center) => {
    const val = range(center - 10, center + 10, 5);
    if (val.length !== AZIMUTHS_PER_BLOCK) {
        throw new Error('Expected azimuth range length to equal AZIMUTHS_PER_BLOCK');
    }
    return val;
};

export const createPresentationWithChoices = (params, choices) => {
    return {
        choices,
        ...queryManifestEntries(params),
    };
};

export const createTrialBlocks = ({ numRepeats }) => {
    const blockCenters = jsPsych.randomization.repeat(BLOCK_CENTER_AZIMUTHS, 1);
    const slowdowns = jsPsych.randomization.repeat(
        SLOWDOWNS,
        Math.ceil(BLOCK_CENTER_AZIMUTHS.length / SLOWDOWNS.length)
    );
    return blockCenters.map((center, index) => {
        const slowdown = slowdowns[index];
        const positionsAroundCenter = getPositionsAroundCenterAzimuth(center);
        const params = jsPsych.randomization.factorial(
            {
                slowdown: [slowdown],
                receiverOrientationType: RECEIVER_ORIENTATION_TYPES,
                compensationDenominator: COMPENSATION_DENOMINATORS,
                azimuth: positionsAroundCenter,
            },
            numRepeats
        );
        return {
            presentations: params.map((p) =>
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
