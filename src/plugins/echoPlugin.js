import React from 'react';

import EchoTrial from '../components/EchoTrial';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'echo-presentation',
    key: 'echo-presentation',
    render: ({ trial, onFinish }) => <EchoTrial trial={trial} onFinish={onFinish} />,
});
