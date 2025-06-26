# Audio Options for Finish the Lyric Game

## Current Issues with SoundHelix
- Generic placeholder music that doesn't match the actual songs
- No relation to the lyrics being displayed
- Limited hosting reliability

## Better Audio Options

### 1. YouTube Background Integration (Recommended)
**Pros:**
- Access to actual songs
- Reliable hosting
- Free for non-commercial use

**Implementation Options:**
```javascript
// Option A: YouTube IFrame API
// Add to index.html:
<script src="https://www.youtube.com/iframe_api"></script>

// In your component:
const player = new YT.Player('player', {
  height: '0',
  width: '0',
  videoId: 'VIDEO_ID',
  playerVars: {
    'autoplay': 1,
    'controls': 0,
    'start': 30, // Start at 30 seconds
    'end': 50    // End at 50 seconds
  }
});
```

**Challenges:**
- Need to manage YouTube video IDs for each song
- Some videos may be region-locked
- Ads might interrupt gameplay

### 2. Spotify Web API
**Pros:**
- High-quality audio
- Extensive music library
- 30-second preview clips available

**Implementation:**
```javascript
// Requires Spotify API registration
const audioUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
// Returns preview_url with 30-second clip
```

**Challenges:**
- Requires API key
- Preview clips only (30 seconds)
- Not all songs have previews

### 3. Self-Hosted Audio Clips
**Pros:**
- Complete control
- No external dependencies
- Can use fair use clips (10-15 seconds)

**Implementation:**
```javascript
// Store clips in public/audio/
audioUrl: "/audio/journey-dont-stop-believing.mp3"
```

**Legal Considerations:**
- Keep clips under 15 seconds
- Use for educational/non-commercial purposes
- Consider instrumental versions

### 4. Free Music APIs

#### Deezer API
- Provides 30-second previews
- No authentication needed for previews
- Good international coverage

#### iTunes Search API
- Free, no authentication
- 30-second previews
- Reliable hosting

**Example:**
```javascript
// iTunes API
fetch(`https://itunes.apple.com/search?term=${songName}&entity=song&limit=1`)
  .then(res => res.json())
  .then(data => {
    const previewUrl = data.results[0].previewUrl;
  });
```

### 5. Background Music Services

#### Jamendo
- Free music for non-commercial use
- API available
- Good for background ambiance

#### Free Music Archive
- Creative Commons music
- API access
- Legal for most uses

## Recommended Approach

For the best user experience:

1. **Primary**: Use YouTube IFrame API with muted, hidden player
   - Set specific start/end times for each song
   - Mute by default to avoid copyright claims

2. **Fallback**: iTunes Search API for preview clips
   - Automatically fetch preview URLs
   - Cache results to reduce API calls

3. **Enhancement**: Add volume control for users
   - Let users unmute if they want
   - Store preference in localStorage

## Implementation Example

```javascript
const LYRICS_DATA = [
  {
    setup: "Just a small town girl, living in a lonely world",
    answer: "she took the midnight train going anywhere",
    hint: "Journey - Don't Stop Believin'",
    youtubeId: "1k8craCGpgs",
    startTime: 45,
    endTime: 60,
    itunesId: "192471223"
  },
  // ... more songs
];

// YouTube player setup
function loadYouTubePlayer(videoId, startTime, endTime) {
  if (window.YT) {
    player = new YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        'autoplay': 1,
        'controls': 0,
        'start': startTime,
        'end': endTime,
        'loop': 1
      },
      events: {
        'onReady': (event) => {
          event.target.setVolume(30);
          event.target.playVideo();
        }
      }
    });
  }
}
```

## Legal Notes
- Always respect copyright
- Use preview clips when possible
- Consider licensing for commercial use
- Fair use typically allows short clips for educational purposes
- Attribute artists properly 