import React from 'react';
import { RoomType, useGameContext } from '../hooks/GameContext';
import { Button } from 'primereact/button';

type ChatType = { type: 'movie' | 'joke' | 'praise' | 'snow'; chat: React.ReactNode }[];

export const TalkSection = () => {
  const {
    progress,
    movie,
    snow,
    setRoom,
    setMovieWithSanta,
    praisedSanta,
    setPraisedSanta,
    showedSnow,
    setShowedSnow,
    makeProgress,
  } = useGameContext();

  const tvButton = React.useMemo(
    () => (
      <Button
        label="Go to the TV room"
        outlined
        severity="secondary"
        onClick={() => {
          setRoom(RoomType.TVROOM);
          setMovieWithSanta(true);
        }}
      />
    ),
    [setMovieWithSanta, setRoom],
  );

  const chats: ChatType = React.useMemo(() => {
    const chats = [
      movie && {
        type: 'movie',
        chat: (
          <>
            <p>
              <span className="text-400">You</span>: "Hey, wanna watch a movie?"
            </p>
            <p>
              <span className="text-400">Santa</span>: "Sure, why not?"
            </p>
            <div className="">{tvButton}</div>
          </>
        ),
      },
      movie && {
        type: 'movie',
        chat: (
          <>
            <p>
              <span className="text-400">You</span>: "{movie} is on, do you wanna watch?"
            </p>
            <p>
              <span className="text-400">Santa</span>: "Sure, why not?"
            </p>
            <div className="">{tvButton}</div>
          </>
        ),
      },
      {
        type: 'joke',
        chat: (
          <>
            <p>
              <span className="text-400">Santa</span>: "What do three hos get you?"
            </p>
            <p>
              <span className="text-400">Santa</span>: "One very jolly Santa."
            </p>
          </>
        ),
      },
      !movie && {
        type: 'joke',
        chat: (
          <>
            <p>
              <span className="text-400">Santa</span>: "Why does Santa go to strip clubs?"
            </p>
            <p>
              <span className="text-400">Santa</span>: "To visit all his ho ho ho’s."
            </p>
          </>
        ),
      },
      {
        type: 'joke',
        chat: (
          <>
            <p>
              <span className="text-400">Santa</span>: "What do you call Santa’s helpers?"
            </p>
            <p>
              <span className="text-400">Santa</span>: "Subordinate clauses."
            </p>
          </>
        ),
      },
      {
        type: 'joke',
        chat: (
          <>
            <p>
              <span className="text-400">Santa</span>: "Why did Santa divorce Mrs. Claus?"
            </p>
            <p>
              <span className="text-400">Santa</span>: "He couldn’t let go of all those ho’s."
            </p>
          </>
        ),
      },
      progress && {
        type: 'praise',
        chat: (
          <>
            <p>
              <span className="text-400">You</span>: "You know at first I didn't like you much. But
              I am starting to."
            </p>
            <p>
              <span className="text-400">Santa</span> (crying): "Thank you. This really means a
              lot."
            </p>
          </>
        ),
      },
      progress && {
        type: 'praise',
        chat: (
          <>
            <p>
              <span className="text-400">You</span>: "I love your jokes, man. Never change."
            </p>
            <p>
              <span className="text-400">Santa</span>: "Do you wanna hear another one?"
            </p>
            <p className="mt-3">
              <span className="text-400">Santa</span>: "A gingerbread man went to the doctor’s
              complaining of a sore knee."
            </p>
            <p>
              <span className="text-400">Santa</span>: "'A sore knee?' the doctor said. 'Have you
              tried icing it?'"
            </p>
          </>
        ),
      },
      !progress && {
        type: 'hint',
        chat: (
          <>
            <p>
              <span className="text-400">Santa</span>: "Why doesn't anybody ever ask me what I want
              for Christmas?"
            </p>
          </>
        ),
      },
      !progress && {
        type: 'hint',
        chat: (
          <>
            <p>
              <span className="text-400">Santa</span>: "I'm craving something sweet. Do you have
              anything?"
            </p>
          </>
        ),
      },
      snow && {
        type: snow,
        chat: (
          <>
            <p>
              <span className="text-400">You</span>: "Hey! Look outside! It's snowing!"
            </p>
          </>
        ),
      },
      snow && {
        type: snow,
        chat: (
          <>
            <p>
              <span className="text-400">You</span>: "It's snowing, look!"
            </p>
          </>
        ),
      },
    ].filter(Boolean);

    return chats as ChatType;
  }, [movie, progress, snow, tvButton]);

  const chat = chats[Math.floor(Math.random() * 100) % chats.length];

  React.useEffect(() => {
    if (chat.type === 'praise' && !praisedSanta) {
      setPraisedSanta(true);
      makeProgress(10);
    } else if (chat.type === 'snow' && !showedSnow) {
      setShowedSnow(true);
      makeProgress(10);
    }
  }, [chat.type, makeProgress, praisedSanta, setPraisedSanta, setShowedSnow, showedSnow]);

  return <>{chat.chat}</>;
};
