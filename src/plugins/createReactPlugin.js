/* globals jsPsych */
import ReactDOM from 'react-dom';

export const createReactPlugin = ({ key, name, render, onData = null }) => {
    const handleFinish = (data) => {
        onData && onData(data);
        jsPsych.finishTrial(data);
    };
    jsPsych.plugins[key] = {
        info: {
            name: name,
            parameters: {},
        },
        trial: (element, trial) => {
            ReactDOM.render(render({ trial, onFinish: handleFinish }), element);
        },
    };
};
