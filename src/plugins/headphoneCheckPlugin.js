import React from 'react';

import { getGlobalVolume } from '../audio';
import HeadphoneCheck from '../components/HeadphoneCheck';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'headphone-check',
    key: 'headphone-check',
    render: ({ onFinish }) => (
        <HeadphoneCheck
            testLength={6}
            permittedFailures={1}
            onFinish={(testResult) => onFinish({ ...testResult, globalVolume: getGlobalVolume() })}
        />
    ),
});
