import React from 'react';
import { ChatContext, ChatContextType, MessageType } from './ChatContext';
import { useGameContext } from './GameContext';

const getMovieMessage = (movie: string) => {
  const messages = [
    `${movie} now`,
    `${movie} now!`,
    `${movie} now.`,
    `${movie} in a bit`,
    `${movie} in a bit!`,
    `Booking TV room for ${movie}`,
    `Watching ${movie} now`,
  ];

  return messages[Math.floor(Math.random() * 100) % messages.length];
};

enum MessageTypes {
  door = 'door',
  search = 'search',
}

const messageTypes = Object.keys(MessageTypes);
const items = ['scissors', 'a hair dryer', 'some tape'];

const getRandMessage = (): Omit<MessageType, 'id'>[] => {
  const messageType = messageTypes[Math.floor(Math.random() * 100) % messageTypes.length];

  switch (messageType) {
    case MessageTypes.door:
      return [
        { message: 'Will someone let me in?', author: 'B', liked: false },
        { message: 'In', author: 'B', liked: false },
      ];
    case MessageTypes.search:
      return [
        {
          message: `Does anybody have ${items[Math.floor(Math.random() * 100) % items.length]}?`,
          author: 'D',
          liked: false,
        },
      ];
    default:
      return [];
  }
};

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { movie } = useGameContext();
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [sendMovie, setSendMovie] = React.useState(true);

  const addMessage = React.useCallback(
    (newMessages: Omit<MessageType, 'id'>[]) => {
      let index = messages.length - 1;
      const newMessagesWithId = newMessages.map((message) => {
        index++;
        return {
          ...message,
          id: index,
        };
      }) as MessageType[];

      setMessages([...messages, ...newMessagesWithId]);
    },
    [messages],
  );

  React.useEffect(() => {
    if (movie) {
      if (sendMovie) {
        addMessage([
          {
            message: getMovieMessage(movie),
            author: 'X',
            liked: false,
          },
        ]);
        setSendMovie(false);
      }
    } else {
      setSendMovie(true);
    }
  }, [movie, messages, sendMovie, addMessage]);

  const likeMessage = React.useCallback(
    (id: number) => {
      const message = messages.find((message) => message.id === id);
      if (message) {
        message.liked = true;
        const newMessages = messages.slice(0);
        newMessages.splice(id, 1, message);
        setMessages(newMessages);
      }
    },
    [messages],
  );

  React.useEffect(() => {
    const randomizeValue = () => {
      const clearAfter = Math.random() * 1000 * 7 + 1000 * 10;
      const addMessages = getRandMessage();

      addMessage(addMessages);
      setTimeout(() => {}, clearAfter); // Clear the value after the random time
    };

    const interval = setInterval(randomizeValue, 1000 * 30); // Trigger every 60 seconds
    return () => clearInterval(interval);
  }, [addMessage]);

  const value: ChatContextType = React.useMemo(
    () => ({ messages, likeMessage, addMessage }),
    [addMessage, likeMessage, messages],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
