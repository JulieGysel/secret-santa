import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ChipProps, Chip } from 'primereact/chip';
import { MessageType, useChatContext } from '../hooks/ChatContext';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import pop from './../audio/pop.mp3';

const messageHints: Omit<MessageType, 'id'>[] = [
  {
    type: 'complain',
    message: 'Santa sucks!!!',
    author: ' ',
    liked: false,
  },
  {
    type: 'complain',
    message: 'Does anybody want a Santa?',
    author: ' ',
    liked: false,
  },

  { type: 'praise', message: 'Guys, Santa is quite nice actually', author: ' ', liked: false },
  { type: 'praise', message: "I'm starting to like this Santa guy", author: ' ', liked: false },
];

export const Chat = () => {
  const { messages, likeMessage, addMessage, audioRef } = useChatContext();
  const [newMessage, setNewMessage] = React.useState<Omit<MessageType, 'id'> | string>('');
  const [chatHints, setChatHints] = React.useState<object[]>([]);
  const chatRef = React.useRef<HTMLElement | null>(null);

  const onSubmit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (newMessage) {
        addMessage(
          typeof newMessage === 'object'
            ? [newMessage]
            : [
                {
                  message: newMessage,
                  author: ' ',
                  liked: false,
                  type: 'other',
                },
              ],
        );
        setNewMessage('');
      }
    },
    [addMessage, newMessage],
  );

  const chipTemplate = (props: ChipProps) => (
    <>
      {props.label}
      {props.children}
    </>
  );

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const search = (_: AutoCompleteCompleteEvent) => {
    setChatHints([...messageHints]);
  };

  return (
    <Card
      title={'Pølsefest'}
      footer={
        <form onSubmit={onSubmit}>
          <div className="flex justify-content-end gap-2">
            <div className="flex-grow-1">
              <AutoComplete
                field="message"
                value={newMessage}
                placeholder="Aa"
                onChange={(e) => setNewMessage(e.target.value)}
                suggestions={chatHints}
                completeMethod={search}
                className="w-full"
                pt={{
                  input: {
                    root: {
                      className: 'w-full border-round-3xl',
                    },
                  },
                }}
              />
            </div>
            <div>
              <Button
                rounded
                icon="pi pi-send"
                iconPos="right"
                aria-label="Send a message"
                tooltip="Send a message"
                tooltipOptions={{ position: 'left' }}
                type="submit"
              />
            </div>
          </div>
          <div className="pl-2">
            <span className="text-xs">Click to like messages</span>
          </div>
        </form>
      }
      pt={{
        content: {
          className: 'flex flex-column gap-3 flex-grow-1 overflow-y-auto chat',
          style: { height: '0', scrollBehavior: 'smooth' },
          ref: chatRef,
        },
        body: {
          className: 'h-full flex flex-column',
        },
        root: { className: 'h-full ' },
      }}
    >
      {messages.map(({ message, author, liked, id }) => (
        <div className={`flex gap-1 ${author === ' ' && 'flex-row-reverse'}`} key={`message-${id}`}>
          <div>
            <Avatar label={author} shape="circle" className="mx-2" />
          </div>
          <div>
            <Chip
              label={message}
              className="p-overlay-badge p-2 px-3"
              template={chipTemplate}
              onClick={() => {
                if (!liked) {
                  likeMessage(id);
                }
              }}
              style={{ cursor: liked ? 'default' : 'pointer' }}
              pt={{ root: { className: author === ' ' ? 'bg-primary' : '' } }}
            >
              {liked && <Badge value={'❤'} className="p-overlay-badge" severity={'danger'} />}
            </Chip>
          </div>
        </div>
      ))}
      <audio ref={audioRef} preload="auto" hidden>
        <source src={pop} type="audio/mpeg" />
      </audio>
    </Card>
  );
};
