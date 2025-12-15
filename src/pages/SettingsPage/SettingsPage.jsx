import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SettingsPage.module.css';
import { useTranslation } from "react-i18next";
import { useActivePlayer, useGameActions } from "../../store/selectors";
import useStore from "../../store/useStore";

const DECK_OPTIONS = [1, 2, 3, 4, 6, 8];

const LANGUAGE_OPTIONS = {
    'en': '🇬🇧 English',
    'uk': '🇺🇦 Українська',
    'es': '🇪🇸 Español',
    'zh': '🇨🇳 中文'
};

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

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, t("nameTooShort"))
            .max(15, t("nameTooLong"))
            .required(t("required") || "Required"),

        deckNumber: Yup.number()
            .typeError("Must be a number")
            .oneOf(DECK_OPTIONS, t("invalidOption"))
            .required(),

        language: Yup.string()
            .oneOf(Object.keys(LANGUAGE_OPTIONS), t("invalidLanguage"))
            .required(),

        autoActions: Yup.boolean()
    });

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("configureSettings")}</h2>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    deckNumber: player.settings.deckNumber?.toString() || "1",
                    name: player.settings.name || `Player ${playerCount}`,
                    language: i18n.language || 'en',
                    autoActions: player.settings.autoActions || false
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const newPlayerSettings = {
                        deckNumber: parseInt(values.deckNumber),
                        name: values.name,
                        autoActions: values.autoActions,
                    };

                    updateSettings(player.id, newPlayerSettings);
                    changeLanguage(values.language);

                    setSubmitting(false);
                    resetForm({ values });
                }}
            >
                {({ values, errors, touched, isValid, dirty }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="name">{t("playerName")}</label>
                            <Field
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
                            />
                            <ErrorMessage name="name" component="div" className={styles.errorText} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t("numberOfDecks")}</label>
                            <div className={styles.radioGroup} role="group">
                                {DECK_OPTIONS.map(number => (
                                    <label
                                        key={number}
                                        className={`${styles.radioChip} ${values.deckNumber === number.toString() ? styles.radioChipActive : ''}`}
                                    >
                                        <Field
                                            type="radio"
                                            name="deckNumber"
                                            value={number.toString()}
                                            className={styles.radioInputHidden}
                                        />
                                        {number}
                                    </label>
                                ))}
                            </div>
                            <ErrorMessage name="deckNumber" component="div" className={styles.errorText} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="language">{t("language")}</label>
                            <Field as="select" id="language" name="language" className={styles.select}>
                                {Object.entries(LANGUAGE_OPTIONS).map(([code, label]) => (
                                    <option key={code} value={code}>
                                        {label}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="language" component="div" className={styles.errorText} />
                        </div>

                        <div className={`${styles.formGroup} ${styles.rowGroup}`}>
                            <label className={styles.label} htmlFor="autoActions">{t("autoActions")}</label>
                            <label className={styles.switch}>
                                <Field type="checkbox" name="autoActions" className={styles.switchInput} />
                                <span className={styles.slider}></span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={styles.button}
                            disabled={!isValid || !dirty}
                        >
                            {t("save")}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}