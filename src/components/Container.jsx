import * as React from 'react'
import { songs } from '../songs'
import Player from './Player'

function Container() {
    const [currentSongId, setCurrentSongId] = React.useState(1)
    const currentSong = songs.find(song => song.id === currentSongId)

    return (
        <div className="player-container">
            <div className="songs-list">
                <ol>
                    {songs.map(song => (
                        <li
                            key={song.id}
                            className='song-item'
                            onClick={() => setCurrentSongId(song.id)}
                        >
                            <p>{song.name}</p>
                        </li>
                    ))}
                </ol>
            </div>

            <Player
                currentSong={currentSong}
                updateSongId={setCurrentSongId}
            />
        </div>
    )
}

export default Container