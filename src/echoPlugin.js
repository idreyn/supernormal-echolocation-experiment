/* globals jsPsych */

jsPsych['echo-and-response'] = () => {
    return {
        info: {
            name: 'echo-and-response',
            parameters: {},
        },
        trial: (element, trial) => {
            renderTrialContainer(element, { trial, onFinish: (data) => jsPsych.finishTrial(data) });
        },
    };
};
