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

export const isTiny = getUrlParam('tiny');
export const slowdown = number(getUrlParam('slowdown'));
export const compensationDescriptor = numberOrString(getUrlParam('compensation'));

export const getPositionsAroundCenterAzimuth = (center) => {
    const val = range(center - 10, center + 10, 5);
    if (val.length !== AZIMUTHS_PER_BLOCK) {
        throw new Error('Expected azimuth range length to equal AZIMUTHS_PER_BLOCK');
    }
    return val;
};

if (
    !POSSIBLE_SLOWDOWNS.includes(slowdown) ||
    !POSSIBLE_COMPENSATION_DESCRIPTORS.includes(compensationDescriptor)
) {
    throw new Error(`Invalid slowdown=${slowdown} compensation=${compensationDescriptor}`);
}
