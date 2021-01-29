import React from 'react';

import BlockBookend from '../components/BlockBookend';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'block-bookend',
    key: 'block-bookend',
    render: ({ data: { isEnd, blockNumber, blockCount, azimuths }, onFinish }) => (
        <BlockBookend
            isEnd={isEnd}
            azimuths={azimuths}
            blockNumber={blockNumber}
            blockCount={blockCount}
            onFinish={onFinish}
        />
    ),
});
