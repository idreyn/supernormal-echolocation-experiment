import React from 'react';
import classNames from 'classnames';

import { Keyset } from './KeyboardResponse';

const ResponseKeyset = ({ emphasizeLeftmost, emphasizeRightmost, ...keysetProps }) => {
    return (
        <div className="response-keyset">
            <div className={classNames('spacer', emphasizeLeftmost && 'emphasized')}>Leftmost</div>
            <Keyset showSpaceAsUnderscore {...keysetProps} />
            <div className={classNames('spacer', emphasizeRightmost && 'emphasized')}>
                Rightmost
            </div>
        </div>
    );
};

export default ResponseKeyset;
