# Music Player MVP

A lightweight React-based music player with essential playback controls and song navigation.

## Key Features

- **Playback Controls**: Play, pause, and navigate between tracks with previous/next buttons
- **Song Queue**: Sidebar list displaying all available tracks with click-to-play functionality
- **Real-time Playback Info**: Displays current track time and total duration with formatted timestamps
- **Visual Feedback**: Rotating album art animation that responds to playback state
- **Automatic Track Cycling**: Seamlessly loops to first/last track when navigating beyond playlist boundaries
- **Context-based State Management**: Centralized player state using React Context API
- **Persistent Audio Instance**: Single audio element shared across components for consistent playback

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173` (or the port specified by Vite).
