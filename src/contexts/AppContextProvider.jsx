import AppContext from "./AppContext.js";
import usePlayers from "../hooks/usePlayers.js";
import useSettings from "../hooks/useSettings.js";

export default function AppContextProvider({ children }) {
    const players = usePlayers();
    const settings = useSettings(players.activePlayer ? players.activePlayer.id.toString() : "default");


    const value = {
        players,
        settings
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}