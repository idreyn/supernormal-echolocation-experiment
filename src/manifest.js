import manifestRows from './_manifestData';
import { number, string, numberOrString } from './util';

const stimFileName = (name) => `media/audio/stims/${name}`;

const manifestStructure = {
    azimuth: ['azimuth', number],
    compensation_descriptor: ['compensationDescriptor', numberOrString],
    compensation: ['compensation', number],
    filename: ['filename', stimFileName],
    receiver_orientation_type: ['receiverOrientationType', string],
    slowdown: ['slowdown', number],
};

const parseManifestRow = (rowArr, headers) => {
    const row = {};
    rowArr.forEach((entry, index) => {
        const header = headers[index];
        const structureEntry = manifestStructure[header];
        if (structureEntry) {
            const [key, parseFn] = structureEntry;
            const value = parseFn(entry);
            row[key] = value;
        }
    });
    return row;
};

const createManifestEntries = () => {
    const [header, ...rows] = manifestRows;
    return rows.map((row) => parseManifestRow(row, header));
};

const manifestEntries = createManifestEntries();

export const queryManifestEntries = (query) => {
    const result = manifestEntries.find((entry) =>
        Object.keys(query).every((key) => query[key] === entry[key])
    );
    if (!result) {
        throw new Error(`Could not find result for query ${JSON.stringify(query)}`);
    }
    return result;
};
