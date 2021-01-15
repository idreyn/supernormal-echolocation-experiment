import React from 'react';

import ConsentForm from '../components/ConsentForm';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'consent-form',
    key: 'consent-form',
    render: ({ onFinish }) => <ConsentForm onFinish={onFinish} />,
});
