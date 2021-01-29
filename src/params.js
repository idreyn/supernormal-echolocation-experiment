import { getUrlParam, number, numberOrString } from './util';

const POSSIBLE_COMPENSATION_DESCRIPTORS = [1, 2, 'half', 'full'];
const POSSIBLE_SLOWDOWNS = [12, 20];
export const RECEIVER_ORIENTATION_TYPES = ['matched'];
export const BLOCK_CENTER_AZIMUTHS = [-60, 0, 60];
export const AZIMUTHS_PER_BLOCK = 5;
export const REPEATS_PER_BLOCK = 4;

export const isTiny = getUrlParam('tiny');
export const slowdown = number(getUrlParam('slowdown'));
export const compensationDescriptor = numberOrString(getUrlParam('compensation'));

if (
    !POSSIBLE_SLOWDOWNS.includes(slowdown) ||
    !POSSIBLE_COMPENSATION_DESCRIPTORS.includes(compensationDescriptor)
) {
    throw new Error(`Invalid slowdown=${slowdown} compensation=${compensationDescriptor}`);
}
