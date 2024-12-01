import React from 'react';

export type MessageType = {
  type: 'complain' | 'praise' | 'movie' | 'door' | 'thing' | 'other';
  author: string;
  message: string;
  liked: boolean;
  id: number;
};

export type NewMessageType = Omit<MessageType, 'id'>;

export type ChatContextType = {
  messages: MessageType[];
  likeMessage: (id: number) => void;
  addMessage: (message: NewMessageType[]) => void;
};

export const ChatContext = React.createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) throw Error('useChatContext can only be used inside an ChatContextProvider');
  return context;
};
