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

export const KeyboardTrigger = ({
    trigger,
    handler,
    showSpaceAsUnderscore = false,
    disabled = false,
}) => {
    const normalizedTrigger = trigger.toLowerCase();
    const label = trigger === 'space' && showSpaceAsUnderscore ? 'space ( _ )' : trigger;

    useEffect(() => {
        if (disabled) {
            return;
        }
        const listener = (evt) => {
            if (
                handler &&
                evt.key &&
                (evt.key.toLowerCase() === normalizedTrigger ||
                    (normalizedTrigger === 'space' && evt.key === ' '))
            ) {
                handler();
            }
        };
        window.addEventListener('keypress', listener);
        return () => window.removeEventListener('keypress', listener);
    }, [disabled, normalizedTrigger, handler]);

    return (
        <span className={classNames('keyboard-trigger', normalizedTrigger === 'space' && 'space')}>
            {label}
        </span>
    );
};

export const Keyset = ({ triggers, onSelect, showSpaceAsUnderscore }) => (
    <span className="keyset">
        {triggers.map((trigger, i) => (
            <KeyboardTrigger
                trigger={trigger}
                showSpaceAsUnderscore={showSpaceAsUnderscore}
                key={i}
                handler={onSelect && (() => onSelect(trigger))}
            />
        ))}
    </span>
);

export const PressSpaceToContinue = ({ handler }) => (
    <span className="press-space-to-continue">
        Press <KeyboardTrigger trigger="space" handler={handler} /> to continue.
    </span>
);
