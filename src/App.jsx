import { useState, useEffect, useRef } from 'react'
import './App.css'
import lyricsData from './data/lyrics.json'

const LYRICS_BY_CATEGORY = lyricsData;

const COUNTDOWN_TIME = 5; // seconds
const LISTENING_TIME = 20; // seconds
const RESULT_DISPLAY_TIME = 5; // seconds

// Cache for iTunes preview URLs
const previewUrlCache = new Map()

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [gameState, setGameState] = useState('idle') // idle, countdown, presenting, listening, result, score-display
  const [currentLyric, setCurrentLyric] = useState(null)
  const [transcripts, setTranscripts] = useState([])
  const [allTranscripts, setAllTranscripts] = useState([])
  const [lastResult, setLastResult] = useState(null)
  const [countdown, setCountdown] = useState(3)
  const [listeningTimeLeft, setListeningTimeLeft] = useState(20)
  const [showTitle, setShowTitle] = useState(false)
  const [animationClass, setAnimationClass] = useState('')
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [usedLyrics, setUsedLyrics] = useState([])
  const [audioVolume, setAudioVolume] = useState(0)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  
  const recognitionRef = useRef(null)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)
  const listeningTimerRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const transcriptIdCounter = useRef(0)
  const allTranscriptsRef = useRef([])

  // Fetch iTunes preview URL
  const fetchItunesPreview = async (searchTerm) => {
    // Check cache first
    if (previewUrlCache.has(searchTerm)) {
      return previewUrlCache.get(searchTerm)
    }

    try {
      // First try to find instrumental/karaoke version
      const instrumentalSearches = [
        `${searchTerm} instrumental`,
        `${searchTerm} karaoke`,
        `${searchTerm} backing track`,
        `${searchTerm} instrumental version`
      ]
      
      for (const search of instrumentalSearches) {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(search)}&entity=song&limit=5`
        )
        const data = await response.json()
        
        if (data.results && data.results.length > 0) {
          // Look for tracks that mention instrumental/karaoke in the name
          const instrumentalTrack = data.results.find(track => 
            track.trackName.toLowerCase().includes('instrumental') ||
            track.trackName.toLowerCase().includes('karaoke') ||
            track.trackName.toLowerCase().includes('backing') ||
            track.artistName.toLowerCase().includes('karaoke')
          )
          
          if (instrumentalTrack && instrumentalTrack.previewUrl) {
            previewUrlCache.set(searchTerm, instrumentalTrack.previewUrl)
            return instrumentalTrack.previewUrl
          }
        }
      }
      
      // If no instrumental found, return null (we don't want vocals)
      console.log('No instrumental version found for:', searchTerm)
    } catch (error) {
      console.error('Error fetching iTunes preview:', error)
    }
    
    return null
  }

  // Get a random lyric that hasn't been used yet
  const getRandomLyric = (category) => {
    const categoryLyrics = LYRICS_BY_CATEGORY[category || selectedCategory]
    const availableLyrics = categoryLyrics.filter((lyric, index) => !usedLyrics.includes(index))
    
    if (availableLyrics.length === 0) {
      // Reset if all lyrics have been used
      setUsedLyrics([])
      return categoryLyrics[Math.floor(Math.random() * categoryLyrics.length)]
    }
    
    const randomIndex = Math.floor(Math.random() * availableLyrics.length)
    const selectedLyric = availableLyrics[randomIndex]
    const originalIndex = categoryLyrics.indexOf(selectedLyric)
    
    setUsedLyrics([...usedLyrics, originalIndex])
    return selectedLyric
  }

  // Select category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setGameStarted(true)
    setUsedLyrics([])
    // Pass category directly since state update is async
    startNewRound(category)
  }

  // Start a new round
  const startNewRound = (category = null) => {
    console.log('Starting new round...')
    const randomLyric = getRandomLyric(category || selectedCategory)
    setCurrentLyric(randomLyric)
    setCountdown(3)
    setGameState('countdown')
    setTranscripts([])
    setAllTranscripts([]) // Clear all transcripts from previous round
    allTranscriptsRef.current = [] // Clear ref as well
    setLastResult(null) // Reset result from previous round
    setListeningTimeLeft(20)
    setAudioVolume(0.3)
    setShowTitle(true)
    setAnimationClass('')
    setIsLoadingAudio(false)
    console.log('New round initialized, lastResult reset to null')
  }

  // Play audio with fade in
  const playBackgroundAudio = async () => {
    if (audioRef.current && currentLyric) {
      setIsLoadingAudio(true)
      
      // Fetch iTunes preview URL
      const previewUrl = await fetchItunesPreview(currentLyric.searchTerm)
      
      if (previewUrl) {
        audioRef.current.src = previewUrl
        audioRef.current.volume = 0
        audioRef.current.loop = true
        
        audioRef.current.play().then(() => {
          setIsLoadingAudio(false)
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
          setIsLoadingAudio(false)
        })
      } else {
        // No instrumental found, just continue without music
        console.log('Playing without background music for:', currentLyric.searchTerm)
        setIsLoadingAudio(false)
      }
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
      // Hide title and start presenting lyrics
      setShowTitle(false)
    setTimeout(() => {
        playBackgroundAudio()
        setGameState('presenting')
        setAnimationClass('lyric-enter')
        
        // After animation, move to listening state
        setTimeout(() => {
          setAnimationClass('lyric-listening')
          setGameState('listening')
          startListening()
        }, 2000)
      }, 500)
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
    console.log('Starting speech recognition...')
    
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

    console.log('Speech recognition configured')

    recognition.onstart = () => {
      console.log('Speech recognition started successfully')
      setAnimationClass('lyric-listening')
      
      // Set a timeout for listening (20 seconds max)
      timeoutRef.current = setTimeout(() => {
        console.log('20 second timeout reached, stopping recognition')
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
      }, 20000)
    }

    let interimId = null

    recognition.onresult = (event) => {
      console.log('Speech recognition result received:', event.results.length, 'results')
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        console.log(`Result ${i}: "${transcript}" (final: ${event.results[i].isFinal})`)
        
        if (event.results[i].isFinal) {
          // Remove interim transcript if exists
          if (interimId !== null) {
            setTranscripts(prev => prev.filter(t => t.id !== interimId))
            interimId = null
          }
          
          // Add final transcript
          const id = transcriptIdCounter.current++
          
          setTranscripts(prev => [...prev, {
            id,
            text: transcript,
            isFinal: true,
            timestamp: Date.now()
          }])
          
          // Store for evaluation
          console.log('Adding transcript to allTranscripts:', transcript)
          // Only add non-empty transcripts
          if (transcript.trim().length > 0) {
            allTranscriptsRef.current.push(transcript)
            console.log('Updated allTranscriptsRef:', allTranscriptsRef.current)
          } else {
            console.log('Skipping empty transcript')
          }
          setAllTranscripts(prev => {
            console.log('Previous allTranscripts:', prev)
            const updated = [...prev, transcript]
            console.log('Updated allTranscripts:', updated)
            return updated
          })
          
          // Remove transcript after 5 seconds
          setTimeout(() => {
            setTranscripts(prev => prev.filter(t => t.id !== id))
          }, 5000)
        } else {
          // Update or create interim transcript
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
                isFinal: false,
                timestamp: Date.now()
              }]
            }
          })
        }
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error, event)
      clearTimeout(timeoutRef.current)
      if (event.error === 'not-allowed') {
        console.error('Microphone access denied. Please allow microphone access and reload.')
        alert('Microphone access denied. Please allow microphone access and reload the page.')
      }
      if (event.error !== 'no-speech') {
        evaluateResults()
      }
    }

    recognition.onend = () => {
      console.log('Speech recognition ended')
      clearTimeout(timeoutRef.current)
      // Add a small delay to ensure state updates have completed
      setTimeout(() => {
        console.log('Evaluating after delay...')
        evaluateResults()
      }, 100)
    }

    recognition.onspeechstart = () => {
      console.log('Speech detected - user started speaking')
    }

    recognition.onspeechend = () => {
      console.log('Speech ended - user stopped speaking')
    }

    recognition.onnomatch = () => {
      console.log('No speech was detected')
    }

    recognitionRef.current = recognition
    
    try {
      recognition.start()
      console.log('Called recognition.start()')
    } catch (error) {
      console.error('Failed to start speech recognition:', error)
    }
  }

  // Evaluate all collected transcripts
  const evaluateResults = () => {
    console.log('Evaluating results...')
    console.log('All transcripts from ref:', allTranscriptsRef.current)
    console.log('All transcripts from state:', allTranscripts)
    console.log('Expected answer:', currentLyric.answer)
    
    // Use ref instead of state to avoid closure issues
    const transcriptsToEvaluate = allTranscriptsRef.current
    
    if (transcriptsToEvaluate.length === 0) {
      console.log('No transcripts collected, marking as no response')
      handleNoResponse()
      return
    }

    const expectedAnswer = currentLyric.answer.toLowerCase()
    // Don't filter out short words - they might be important (like "me", "up", "on")
    const expectedWords = expectedAnswer.split(' ').filter(word => word.length > 0)
    
    console.log('Expected words:', expectedWords)
    
    // Check all transcripts for matches
    let bestMatchCount = 0
    let hasExactMatch = false
    let bestTranscript = ''
    
    // Use for loop instead of forEach to properly handle early exit
    for (let i = 0; i < transcriptsToEvaluate.length; i++) {
      const transcript = transcriptsToEvaluate[i]
      const transcriptLower = transcript.toLowerCase().trim()
      console.log('Checking transcript:', transcriptLower)
      
      // Check for exact match first (with normalization)
      // Normalize both strings: lowercase, trim, and remove extra spaces
      const normalizedTranscript = transcriptLower.replace(/\s+/g, ' ').trim()
      const normalizedExpected = expectedAnswer.replace(/\s+/g, ' ').trim()
      
      // Skip empty transcripts
      if (normalizedTranscript.length === 0) {
        console.log('Skipping empty transcript')
        continue
      }
      
      // Only consider it an exact match if:
      // 1. The transcript is exactly the expected answer, OR
      // 2. The transcript is a substantial portion (at least 60%) of the expected answer
      if (normalizedTranscript === normalizedExpected) {
        console.log('Found exact match!')
        hasExactMatch = true
        bestTranscript = transcriptLower
        break // Properly exit the loop when exact match is found
      }
      
      // Check if transcript is a substantial substring (not just a single word)
      const transcriptWordCount = normalizedTranscript.split(' ').length
      const expectedWordCount = normalizedExpected.split(' ').length
      
      // If the transcript contains the full expected answer, it's a match
      if (normalizedTranscript.includes(normalizedExpected) && expectedWordCount > 1) {
        console.log('Transcript contains full expected answer!')
        hasExactMatch = true
        bestTranscript = transcriptLower
        break
      }
      
      // If the expected answer contains the transcript, only count as match if 
      // transcript is substantial (at least 60% of the words)
      if (normalizedExpected.includes(normalizedTranscript) && 
          transcriptWordCount >= Math.ceil(expectedWordCount * 0.6)) {
        console.log('Found substantial partial match!')
        hasExactMatch = true
        bestTranscript = transcriptLower
        break
      }
      
      // Word-by-word matching
      const transcriptWords = transcriptLower.split(' ')
      
      const matchCount = expectedWords.filter(word => 
        transcriptWords.some(tWord => 
          tWord === word || // Exact word match
          (word.length > 2 && (tWord.includes(word) || word.includes(tWord))) // Partial match for longer words
        )
      ).length
      
      console.log(`Match count for "${transcriptLower}": ${matchCount}/${expectedWords.length}`)
      
      if (matchCount > bestMatchCount) {
        bestMatchCount = matchCount
        bestTranscript = transcriptLower
      }
    }
    
    // More lenient scoring: 40% match or exact match
    const requiredMatches = Math.ceil(expectedWords.length * 0.4)
    const isCorrect = hasExactMatch || bestMatchCount >= requiredMatches
    
    console.log(`Best match: "${bestTranscript}" with ${bestMatchCount}/${expectedWords.length} matches`)
    console.log(`Required matches: ${requiredMatches}, Has exact match: ${hasExactMatch}, Is correct: ${isCorrect}`)
    
    // Debug: Log the actual state changes
    console.log('About to set result:', isCorrect ? 'correct' : 'wrong')
    
    if (isCorrect) {
      console.log('Setting CORRECT result')
      setLastResult('correct')
      setWins(prev => {
        console.log('Incrementing wins from', prev, 'to', prev + 1)
        return prev + 1
      })
      setAnimationClass('celebration')
    } else {
      console.log('Setting WRONG result')
      setLastResult('wrong')
      setLosses(prev => {
        console.log('Incrementing losses from', prev, 'to', prev + 1)
        return prev + 1
      })
      setAnimationClass('shake')
    }
    
    setGameState('result')
    setTranscripts([]) // Clear floating transcripts
    
    // Show result for 5 seconds, then show score
    setTimeout(() => {
      fadeOutAudio()
      setGameState('score-display')
      
      // After showing score, start next round
      setTimeout(() => {
        startNewRound()
      }, 3000)
    }, 5000)
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
      setGameState('score-display')
      
      setTimeout(() => {
        startNewRound()
      }, 3000)
    }, 5000)
  }

  // Handle stop game - return to home screen
  const handleStopGame = () => {
    // Stop any ongoing recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    // Clear all timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (listeningTimerRef.current) {
      clearTimeout(listeningTimerRef.current)
    }
    
    // Fade out and stop audio
    fadeOutAudio()
    
    // Reset all game states
    setGameStarted(false)
    setSelectedCategory(null)
    setGameState('idle')
    setCurrentLyric(null)
    setTranscripts([])
    setAllTranscripts([])
    allTranscriptsRef.current = []
    setLastResult(null)
    setCountdown(3)
    setListeningTimeLeft(20)
    setShowTitle(false)
    setAnimationClass('')
    setIsLoadingAudio(false)
    setUsedLyrics([])
    setWins(0)
    setLosses(0)
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

  // Debug mode toggle with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Toggle debug mode with Ctrl+D or Cmd+D
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        setDebugMode(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="app">
      <div className="game-container">
        {!gameStarted ? (
          <div className="start-screen">
            <h1 className="game-title">Finish the Lyric!</h1>
            {!selectedCategory ? (
              <div className="category-selection">
                <h2 className="category-title">Choose a Category</h2>
                <div className="category-grid">
                  <button 
                    className="category-btn" 
                    onClick={() => handleCategorySelect('pop')}
                  >
                    <span className="category-name">Pop</span>
                    <span className="category-count">{LYRICS_BY_CATEGORY.pop.length} songs</span>
            </button>
                  <button 
                    className="category-btn" 
                    onClick={() => handleCategorySelect('rock')}
                  >
                    <span className="category-name">Rock</span>
                    <span className="category-count">{LYRICS_BY_CATEGORY.rock.length} songs</span>
              </button>
                  <button 
                    className="category-btn" 
                    onClick={() => handleCategorySelect('soul')}
                  >
                    <span className="category-name">Soul</span>
                    <span className="category-count">{LYRICS_BY_CATEGORY.soul.length} songs</span>
                  </button>
                  <button 
                    className="category-btn" 
                    onClick={() => handleCategorySelect('hiphop')}
                  >
                    <span className="category-name">Hip Hop</span>
                    <span className="category-count">{LYRICS_BY_CATEGORY.hiphop.length} songs</span>
                  </button>
                  <button 
                    className="category-btn everybody" 
                    onClick={() => handleCategorySelect('everybody')}
                  >
                    <span className="category-name">Everybody Knows</span>
                    <span className="category-count">{LYRICS_BY_CATEGORY.everybody.length} songs</span>
                    <span className="category-desc">Songs so famous that everybody knows them!</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {/* Title shown during countdown */}
            {showTitle && gameState === 'countdown' && (
              <h1 className="game-title countdown-title">Finish the Lyric!</h1>
            )}

            {/* Countdown */}
            {gameState === 'countdown' && (
              <div className="countdown-display">
                <div className="countdown-number">{countdown || 'GO!'}</div>
          </div>
        )}

            {/* Main game area */}
            {(gameState === 'presenting' || gameState === 'listening' || gameState === 'result') && currentLyric && (
              <div className="game-area">
                {/* Lyric display */}
                {(gameState === 'presenting' || gameState === 'listening') && (
                  <div className={`lyric-container ${animationClass}`}>
                    <div className="hint">{currentLyric.hint}</div>
            <div className="lyric-text">
              "{currentLyric.setup}..."
            </div>
              </div>
            )}

                {/* Transcriptions in center */}
            {gameState === 'listening' && (
                  <div className="transcripts-container">
                    {transcripts.map(transcript => (
                      <div
                        key={transcript.id}
                        className={`center-transcript ${transcript.isFinal ? 'final' : 'interim'}`}
                      >
                        {transcript.text}
                    </div>
                    ))}
                  </div>
                )}

                {/* Mic indicator in lower right */}
                {gameState === 'listening' && (
                  <div className="mic-indicator-corner">
                    <div className="mic-icon recording">🎤</div>
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring delay-1"></div>
                    <div className="pulse-ring delay-2"></div>
                    <p className="listening-timer">{listeningTimeLeft}s</p>
              </div>
            )}

                {/* Result display */}
                {gameState === 'result' && (
                  <div className={`result-container ${lastResult}`}>
                    {lastResult === 'correct' ? (
                      <>
                <h2>🎉 CORRECT! 🎉</h2>
                <p>The crowd nailed it!</p>
                      </>
                    ) : (
                      <>
                        <h2>😅 Not quite!</h2>
                        {allTranscripts.length > 0 ? (
                          <p>The crowd tried but didn't get it right</p>
                        ) : (
                          <p>No response from the crowd</p>
                        )}
                      </>
                    )}
                    <p className="correct-answer">
                      {lastResult === 'correct' ? '✓ ' : 'Answer: '}
                      "{currentLyric.answer}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Score display between rounds */}
            {gameState === 'score-display' && (
              <div className="score-display-screen">
                <h2 className="score-title">Score</h2>
                <div className="score-board-large">
                  <div className="score-item wins-large">
                    <span className="score-label">Wins</span>
                    <span className="score-value">{wins}</span>
                  </div>
                  <div className="score-item losses-large">
                    <span className="score-label">Losses</span>
                    <span className="score-value">{losses}</span>
                  </div>
                </div>
                <p className="next-round-text">Next round starting...</p>
                  </div>
                )}

            {/* Audio indicator */}
            {audioVolume > 0 && gameState !== 'countdown' && gameState !== 'score-display' && (
              <div className="audio-indicator">
                <span>🎵</span>
              </div>
            )}

            {/* Loading audio indicator */}
            {isLoadingAudio && (
              <div className="loading-audio">
                Loading audio...
          </div>
        )}

            {/* Stop button in lower left */}
            <button className="stop-button" onClick={handleStopGame}>
              ⏹ Stop
            </button>

            {/* Debug mode display */}
            {debugMode && currentLyric && (gameState === 'listening' || gameState === 'presenting') && (
              <div className="debug-display">
                <span className="debug-label">Expected:</span>
                <span className="debug-answer">"{currentLyric.answer}"</span>
              </div>
            )}
            
            {/* Debug mode - show collected transcripts */}
            {debugMode && gameState === 'result' && (
              <>
                <div className="debug-display" style={{bottom: '80px'}}>
                  <span className="debug-label">Heard:</span>
                  <span className="debug-answer">{allTranscripts.length > 0 ? allTranscripts.join(' | ') : 'Nothing'}</span>
                </div>
                <div className="debug-display" style={{bottom: '130px'}}>
                  <span className="debug-label">Result:</span>
                  <span className="debug-answer">{lastResult || 'null'}</span>
                </div>
              </>
            )}
          </>
        )}

        {/* Hidden audio element with CORS mode */}
        <audio ref={audioRef} crossOrigin="anonymous" />
      </div>
    </div>
  )
}

export default App
