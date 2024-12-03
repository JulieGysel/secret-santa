import Snowfall from 'react-snowfall';
import { useGameContext } from '../hooks/GameContext';

export const Window = () => {
  const { snow } = useGameContext();
  const snowflakes = snow ? 50 + (Math.floor(Math.random() * 100) % 100) : 0;

  return (
    <>
      <div
        className="window border-gray-300"
        style={{ minHeight: '60vh', position: 'relative', border: '1rem solid' }}
      >
        <Snowfall snowflakeCount={snowflakes} />
      </div>
      <div className="text-center">
        {snow ? (
          <p>The day is cold and gray. It's snowing.</p>
        ) : (
          <p>The day is cold but the sky is clear.</p>
        )}
      </div>
    </>
  );
};
