import React from 'react';

import KeysetSelect from '../components/KeysetSelect';
import { getChosenKeyset } from '../keyset';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'keyset-select',
    key: 'keyset-select',
    render: ({ onFinish }) => (
        <KeysetSelect onFinish={() => onFinish({ chosenKeyset: getChosenKeyset().id })} />
    ),
});
