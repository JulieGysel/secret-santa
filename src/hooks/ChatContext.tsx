import React from 'react';

export type MessageType = {
  author: string;
  message: string;
  liked: boolean;
  id: number;
};

export type ChatContextType = {
  messages: MessageType[];
  likeMessage: (id: number) => void;
  addMessage: (message: Omit<MessageType, 'id'>) => void;
};

export const ChatContext = React.createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) throw Error('useChatContext can only be used inside an ChatContextProvider');
  return context;
};
