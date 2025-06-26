import { useState, useEffect, useRef } from 'react'
import './App.css'

const LYRICS_DATA = [
  {
    setup: "Just a small town girl, living in a lonely world",
    answer: "she took the midnight train going anywhere",
    hint: "Journey - Don't Stop Believin'",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    setup: "Is this the real life? Is this just fantasy",
    answer: "caught in a landslide no escape from reality",
    hint: "Queen - Bohemian Rhapsody",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    setup: "Hello, is it me you're looking for",
    answer: "I can see it in your eyes",
    hint: "Lionel Richie - Hello",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    setup: "I see trees of green, red roses too",
    answer: "I see them bloom for me and you",
    hint: "Louis Armstrong - What a Wonderful World",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    setup: "When I find myself in times of trouble",
    answer: "Mother Mary comes to me",
    hint: "The Beatles - Let It Be",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    setup: "I'm gonna fight 'em off",
    answer: "a seven nation army couldn't hold me back",
    hint: "The White Stripes - Seven Nation Army",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    setup: "Somebody once told me the world is gonna roll me",
    answer: "I ain't the sharpest tool in the shed",
    hint: "Smash Mouth - All Star",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    setup: "I used to rule the world, seas would rise when I gave the word",
    answer: "now in the morning I sleep alone",
    hint: "Coldplay - Viva La Vida",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    setup: "We will, we will",
    answer: "rock you",
    hint: "Queen - We Will Rock You",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    setup: "I got my mind set on you",
    answer: "I got my mind set on you",
    hint: "George Harrison - Got My Mind Set On You",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    setup: "It's a beautiful day, don't let it get away",
    answer: "it's a beautiful day",
    hint: "U2 - Beautiful Day",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
  },
  {
    setup: "I can't get no satisfaction",
    answer: "I can't get no satisfaction",
    hint: "The Rolling Stones - Satisfaction",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
  },
  {
    setup: "Hey now, you're an all star",
    answer: "get your game on go play",
    hint: "Smash Mouth - All Star",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
  },
  {
    setup: "I'm blue da ba dee da ba daa",
    answer: "da ba dee da ba daa",
    hint: "Eiffel 65 - Blue",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
  },
  {
    setup: "Wake me up when September ends",
    answer: "wake me up when September ends",
    hint: "Green Day - Wake Me Up When September Ends",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
  },
  {
    setup: "I'm on the highway to hell",
    answer: "highway to hell",
    hint: "AC/DC - Highway to Hell",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
  },
  {
    setup: "Don't stop me now, I'm having such a good time",
    answer: "I'm having a ball",
    hint: "Queen - Don't Stop Me Now",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"
  },
  {
    setup: "Is this love that I'm feeling",
    answer: "is this the love that I've been searching for",
    hint: "Whitesnake - Is This Love",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3"
  },
  {
    setup: "I want it that way",
    answer: "tell me why",
    hint: "Backstreet Boys - I Want It That Way",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3"
  },
  {
    setup: "It's gonna be me",
    answer: "every little thing I do",
    hint: "*NSYNC - It's Gonna Be Me",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3"
  },
  {
    setup: "I'm a believer, I couldn't leave her if I tried",
    answer: "then I saw her face",
    hint: "The Monkees - I'm a Believer",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3"
  },
  {
    setup: "Sweet Caroline, good times never seemed so good",
    answer: "I've been inclined to believe they never would",
    hint: "Neil Diamond - Sweet Caroline",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3"
  },
  {
    setup: "Country roads, take me home",
    answer: "to the place I belong",
    hint: "John Denver - Take Me Home, Country Roads",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3"
  },
  {
    setup: "I see a little silhouetto of a man",
    answer: "Scaramouche Scaramouche will you do the Fandango",
    hint: "Queen - Bohemian Rhapsody",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3"
  },
  {
    setup: "I'm walking on sunshine",
    answer: "and don't it feel good",
    hint: "Katrina and the Waves - Walking on Sunshine",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3"
  },
  {
    setup: "Girls just want to have fun",
    answer: "oh girls just want to have fun",
    hint: "Cyndi Lauper - Girls Just Want to Have Fun",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3"
  },
  {
    setup: "I came in like a wrecking ball",
    answer: "I never hit so hard in love",
    hint: "Miley Cyrus - Wrecking Ball",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3"
  },
  {
    setup: "Cause the players gonna play play play play play",
    answer: "and the haters gonna hate hate hate hate hate",
    hint: "Taylor Swift - Shake It Off",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3"
  },
  {
    setup: "Hello from the other side",
    answer: "I must have called a thousand times",
    hint: "Adele - Hello",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3"
  },
  {
    setup: "I got the eye of the tiger",
    answer: "a fighter dancing through the fire",
    hint: "Katy Perry - Roar",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3"
  },
  {
    setup: "We found love in a hopeless place",
    answer: "we found love in a hopeless place",
    hint: "Rihanna - We Found Love",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3"
  },
  {
    setup: "I throw my hands up in the air sometimes",
    answer: "saying ayo gotta let go",
    hint: "Taio Cruz - Dynamite",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3"
  },
  {
    setup: "Party rock is in the house tonight",
    answer: "everybody just have a good time",
    hint: "LMFAO - Party Rock Anthem",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3"
  },
  {
    setup: "Oppa Gangnam Style",
    answer: "Gangnam Style",
    hint: "PSY - Gangnam Style",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-34.mp3"
  },
  {
    setup: "Because I'm happy, clap along if you feel",
    answer: "like a room without a roof",
    hint: "Pharrell Williams - Happy",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-35.mp3"
  },
  {
    setup: "All the single ladies, all the single ladies",
    answer: "now put your hands up",
    hint: "Beyoncé - Single Ladies",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-36.mp3"
  },
  {
    setup: "I got a feeling that tonight's gonna be a good night",
    answer: "that tonight's gonna be a good night",
    hint: "The Black Eyed Peas - I Gotta Feeling",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-37.mp3"
  },
  {
    setup: "It's Friday, Friday, gotta get down on Friday",
    answer: "everybody's lookin' forward to the weekend",
    hint: "Rebecca Black - Friday",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-38.mp3"
  },
  {
    setup: "Baby shark doo doo doo doo doo doo",
    answer: "baby shark doo doo doo doo doo doo",
    hint: "Pinkfong - Baby Shark",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-39.mp3"
  },
  {
    setup: "Never gonna give you up, never gonna let you down",
    answer: "never gonna run around and desert you",
    hint: "Rick Astley - Never Gonna Give You Up",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-40.mp3"
  },
  {
    setup: "I bless the rains down in Africa",
    answer: "gonna take some time to do the things we never had",
    hint: "Toto - Africa",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-41.mp3"
  },
  {
    setup: "Don't stop believin'",
    answer: "hold on to that feelin'",
    hint: "Journey - Don't Stop Believin'",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-42.mp3"
  },
  {
    setup: "Somebody that I used to know",
    answer: "but you didn't have to cut me off",
    hint: "Gotye - Somebody That I Used To Know",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-43.mp3"
  },
  {
    setup: "Call me maybe",
    answer: "hey I just met you and this is crazy",
    hint: "Carly Rae Jepsen - Call Me Maybe",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3"
  },
  {
    setup: "I'm gonna pop some tags, only got twenty dollars in my pocket",
    answer: "I'm hunting looking for a come up",
    hint: "Macklemore - Thrift Shop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3"
  },
  {
    setup: "What does the fox say",
    answer: "ring ding ding ding dingeringeding",
    hint: "Ylvis - The Fox",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3"
  },
  {
    setup: "Let it go, let it go",
    answer: "can't hold it back anymore",
    hint: "Frozen - Let It Go",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-47.mp3"
  },
  {
    setup: "Everything is awesome",
    answer: "everything is cool when you're part of a team",
    hint: "The Lego Movie - Everything Is Awesome",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-48.mp3"
  },
  {
    setup: "Watch me whip, watch me nae nae",
    answer: "watch me whip whip watch me nae nae",
    hint: "Silentó - Watch Me",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-49.mp3"
  },
  {
    setup: "Despacito, quiero respirar tu cuello despacito",
    answer: "deja que te diga cosas al oído",
    hint: "Luis Fonsi - Despacito",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-50.mp3"
  }
]

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLyric, setCurrentLyric] = useState(null)
  const [gameState, setGameState] = useState('waiting') // waiting, countdown, presenting, listening, result, score-display
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [animationClass, setAnimationClass] = useState('')
  const [transcripts, setTranscripts] = useState([]) // Array of transcripts with positions
  const [lastResult, setLastResult] = useState(null) // 'correct' or 'wrong'
  const [usedLyrics, setUsedLyrics] = useState([])
  const [listeningTimeLeft, setListeningTimeLeft] = useState(20)
  const [allTranscripts, setAllTranscripts] = useState([]) // Store all transcripts for evaluation
  const [audioVolume, setAudioVolume] = useState(0.3)
  const [showTitle, setShowTitle] = useState(true)
  
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
    setShowTitle(true)
    setAnimationClass('')
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
      setAnimationClass('lyric-listening')
      
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
          
          // Add final transcript
          const id = transcriptIdCounter.current++
          
          setTranscripts(prev => [...prev, {
            id,
            text: transcript,
            isFinal: true,
            timestamp: Date.now()
          }])
          
          // Store for evaluation
          setAllTranscripts(prev => [...prev, transcript])
          
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
      console.error('Speech recognition error:', event.error)
      clearTimeout(timeoutRef.current)
      if (event.error !== 'no-speech') {
        evaluateResults()
      }
    }

    recognition.onend = () => {
      clearTimeout(timeoutRef.current)
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
        {!gameStarted ? (
          <div className="start-screen">
            <h1 className="game-title">Finish the Lyric!</h1>
            <button className="start-btn" onClick={handleStartGame}>
              Start Game
            </button>
            <p className="start-info">Click to start the game with audio</p>
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

            {/* Audio volume indicator */}
            {audioVolume > 0 && gameState !== 'countdown' && gameState !== 'score-display' && (
              <div className="audio-indicator">
                <span>🎵</span>
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
