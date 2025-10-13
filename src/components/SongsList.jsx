import songs from '../data.json'

const SongsList = ({ updateCurrentSong }) => {
  return (
    <div className="songs-list">
      <ol>
        {songs.allId.map((songId, i) => {
          const song = songs.byId[songId]

          return (
            <li className="song-item" onClick={() => updateCurrentSong(songId)} key={songId}>
              <p>{song.name}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default SongsList