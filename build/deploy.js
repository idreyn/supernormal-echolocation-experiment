/* global process */
/**
 * Usage: npm run deploy [repository-remote-url] [branch='main']
 */
import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';

const [remoteUrl, branch = 'main'] = process.argv.slice(2);

const execHere = (command) => execSync(command, { cwd: targetDirectory });

const targetDirectory = path.join(process.cwd(), '.jspsych-builder', 'experiment');

const getExistingRemoteUrl = () => {
    try {
        return execHere('git config --get remote.origin.url').toString().trim();
    } catch (_) {
        return null;
    }
};

const main = () => {
    const mustInitRepo = getExistingRemoteUrl() !== remoteUrl;
    if (mustInitRepo) {
        fs.removeSync(path.join(targetDirectory, '.git'));
        execHere('git init');
        execHere(`git remote add origin ${remoteUrl}`);
        execHere(`git fetch`);
    }
    execHere(`git branch --set-upstream-to origin/${branch}`);
    execHere(`git pull`);
    execHere(`git add .`);
    execHere(`git commit -am "Deployment on ${new Date().toString()}" --allow-empty`);
    execHere(`git push -f`);
};

main();
