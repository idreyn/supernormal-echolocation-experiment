/**
 * @title supernormal-echolocation-presentation
 * @description Presents supernormal echolocation stimuli
 * @version 0.1
 *
 * The following lines specify which media directories will be packaged and preloaded by jsPsych.
 * Modify them to arbitrary paths (or comma-separated lists of paths) within the `media` directory,
 * or delete them.
 * @imageDir images
 * @audioDir audio
 * @videoDir video
 */
import '../styles/main.scss';

import 'jspsych/plugins/jspsych-html-keyboard-response';
import 'jspsych/plugins/jspsych-fullscreen';

import './plugins/blockBookendPlugin';
import './plugins/echoPlugin';
import './plugins/headphoneCheckPlugin';
import './plugins/trainingPlugin';
import './plugins/pavloviaPlugin';

import { createTrialBlocks, getAudioFilesForTrialBlocks } from './trials';
import { render } from './render';

import WelcomeScreen from './components/WelcomeScreen';
import { trainingFiles } from './components/TrainingSteps';

import { headphoneCheckFiles } from './headphoneCheck';
import { getUrlParam } from './util';

const isPavlovia = window.location.hostname.includes('pavlovia.org');
const isLocalhost = window.location.hostname.includes('localhost');

if (!(isLocalhost || isPavlovia)) {
    throw new Error('Cannot detect environment');
}

const trialBlocks = createTrialBlocks({ numRepeats: 2 });

export const preload_audio = [
    ...getAudioFilesForTrialBlocks(trialBlocks),
    ...trainingFiles,
    ...headphoneCheckFiles,
];

export function createTimeline() {
    let timeline = [];

    if (isPavlovia) {
        timeline.push({
            type: 'pavlovia',
            command: 'init',
        });
    }

    timeline.push({
        type: 'html-keyboard-response',
        stimulus: render(WelcomeScreen),
    });

    if (!getUrlParam('skipHeadphoneCheck')) {
        timeline.push({
            type: 'headphone-check',
        });
    }

    timeline.push({
        type: 'training',
    });

    trialBlocks.forEach((block, blockIndex, { length: blockCount }) => {
        const blockNumber = blockIndex + 1;
        timeline.push({
            type: 'block-bookend',
            slowdown: block.slowdown,
            blockNumber,
            blockCount,
        });
        block.presentations.forEach((presentation, trialIndex, { length: trialCount }) => {
            timeline.push({
                type: 'echo-presentation',
                presentation: presentation,
                progress: {
                    blockNumber,
                    blockCount,
                    trialCount,
                    trialNumber: trialIndex + 1,
                },
            });
        });
        timeline.push({
            type: 'block-bookend',
            isEnd: true,
            slowdown: block.slowdown,
            blockNumber,
            blockCount,
        });
    });

    if (isPavlovia) {
        timeline.push({
            type: 'pavlovia',
            command: 'finish',
        });
    }

    return timeline;
}
