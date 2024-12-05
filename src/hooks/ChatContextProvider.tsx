import React from 'react';
import { ChatContext, ChatContextType, MessageType, NewMessageType } from './ChatContext';
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
    `${movie} in 5`,
  ];

  return messages[Math.floor(Math.random() * 100) % messages.length];
};

const getComplaintMessage = (movie?: string, snow?: boolean) => {
  const messages = [
    "oh come on he can't be that bad",
    'Have you tried talking to him?',
    "i'm sure you can just talk it out",
    movie && `We're watching ${movie}. You should join.`,
    movie && `Join us for ${movie}. Bring Santa`,
    movie && `join us for ${movie}. bring him too`,
    snow && "Look outside, it's snowing!",
    snow && "It's snowing, guys, look!",
  ].filter(Boolean) as string[];

  return messages[Math.floor(Math.random() * 100) % messages.length];
};

const randMessages: NewMessageType[] = [
  // doors
  { message: 'Will someone let me in?', author: 'E', liked: false, type: 'door' },
  { message: 'will someone let me in', author: 'C', liked: false, type: 'door' },
  { message: 'will someone let me in, please?', author: 'M', liked: false, type: 'door' },
  { message: 'someone please let me in', author: 'G', liked: false, type: 'door' },
  { message: 'door please?', author: 'N', liked: false, type: 'door' },

  // spiders
  { message: 'Can someone help me with a spider?', type: 'other', author: 'M', liked: false },
  { message: 'can someone help with a spider?', type: 'other', author: 'N', liked: false },

  // laundry
  { message: 'machine 1 done', type: 'other', author: 'K', liked: false },
  { message: 'Machine 2 done', type: 'other', author: 'D', liked: false },
  { message: 'Dryer', type: 'other', author: 'B', liked: false },
  { message: 'dryer', type: 'other', author: 'C', liked: false },
];

const getRandMessage = (): NewMessageType[] => {
  const rand = Math.floor(Math.random() * 100) % randMessages.length;
  return [randMessages[rand]];
};

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { movie, snow, stats, updateStats } = useGameContext();
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [sendMovie, setSendMovie] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

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
      if (newMessages[0].author !== ' ') {
        audioRef.current?.play();
      }
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
            type: 'movie',
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

  React.useEffect(() => {
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];
      const chance = Math.floor(Math.random() * 100) % 3;

      if (lastMessage.type === 'praise' && !lastMessage.liked) {
        if (chance === 0) {
          addMessage([{ type: 'other', author: 'L', message: 'See? I told you', liked: false }]);
        } else if (chance === 1) {
          likeMessage(messages.length - 1);
        }
      } else if (lastMessage.type === 'door' && lastMessage.liked) {
        addMessage([{ message: 'In', author: lastMessage.author, liked: false, type: 'other' }]);
        updateStats({ peopleLetIn: stats.peopleLetIn + 1 });
      } else if (lastMessage.type === 'complain') {
        if (chance === 0) {
          addMessage([
            {
              type: 'other',
              author: 'L',
              message: getComplaintMessage(movie, snow),
              liked: false,
            },
          ]);
        }
      }
    }

    if (messages.length >= 2) {
      const secondToLast = messages[messages.length - 2];
      if (secondToLast.type === 'door' && !secondToLast.liked) {
        addMessage([{ message: 'In', author: secondToLast.author, liked: false, type: 'other' }]);
      }
    }
  }, [addMessage, likeMessage, messages, movie, snow, stats.peopleLetIn, updateStats]);

  const value: ChatContextType = React.useMemo(
    () => ({ messages, likeMessage, addMessage, audioRef }),
    [addMessage, likeMessage, messages],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
