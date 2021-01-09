import React from 'react';

const WelcomeScreen = () => {
    if (window.innerWidth < 800) {
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

export default WelcomeScreen;
