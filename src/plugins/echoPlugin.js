import React from 'react';

import EchoTrial from '../components/EchoTrial';
import ProgressIndicator from '../components/ProgressIndicator';
import { getDataEntryForTrial } from '../trials';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'echo-presentation',
    key: 'echo-presentation',
    render: ({ data: { presentation, progress }, onFinish }) => (
        <>
            <ProgressIndicator progress={progress} />
            <EchoTrial
                presentation={presentation}
                onFinish={(azimuth) => {
                    onFinish(getDataEntryForTrial(presentation, azimuth));
                }}
                key={Date.now()}
            />
        </>
    ),
});
