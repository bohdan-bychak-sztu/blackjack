import {Formik, Field, Form} from 'formik';
import useSettings from "../hooks/useSettings.js";
import usePlayers from "../hooks/usePlayers.js";
import {useNavigate} from "react-router";

export default function SettingsPage() {
    const {players, addPlayer, updatePlayer, removePlayer, clearPlayers, activePlayer, setActivePlayer} = usePlayers();
    const {userSettings, setSettings} = useSettings(activePlayer ? activePlayer.id.toString() : "default");
    const navigate = useNavigate();

    return (
        <div>
            <p>Configure your game settings here.</p>
            <Formik initialValues={
                {
                    deckNumber: userSettings.deckNumber || 1
                }
            } onSubmit={
                (values) => {
                    setSettings({
                        deckNumber: values.deckNumber
                    });
                    navigate('/game', { state: { refresh: Date.now() } });

                }}>
                <Form>
                    <label aria-labelledby="deckNumber">Number of Decks:</label>
                    <span>
                        <label>
                            <Field type="radio" name="deckNumber" value="1"/> 1
                        </label>
                        <label>
                            <Field type="radio" name="deckNumber" value="2"/> 2
                        </label>
                        <label>
                            <Field type="radio" name="deckNumber" value="3"/> 3
                        </label>
                        <label>
                            <Field type="radio" name="deckNumber" value="4"/> 4
                        </label>
                        <label>
                            <Field type="radio" name="deckNumber" value="6"/> 6
                        </label>
                        <label>
                            <Field type="radio" name="deckNumber" value="8"/> 8
                        </label>
                    </span>


                    <button type="submit">Save Settings</button>
                </Form>

            </Formik>
        </div>
    );
}