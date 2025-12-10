import { Formik, Field, Form } from 'formik';
import styles from './SettingsPage.module.css';
import { useTranslation } from "react-i18next";
import { useActivePlayer, useGameActions } from "../../store/selectors";
import useStore from "../../store/useStore";

export default function SettingsPage() {
    const { t, i18n } = useTranslation();

    const player = useActivePlayer();
    const { updateSettings } = useGameActions();

    const playerCount = useStore((state) => Object.keys(state.players).length);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    if (!player) {
        return <div className={styles.container}><h3>{t("selectPlayerFirst")}</h3></div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("configureSettings")}</h2>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    deckNumber: player.settings.deckNumber || 1,
                    name: player.settings.name || `Player ${playerCount}`,
                    language: i18n.language || 'en',
                    autoActions: player.settings.autoActions || false
                }}
                onSubmit={(values) => {
                    const newPlayerSettings = {
                        deckNumber: values.deckNumber,
                        name: values.name,
                        autoActions: values.autoActions,
                    };

                    updateSettings(player.id, newPlayerSettings);

                    changeLanguage(values.language);
                }}
            >
                <Form>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">{t("playerName")}</label>
                        <Field
                            id="name"
                            name="name"
                            placeholder="Player Name"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>{t("numberOfDecks")}</label>
                        <div className={styles.radioGroup}>
                            {[1, 2, 3, 4, 6, 8].map(number => (
                                <label key={number} className={styles.radioLabel}>
                                    <Field
                                        type="radio"
                                        name="deckNumber"
                                        value={number.toString()}
                                        className={styles.radioInput}
                                    />
                                    {number}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="language">{t("language")}</label>
                        <Field as="select" id="language" name="language" className={styles.input}>
                            <option value="en">English</option>
                            <option value="uk">Українська</option>
                            <option value="es">Español</option>
                            <option value="zh">中国人</option>
                        </Field>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="autoActions">{t("autoActions")}</label>
                        <Field
                            type="checkbox"
                            id="autoActions"
                            name="autoActions"
                            className={styles.checkbox}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        {t("save")}
                    </button>
                </Form>
            </Formik>
        </div>
    );
}