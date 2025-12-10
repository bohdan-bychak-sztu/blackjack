import React from "react";
import {useTranslation} from "react-i18next";

export default function ResultPage({ onRestart, result }) {
    const {t} = useTranslation();
    return (
        <div>
            <p>{result}</p>
            <button onClick={onRestart}>{t("playAgain")}</button>
        </div>
    );
}
