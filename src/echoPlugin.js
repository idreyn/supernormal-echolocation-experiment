/* globals jsPsych */
import React from 'react';
import ReactDOM from 'react-dom';

import { TrialContainer } from './components/TrialContainer';

jsPsych.plugins['echo-presentation'] = {
    info: {
        name: 'echo-presentation',
        parameters: {},
    },
    trial: (element, trial) => {
        console.log(element);
        ReactDOM.render(
            <TrialContainer trial={jsPsych.get} onFinish={(data) => jsPsych.finishTrial(data)} />,
            element
        );
    },
};
