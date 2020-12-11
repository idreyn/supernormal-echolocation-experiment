import { useCallback, useState } from 'react';

import { playAudio } from '../../audio';

export const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playFile = useCallback((fileName, onEnd) => {
        if (isPlaying) {
            return;
        }
        setIsPlaying(true);
        playAudio(fileName, () => {
            setIsPlaying(false);
            onEnd && onEnd();
        });
    });

    return { isPlaying, playFile };
};
