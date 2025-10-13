import songs from '../data.json'

const SongsList = () => {
  const {setCurrentSongId} = React.useContext(PlayerContext)

  return (
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
  )
}

export default SongsList