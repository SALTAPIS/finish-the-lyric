# 🎤 Finish the Lyric!

An interactive karaoke-style music trivia game where players speak or sing the next line of famous song lyrics. Built with React, Vite, and the Web Speech API.

![Game Screenshot](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Game Overview

"Finish the Lyric!" is a crowd-participation game perfect for parties, events, or just having fun with friends. The game displays famous song lyrics and challenges players to speak or sing the next line. Using speech recognition technology, it automatically detects and scores responses.

### Features

- 🎵 **50 Songs** across 5 categories
- 🎙️ **Speech Recognition** - No manual input needed
- 🎼 **Background Music** - Instrumental versions from iTunes API
- 🏆 **Automatic Scoring** - Tracks wins and losses
- 🎨 **Beautiful UI** - Smooth animations and visual effects
- 📱 **Responsive Design** - Works on desktop and mobile
- 🐛 **Debug Mode** - Press Ctrl+D (Cmd+D on Mac) to see expected answers
- 🔄 **Autonomous Gameplay** - No clicks needed between rounds

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with speech recognition support (Chrome, Edge, Safari)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SALTAPIS/finish-the-lyric.git
cd finish-the-lyric
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

1. **Choose a Category**: Select from Pop, Rock, Soul, Hip Hop, or "Everybody Knows"
2. **Watch the Countdown**: Get ready as the countdown begins
3. **Read the Lyrics**: Famous song lyrics appear on screen
4. **Speak/Sing the Answer**: When the microphone activates (20 seconds), speak or sing the next line
5. **Get Your Score**: The game automatically detects if you got it right
6. **Keep Playing**: The game continues automatically to the next song

### Categories

- **Pop** (10 songs) - Modern hits and classics
- **Rock** (10 songs) - Rock anthems everyone knows
- **Soul** (10 songs) - Timeless soul classics
- **Hip Hop** (10 songs) - From old school to modern hits
- **Everybody Knows** (10 songs) - Universal classics that everyone recognizes

## 🛠️ Technical Details

### Built With

- **React 18.3** - UI framework
- **Vite 5.4** - Build tool and dev server
- **Web Speech API** - Speech recognition
- **iTunes Search API** - Instrumental music previews
- **CSS3** - Animations and styling
- **Vercel Analytics** - Usage tracking

### Key Features Implementation

#### Speech Recognition
The game uses the Web Speech API for continuous speech recognition with interim results. It evaluates answers based on:
- Exact matches for complete answers
- 60%+ word matching for substantial partial matches
- 40%+ word matching as a fallback threshold

#### Music Integration
- Searches iTunes for instrumental/karaoke versions of songs
- Falls back gracefully when no instrumental is available
- Implements fade in/out effects for smooth transitions
- Caches API results for better performance

#### Game Flow
- Fully autonomous progression between rounds
- No manual clicks required during gameplay
- Automatic timing for each phase:
  - Countdown: 5 seconds
  - Listening: 20 seconds
  - Results: 5 seconds
  - Score display: 3 seconds

### Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Safari
- ⚠️ Firefox (no speech recognition support)

## 📁 Project Structure

```
finish-the-lyric/
├── src/
│   ├── App.jsx          # Main game component
│   ├── App.css          # Styling
│   ├── data/
│   │   └── lyrics.json  # Song database
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets & PWA files
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎨 Customization

### Adding New Songs

Add songs to the `src/data/lyrics.json` file in the appropriate category:

```javascript
{
  "setup": "First line of the song",
  "answer": "the line that comes next",
  "hint": "Artist - Song Title",
  "searchTerm": "Artist Song Title"
}
```

### Styling

Modify `App.css` to change colors, fonts, or animations. The game uses CSS variables for easy theming.

### Game Settings

Adjust these constants in `App.jsx`:
- `COUNTDOWN_TIME`: Countdown duration (default: 5 seconds)
- `LISTENING_TIME`: Listening duration (default: 20 seconds)
- `RESULT_DISPLAY_TIME`: Result display duration (default: 5 seconds)

## 🐛 Debug Mode

Press **Ctrl+D** (or **Cmd+D** on Mac) during gameplay to enable debug mode, which shows:
- Expected answer during the listening phase
- What was actually heard during results
- Console logging for troubleshooting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Song lyrics are for educational and entertainment purposes only
- iTunes API for providing music previews
- Web Speech API for making voice interaction possible
- All the amazing artists whose songs make this game fun!

## 🐛 Known Issues

- Speech recognition requires HTTPS in production
- Firefox doesn't support Web Speech API
- Some songs may not have instrumental versions available
- Recognition accuracy varies with microphone quality and background noise

## 📧 Contact

Created by [@lrock](https://twitter.com/lrock) - feel free to reach out!

---

Made with ❤️ and 🎵
