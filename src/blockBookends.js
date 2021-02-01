import { queryManifestEntries } from './manifest';
import { BLOCK_CENTER_AZIMUTHS, getPositionsAroundCenterAzimuth } from './params';

const getBlockBookendFilesForCenterAzimuths = () => {
    const res = {};
    BLOCK_CENTER_AZIMUTHS.forEach((center) => {
        const positions = getPositionsAroundCenterAzimuth(center);
        res[center] = [positions[0], positions[positions.length - 1]].map(
            (azimuth) => queryManifestEntries({ modelName: 'click', azimuth }).filename
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
    return blockBookendsForCenterAzimuths[centerAzimuth];
};
