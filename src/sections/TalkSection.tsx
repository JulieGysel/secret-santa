import React from 'react';
import { RoomType, useGameContext } from '../hooks/GameContext';
import { Button } from 'primereact/button';

type ChatType = { type: 'movie' | 'joke' | 'praise'; chat: React.ReactNode }[];

export const TalkSection = () => {
  const {
    progress,
    movie,
    setRoom,
    setMovieWithSanta,
    praisedSanta,
    setPraisedSanta,
    makeProgress,
  } = useGameContext();

  console.log(movie);

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
      {
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
          </>
        ),
      },
    ].filter(Boolean);

    return chats as ChatType;
  }, [movie, progress, tvButton]);

  const chat = chats[Math.floor(Math.random() * 100) % chats.length];

  React.useEffect(() => {
    console.log(chat.type);
    if (chat.type === 'praise' && !praisedSanta) {
      setPraisedSanta(true);
      makeProgress(20);
    }
  }, [chat.type, makeProgress, praisedSanta, setPraisedSanta]);

  return <>{chat.chat}</>;
};
