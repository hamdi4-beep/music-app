import * as React from 'react'
import Player from './Player'
import SongsList from './SongsList'
import { PlayerContext } from '../Provider'

const PlayerContainer = () => {
  const {currentSongId} = React.useContext(PlayerContext)

  return (
    <div className="player-container">
      <SongsList />
      <Player songId={currentSongId} />
    </div>
  )
}

export default PlayerContainer