import * as React from 'react'
import {FaCirclePlay, FaCirclePause, FaForwardStep, FaBackwardStep} from 'react-icons/fa6'
import songs from '../data.json'
import { useSong, useSongInfo } from '../hooks'
import { PlayerContext } from '../Provider'
import { formatTime } from '../utils'

const Player = React.memo(({
  songId,
}) => {
  const item = songs.byId[songId]
  const {setCurrentSongId} = React.useContext(PlayerContext)
  const {isSongPlaying, play, pause} = useSong(`/songs/${item.filename}`)
  const {currentTime, duration} = useSongInfo()

  if (!item) return

  const playStateStyle = {
    animationPlayState: isSongPlaying ? 'running' : 'paused'
  }

  const progressBarWidth = (currentTime / duration) * 100

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
      <div className='header' style={playStateStyle}></div>

      <div className="content">
        <div className="song-info">
          <p>{item.artist}</p>
          <p>{item.name}</p>
          <p className='duration'>{formatTime(currentTime)} / {formatTime(duration)}</p>
        </div>

        <div className="control">
          <div className="progress-bar" style={{width: progressBarWidth + '%'}}></div>
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