import { useState, useEffect, useRef } from 'react'
import './App.css'

const LYRICS_DATA = [
  {
    setup: "Just a small town girl, living in a lonely world",
    answer: "she took the midnight train going anywhere",
    hint: "Journey's Don't Stop Believin'",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder - replace with actual audio
  },
  {
    setup: "We are the champions, my friends",
    answer: "and we'll keep on fighting till the end",
    hint: "Queen anthem",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    setup: "Sweet dreams are made of this",
    answer: "who am I to disagree",
    hint: "Eurythmics classic",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    setup: "I want to rock and roll all night",
    answer: "and party every day",
    hint: "KISS party anthem",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    setup: "Mama, just killed a man",
    answer: "put a gun against his head",
    hint: "Bohemian Rhapsody",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    setup: "Hello darkness my old friend",
    answer: "I've come to talk with you again",
    hint: "Simon & Garfunkel",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  }
]

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLyric, setCurrentLyric] = useState(null)
  const [gameState, setGameState] = useState('waiting') // waiting, countdown, presenting, listening, result
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [isListening, setIsListening] = useState(false)
  const [animationClass, setAnimationClass] = useState('')
  const [transcripts, setTranscripts] = useState([]) // Array of transcripts with positions
  const [lastResult, setLastResult] = useState(null) // 'correct' or 'wrong'
  const [usedLyrics, setUsedLyrics] = useState([])
  const [listeningTimeLeft, setListeningTimeLeft] = useState(20)
  const [allTranscripts, setAllTranscripts] = useState([]) // Store all transcripts for evaluation
  const [audioVolume, setAudioVolume] = useState(0.3)
  
  const recognitionRef = useRef(null)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)
  const listeningTimerRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const transcriptIdCounter = useRef(0)

  // Get a random lyric that hasn't been used yet
  const getRandomLyric = () => {
    const availableLyrics = LYRICS_DATA.filter((lyric, index) => !usedLyrics.includes(index))
    
    if (availableLyrics.length === 0) {
      // Reset if all lyrics have been used
      setUsedLyrics([])
      return LYRICS_DATA[Math.floor(Math.random() * LYRICS_DATA.length)]
    }
    
    const randomIndex = Math.floor(Math.random() * availableLyrics.length)
    const selectedLyric = availableLyrics[randomIndex]
    const originalIndex = LYRICS_DATA.indexOf(selectedLyric)
    
    setUsedLyrics([...usedLyrics, originalIndex])
    return selectedLyric
  }

  // Generate random position for transcript
  const getRandomPosition = () => {
    const x = Math.random() * 60 + 20 // 20% to 80% of width
    const y = Math.random() * 60 + 20 // 20% to 80% of height
    return { x, y }
  }

  // Start the game (requires user interaction for audio)
  const handleStartGame = () => {
    setGameStarted(true)
    startNewRound()
  }

  // Start a new round
  const startNewRound = () => {
    const randomLyric = getRandomLyric()
    setCurrentLyric(randomLyric)
    setCountdown(3)
    setGameState('countdown')
    setTranscripts([])
    setAllTranscripts([])
    setLastResult(null)
    setListeningTimeLeft(20)
    setAudioVolume(0.3)
  }

  // Play audio with fade in
  const playBackgroundAudio = () => {
    if (audioRef.current && currentLyric) {
      audioRef.current.src = currentLyric.audioUrl
      audioRef.current.volume = 0
      audioRef.current.loop = true
      
      audioRef.current.play().then(() => {
        // Fade in
        let vol = 0
        fadeIntervalRef.current = setInterval(() => {
          if (vol < 0.3) {
            vol += 0.05
            audioRef.current.volume = Math.min(vol, 0.3)
            setAudioVolume(vol)
          } else {
            clearInterval(fadeIntervalRef.current)
          }
        }, 100)
      }).catch(e => {
        console.log('Audio play failed:', e)
      })
    }
  }

  // Fade out audio
  const fadeOutAudio = () => {
    if (audioRef.current && audioRef.current.volume > 0) {
      let vol = audioRef.current.volume
      fadeIntervalRef.current = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05
          audioRef.current.volume = Math.max(vol, 0)
          setAudioVolume(vol)
        } else {
          clearInterval(fadeIntervalRef.current)
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }, 100)
    }
  }

  // Countdown effect
  useEffect(() => {
    if (gameState === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'countdown' && countdown === 0) {
      // Start playing audio when countdown ends
      playBackgroundAudio()
      setGameState('presenting')
      setAnimationClass('slide-in')
      
      // After presenting lyrics for 3 seconds, start listening
      setTimeout(() => {
        setGameState('listening')
        startListening()
      }, 3000)
    }
  }, [gameState, countdown])

  // Listening timer countdown
  useEffect(() => {
    if (gameState === 'listening' && listeningTimeLeft > 0) {
      listeningTimerRef.current = setTimeout(() => {
        setListeningTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(listeningTimerRef.current)
    } else if (gameState === 'listening' && listeningTimeLeft === 0) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [gameState, listeningTimeLeft])

  // Start listening with speech recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported')
      // Skip to next round if not supported
      setTimeout(() => {
        fadeOutAudio()
        setTimeout(() => startNewRound(), 1000)
      }, 3000)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setAnimationClass('listening-pulse')
      
      // Set a timeout for listening (20 seconds max)
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
      }, 20000)
    }

    let interimId = null

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        
        if (event.results[i].isFinal) {
          // Remove interim transcript if exists
          if (interimId !== null) {
            setTranscripts(prev => prev.filter(t => t.id !== interimId))
            interimId = null
          }
          
          // Add final transcript with random position
          const position = getRandomPosition()
          const id = transcriptIdCounter.current++
          
          setTranscripts(prev => [...prev, {
            id,
            text: transcript,
            position,
            isFinal: true,
            timestamp: Date.now()
          }])
          
          // Store for evaluation
          setAllTranscripts(prev => [...prev, transcript])
          
          // Remove transcript after 5 seconds (longer display time)
          setTimeout(() => {
            setTranscripts(prev => prev.filter(t => t.id !== id))
          }, 5000)
        } else {
          // Update or create interim transcript
          const position = interimId === null ? getRandomPosition() : null
          
          if (interimId === null) {
            interimId = transcriptIdCounter.current++
          }
          
          setTranscripts(prev => {
            const existing = prev.find(t => t.id === interimId)
            if (existing) {
              // Update existing interim transcript text only
              return prev.map(t => 
                t.id === interimId 
                  ? { ...t, text: transcript }
                  : t
              )
            } else {
              // Add new interim transcript
              return [...prev, {
                id: interimId,
                text: transcript,
                position: position,
                isFinal: false,
                timestamp: Date.now()
              }]
            }
          })
        }
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      clearTimeout(timeoutRef.current)
      setIsListening(false)
      if (event.error !== 'no-speech') {
        evaluateResults()
      }
    }

    recognition.onend = () => {
      clearTimeout(timeoutRef.current)
      setIsListening(false)
      evaluateResults()
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  // Evaluate all collected transcripts
  const evaluateResults = () => {
    if (allTranscripts.length === 0) {
      handleNoResponse()
      return
    }

    const expectedAnswer = currentLyric.answer.toLowerCase()
    const expectedWords = expectedAnswer.split(' ').filter(word => word.length > 2)
    
    // Check all transcripts for matches
    let bestMatchCount = 0
    
    allTranscripts.forEach(transcript => {
      const transcriptLower = transcript.toLowerCase()
      const transcriptWords = transcriptLower.split(' ')
      
      const matchCount = expectedWords.filter(word => 
        transcriptWords.some(tWord => tWord.includes(word) || word.includes(tWord))
      ).length
      
      if (matchCount > bestMatchCount) {
        bestMatchCount = matchCount
      }
    })
    
    const isCorrect = bestMatchCount >= Math.ceil(expectedWords.length * 0.5)
    
    if (isCorrect) {
      setLastResult('correct')
      setWins(prev => prev + 1)
      setAnimationClass('celebration')
    } else {
      setLastResult('wrong')
      setLosses(prev => prev + 1)
      setAnimationClass('shake')
    }
    
    setGameState('result')
    setTranscripts([]) // Clear floating transcripts
    
    // Fade out audio and start next round after showing result
    setTimeout(() => {
      fadeOutAudio()
      setTimeout(() => {
        startNewRound()
      }, 2000)
    }, 3000)
  }

  // Handle no response from crowd
  const handleNoResponse = () => {
    setLastResult('wrong')
    setLosses(prev => prev + 1)
    setGameState('result')
    setAnimationClass('shake')
    setTranscripts([])
    
    setTimeout(() => {
      fadeOutAudio()
      setTimeout(() => {
        startNewRound()
      }, 2000)
    }, 3000)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (listeningTimerRef.current) {
        clearTimeout(listeningTimerRef.current)
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">🎤 Finish the Lyric! 🎵</h1>
        
        {!gameStarted ? (
          <div className="start-screen">
            <button className="start-btn" onClick={handleStartGame}>
              Start Game
            </button>
            <p className="start-info">Click to start the game with audio</p>
          </div>
        ) : (
          <>
            <div className="score-board">
              <span className="wins">Wins: {wins}</span>
              <span className="losses">Losses: {losses}</span>
              <span className="total">Total: {wins + losses}</span>
            </div>

            {gameState === 'countdown' && (
              <div className="countdown-display">
                <div className="countdown-number">{countdown || 'GO!'}</div>
              </div>
            )}

            {(gameState !== 'countdown' && gameState !== 'waiting' && currentLyric) && (
              <div className={`lyric-display ${animationClass}`}>
                <div className="hint">🎵 {currentLyric.hint} 🎵</div>
                <div className="lyric-text">
                  "{currentLyric.setup}..."
                </div>

                {gameState === 'listening' && (
                  <div className="listening-indicator">
                    <div className="mic-container">
                      <div className="mic-icon recording">🎤</div>
                      <div className="pulse-ring"></div>
                      <div className="pulse-ring delay-1"></div>
                      <div className="pulse-ring delay-2"></div>
                    </div>
                    <p className="listening-text">Listening to the crowd... ({listeningTimeLeft}s)</p>
                    
                    {/* Floating transcripts */}
                    {transcripts.map(transcript => (
                      <div
                        key={transcript.id}
                        className={`floating-transcript ${transcript.isFinal ? 'final' : 'interim'}`}
                        style={{
                          left: `${transcript.position.x}%`,
                          top: `${transcript.position.y}%`
                        }}
                      >
                        {transcript.text}
                      </div>
                    ))}
                  </div>
                )}

                {gameState === 'result' && lastResult === 'correct' && (
                  <div className="result correct">
                    <h2>🎉 CORRECT! 🎉</h2>
                    <p>The crowd nailed it!</p>
                    <p className="answer">✓ "{currentLyric.answer}"</p>
                  </div>
                )}

                {gameState === 'result' && lastResult === 'wrong' && (
                  <div className="result wrong">
                    <h2>😅 Not quite!</h2>
                    {allTranscripts.length > 0 ? (
                      <p>The crowd tried but didn't get it right</p>
                    ) : (
                      <p>No response from the crowd</p>
                    )}
                    <p className="correct-answer-label">The correct line was:</p>
                    <p className="answer">"{currentLyric.answer}"</p>
                  </div>
                )}

                {/* Audio volume indicator */}
                {audioVolume > 0 && (
                  <div className="audio-indicator">
                    <span>🎵</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Hidden audio element */}
        <audio ref={audioRef} />
      </div>
    </div>
  )
}

export default App
