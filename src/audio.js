/* globals jsPsych */

let globalVolume = 1;

export const setGlobalVolume = (val) => {
    globalVolume = val;
};

export const getGlobalVolume = () => globalVolume;

export const playAudio = (fileName, onEnd, volume = globalVolume) => {
    const { pluginAPI } = jsPsych;
    const context = pluginAPI.audioContext();
    if (context) {
        const source = context.createBufferSource();
        const gainNode = context.createGain();
        source.buffer = pluginAPI.getAudioBuffer(fileName);
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        source.addEventListener('ended', onEnd);
        source.start(context.currentTime);
    } else {
        const audio = pluginAPI.getAudioBuffer(fileName);
        audio.currentTime = 0;
        audio.volume = volume;
        audio.addEventListener('ended', onEnd);
        audio.play();
    }
};
