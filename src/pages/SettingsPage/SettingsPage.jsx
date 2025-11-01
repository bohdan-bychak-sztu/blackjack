import { Formik, Field, Form } from 'formik';
import { useContext } from "react";
import styles from './SettingsPage.module.css';
import AppContext from "../../contexts/AppContext.js";

export default function SettingsPage() {
    const {players, settings} = useContext(AppContext);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Configure your game settings</h2>
            <Formik
                initialValues={{
                    deckNumber: settings.userSettings.deckNumber || 1,
                    name: settings.userSettings.name || `Player ${players.players.length + 1}`
                }}
                onSubmit={(values) => {
                    const newPlayerSettings = {
                        deckNumber: values.deckNumber,
                        name: values.name
                    };
                    settings.setSettings(newPlayerSettings);
                    players.updatePlayer(players.activePlayer.id, newPlayerSettings)
                }}
            >
                <Form>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Player Name:</label>
                        <Field
                            id="name"
                            name="name"
                            placeholder="Player Name"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Number of Decks:</label>
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

                    <button type="submit" className={styles.button}>
                        Save Settings
                    </button>
                </Form>
            </Formik>
        </div>
    );
}