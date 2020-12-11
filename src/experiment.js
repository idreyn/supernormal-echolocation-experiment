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

import './plugins/echoPlugin';
import './plugins/headphoneCheckPlugin';
import './plugins/trainingPlugin';

import { createTrialBlocks, getAudioFilesForTrialBlocks } from './trials';
import { render } from './render';

import WelcomeScreen from './components/WelcomeScreen';
import { trainingFiles } from './components/TrainingSteps';

import { headphoneCheckFiles } from './headphoneCheck';
import { getUrlParam } from './util';

const trialBlocks = createTrialBlocks({ numRepeats: 2 });
console.log(trialBlocks);

export const preload_audio = [
    ...getAudioFilesForTrialBlocks(trialBlocks),
    ...trainingFiles,
    ...headphoneCheckFiles,
];

export function createTimeline() {
    let timeline = [];

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

    return timeline;
}
