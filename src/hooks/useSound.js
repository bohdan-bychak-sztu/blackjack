import { useEffect, useRef } from "react";

export default function useSound(src, loop = false) {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(src);
        audioRef.current.loop = loop;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current = null;
            }
        };
    }, [src, loop]);

    const play = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().catch((error) => {
                console.error("Audio play failed. Ensure user interaction first.", error);
            });
        }
    };

    const pause = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
        }
    };

    const reset = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    return { play, pause, reset };
}