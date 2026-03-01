import React from "react";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import styles from "./CookiePopup.module.css";

const CookiePopup = ({forceVisible = false, location = "bottom"}) => {
    const { t } = useTranslation();

    const gdprConsent = useStore((state) => state.gdprConsent);
    const setGDPRConsent = useStore((state) => state.setGDPRConsent);


    return (
        <CookieConsent
            debug={forceVisible}
            location={location}
            buttonText={t("cookies.accept")}
            declineButtonText={t("cookies.decline")}
            enableDeclineButton
            onAccept={() => setGDPRConsent(true)}
            onDecline={() => setGDPRConsent(false)}
            cookieName="blackjack-consent-given"
            containerClassName={styles.container}
            buttonClassName={styles.acceptBtn}
            declineButtonClassName={styles.declineBtn}
        >
            <div className={styles.content}>
                <span className={styles.title}>🍪 {t("cookies.title")}</span>
                <p className={styles.description}>
                    {t("cookies.desc")}
                    <a href="/PRIVACY_POLICY.md" className={styles.link}> {t("cookies.link")}</a>
                </p>
            </div>
        </CookieConsent>
    );
};

export default CookiePopup;