import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const KeyboardResponse = ({ children, delaySeconds }) => {
    const [isVisible, setIsVisible] = useState(delaySeconds === 0);

    useEffect(() => setTimeout(() => setIsVisible(true), delaySeconds * 1000), []);

    if (isVisible) {
        return children;
    }
    return null;
};

export const KeyboardTrigger = ({ trigger, handler }) => {
    const normalizedTrigger = trigger.toLowerCase();

    useEffect(() => {
        const listener = (evt) => {
            if (
                evt.key &&
                (evt.key.toLowerCase() === normalizedTrigger ||
                    (normalizedTrigger === 'space' && evt.key === ' '))
            ) {
                handler();
            }
        };
        window.addEventListener('keypress', listener);
        return () => window.removeEventListener('keypress', listener);
    }, []);

    return (
        <span className={classNames('keyboard-trigger', normalizedTrigger === 'space' && 'space')}>
            {trigger}
        </span>
    );
};

export const PressSpaceToContinue = ({ handler }) => (
    <span className="press-space-to-continue">
        Press <KeyboardTrigger trigger="space" handler={handler} /> to continue.
    </span>
);
