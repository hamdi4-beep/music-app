import songs from '../data.json'
import { useSongInfo } from '../hooks'
import { formatTime } from '../utils'

const SongInfo = ({
  songId
}) => {
  const {currentTime, duration} = useSongInfo()
  const item = songs.byId[songId]

  return (
    <div className="song-info">
      <p>{item.artist}</p>
      <p>{item.name}</p>
      <p className='duration'>{formatTime(currentTime)} / {formatTime(duration)}</p>
    </div>
  )
}

export default SongInfo