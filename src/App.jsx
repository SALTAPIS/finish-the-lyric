import { useState, useEffect, useRef } from 'react'
import './App.css'

const LYRICS_BY_CATEGORY = {
  pop: [
    {
      setup: "Cause the players gonna play play play play play",
      answer: "and the haters gonna hate hate hate hate hate",
      hint: "Taylor Swift - Shake It Off",
      searchTerm: "Taylor Swift Shake It Off"
    },
    {
      setup: "Hello from the other side",
      answer: "I must have called a thousand times",
      hint: "Adele - Hello",
      searchTerm: "Adele Hello"
    },
    {
      setup: "I got the eye of the tiger",
      answer: "a fighter dancing through the fire",
      hint: "Katy Perry - Roar",
      searchTerm: "Katy Perry Roar"
    },
    {
      setup: "We found love in a hopeless place",
      answer: "we found love in a hopeless place",
      hint: "Rihanna - We Found Love",
      searchTerm: "Rihanna We Found Love"
    },
    {
      setup: "I throw my hands up in the air sometimes",
      answer: "saying ayo gotta let go",
      hint: "Taio Cruz - Dynamite",
      searchTerm: "Taio Cruz Dynamite"
    },
    {
      setup: "Because I'm happy, clap along if you feel",
      answer: "like a room without a roof",
      hint: "Pharrell Williams - Happy",
      searchTerm: "Pharrell Williams Happy"
    },
    {
      setup: "All the single ladies, all the single ladies",
      answer: "now put your hands up",
      hint: "Beyoncé - Single Ladies",
      searchTerm: "Beyonce Single Ladies"
    },
    {
      setup: "I came in like a wrecking ball",
      answer: "I never hit so hard in love",
      hint: "Miley Cyrus - Wrecking Ball",
      searchTerm: "Miley Cyrus Wrecking Ball"
    },
    {
      setup: "Call me maybe",
      answer: "hey I just met you and this is crazy",
      hint: "Carly Rae Jepsen - Call Me Maybe",
      searchTerm: "Carly Rae Jepsen Call Me Maybe"
    },
    {
      setup: "It's gonna be me",
      answer: "every little thing I do",
      hint: "*NSYNC - It's Gonna Be Me",
      searchTerm: "NSYNC It's Gonna Be Me"
    },
    {
      setup: "I want it that way",
      answer: "tell me why",
      hint: "Backstreet Boys - I Want It That Way",
      searchTerm: "Backstreet Boys I Want It That Way"
    },
    {
      setup: "Hit me baby one more time",
      answer: "oh baby baby",
      hint: "Britney Spears - Baby One More Time",
      searchTerm: "Britney Spears Baby One More Time"
    },
    {
      setup: "I'm a genie in a bottle",
      answer: "you gotta rub me the right way",
      hint: "Christina Aguilera - Genie in a Bottle",
      searchTerm: "Christina Aguilera Genie in a Bottle"
    },
    {
      setup: "Say my name say my name",
      answer: "if no one is around you",
      hint: "Destiny's Child - Say My Name",
      searchTerm: "Destiny's Child Say My Name"
    },
    {
      setup: "Uptown funk you up",
      answer: "uptown funk you up",
      hint: "Mark Ronson ft. Bruno Mars - Uptown Funk",
      searchTerm: "Bruno Mars Uptown Funk"
    },
    {
      setup: "Can't stop the feeling",
      answer: "so just dance dance dance",
      hint: "Justin Timberlake - Can't Stop the Feeling",
      searchTerm: "Justin Timberlake Can't Stop the Feeling"
    },
    {
      setup: "Havana ooh na na",
      answer: "half of my heart is in Havana",
      hint: "Camila Cabello - Havana",
      searchTerm: "Camila Cabello Havana"
    },
    {
      setup: "I got a feeling that tonight's gonna be a good night",
      answer: "that tonight's gonna be a good night",
      hint: "The Black Eyed Peas - I Gotta Feeling",
      searchTerm: "Black Eyed Peas I Gotta Feeling"
    },
    {
      setup: "Party rock is in the house tonight",
      answer: "everybody just have a good time",
      hint: "LMFAO - Party Rock Anthem",
      searchTerm: "LMFAO Party Rock Anthem"
    },
    {
      setup: "Oppa Gangnam Style",
      answer: "Gangnam Style",
      hint: "PSY - Gangnam Style",
      searchTerm: "PSY Gangnam Style"
    },
    {
      setup: "Baby shark doo doo doo doo doo doo",
      answer: "baby shark doo doo doo doo doo doo",
      hint: "Pinkfong - Baby Shark",
      searchTerm: "Pinkfong Baby Shark"
    },
    {
      setup: "Watch me whip, watch me nae nae",
      answer: "watch me whip whip watch me nae nae",
      hint: "Silentó - Watch Me",
      searchTerm: "Silento Watch Me Whip"
    },
    {
      setup: "Despacito, quiero respirar tu cuello despacito",
      answer: "deja que te diga cosas al oído",
      hint: "Luis Fonsi - Despacito",
      searchTerm: "Luis Fonsi Despacito"
    },
    {
      setup: "I'm gonna pop some tags, only got twenty dollars in my pocket",
      answer: "I'm hunting looking for a come up",
      hint: "Macklemore - Thrift Shop",
      searchTerm: "Macklemore Thrift Shop"
    },
    {
      setup: "What does the fox say",
      answer: "ring ding ding ding dingeringeding",
      hint: "Ylvis - The Fox",
      searchTerm: "Ylvis The Fox"
    },
    {
      setup: "All about that bass",
      answer: "bout that bass no treble",
      hint: "Meghan Trainor - All About That Bass",
      searchTerm: "Meghan Trainor All About That Bass"
    },
    {
      setup: "Shut up and dance with me",
      answer: "this woman is my destiny",
      hint: "Walk the Moon - Shut Up and Dance",
      searchTerm: "Walk the Moon Shut Up and Dance"
    },
    {
      setup: "Somebody that I used to know",
      answer: "but you didn't have to cut me off",
      hint: "Gotye - Somebody That I Used To Know",
      searchTerm: "Gotye Somebody That I Used To Know"
    },
    {
      setup: "We are never ever ever getting back together",
      answer: "we are never getting back together",
      hint: "Taylor Swift - We Are Never Getting Back Together",
      searchTerm: "Taylor Swift We Are Never Getting Back Together"
    },
    {
      setup: "Counting stars",
      answer: "lately I've been I've been losing sleep",
      hint: "OneRepublic - Counting Stars",
      searchTerm: "OneRepublic Counting Stars"
    },
    {
      setup: "Radioactive, radioactive",
      answer: "whoa oh oh oh oh whoa oh oh oh",
      hint: "Imagine Dragons - Radioactive",
      searchTerm: "Imagine Dragons Radioactive"
    },
    {
      setup: "Thunder, feel the thunder",
      answer: "lightning and the thunder",
      hint: "Imagine Dragons - Thunder",
      searchTerm: "Imagine Dragons Thunder"
    },
    {
      setup: "Sugar yes please",
      answer: "won't you come and put it down on me",
      hint: "Maroon 5 - Sugar",
      searchTerm: "Maroon 5 Sugar"
    },
    {
      setup: "This girl is on fire",
      answer: "this girl is on fire",
      hint: "Alicia Keys - Girl on Fire",
      searchTerm: "Alicia Keys Girl on Fire"
    },
    {
      setup: "Just give me a reason",
      answer: "just a little bit's enough",
      hint: "P!nk - Just Give Me a Reason",
      searchTerm: "Pink Just Give Me a Reason"
    },
    {
      setup: "I'm friends with the monster",
      answer: "that's under my bed",
      hint: "Eminem ft. Rihanna - The Monster",
      searchTerm: "Eminem The Monster"
    },
    {
      setup: "Hello it's me",
      answer: "I was wondering if after all these years",
      hint: "Adele - Hello",
      searchTerm: "Adele Hello"
    },
    {
      setup: "Work work work work work",
      answer: "he said me haffi work work work work work",
      hint: "Rihanna - Work",
      searchTerm: "Rihanna Work"
    },
    {
      setup: "I got this feeling on the summer day",
      answer: "when you were gone",
      hint: "Justin Timberlake - Can't Stop the Feeling",
      searchTerm: "Justin Timberlake Can't Stop the Feeling"
    },
    {
      setup: "Sorry not sorry",
      answer: "baby I'm sorry not sorry",
      hint: "Demi Lovato - Sorry Not Sorry",
      searchTerm: "Demi Lovato Sorry Not Sorry"
    }
  ],
  rock: [
    {
      setup: "Is this the real life? Is this just fantasy",
      answer: "caught in a landslide no escape from reality",
      hint: "Queen - Bohemian Rhapsody",
      searchTerm: "Queen Bohemian Rhapsody"
    },
    {
      setup: "We will, we will",
      answer: "rock you",
      hint: "Queen - We Will Rock You",
      searchTerm: "Queen We Will Rock You"
    },
    {
      setup: "I see a little silhouetto of a man",
      answer: "Scaramouche Scaramouche will you do the Fandango",
      hint: "Queen - Bohemian Rhapsody",
      searchTerm: "Queen Bohemian Rhapsody"
    },
    {
      setup: "Don't stop me now, I'm having such a good time",
      answer: "I'm having a ball",
      hint: "Queen - Don't Stop Me Now",
      searchTerm: "Queen Don't Stop Me Now"
    },
    {
      setup: "I'm on the highway to hell",
      answer: "highway to hell",
      hint: "AC/DC - Highway to Hell",
      searchTerm: "AC DC Highway to Hell"
    },
    {
      setup: "For those about to rock",
      answer: "we salute you",
      hint: "AC/DC - For Those About to Rock",
      searchTerm: "AC DC For Those About to Rock"
    },
    {
      setup: "I can't get no satisfaction",
      answer: "I can't get no satisfaction",
      hint: "The Rolling Stones - Satisfaction",
      searchTerm: "Rolling Stones Satisfaction"
    },
    {
      setup: "Hey you, out there in the cold",
      answer: "getting lonely getting old",
      hint: "Pink Floyd - Hey You",
      searchTerm: "Pink Floyd Hey You"
    },
    {
      setup: "We don't need no education",
      answer: "we don't need no thought control",
      hint: "Pink Floyd - Another Brick in the Wall",
      searchTerm: "Pink Floyd Another Brick in the Wall"
  },
  {
    setup: "Hello darkness my old friend",
    answer: "I've come to talk with you again",
      hint: "Simon & Garfunkel - The Sound of Silence",
      searchTerm: "Simon Garfunkel Sound of Silence"
    },
    {
      setup: "Load up on guns, bring your friends",
      answer: "it's fun to lose and to pretend",
      hint: "Nirvana - Smells Like Teen Spirit",
      searchTerm: "Nirvana Smells Like Teen Spirit"
    },
    {
      setup: "With the lights out, it's less dangerous",
      answer: "here we are now entertain us",
      hint: "Nirvana - Smells Like Teen Spirit",
      searchTerm: "Nirvana Smells Like Teen Spirit"
    },
    {
      setup: "I'm gonna fight 'em off",
      answer: "a seven nation army couldn't hold me back",
      hint: "The White Stripes - Seven Nation Army",
      searchTerm: "White Stripes Seven Nation Army"
    },
    {
      setup: "I used to rule the world, seas would rise when I gave the word",
      answer: "now in the morning I sleep alone",
      hint: "Coldplay - Viva La Vida",
      searchTerm: "Coldplay Viva La Vida"
    },
    {
      setup: "Look at the stars, look how they shine for you",
      answer: "and everything you do",
      hint: "Coldplay - Yellow",
      searchTerm: "Coldplay Yellow"
    },
    {
      setup: "It's a beautiful day, don't let it get away",
      answer: "it's a beautiful day",
      hint: "U2 - Beautiful Day",
      searchTerm: "U2 Beautiful Day"
    },
    {
      setup: "I still haven't found what I'm looking for",
      answer: "I have climbed highest mountains",
      hint: "U2 - I Still Haven't Found What I'm Looking For",
      searchTerm: "U2 I Still Haven't Found What I'm Looking For"
    },
    {
      setup: "With or without you",
      answer: "with or without you",
      hint: "U2 - With or Without You",
      searchTerm: "U2 With or Without You"
    },
    {
      setup: "Wake me up when September ends",
      answer: "wake me up when September ends",
      hint: "Green Day - Wake Me Up When September Ends",
      searchTerm: "Green Day Wake Me Up When September Ends"
    },
    {
      setup: "Do you have the time to listen to me whine",
      answer: "about nothing and everything all at once",
      hint: "Green Day - Basket Case",
      searchTerm: "Green Day Basket Case"
    },
    {
      setup: "When I come around",
      answer: "when I come around",
      hint: "Green Day - When I Come Around",
      searchTerm: "Green Day When I Come Around"
    },
    {
      setup: "I walk a lonely road",
      answer: "the only one that I have ever known",
      hint: "Green Day - Boulevard of Broken Dreams",
      searchTerm: "Green Day Boulevard of Broken Dreams"
    },
    {
      setup: "Is this love that I'm feeling",
      answer: "is this the love that I've been searching for",
      hint: "Whitesnake - Is This Love",
      searchTerm: "Whitesnake Is This Love"
    },
    {
      setup: "Here I go again on my own",
      answer: "going down the only road I've ever known",
      hint: "Whitesnake - Here I Go Again",
      searchTerm: "Whitesnake Here I Go Again"
    },
    {
      setup: "We're not gonna take it",
      answer: "no we ain't gonna take it",
      hint: "Twisted Sister - We're Not Gonna Take It",
      searchTerm: "Twisted Sister We're Not Gonna Take It"
    },
    {
      setup: "I wanna rock",
      answer: "rock",
      hint: "Twisted Sister - I Wanna Rock",
      searchTerm: "Twisted Sister I Wanna Rock"
    },
    {
      setup: "Pour some sugar on me",
      answer: "ooh in the name of love",
      hint: "Def Leppard - Pour Some Sugar On Me",
      searchTerm: "Def Leppard Pour Some Sugar On Me"
    },
    {
      setup: "Love is like a bomb",
      answer: "baby c'mon get it on",
      hint: "Def Leppard - Pour Some Sugar On Me",
      searchTerm: "Def Leppard Pour Some Sugar On Me"
    },
    {
      setup: "You give love a bad name",
      answer: "shot through the heart and you're to blame",
      hint: "Bon Jovi - You Give Love a Bad Name",
      searchTerm: "Bon Jovi You Give Love a Bad Name"
    },
    {
      setup: "Whoa we're halfway there",
      answer: "whoa livin' on a prayer",
      hint: "Bon Jovi - Livin' on a Prayer",
      searchTerm: "Bon Jovi Livin on a Prayer"
    },
    {
      setup: "It's my life, it's now or never",
      answer: "I ain't gonna live forever",
      hint: "Bon Jovi - It's My Life",
      searchTerm: "Bon Jovi It's My Life"
    },
    {
      setup: "Every rose has its thorn",
      answer: "just like every night has its dawn",
      hint: "Poison - Every Rose Has Its Thorn",
      searchTerm: "Poison Every Rose Has Its Thorn"
    },
    {
      setup: "She's got a smile that it seems to me",
      answer: "reminds me of childhood memories",
      hint: "Guns N' Roses - Sweet Child O' Mine",
      searchTerm: "Guns N Roses Sweet Child O Mine"
    },
    {
      setup: "Welcome to the jungle",
      answer: "we got fun and games",
      hint: "Guns N' Roses - Welcome to the Jungle",
      searchTerm: "Guns N Roses Welcome to the Jungle"
    },
    {
      setup: "Take me down to the paradise city",
      answer: "where the grass is green and the girls are pretty",
      hint: "Guns N' Roses - Paradise City",
      searchTerm: "Guns N Roses Paradise City"
    },
    {
      setup: "I bless the rains down in Africa",
      answer: "gonna take some time to do the things we never had",
      hint: "Toto - Africa",
      searchTerm: "Toto Africa"
    },
    {
      setup: "Hold the line",
      answer: "love isn't always on time",
      hint: "Toto - Hold the Line",
      searchTerm: "Toto Hold the Line"
    },
    {
      setup: "More than a feeling",
      answer: "when I hear that old song they used to play",
      hint: "Boston - More Than a Feeling",
      searchTerm: "Boston More Than a Feeling"
    },
    {
      setup: "Carry on my wayward son",
      answer: "there'll be peace when you are done",
      hint: "Kansas - Carry on Wayward Son",
      searchTerm: "Kansas Carry on Wayward Son"
    },
    {
      setup: "We are the champions my friends",
      answer: "and we'll keep on fighting till the end",
      hint: "Queen - We Are the Champions",
      searchTerm: "Queen We Are the Champions"
    }
  ],
  soul: [
    {
      setup: "I see trees of green, red roses too",
      answer: "I see them bloom for me and you",
      hint: "Louis Armstrong - What a Wonderful World",
      searchTerm: "Louis Armstrong What a Wonderful World"
    },
    {
      setup: "Georgia, Georgia",
      answer: "the whole day through",
      hint: "Ray Charles - Georgia On My Mind",
      searchTerm: "Ray Charles Georgia On My Mind"
    },
    {
      setup: "Hit the road Jack",
      answer: "and don't you come back no more",
      hint: "Ray Charles - Hit the Road Jack",
      searchTerm: "Ray Charles Hit the Road Jack"
    },
    {
      setup: "I can't stop loving you",
      answer: "I've made up my mind",
      hint: "Ray Charles - I Can't Stop Loving You",
      searchTerm: "Ray Charles I Can't Stop Loving You"
    },
    {
      setup: "What you want, baby I got it",
      answer: "what you need do you know I got it",
      hint: "Aretha Franklin - Respect",
      searchTerm: "Aretha Franklin Respect"
    },
    {
      setup: "You make me feel like a natural woman",
      answer: "woman",
      hint: "Aretha Franklin - Natural Woman",
      searchTerm: "Aretha Franklin Natural Woman"
    },
    {
      setup: "Think about what you're trying to do to me",
      answer: "think think about it",
      hint: "Aretha Franklin - Think",
      searchTerm: "Aretha Franklin Think"
    },
    {
      setup: "Chain chain chain",
      answer: "chain of fools",
      hint: "Aretha Franklin - Chain of Fools",
      searchTerm: "Aretha Franklin Chain of Fools"
    },
    {
      setup: "I heard it through the grapevine",
      answer: "not much longer would you be mine",
      hint: "Marvin Gaye - I Heard It Through the Grapevine",
      searchTerm: "Marvin Gaye I Heard It Through the Grapevine"
    },
    {
      setup: "What's going on",
      answer: "what's going on",
      hint: "Marvin Gaye - What's Going On",
      searchTerm: "Marvin Gaye What's Going On"
    },
    {
      setup: "Let's get it on",
      answer: "let's get it on",
      hint: "Marvin Gaye - Let's Get It On",
      searchTerm: "Marvin Gaye Let's Get It On"
    },
    {
      setup: "Ain't no mountain high enough",
      answer: "ain't no valley low enough",
      hint: "Marvin Gaye & Tammi Terrell - Ain't No Mountain High Enough",
      searchTerm: "Marvin Gaye Ain't No Mountain High Enough"
    },
    {
      setup: "My girl, my girl",
      answer: "talking 'bout my girl",
      hint: "The Temptations - My Girl",
      searchTerm: "Temptations My Girl"
    },
    {
      setup: "I've got sunshine on a cloudy day",
      answer: "when it's cold outside I've got the month of May",
      hint: "The Temptations - My Girl",
      searchTerm: "Temptations My Girl"
    },
    {
      setup: "Ain't too proud to beg",
      answer: "sweet darling",
      hint: "The Temptations - Ain't Too Proud to Beg",
      searchTerm: "Temptations Ain't Too Proud to Beg"
    },
    {
      setup: "Papa was a rolling stone",
      answer: "wherever he laid his hat was his home",
      hint: "The Temptations - Papa Was a Rollin' Stone",
      searchTerm: "Temptations Papa Was a Rollin Stone"
    },
    {
      setup: "Stop in the name of love",
      answer: "before you break my heart",
      hint: "The Supremes - Stop! In the Name of Love",
      searchTerm: "Supremes Stop In the Name of Love"
    },
    {
      setup: "You can't hurry love",
      answer: "no you just have to wait",
      hint: "The Supremes - You Can't Hurry Love",
      searchTerm: "Supremes You Can't Hurry Love"
    },
    {
      setup: "Baby love, my baby love",
      answer: "I need you oh how I need you",
      hint: "The Supremes - Baby Love",
      searchTerm: "Supremes Baby Love"
    },
    {
      setup: "Dancing in the street",
      answer: "calling out around the world",
      hint: "Martha and the Vandellas - Dancing in the Street",
      searchTerm: "Martha Vandellas Dancing in the Street"
    },
    {
      setup: "Nowhere to run to baby",
      answer: "nowhere to hide",
      hint: "Martha and the Vandellas - Nowhere to Run",
      searchTerm: "Martha Vandellas Nowhere to Run"
    },
    {
      setup: "Heat wave burning in my heart",
      answer: "can't keep from crying",
      hint: "Martha and the Vandellas - Heat Wave",
      searchTerm: "Martha Vandellas Heat Wave"
    },
    {
      setup: "I want you back",
      answer: "oh baby give me one more chance",
      hint: "The Jackson 5 - I Want You Back",
      searchTerm: "Jackson 5 I Want You Back"
    },
    {
      setup: "ABC, easy as 123",
      answer: "simple as do re mi",
      hint: "The Jackson 5 - ABC",
      searchTerm: "Jackson 5 ABC"
    },
    {
      setup: "I'll be there",
      answer: "I'll be there",
      hint: "The Jackson 5 - I'll Be There",
      searchTerm: "Jackson 5 I'll Be There"
    },
    {
      setup: "Signed sealed delivered I'm yours",
      answer: "signed sealed delivered I'm yours",
      hint: "Stevie Wonder - Signed, Sealed, Delivered",
      searchTerm: "Stevie Wonder Signed Sealed Delivered"
    },
    {
      setup: "Very superstitious",
      answer: "writing's on the wall",
      hint: "Stevie Wonder - Superstition",
      searchTerm: "Stevie Wonder Superstition"
    },
    {
      setup: "Isn't she lovely",
      answer: "isn't she wonderful",
      hint: "Stevie Wonder - Isn't She Lovely",
      searchTerm: "Stevie Wonder Isn't She Lovely"
    },
    {
      setup: "I just called to say I love you",
      answer: "I just called to say how much I care",
      hint: "Stevie Wonder - I Just Called to Say I Love You",
      searchTerm: "Stevie Wonder I Just Called to Say I Love You"
    },
    {
      setup: "When a man loves a woman",
      answer: "can't keep his mind on nothing else",
      hint: "Percy Sledge - When a Man Loves a Woman",
      searchTerm: "Percy Sledge When a Man Loves a Woman"
    },
    {
      setup: "Sitting on the dock of the bay",
      answer: "watching the tide roll away",
      hint: "Otis Redding - (Sittin' On) The Dock of the Bay",
      searchTerm: "Otis Redding Dock of the Bay"
    },
    {
      setup: "Try a little tenderness",
      answer: "you know she's waiting",
      hint: "Otis Redding - Try a Little Tenderness",
      searchTerm: "Otis Redding Try a Little Tenderness"
    },
    {
      setup: "Stand by me",
      answer: "when the night has come",
      hint: "Ben E. King - Stand by Me",
      searchTerm: "Ben E King Stand by Me"
    },
    {
      setup: "Under the boardwalk",
      answer: "down by the sea",
      hint: "The Drifters - Under the Boardwalk",
      searchTerm: "Drifters Under the Boardwalk"
    },
    {
      setup: "Save the last dance for me",
      answer: "oh I know that the music's fine",
      hint: "The Drifters - Save the Last Dance for Me",
      searchTerm: "Drifters Save the Last Dance for Me"
    },
    {
      setup: "This magic moment",
      answer: "so different and so new",
      hint: "The Drifters - This Magic Moment",
      searchTerm: "Drifters This Magic Moment"
    },
    {
      setup: "Lean on me",
      answer: "when you're not strong",
      hint: "Bill Withers - Lean on Me",
      searchTerm: "Bill Withers Lean on Me"
    },
    {
      setup: "Ain't no sunshine when she's gone",
      answer: "it's not warm when she's away",
      hint: "Bill Withers - Ain't No Sunshine",
      searchTerm: "Bill Withers Ain't No Sunshine"
    },
    {
      setup: "Just the two of us",
      answer: "we can make it if we try",
      hint: "Bill Withers - Just the Two of Us",
      searchTerm: "Bill Withers Just the Two of Us"
    },
    {
      setup: "Use me",
      answer: "use me up",
      hint: "Bill Withers - Use Me",
      searchTerm: "Bill Withers Use Me"
    }
  ],
  hiphop: [
    {
      setup: "Now this is a story all about how",
      answer: "my life got flipped turned upside down",
      hint: "Will Smith - Fresh Prince of Bel-Air Theme",
      searchTerm: "Fresh Prince of Bel Air Theme"
    },
    {
      setup: "I like big butts and I cannot lie",
      answer: "you other brothers can't deny",
      hint: "Sir Mix-a-Lot - Baby Got Back",
      searchTerm: "Sir Mix a Lot Baby Got Back"
    },
    {
      setup: "It was all a dream",
      answer: "I used to read Word Up magazine",
      hint: "The Notorious B.I.G. - Juicy",
      searchTerm: "Notorious BIG Juicy"
    },
    {
      setup: "First things first rest in peace Uncle Phil",
      answer: "for real you the only father that I ever knew",
      hint: "J. Cole - No Role Modelz",
      searchTerm: "J Cole No Role Modelz"
    },
    {
      setup: "His palms are sweaty, knees weak, arms are heavy",
      answer: "there's vomit on his sweater already mom's spaghetti",
      hint: "Eminem - Lose Yourself",
      searchTerm: "Eminem Lose Yourself"
    },
    {
      setup: "Guess who's back, back again",
      answer: "Shady's back tell a friend",
      hint: "Eminem - Without Me",
      searchTerm: "Eminem Without Me"
    },
    {
      setup: "My name is, my name is",
      answer: "my name is Slim Shady",
      hint: "Eminem - My Name Is",
      searchTerm: "Eminem My Name Is"
    },
    {
      setup: "I'm beginning to feel like a rap god",
      answer: "rap god",
      hint: "Eminem - Rap God",
      searchTerm: "Eminem Rap God"
    },
    {
      setup: "California love",
      answer: "California knows how to party",
      hint: "2Pac - California Love",
      searchTerm: "2Pac California Love"
    },
    {
      setup: "I see no changes",
      answer: "wake up in the morning and I ask myself",
      hint: "2Pac - Changes",
      searchTerm: "2Pac Changes"
    },
    {
      setup: "All eyez on me",
      answer: "all eyez on me",
      hint: "2Pac - All Eyez on Me",
      searchTerm: "2Pac All Eyez on Me"
    },
    {
      setup: "Dear mama",
      answer: "you are appreciated",
      hint: "2Pac - Dear Mama",
      searchTerm: "2Pac Dear Mama"
    },
    {
      setup: "Rollin' down the street smokin' indo",
      answer: "sippin' on gin and juice",
      hint: "Snoop Dogg - Gin and Juice",
      searchTerm: "Snoop Dogg Gin and Juice"
    },
    {
      setup: "Drop it like it's hot",
      answer: "drop it like it's hot",
      hint: "Snoop Dogg - Drop It Like It's Hot",
      searchTerm: "Snoop Dogg Drop It Like It's Hot"
    },
    {
      setup: "One two three and to the four",
      answer: "Snoop Doggy Dogg and Dr. Dre is at the door",
      hint: "Snoop Dogg - Nuthin' but a 'G' Thang",
      searchTerm: "Dr Dre Nuthin but a G Thang"
    },
    {
      setup: "Still D.R.E.",
      answer: "still doing my thang",
      hint: "Dr. Dre - Still D.R.E.",
      searchTerm: "Dr Dre Still DRE"
    },
    {
      setup: "I got 99 problems",
      answer: "but a bitch ain't one",
      hint: "Jay-Z - 99 Problems",
      searchTerm: "Jay Z 99 Problems"
    },
    {
      setup: "Big pimpin' spendin' cheese",
      answer: "we be big pimpin' on B.L.A.D.'s",
      hint: "Jay-Z - Big Pimpin'",
      searchTerm: "Jay Z Big Pimpin"
    },
    {
      setup: "I got the hottest chick in the game",
      answer: "wearing my chain",
      hint: "Jay-Z - Dirt Off Your Shoulder",
      searchTerm: "Jay Z Dirt Off Your Shoulder"
    },
    {
      setup: "H to the izzo V to the izzay",
      answer: "for shizzle my nizzle used to dribble down in VA",
      hint: "Jay-Z - Izzo (H.O.V.A.)",
      searchTerm: "Jay Z Izzo HOVA"
    },
    {
      setup: "Can I kick it",
      answer: "yes you can",
      hint: "A Tribe Called Quest - Can I Kick It?",
      searchTerm: "A Tribe Called Quest Can I Kick It"
    },
    {
      setup: "I got five on it",
      answer: "grab your 40 let's get keyed",
      hint: "Luniz - I Got 5 on It",
      searchTerm: "Luniz I Got 5 on It"
    },
    {
      setup: "It's going down, I'm yelling timber",
      answer: "you better move you better dance",
      hint: "Pitbull ft. Kesha - Timber",
      searchTerm: "Pitbull Timber"
    },
    {
      setup: "Dale",
      answer: "Mr. Worldwide",
      hint: "Pitbull - Various Songs",
      searchTerm: "Pitbull Dale"
    },
    {
      setup: "Started from the bottom now we're here",
      answer: "started from the bottom now my whole team here",
      hint: "Drake - Started from the Bottom",
      searchTerm: "Drake Started from the Bottom"
    },
    {
      setup: "You used to call me on my cell phone",
      answer: "late night when you need my love",
      hint: "Drake - Hotline Bling",
      searchTerm: "Drake Hotline Bling"
    },
    {
      setup: "I got a lot of enemies",
      answer: "got a lot of people tryna drain me of my energy",
      hint: "Drake - Energy",
      searchTerm: "Drake Energy"
    },
    {
      setup: "Know yourself, know your worth",
      answer: "my actions been louder than my words",
      hint: "Drake - Know Yourself",
      searchTerm: "Drake Know Yourself"
    },
    {
      setup: "Hello, it's me",
      answer: "I'm in California dreaming",
      hint: "LL Cool J - Going Back to Cali",
      searchTerm: "LL Cool J Going Back to Cali"
    },
    {
      setup: "Don't call it a comeback",
      answer: "I been here for years",
      hint: "LL Cool J - Mama Said Knock You Out",
      searchTerm: "LL Cool J Mama Said Knock You Out"
    },
    {
      setup: "I need love",
      answer: "I need love",
      hint: "LL Cool J - I Need Love",
      searchTerm: "LL Cool J I Need Love"
    },
    {
      setup: "Ladies love cool James",
      answer: "ladies love cool James",
      hint: "LL Cool J - I'm Bad",
      searchTerm: "LL Cool J I'm Bad"
    },
    {
      setup: "Push it push it real good",
      answer: "push it real good",
      hint: "Salt-N-Pepa - Push It",
      searchTerm: "Salt N Pepa Push It"
    },
    {
      setup: "Let's talk about sex baby",
      answer: "let's talk about you and me",
      hint: "Salt-N-Pepa - Let's Talk About Sex",
      searchTerm: "Salt N Pepa Let's Talk About Sex"
    },
    {
      setup: "Shoop shoop ba-doop",
      answer: "shoop ba-doop",
      hint: "Salt-N-Pepa - Shoop",
      searchTerm: "Salt N Pepa Shoop"
    },
    {
      setup: "What a man what a man what a mighty good man",
      answer: "yes he is",
      hint: "Salt-N-Pepa - Whatta Man",
      searchTerm: "Salt N Pepa Whatta Man"
    },
    {
      setup: "Jump jump",
      answer: "the Mac Dad will make you jump jump",
      hint: "Kris Kross - Jump",
      searchTerm: "Kris Kross Jump"
    },
    {
      setup: "Warm it up Kris",
      answer: "I'm about to",
      hint: "Kris Kross - Warm It Up",
      searchTerm: "Kris Kross Warm It Up"
    },
    {
      setup: "Ice ice baby",
      answer: "ice ice baby",
      hint: "Vanilla Ice - Ice Ice Baby",
      searchTerm: "Vanilla Ice Ice Ice Baby"
    },
    {
      setup: "Stop collaborate and listen",
      answer: "Ice is back with my brand new invention",
      hint: "Vanilla Ice - Ice Ice Baby",
      searchTerm: "Vanilla Ice Ice Ice Baby"
    }
  ],
  everybody: [
    {
      setup: "Just a small town girl, living in a lonely world",
      answer: "she took the midnight train going anywhere",
      hint: "Journey - Don't Stop Believin'",
      searchTerm: "Journey Don't Stop Believin"
    },
    {
      setup: "Don't stop believin'",
      answer: "hold on to that feelin'",
      hint: "Journey - Don't Stop Believin'",
      searchTerm: "Journey Don't Stop Believin"
    },
    {
      setup: "Happy birthday to you",
      answer: "happy birthday to you",
      hint: "Traditional - Happy Birthday",
      searchTerm: "Happy Birthday Song"
    },
    {
      setup: "Twinkle twinkle little star",
      answer: "how I wonder what you are",
      hint: "Traditional - Twinkle Twinkle Little Star",
      searchTerm: "Twinkle Twinkle Little Star"
    },
    {
      setup: "ABC, easy as 123",
      answer: "simple as do re mi",
      hint: "The Jackson 5 - ABC",
      searchTerm: "Jackson 5 ABC"
    },
    {
      setup: "Sweet Caroline, good times never seemed so good",
      answer: "I've been inclined to believe they never would",
      hint: "Neil Diamond - Sweet Caroline",
      searchTerm: "Neil Diamond Sweet Caroline"
    },
    {
      setup: "Country roads, take me home",
      answer: "to the place I belong",
      hint: "John Denver - Take Me Home, Country Roads",
      searchTerm: "John Denver Take Me Home Country Roads"
    },
    {
      setup: "West Virginia, mountain mama",
      answer: "take me home country roads",
      hint: "John Denver - Take Me Home, Country Roads",
      searchTerm: "John Denver Take Me Home Country Roads"
    },
    {
      setup: "I'm walking on sunshine",
      answer: "and don't it feel good",
      hint: "Katrina and the Waves - Walking on Sunshine",
      searchTerm: "Katrina Waves Walking on Sunshine"
    },
    {
      setup: "Girls just want to have fun",
      answer: "oh girls just want to have fun",
      hint: "Cyndi Lauper - Girls Just Want to Have Fun",
      searchTerm: "Cyndi Lauper Girls Just Want to Have Fun"
    },
    {
      setup: "I'm a believer, I couldn't leave her if I tried",
      answer: "then I saw her face",
      hint: "The Monkees - I'm a Believer",
      searchTerm: "Monkees I'm a Believer"
    },
    {
      setup: "Hey now, you're an all star",
      answer: "get your game on go play",
      hint: "Smash Mouth - All Star",
      searchTerm: "Smash Mouth All Star"
    },
    {
      setup: "Somebody once told me the world is gonna roll me",
      answer: "I ain't the sharpest tool in the shed",
      hint: "Smash Mouth - All Star",
      searchTerm: "Smash Mouth All Star"
    },
    {
      setup: "I'm blue da ba dee da ba daa",
      answer: "da ba dee da ba daa",
      hint: "Eiffel 65 - Blue",
      searchTerm: "Eiffel 65 Blue Da Ba Dee"
    },
    {
      setup: "It's Friday, Friday, gotta get down on Friday",
      answer: "everybody's lookin' forward to the weekend",
      hint: "Rebecca Black - Friday",
      searchTerm: "Rebecca Black Friday"
    },
    {
      setup: "Never gonna give you up, never gonna let you down",
      answer: "never gonna run around and desert you",
      hint: "Rick Astley - Never Gonna Give You Up",
      searchTerm: "Rick Astley Never Gonna Give You Up"
    },
    {
      setup: "Let it go, let it go",
      answer: "can't hold it back anymore",
      hint: "Frozen - Let It Go",
      searchTerm: "Idina Menzel Let It Go Frozen"
    },
    {
      setup: "Everything is awesome",
      answer: "everything is cool when you're part of a team",
      hint: "The Lego Movie - Everything Is Awesome",
      searchTerm: "Lego Movie Everything Is Awesome"
    },
    {
      setup: "YMCA",
      answer: "it's fun to stay at the YMCA",
      hint: "Village People - YMCA",
      searchTerm: "Village People YMCA"
    },
    {
      setup: "Macarena",
      answer: "hey Macarena",
      hint: "Los Del Rio - Macarena",
      searchTerm: "Los Del Rio Macarena"
    },
    {
      setup: "Who let the dogs out",
      answer: "who who who who",
      hint: "Baha Men - Who Let the Dogs Out",
      searchTerm: "Baha Men Who Let the Dogs Out"
    },
    {
      setup: "I get knocked down, but I get up again",
      answer: "you're never gonna keep me down",
      hint: "Chumbawamba - Tubthumping",
      searchTerm: "Chumbawamba Tubthumping"
    },
    {
      setup: "Mambo number five",
      answer: "a little bit of Monica in my life",
      hint: "Lou Bega - Mambo No. 5",
      searchTerm: "Lou Bega Mambo No 5"
    },
    {
      setup: "Come on Eileen",
      answer: "oh I swear what he means",
      hint: "Dexys Midnight Runners - Come On Eileen",
      searchTerm: "Dexys Midnight Runners Come On Eileen"
    },
    {
      setup: "Mickey you're so fine",
      answer: "you're so fine you blow my mind",
      hint: "Toni Basil - Mickey",
      searchTerm: "Toni Basil Mickey"
    },
    {
      setup: "Wake me up before you go-go",
      answer: "don't leave me hanging on like a yo-yo",
      hint: "Wham! - Wake Me Up Before You Go-Go",
      searchTerm: "Wham Wake Me Up Before You Go Go"
    },
    {
      setup: "Take on me",
      answer: "take me on",
      hint: "a-ha - Take On Me",
      searchTerm: "a-ha Take On Me"
    },
    {
      setup: "I'll be gone",
      answer: "in a day or two",
      hint: "a-ha - Take On Me",
      searchTerm: "a-ha Take On Me"
    },
    {
      setup: "Don't you forget about me",
      answer: "don't don't don't don't",
      hint: "Simple Minds - Don't You (Forget About Me)",
      searchTerm: "Simple Minds Don't You Forget About Me"
    },
    {
      setup: "Eye of the tiger",
      answer: "it's the thrill of the fight",
      hint: "Survivor - Eye of the Tiger",
      searchTerm: "Survivor Eye of the Tiger"
    },
    {
      setup: "Rising up back on the street",
      answer: "did my time took my chances",
      hint: "Survivor - Eye of the Tiger",
      searchTerm: "Survivor Eye of the Tiger"
    },
    {
      setup: "Final countdown",
      answer: "we're leaving together",
      hint: "Europe - The Final Countdown",
      searchTerm: "Europe The Final Countdown"
    },
    {
      setup: "We're heading for Venus",
      answer: "and still we stand tall",
      hint: "Europe - The Final Countdown",
      searchTerm: "Europe The Final Countdown"
    },
    {
      setup: "Total eclipse of the heart",
      answer: "once upon a time I was falling in love",
      hint: "Bonnie Tyler - Total Eclipse of the Heart",
      searchTerm: "Bonnie Tyler Total Eclipse of the Heart"
    },
    {
      setup: "Turn around bright eyes",
      answer: "every now and then I fall apart",
      hint: "Bonnie Tyler - Total Eclipse of the Heart",
      searchTerm: "Bonnie Tyler Total Eclipse of the Heart"
    },
    {
      setup: "I want to dance with somebody",
      answer: "I want to feel the heat with somebody",
      hint: "Whitney Houston - I Wanna Dance with Somebody",
      searchTerm: "Whitney Houston I Wanna Dance with Somebody"
    },
    {
      setup: "And I will always love you",
      answer: "I will always love you",
      hint: "Whitney Houston - I Will Always Love You",
      searchTerm: "Whitney Houston I Will Always Love You"
    },
    {
      setup: "R-E-S-P-E-C-T",
      answer: "find out what it means to me",
      hint: "Aretha Franklin - Respect",
      searchTerm: "Aretha Franklin Respect"
    },
    {
      setup: "I will survive",
      answer: "oh as long as I know how to love",
      hint: "Gloria Gaynor - I Will Survive",
      searchTerm: "Gloria Gaynor I Will Survive"
    },
    {
      setup: "At first I was afraid, I was petrified",
      answer: "kept thinking I could never live without you by my side",
      hint: "Gloria Gaynor - I Will Survive",
      searchTerm: "Gloria Gaynor I Will Survive"
    }
  ]
}

// Cache for iTunes preview URLs
const previewUrlCache = new Map()

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
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
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  
  const recognitionRef = useRef(null)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)
  const listeningTimerRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const transcriptIdCounter = useRef(0)

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
    const randomLyric = getRandomLyric(category || selectedCategory)
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
    setIsLoadingAudio(false)
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
          </>
        )}

        {/* Hidden audio element with CORS mode */}
        <audio ref={audioRef} crossOrigin="anonymous" />
      </div>
    </div>
  )
}

export default App
