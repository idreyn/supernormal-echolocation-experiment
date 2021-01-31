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
    chosen = false,
}) => {
    const normalizedTrigger = trigger.toLowerCase();
    const label = trigger === 'space' && showSpaceAsUnderscore ? '_' : trigger;

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
        <span
            className={classNames(
                'keyboard-trigger',
                normalizedTrigger.length > 1 && 'long',
                chosen && 'chosen'
            )}
        >
            {label}
        </span>
    );
};

export const Keyset = ({ triggers, chosenTrigger, onSelect, showSpaceAsUnderscore }) => (
    <span className="keyset">
        {triggers.map((trigger, i) => (
            <KeyboardTrigger
                key={i}
                trigger={trigger}
                chosen={trigger === chosenTrigger}
                showSpaceAsUnderscore={showSpaceAsUnderscore}
                handler={onSelect && (() => onSelect(trigger))}
            />
        ))}
    </span>
);

export const ContinueKey = ({ handler }) => (
    <span className="continue-key">
        Press <KeyboardTrigger trigger="enter" handler={handler} /> to continue.
    </span>
);
