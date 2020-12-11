/* global process */
import fs from 'fs-extra';
import path from 'path';

const manifestName = 'manifest.csv';
const stimsSource = process.argv[2];
const cwd = process.cwd();
const stimsTarget = path.join(cwd, 'media', 'audio', 'stims');
const stimsSourceCsv = path.join(stimsSource, manifestName);
const stimsTargetCsv = path.join(stimsTarget, manifestName);
const manifestJsFile = path.join(cwd, 'src', '_manifestData.js');

const createManifestJsFile = () => {
    const csvContents = fs.readFileSync(stimsSourceCsv).toString();
    const csvArray = csvContents.split('\n').map((line) => line.split(','));
    fs.writeFileSync(manifestJsFile, `export default ${JSON.stringify(csvArray)}`);
};

const copyStimsToMediaDir = () => {
    fs.removeSync(stimsTarget);
    fs.copySync(stimsSource, stimsTarget);
    fs.removeSync(stimsTargetCsv);
};

const main = () => {
    createManifestJsFile();
    copyStimsToMediaDir();
};

main();
