import React from "react";
import {Link} from "react-router";
import styles from './Startpage.module.css';
import {useTranslation} from "react-i18next";

export default function StartPage() {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t("welcome")}</h2>
            <p>{t("welcome.shortDesc")}</p>
            <Link className={styles['link']} to={"/game"}>{t("startGame")}</Link>
        </div>
    );
}
