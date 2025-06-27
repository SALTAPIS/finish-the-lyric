# 🎤 Finish the Lyric!

An interactive karaoke-style music trivia game where players speak or sing the next line of famous song lyrics. Built with React, Vite, and the Web Speech API.

![Game Screenshot](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Game Overview

"Finish the Lyric!" is a crowd-participation game perfect for parties, events, or just having fun with friends. The game displays famous song lyrics and challenges players to speak or sing the next line. Using speech recognition technology, it automatically detects and scores responses.

### Features

- 🎵 **200+ Songs** across 5 categories
- 🎙️ **Speech Recognition** - No manual input needed
- 🎼 **Background Music** - Instrumental versions from iTunes API
- 🏆 **Automatic Scoring** - Tracks wins and losses
- 🎨 **Beautiful UI** - Smooth animations and visual effects
- 📱 **Responsive Design** - Works on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with speech recognition support (Chrome, Edge, Safari)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finish-the-lyric.git
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
4. **Speak/Sing the Answer**: When the microphone activates, speak or sing the next line
5. **Get Your Score**: The game automatically detects if you got it right
6. **Keep Playing**: The game continues automatically to the next song

### Categories

- **Pop** (40 songs) - Modern hits from Taylor Swift, Adele, Bruno Mars, and more
- **Rock** (40 songs) - Classic rock anthems from Queen, AC/DC, Nirvana, and more
- **Soul** (40 songs) - Timeless soul classics from Aretha Franklin, Marvin Gaye, and more
- **Hip Hop** (40 songs) - From old school to modern hits
- **Everybody Knows** (40 songs) - Universal classics that everyone recognizes

## 🛠️ Technical Details

### Built With

- **React 18.3** - UI framework
- **Vite 5.4** - Build tool and dev server
- **Web Speech API** - Speech recognition
- **iTunes Search API** - Instrumental music previews
- **CSS3** - Animations and styling

### Key Features Implementation

#### Speech Recognition
The game uses the Web Speech API for continuous speech recognition with interim results. It evaluates answers based on 50% word matching to account for variations in pronunciation and speech patterns.

#### Music Integration
- Searches iTunes for instrumental/karaoke versions of songs
- Falls back gracefully when no instrumental is available
- Implements fade in/out effects for smooth transitions

#### Game Flow
- Fully autonomous progression between rounds
- No manual clicks required during gameplay
- Automatic timing for each phase (countdown, listening, results)

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
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎨 Customization

### Adding New Songs

Add songs to the `LYRICS_BY_CATEGORY` object in `App.jsx`:

```javascript
{
  setup: "First line of the song",
  answer: "the line that comes next",
  hint: "Artist - Song Title",
  searchTerm: "Artist Song Title"
}
```

### Styling

Modify `App.css` to change colors, fonts, or animations. The game uses CSS variables for easy theming.

### Game Settings

Adjust these constants in `App.jsx`:
- Listening time: Change `listeningTimeLeft` initial value (default: 20 seconds)
- Result display time: Modify timeout in `evaluateResults` (default: 5 seconds)
- Audio volume: Adjust `audioVolume` state (default: 0.3)

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

Your Name - [@yourtwitter](https://twitter.com/lrock)
 

---

Made with ❤️ and 🎵
