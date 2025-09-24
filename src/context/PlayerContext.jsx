import { createContext } from "react";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [selected, setSelected] = useState("O");
    const [newGame, setNewGame] = useState("cpu");

    return (
        <PlayerContext.Provider value={{ selected, setSelected, newGame, setNewGame }}>
            {children}
        </PlayerContext.Provider>
    );
};