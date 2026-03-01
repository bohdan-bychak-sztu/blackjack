import React, {useState} from "react";
import styles from './MusicToggleButton.module.css';

/**
 * A button that toggles the background music.
 * @param {object} props - The component props.
 * @param {HTMLAudioElement} props.backgroundMusic - The audio element for the background music.
 * @returns {JSX.Element} The rendered music toggle button.
 */
function MusicToggleButton({backgroundMusic}) {
    const [isPlaying, setIsPlaying] = useState(false);

    /**
     * Toggles the background music on and off.
     */
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

export default MusicToggleButton