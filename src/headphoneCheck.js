/* global jsPsych */
const correctAnswerMap = {
    'antiphase_HC_ISO.wav': 2,
    'antiphase_HC_IOS.wav': 3,
    'antiphase_HC_SOI.wav': 1,
    'antiphase_HC_SIO.wav': 1,
    'antiphase_HC_OSI.wav': 2,
    'antiphase_HC_OIS.wav': 3,
};

export const getAssetFilenameForKey = (file) => `media/audio/headphone-check/${file}`;

export const getRandomHeadphoneCheck = (length) => {
    const keys = Object.keys(correctAnswerMap);
    const randomKeys = jsPsych.randomization.repeat(keys, Math.ceil(length / keys.length));
    return randomKeys
        .map((key) => {
            return {
                filename: getAssetFilenameForKey(key),
                correctAnswer: correctAnswerMap[key],
            };
        })
        .slice(0, length);
};

export const calibrationFilename = getAssetFilenameForKey('noise_calib_stim.wav');

export const headphoneCheckFiles = [
    ...Object.keys(correctAnswerMap).map(getAssetFilenameForKey),
    calibrationFilename,
];
