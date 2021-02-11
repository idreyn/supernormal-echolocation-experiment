import { queryManifestEntries } from './manifest';
import {
    BLOCK_CENTER_AZIMUTHS,
    TRAINING_CENTER_AZIMUTH,
    getPositionsAroundCenterAzimuth,
} from './params';

const possibleCenterAzimuths = [...BLOCK_CENTER_AZIMUTHS, TRAINING_CENTER_AZIMUTH];

const getBlockBookendFilesForCenterAzimuths = () => {
    const res = {};
    possibleCenterAzimuths.forEach((center) => {
        const positions = getPositionsAroundCenterAzimuth(center);
        res[center] = [positions[0], positions[positions.length - 1]].map(
            (azimuth) => queryManifestEntries({ pulse: 'click', azimuth }).filename
        );
    });
    return res;
};

const blockBookendsForCenterAzimuths = getBlockBookendFilesForCenterAzimuths();

export const blockBookendFiles = Object.values(blockBookendsForCenterAzimuths).reduce(
    (a, b) => [...a, ...b],
    []
);

export const getBlockBookendFilesForCenterAzimuth = (centerAzimuth) => {
    if (!possibleCenterAzimuths.includes(centerAzimuth)) {
        throw new Error('Invalid center azimuth');
    }
    return blockBookendsForCenterAzimuths[centerAzimuth];
};
