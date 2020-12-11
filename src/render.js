import React from 'react';
import ReactDOM from 'react-dom';

export const render = (Component, props = {}) => {
    const container = document.createElement('div');
    ReactDOM.render(<Component {...props} />, container);
    return container.innerHTML;
};
