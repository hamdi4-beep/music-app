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
    previousSong,
    nextSong
}) {
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)

    React.useEffect(() => {
        audio.src = `/songs/${currentSong.filename}`
    }, [currentSong])

    React.useEffect(() => {
        const timeUpdateListener = () => setCurrentTime(audio.currentTime)
        const loadedMetaDataListener = () => setDuration(audio.duration)

        audio.addEventListener('timeupdate', timeUpdateListener)
        audio.addEventListener('loadedmetadata', loadedMetaDataListener)

        return () => {
            audio.removeEventListener('timeupdate', timeUpdateListener)
            audio.removeEventListener('loadedmetadata', loadedMetaDataListener)
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
                        size={iconSize}
                        onClick={() => previousSong()}
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
                        onClick={() => nextSong()}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player