/* globals jsPsych */
import ReactDOM from 'react-dom';

export const createReactPlugin = ({ key, name, render, onData = null }) => {
    jsPsych.plugins[key] = {
        info: {
            name: name,
            parameters: {},
        },
        trial: (element, data) => {
            ReactDOM.render(
                render({
                    data,
                    onFinish: (responseData) => {
                        onData && onData(responseData);
                        jsPsych.finishTrial(responseData);
                    },
                }),
                element
            );
        },
    };
};
