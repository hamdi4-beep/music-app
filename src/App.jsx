import * as React from 'react'
import {FaCirclePlay, FaCirclePause, FaForwardStep, FaBackwardStep} from 'react-icons/fa6'
import { songs } from './songs'

const audio = new Audio()

const padString = number =>
  String(number).padStart(2, '0')

const formatTime = time =>
  padString(Math.floor(time / 60)) + ':' + padString(Math.floor(time % 60))

const registerEventListener = (eventName, eventHandler) => {
    audio.addEventListener(eventName, eventHandler)
    return () => audio.removeEventListener(eventName, eventHandler)
}

function App() {
  const [currentSongId, setCurrentSongId] = React.useState(1)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  console.log(currentSongId)

  const currentSong = songs.find(song => song.id === currentSongId)
  const currentSrc = `/songs/${currentSong.filename}`

  React.useEffect(() => {
    audio.src = currentSrc
  }, [currentSongId])

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
    setCurrentSongId(prev => prev >= songs.length ? 1 : prev + 1)
    

  const handlePreviousClick = () =>
    setCurrentSongId(prev => prev <= 1 ? songs.length : prev - 1)

  return (
    <div className="player-container">
      <div className="songs-list">
        <ol>
          {songs.map(song => (
            <li className="song-item" onClick={() => setCurrentSongId(song.id)} key={song.id}>
              <p>{song.name}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="player">
        <div className='header' style={{animationPlayState: audio.paused ? 'paused' : 'running'}}></div>
  
        <div className="content">
          <div className="song-info">
            <p>{currentSong.artist}</p>
            <p>{currentSong.name}</p>
            <p className='duration'>{formatTime(currentTime)} / {formatTime(duration)}</p>
          </div>
  
          <div className="control">
            <div className="progress-bar" style={{width: progressBarWidth + '%'}}></div>
            <FaBackwardStep size={30} onClick={handlePreviousClick} />
  
            {audio.paused ? (
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