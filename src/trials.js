/* global jsPsych */
import { queryManifestEntries } from './manifest';
import { getProlificIds } from './prolific';
import {
    BLOCK_CENTER_AZIMUTHS,
    REPEATS_PER_BLOCK,
    REPEATS_OF_BLOCK_CENTERS,
    VERSION,
    isTiny,
    getPositionsAroundCenterAzimuth,
} from './params';
import { repeatArray } from './util';

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

jsPsych.data.addProperties({
    ...getProlificIds(),
    userAgent: navigator.userAgent,
    version: VERSION,
});

export const createTrialBlocks = () => {
    const blockCenters = repeatArray(
        jsPsych.randomization.repeat(BLOCK_CENTER_AZIMUTHS, 1),
        REPEATS_OF_BLOCK_CENTERS
    );
    return blockCenters.map((center) => {
        const azimuthsAroundCenter = getPositionsAroundCenterAzimuth(center);
        const params = jsPsych.randomization.factorial(
            { azimuth: azimuthsAroundCenter },
            REPEATS_PER_BLOCK
        );
        return {
            presentations: maybeMakeTiny(params).map((p) =>
                createPresentationWithChoices(p, azimuthsAroundCenter)
            ),
            azimuths: azimuthsAroundCenter,
            center,
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
