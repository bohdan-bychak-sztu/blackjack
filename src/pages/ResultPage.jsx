import React from "react";
import {useTranslation} from "react-i18next";

/**
 * A page that displays the result of the game.
 * @param {object} props - The component props.
 * @param {Function} props.onRestart - A function to call when the "Play Again" button is clicked.
 * @param {string} props.result - The result of the game.
 * @returns {JSX.Element} The rendered result page.
 */
export default function ResultPage({ onRestart, result }) {
    const {t} = useTranslation();
    return (
        <div>
            <p>{result}</p>
            <button onClick={onRestart}>{t("playAgain")}</button>
        </div>
    );
}
