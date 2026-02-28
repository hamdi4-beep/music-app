import * as React from 'react'
import {FaCirclePlay, FaCirclePause, FaForwardStep, FaBackwardStep} from 'react-icons/fa6'
import { songs } from '../songs'

const audio = new Audio()

const padString = number =>
  String(number).padStart(2, '0')

const formatTime = time =>
  `${padString(Math.floor(time / 60))}:${padString(Math.floor(time % 60))}`

const registerEventListener = (eventName, eventHandler) => {
    audio.addEventListener(eventName, eventHandler)
    return () => audio.removeEventListener(eventName, eventHandler)
}

function Player({
    currentSongId,
    updateSongId
}) {
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)

    const currentSong = songs.find(song => song.id === currentSongId)

    React.useEffect(() => {
        audio.src = `/songs/${currentSong.filename}`
    }, [currentSongId])

    React.useEffect(() => {
        const unregisterTimeUpdateListener = registerEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
        const unregisterLoadedMetaDataListener = registerEventListener('loadedmetadata', () => setDuration(audio.duration))

        return () => {
            unregisterTimeUpdateListener()
            unregisterLoadedMetaDataListener()
        }
    }, [])

    return (
        <div className="player">
            <div className='header' style={{animationPlayState: audio.paused ? 'paused' : 'running'}}></div>
    
            <div className="content">
                <div className="song-info">
                    <p>{currentSong.artist}</p>
                    <p>{currentSong.name}</p>
                    <p className='duration'>{formatTime(currentTime)} / {formatTime(duration)}</p>
                </div>
    
                <div className="control">
                    <div className="progress-bar" style={{width: ((currentTime / duration) * 100) + '%'}}></div>

                    <FaBackwardStep
                        size={30}
                        onClick={() => updateSongId(prev => prev <= 1 ? songs.length : prev - 1)}
                    />
        
                    {audio.paused ? (
                        <FaCirclePlay
                            size={30}
                            onClick={() => audio.play()}
                        />
                    ) : (
                        <FaCirclePause
                            size={30}
                            onClick={() => audio.pause()}
                        />
                    )}
        
                    <FaForwardStep
                        size={30}
                        onClick={() => updateSongId(prev => prev >= songs.length ? 1 : prev + 1)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player