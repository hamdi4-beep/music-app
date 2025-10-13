import * as React from 'react'
import {FaCirclePlay, FaCirclePause, FaForwardStep, FaBackwardStep} from 'react-icons/fa6'
import songs from '../data.json'
import SongInfo from './SongInfo'
import { useSong } from '../hooks'
import { PlayerContext } from '../Provider'

const Player = React.memo(({
  songId,
}) => {
  const {setCurrentSongId} = React.useContext(PlayerContext)
  const item = songs.byId[songId]
  const {isSongPlaying, play, pause} = useSong(`/songs/${item.filename}`)

  if (!item) return

  const style = {
    animationPlayState: isSongPlaying ? 'running' : 'paused'
  }

  const handleNextClick = () => {
    const nextSongId = songId + 1
    setCurrentSongId(songs.byId[nextSongId] ? nextSongId : songs.allId[0])
  }

  const handlePreviousClick = () => {
    const previousSongId = songId - 1
    setCurrentSongId(songs.byId[previousSongId] ? previousSongId : songs.allId[songs.allId.length - 1])
  }

  return (
    <div className="player">
      <div className='header' style={style}></div>

      <div className="content">
        <SongInfo songId={item.id} />

        <div className="control">
          <FaBackwardStep size={30} onClick={handlePreviousClick} />

          {!isSongPlaying ? (
            <FaCirclePlay size={30} onClick={() => play()} />
          ) : (
            <FaCirclePause size={30} onClick={() => pause()} />
          )}

          <FaForwardStep size={30} onClick={handleNextClick} />
        </div>
      </div>
    </div>
  )
})

export default Player