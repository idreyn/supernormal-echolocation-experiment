import isInternetExplorer from 'check-ie';

export const getDeviceEligibility = () => {
    const { isIE } = isInternetExplorer(navigator.userAgent);
    const isScreenTooSmall = window.innerWidth < 800;
    const isIneligible = isScreenTooSmall || isIE;
    return { isIE, isScreenTooSmall, isIneligible };
};
