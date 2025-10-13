import { useState, useEffect } from "react";

const audio = new Audio()

const registerEventListener = (eventName, eventHandler) => {
    audio.addEventListener(eventName, eventHandler)
    return () => audio.removeEventListener(eventName, eventHandler)
}

export function useSong(src) {
    const [isSongPlaying, setIsSongPlaying] = useState(false)

    useEffect(() => {
        audio.src = src

        if (audio.paused) setIsSongPlaying(false)

        const unregisterPlayListener = registerEventListener('play', () => setIsSongPlaying(true))
        const unregisterPauseListener = registerEventListener('pause', () => setIsSongPlaying(false))

        return () => {
            unregisterPlayListener()
            unregisterPauseListener()
        }
    }, [src])

    return {
        isSongPlaying,
        play: () => audio.play(),
        pause: () => audio.pause()
    }
}

export function useSongInfo() {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const unregisterTimeUpdateListener = registerEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
        const unregisterLoadedMetaDataListener = registerEventListener('loadedmetadata', () => setDuration(audio.duration))

        return () => {
            unregisterTimeUpdateListener()
            unregisterLoadedMetaDataListener()
        }
    }, [])

    return {
        currentTime,
        duration
    }
}