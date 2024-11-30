import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ChipProps, Chip } from 'primereact/chip';
import { useChatContext } from '../hooks/ChatContext';
import { InputText } from 'primereact/inputtext';

export const Chat = () => {
  const { messages, likeMessage, addMessage } = useChatContext();
  const [newMessage, setNewMessage] = React.useState('');
  // const [offsetHeight, setOffsetHeight] = React.useState<number>();
  // const chatRef = React.useRef<HTMLElement | null>(null);
  // const [documentHeight, setDocumentHeight] = React.useState<number>();

  // const observer = new ResizeObserver((entries) => {
  //   for (const entry of entries) {
  //     console.log('document height', entry.contentRect.height);
  //     setDocumentHeight(entry.contentRect.height);
  //   }
  // });
  // observer.observe(document.querySelector('body'));

  const onSubmit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      addMessage([{ message: newMessage, author: 'A', liked: false }]);
      setNewMessage('');
    },
    [addMessage, newMessage],
  );

  const chipTemplate = (props: ChipProps) => (
    <>
      {props.label}
      {props.children}
    </>
  );

  // React.useEffect(() => {
  //   // const div = document.getElementsByClassName('scrollableContent')[0] as HTMLElement;
  //   if (chatRef.current) {
  //     setOffsetHeight(chatRef.current.offsetHeight);
  //     console.log('chat height', chatRef.current.offsetHeight);
  //   }
  // }, [offsetHeight, documentHeight]);

  // React.useEffect(() => {
  //   // const div = document.getElementsByClassName('scrollableContent')[0] as HTMLElement;
  //   if (chatRef.current) {
  //     chatRef.current.setAttribute('style', `max-height: ${offsetHeight}px`);
  //   }
  // }, [offsetHeight]);

  return (
    <Card
      title={'Pølsefest'}
      footer={
        <form onSubmit={onSubmit}>
          <div className="flex justify-content-end gap-2">
            <InputText
              value={newMessage}
              className="w-full border-round-3xl"
              onChange={(e) => setNewMessage(e.target.value)}
            />
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
        </form>
      }
      pt={{
        content: {
          className: 'flex flex-column gap-3 flex-grow-1 overflow-y-auto',
          style: { height: '0' },
        },
        body: {
          className: 'h-full flex flex-column',
        },
        root: { className: 'h-full ' },
      }}
    >
      {messages.map(({ message, author, liked, id }) => (
        <div className={`flex gap-1 ${author === 'A' && 'flex-row-reverse'}`} key={`message-${id}`}>
          <div>
            <Avatar label={author} shape="circle" className="mr-2" />
          </div>
          <div>
            <Chip
              label={message}
              className="p-overlay-badge p-2 px-3"
              template={chipTemplate}
              onClick={() => {
                if (!liked) {
                  console.log('liking', id);
                  likeMessage(id);
                }
              }}
              style={{ cursor: liked ? 'default' : 'pointer' }}
              pt={{ root: { className: author === 'A' ? 'bg-primary' : '' } }}
            >
              {liked && <Badge value={'❤'} className="p-overlay-badge" severity={'danger'} />}
            </Chip>
          </div>
        </div>
      ))}
    </Card>
  );
};
