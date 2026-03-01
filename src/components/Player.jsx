import * as React from 'react'
import {FaCirclePlay, FaCirclePause, FaForwardStep, FaBackwardStep} from 'react-icons/fa6'

const audio = new Audio()

const padString = number =>
  String(number).padStart(2, '0')

const formatTime = time =>
  `${padString(Math.floor(time / 60))}:${padString(Math.floor(time % 60))}`

const iconSize = 30

function Player({
    currentSong,
    updateSongId
}) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)

    React.useEffect(() => {
        audio.src = `/songs/${currentSong.filename}`
    }, [currentSong])

    React.useEffect(() => {
        const timeUpdateListener = () => setCurrentTime(audio.currentTime)
        const loadedMetaDataListener = () => setDuration(audio.duration)
        const playListener = () => setIsPlaying(true)
        const pauseListener = () => setIsPlaying(false)

        audio.addEventListener('timeupdate', timeUpdateListener)
        audio.addEventListener('loadedmetadata', loadedMetaDataListener)
        audio.addEventListener('play', playListener)
        audio.addEventListener('pause', pauseListener)

        return () => {
            audio.removeEventListener('timeupdate', timeUpdateListener)
            audio.removeEventListener('loadedmetadata', loadedMetaDataListener)
            audio.removeEventListener('play', playListener)
            audio.removeEventListener('pause', pauseListener)
        }
    }, [])

    return (
        <div className="player">
            <div className='header' style={{animationPlayState: !isPlaying ? 'paused' : 'running'}}></div>
    
            <div className="content">
                <div className="song-info">
                    <p>{currentSong.artist}</p>
                    <p>{currentSong.name}</p>
                    <p className='duration'>{formatTime(currentTime)} / {formatTime(duration)}</p>
                </div>
    
                <div className="control">
                    <div className="progress-bar" style={{width: ((currentTime / duration) * 100) + '%'}}></div>

                    <FaBackwardStep
                        size={iconSize}
                        onClick={() => updateSongId(prev => prev <= 1 ? songs.length : prev - 1)}
                    />
        
                    {audio.paused ? (
                        <FaCirclePlay
                            size={iconSize}
                            onClick={() => audio.play()}
                        />
                    ) : (
                        <FaCirclePause
                            size={iconSize}
                            onClick={() => audio.pause()}
                        />
                    )}
        
                    <FaForwardStep
                        size={iconSize}
                        onClick={() => updateSongId(prev => prev >= songs.length ? 1 : prev + 1)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player