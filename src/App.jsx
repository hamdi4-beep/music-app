import * as React from 'react'
import Player from './components/Player'
import SongsList from './components/SongsList'
import { PlayerContext } from './Provider'

const PlayerContainer = () => {
  const {currentSongId} = React.useContext(PlayerContext)

  return (
    <div className="player-container">
      <SongsList />
      <Player songId={currentSongId} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <PlayerContainer />
    </div>
  )
}

export default App