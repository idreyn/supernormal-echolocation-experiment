import React from 'react';

import HeadphoneBackwardsCheck from '../components/HeadphoneBackwardsCheck';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'headphone-backwards-check',
    key: 'headphone-backwards-check',
    render: ({ onFinish }) => (
        <HeadphoneBackwardsCheck onFinish={(failureCount) => onFinish({ failureCount })} />
    ),
});
