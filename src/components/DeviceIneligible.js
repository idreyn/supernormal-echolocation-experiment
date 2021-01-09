import React from 'react';

const DeviceIneligible = ({ deviceProblems }) => {
    const { isIE, isScreenTooSmall } = deviceProblems;
    if (isIE) {
        return (
            <div>
                <h1>Internet Explorer is not supported</h1>
                <p>Please return to this link using a modern browser like Firefox or Chrome.</p>
            </div>
        );
    }
    if (isScreenTooSmall) {
        return (
            <div>
                <h1>Device not supported</h1>
                <p>Please return to this link using a desktop computer.</p>
            </div>
        );
    }
    return (
        <div>
            <h1>Welcome!</h1>
            <p>Beep bloop bloop. Press any key to continue.</p>
        </div>
    );
};

export default DeviceIneligible;
