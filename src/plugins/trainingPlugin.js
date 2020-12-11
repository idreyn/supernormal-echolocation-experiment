import React from 'react';

import TrainingSteps from '../components/TrainingSteps';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'training',
    key: 'training',
    render: ({ onFinish }) => <TrainingSteps onFinish={onFinish} />,
});
