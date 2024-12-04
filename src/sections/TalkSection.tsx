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

  const chats: ChatType = [
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
            <span className="text-400">Santa</span>: "Do you know why I don't have any children?"
          </p>
          <p>
            <span className="text-400">Santa</span>: "Because I only come once a year."
          </p>
        </>
      ),
    },
    {
      type: 'joke',
      chat: (
        <>
          <p>
            <span className="text-400">Santa</span>: "Do you want to know why I'm always so damn
            jolly?"
          </p>
          <p>
            <span className="text-400">Santa</span>: "Because I know where all the naughty girls
            live."
          </p>
        </>
      ),
    },
    {
      type: 'joke',
      chat: (
        <>
          <p>
            <span className="text-400">You</span>: "Knock knock."
          </p>
          <p>
            <span className="text-400">Santa</span>: "Who's there?"
          </p>
          <p>
            <span className="text-400">You</span>: "Knot."
          </p>
          <p>
            <span className="text-400">Santa</span>: "Knot who?"
          </p>
          <p>
            <span className="text-400">You</span>: "Knot another Santa joke. Please!"
          </p>
        </>
      ),
    },
    {
      type: 'joke',
      chat: (
        <>
          <p>
            <span className="text-400">Santa</span>: "Do you wanna know why I divorced Mrs. Claus?"
          </p>
          <p>
            <span className="text-400">Santa</span>: "I couldn’t let go of all those ho’s."
          </p>
        </>
      ),
    },
    progress && {
      type: 'praise',
      chat: (
        <>
          <p>
            <span className="text-400">You</span>: "You know at first I didn't like you much. But I
            am starting to."
          </p>
          <p>
            <span className="text-400">Santa</span> (crying): "Thank you. This really means a lot."
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
          <p>
            <span className="text-400">Santa</span>: "But I guess I would want to be suprised."
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
      type: 'snow',
      chat: (
        <>
          <p>
            <span className="text-400">You</span>: "Hey! Look outside! It's snowing!"
          </p>
        </>
      ),
    },
    snow && {
      type: 'snow',
      chat: (
        <>
          <p>
            <span className="text-400">You</span>: "It's snowing, look!"
          </p>
        </>
      ),
    },
    !snow && {
      type: 'hint',
      chat: (
        <>
          <p>
            <span className="text-400">Santa</span>: "When is the last time it snowed around here?"
          </p>
        </>
      ),
    },
  ].filter(Boolean) as ChatType;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chat = React.useMemo(() => chats[Math.floor(Math.random() * 100) % chats.length], []);

  React.useEffect(() => {
    console.log(chat.type);
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
