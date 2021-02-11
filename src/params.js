import { range, getUrlParam, number, numberOrString } from './util';

const POSSIBLE_COMPENSATION_DESCRIPTORS = [1, 2, 'half', 'full'];
const POSSIBLE_SLOWDOWNS = [12, 20];
export const RECEIVER_ORIENTATION_TYPES = ['matched'];
export const BLOCK_CENTER_AZIMUTHS = [-60, 0, 60];
export const TRAINING_CENTER_AZIMUTH = 45;
export const AZIMUTHS_PER_BLOCK = 5;
export const AZIMUTH_SPACING = 5;
export const REPEATS_PER_BLOCK = 4;
export const REPEATS_OF_BLOCK_CENTERS = 2;
export const VERSION = 'v1-up-stims';

const paramsCompensation = getUrlParam('compensation');
const paramsModelName = getUrlParam('model');

export const isTiny = getUrlParam('tiny');
export const slowdown = number(getUrlParam('slowdown'));
export const compensationDescriptor = paramsCompensation && numberOrString(paramsCompensation);
export const modelName = paramsModelName || 'spherical';

export const getPositionsAroundCenterAzimuth = (center) => {
    const spacing = 10;
    const val = range(center - spacing * 2, center + spacing * 2, spacing);
    if (val.length !== AZIMUTHS_PER_BLOCK) {
        throw new Error('Expected azimuth range length to equal AZIMUTHS_PER_BLOCK');
    }
    return val;
};

if (
    modelName !== 'kemar' &&
    (!POSSIBLE_SLOWDOWNS.includes(slowdown) ||
        !POSSIBLE_COMPENSATION_DESCRIPTORS.includes(compensationDescriptor))
) {
    throw new Error(`Invalid slowdown=${slowdown} compensation=${compensationDescriptor}`);
}

// eslint-disable-next-line no-console
console.log(VERSION);
