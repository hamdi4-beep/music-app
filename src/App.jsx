import * as React from 'react'
import {FaCirclePlay, FaCirclePause, FaForwardStep, FaBackwardStep} from 'react-icons/fa6'
import { formatTime } from './utils'
import songs from './data.json'

const audio = new Audio()

const registerEventListener = (eventName, eventHandler) => {
    audio.addEventListener(eventName, eventHandler)
    return () => audio.removeEventListener(eventName, eventHandler)
}

function App() {
  const [currentSongId, setCurrentSongId] = React.useState(1)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [isSongPlaying, setIsSongPlaying] = React.useState(false)

  const currentSong = songs.byId[currentSongId]
  const currentSrc = `/songs/${currentSong.filename}`

  React.useEffect(() => {
      audio.src = currentSrc

      if (audio.paused) setIsSongPlaying(false)

      const unregisterPlayListener = registerEventListener('play', () => setIsSongPlaying(true))
      const unregisterPauseListener = registerEventListener('pause', () => setIsSongPlaying(false))

      return () => {
          unregisterPlayListener()
          unregisterPauseListener()
      }
  }, [currentSrc])

  React.useEffect(() => {
      const unregisterTimeUpdateListener = registerEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
      const unregisterLoadedMetaDataListener = registerEventListener('loadedmetadata', () => setDuration(audio.duration))

      return () => {
          unregisterTimeUpdateListener()
          unregisterLoadedMetaDataListener()
      }
  }, [])

  const progressBarWidth = (currentTime / duration) * 100

  const handleNextClick = () =>
    setCurrentSongId(prev => songs.byId[prev + 1] ? prev + 1 : songs.allId[0])
    

  const handlePreviousClick = () =>
    setCurrentSongId(prev => songs.byId[prev - 1] ? prev - 1 : songs.allId[songs.allId.length - 1])

  return (
    <div className="player-container">
      <div className="songs-list">
        <ol>
          {songs.allId.map((songId, i) => {
            const song = songs.byId[songId]
  
            return (
              <li className="song-item" onClick={() => setCurrentSongId(songId)} key={songId}>
                <p>{song.name}</p>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="player">
        <div className='header' style={{animationPlayState: isSongPlaying ? 'running' : 'paused'}}></div>
  
        <div className="content">
          <div className="song-info">
            <p>{currentSong.artist}</p>
            <p>{currentSong.name}</p>
            <p className='duration'>{formatTime(currentTime)} / {formatTime(duration)}</p>
          </div>
  
          <div className="control">
            <div className="progress-bar" style={{width: progressBarWidth + '%'}}></div>
            <FaBackwardStep size={30} onClick={handlePreviousClick} />
  
            {!isSongPlaying ? (
              <FaCirclePlay size={30} onClick={() => audio.play()} />
            ) : (
              <FaCirclePause size={30} onClick={() => audio.pause()} />
            )}
  
            <FaForwardStep size={30} onClick={handleNextClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App