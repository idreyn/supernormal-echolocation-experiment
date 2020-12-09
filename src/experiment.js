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

import './echoPlugin';
import manifest from './manifest';

console.log(manifest);

export function createTimeline() {
    let timeline = [];

    // // Welcome screen
    // timeline.push({
    //     type: 'html-keyboard-response',
    //     stimulus: '<p>Welcome to supernormal-echolocation-presentation!<p/>',
    // });

    // // Switch to fullscreen
    // timeline.push({
    //     type: 'fullscreen',
    //     fullscreen_mode: true,
    // });

    timeline.push({
        type: 'echo-presentation',
    });

    return timeline;
}
