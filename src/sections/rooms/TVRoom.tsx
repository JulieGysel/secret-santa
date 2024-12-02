import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useGameContext } from '../../hooks/GameContext';
import { GrabItem, Room, MenuButton } from '../../components';
import { Miscelaneous } from '../../types';
import { RoomSwitch } from '../RoomSwitch';

import commonSound from '../../audio/common.mp3';
import movieSound from '../../audio/movie.mp3';

// todo
const games = ['Settlers of Catan', 'Chess', 'Cards'];

const Movie = ({ movie }: { movie: string }) => {
  const {
    inventory,
    movieWithSanta,
    watchedMovieWithSanta,
    setWatchedMovieWithSanta,
    makeProgress,
  } = useGameContext();
  const cookieRecipeAvailable = !inventory.includes(Miscelaneous.cookieRecipe);

  React.useEffect(() => {
    if (movieWithSanta && !watchedMovieWithSanta) {
      setWatchedMovieWithSanta(true);
      makeProgress(20);
    }
  }, [makeProgress, movieWithSanta, setWatchedMovieWithSanta, watchedMovieWithSanta]);

  return (
    <>
      <p>You always wanted to watch {movie}. Such a great Chrismas movie!</p>
      {movieWithSanta && <p>And Santa is loving it too.</p>}
      {cookieRecipeAvailable && (
        <>
          <p>But what is that in the couch?</p>
          <div className="flex flex-wrap gap-2">
            <GrabItem item={Miscelaneous.cookieRecipe} mystery />
          </div>
        </>
      )}
    </>
  );
};

export const TVRoom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();
  const { movie, mute } = useGameContext();

  const roomAudioRef = React.useRef<HTMLAudioElement>(null);
  const movieAudioRef = React.useRef<HTMLAudioElement>(null);

  const tvActions = React.useMemo(
    () =>
      movie
        ? [
            {
              label: 'Watch',
              command: () => {
                setVisible(true);
                setDialogContent(<Movie movie={movie} />);
              },
            },
          ]
        : [],
    [movie],
  );

  const game = React.useMemo(() => games[Math.floor(Math.random() * 100) % games.length], []);

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <div className="flex-grow-1" key={'span'}></div>,
    <Button
      label="Complain about Santa"
      outlined
      severity="danger"
      onClick={() => {
        setVisible(true);
        setDialogContent('');
      }}
      key={'complain'}
    />,
    <Button
      label="Leave the room"
      outlined
      severity="info"
      onClick={() => {
        setVisible(true);
        setDialogContent(<RoomSwitch closeModal={closeModal} />);
      }}
      key={'leave'}
    />,
  ];

  const roomItems = [
    <MenuButton
      label="TV"
      items={tvActions}
      disabledReason="No movie is currently playing."
      key={'tv'}
    />,
    <MenuButton
      label="Board game stack"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(
              `So many games to choose from. There is ${games.join(', ')}... The condition of some leaves a lot to be desired. But you can play them anyway!`,
            );
          },
        },
        {
          label: 'Play a game',
          command: () => {
            setVisible(true);
            setDialogContent(`${game}? Good choice! That will be a fun couple hours...`);
          },
        },
      ]}
      key={'board-games'}
    />,
    <MenuButton
      label="Outside doors"
      items={[
        {
          label: 'Look outside',
          command: () => {
            setVisible(true);
            setDialogContent('Nasty Danish morning weather.');
          },
        },
      ]}
      key={'doors'}
    />,
  ];

  React.useEffect(() => {
    if (movieAudioRef.current && roomAudioRef.current) {
      console.log(movie || 'no movie');
      if (movie) {
        movieAudioRef.current.play();
        roomAudioRef.current.pause();
      } else {
        roomAudioRef.current.play();
        movieAudioRef.current.pause();
      }
    }
  }, [movie]);

  return (
    <>
      <Room
        title={'TV Room'}
        description={
          <>
            <p>The TV room is a cozy place.</p>
            <p>
              With multiple couches to sit or lie on, a large teddy bear to cuddle with, and of
              course... the big TV it is the perfect place for watching a movie with some friends.
            </p>
            <p>
              Around the TV, there are two shelves. One of them is absolutely stacked with board
              games.
            </p>
          </>
        }
        roomActions={roomActions}
        roomItems={roomItems}
      ></Room>
      <Dialog
        footer={<Button label="Back" outlined severity="secondary" onClick={closeModal} />}
        visible={visible}
        onHide={closeModal}
        dismissableMask
        draggable={false}
        resizable={false}
        closable={false}
        className="w-5"
      >
        {dialogContent}
      </Dialog>
      <audio ref={roomAudioRef} preload="auto" hidden loop muted={mute}>
        <source src={commonSound} type="audio/mpeg" />
      </audio>

      <audio ref={movieAudioRef} preload="auto" hidden loop muted={mute}>
        <source src={movieSound} type="audio/mpeg" />
      </audio>
    </>
  );
};
