import { getUrlParam } from './util';

export const COMPLETION_URL = JSON.parse(
    '[104,116,116,112,115,58,47,47,97,112,112,46,112,114,111,108,105,102,105,99,46,99,111,47,115,117,98,109,105,115,115,105,111,110,115,47,99,111,109,112,108,101,116,101,63,99,99,61,56,55,53,68,69,48,53,57]'
);

export const getProlificIds = () => {
    return {
        prolificPid: getUrlParam('PROLIFIC_PID'),
        studyId: getUrlParam('STUDY_ID'),
        sessionId: getUrlParam('SESSION_ID'),
    };
};

export const getCompletionUrl = () => {
    return COMPLETION_URL.map((code) => String.fromCharCode(code)).join('');
};
