import React, {useState} from "react";
import styles from './MusicToggleButton.module.css';

export default function MusicToggleButton({backgroundMusic}) {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        if (isPlaying) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button className={styles.musicToggleButton} onClick={toggleMusic}>
            {isPlaying ? "🔊" : "🔈"}
        </button>
    );
}
