import { useCallback, useState } from 'react';

import { playAudio } from '../../audio';

export const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playFile = useCallback((fileName, onEnd, volume) => {
        if (isPlaying) {
            return;
        }
        setIsPlaying(true);
        playAudio(
            fileName,
            () => {
                setIsPlaying(false);
                onEnd && onEnd();
            },
            volume
        );
    });

    return { isPlaying, playFile };
};
