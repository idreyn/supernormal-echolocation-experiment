import React, { useRef, useState } from 'react';

import { consentFormText } from '../consentFormText';

const ConsentForm = (props) => {
    const { onFinish } = props;
    const containerRef = useRef(null);
    const [readyToComplete, setReadyToComplete] = useState(false);

    const handleClick = () => {
        if (readyToComplete) {
            onFinish();
        } else {
            const { current: container } = containerRef;
            const sections = [...container.querySelectorAll('section')];
            const currentSectionIndex = sections.findIndex(
                (section) => section.offsetTop >= container.scrollTop
            );
            const nextSection = sections[currentSectionIndex + 1];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                onFinish();
            }
        }
    };

    const handleScroll = (evt) => {
        const container = evt.target;
        const scrolledToBottom =
            container.scrollTop >= container.scrollHeight - container.offsetHeight;
        setReadyToComplete(scrolledToBottom);
    };

    return (
        <div className="text-content">
            <h1>Participant consent form</h1>
            <div className="consent-form-content" ref={containerRef} onScroll={handleScroll}>
                {consentFormText}
            </div>
            <button className="jspsych-btn primary" onClick={handleClick}>
                {readyToComplete ? 'I understand and agree' : 'Next Section »'}
            </button>
        </div>
    );
};

export default ConsentForm;
