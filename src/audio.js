/* globals jsPsych */

export const playAudio = (fileName, onEnd) => {
    const { pluginAPI } = jsPsych;
    const context = pluginAPI.audioContext();

    if (context) {
        const source = context.createBufferSource();
        source.buffer = pluginAPI.getAudioBuffer(fileName);
        source.connect(context.destination);
        source.addEventListener('ended', onEnd);
        source.start(context.currentTime);
    } else {
        const audio = pluginAPI.getAudioBuffer(fileName);
        audio.currentTime = 0;
        audio.addEventListener('ended', onEnd);
        audio.play();
    }
};
