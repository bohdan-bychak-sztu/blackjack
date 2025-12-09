import React, {useState} from "react";
import {Link, NavLink, Outlet} from "react-router";
import styles from './Layout.module.css';
import Modal from "../../components/Modal/Modal.jsx";
import ResultPage from "../ResultPage.jsx";
import SettingsPage from "../SettingsPage/SettingsPage.jsx";
import UserSelectionPage from "../UserSelection/UserSelectionPage.jsx";
import MusicToggleButton from "../../components/MusicToggleButton/MusicToggleButton.jsx";
import useSound from "../../hooks/useSound.js";
import {useTranslation} from "react-i18next";

export default function Layout() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserSelectionOpen, setisUserSelectionOpen] = useState(false);
    const backgroundMusic = useSound("https://dl.dropboxusercontent.com/s/ffrza66hn71iy2sj4nyvg/background_music.mp3?rlkey=dihmh3wprk52vus7qsbv1djir&st=525gq6yd&dl=0", true);
    const {t} = useTranslation();

    return (
        <div className={styles["app-container"]}>
            <header className={styles["header"]}>
                <span>
                    <NavLink to={"/start"} className={styles["home-link"]}><img
                        src={`${import.meta.env.BASE_URL}icons/home_icon.png`} alt="home" loading="lazy"/>
                    </NavLink>
                    <span className={styles.button} onClick={() => setisUserSelectionOpen(true)}><img
                        src={`${import.meta.env.BASE_URL}icons/settings_icon.png`} alt="user selecting" loading="lazy"/>
                    </span>
                </span>
                <span>🃏 Blackjack</span>
                <span>
                    <span className={styles.button}>
                        <MusicToggleButton backgroundMusic={backgroundMusic}/>
                    </span>
                    <span className={styles.button} onClick={() => setIsSettingsOpen(true)}><img
                        src={`${import.meta.env.BASE_URL}icons/settings_icon.png`} alt="settings"
                        loading="lazy"/>
                    </span>
                    <span className={styles.button} onClick={() => setIsInfoOpen(true)}><img
                        src={`${import.meta.env.BASE_URL}icons/info_icon.png`} alt="info" loading="lazy"/>
                    </span>
                </span>
                <Modal isOpen={isSettingsOpen} title={t("settings")} onClose={() => {
                    setIsSettingsOpen(false);
                }}>
                    <SettingsPage/>
                </Modal>
                <Modal isOpen={isUserSelectionOpen} title={t("userSelecting")} onClose={() => {
                    setisUserSelectionOpen(false);
                }}>
                    <UserSelectionPage/>
                </Modal>

                <Modal isOpen={isInfoOpen} title={t("howToPlay")} onClose={() => setIsInfoOpen(false)}>
                    <p>{t("description")}</p>
                </Modal>
            </header>
            <main className={styles["main"]}>
                <Outlet/>
            </main>
            <footer className={styles["footer"]}>© 2025 Blackjack Demo</footer>
        </div>
    );
}
