import * as React from 'react'

export const PlayerContext = React.createContext();

function Provider({ children }) {
    const [currentSongId, setCurrentSongId] = React.useState(1)

    return (
        <PlayerContext.Provider value={{currentSongId, setCurrentSongId}}>
            {children}
        </PlayerContext.Provider>
    )
}

export default Provider;