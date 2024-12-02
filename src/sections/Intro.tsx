import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useGameContext } from '../hooks/GameContext';

const introSteps = [
  <>
    <p>
      It is the middle of the night. The weather outside the dorm is not unusual for early December.
    </p>
    <p>You are sleeping in your bed. Until suddenly…</p>
  </>,

  <>
    <p>
      It is the middle of the night. The weather outside the dorm is not unusual for early December.
    </p>
    <p>You are sleeping in your bed. Until suddenly…</p>
    <div className="fadein animation-duration-500	">
      <p>BOOM!</p>
      <p>
        You awaken to a loud noise. You sit up in your bed and put a light on. Nothing in your room
        looks out of the ordinary. Except…
      </p>
      <p>Is that fucking Santa sitting on your chair?</p>
    </div>
  </>,

  <>
    <p>
      <span className="text-400">You:</span> “Hello?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “Hello there…”
    </p>
    <p>
      <span className="text-400">You:</span> “What is happening? What are you doing here?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “You know, mate, people think being Santa is all ‘Ho,
      ho, ho!’ and merry Christmas, but let me tell you something: it’s exhausting.”
    </p>
    <p>
      <span className="text-400">You:</span> “How so?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “I’m at it from early afternoon because some little
      shits just couldn’t wait until after dinner for their presents. And I cannot stop until late
      at night because some of the older shits just had to have a third portion of their dinner.”
    </p>
  </>,
  <>
    <p>
      <span className="text-400">Santa:</span> “And the weather is always shit. When was the last
      time we had a white Christmas? No, no more snow covered rooftops these days. Just rain and
      mud.”
    </p>
    <p>
      <span className="text-400">Santa:</span> “And don’t even get me started on the presents. The
      lists get more ridiculous every year.”
    </p>
    <p>
      <span className="text-400">Santa:</span> “You know what is the worst?”
    </p>
    <p>
      <span className="text-400">You:</span> “What is the worst?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “I don’t even get properly paid for it.”
    </p>
  </>,
  <>
    <p>
      <span className="text-400">Santa:</span> “But it’s always been like that. My American
      colleagues at least always got some cookies and milk left next to the fireplace. But here… do
      you think they give me anything in exchange for their gifts?”
    </p>
    <p>
      <span className="text-400">You:</span> “I am so sorry…”
    </p>
    <p>
      <span className="text-400">Santa:</span> “Do you know what I decided?”
    </p>
    <p>
      <span className="text-400">You:</span> “What?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “This year, I’m not doing it. I’m gonna hide here
      until it’s all over. No gifts for nobody this time. Ho Ho Ho.”
    </p>
  </>,
  <>
    <p>You awaken the next morning to the sound of your alarm clock.</p>
    <p>
      What a weird dream that was. Santa here in the dorm? Ranting about his job? Threatening to
      cancel Christmas and occupy your room until New Years?
    </p>
    <p>Phew!</p>
    <p>What a nightmare that would have been.</p>
  </>,
  <>
    <p>
      <span className="text-400">Santa:</span> “Good Morning!”
    </p>
    <p>
      <span className="text-400">You:</span> “What the fuck? What is this?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “Sleeping on the chair really wasn’t nice, mate.
      Maybe you should get an air mattress or something. Because I’m taking the bed tonight.”
    </p>
    <p>
      <span className="text-400">You:</span> “You what?”
    </p>
    <p>
      <span className="text-400">Santa:</span> “I am going to sleep on the bed tonight. We people of
      a certain age need our comfort.”
    </p>
    <p>This is too much for you. You slowly get out of bed and...</p>
  </>,
];

export const Intro = () => {
  const { showIntro, onHideIntro } = useGameContext();
  const [visible, setVisible] = React.useState(showIntro);

  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (!showIntro) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [showIntro]);

  return (
    <Dialog
      footer={
        <div>
          {!!step && (
            <Button label="Back" outlined severity="secondary" onClick={() => setStep(step - 1)} />
          )}
          <Button
            label="Next"
            severity="secondary"
            onClick={() => {
              if (step !== introSteps.length - 1) {
                setStep(step + 1);
              } else {
                onHideIntro();
                setVisible(!visible);
              }
            }}
          />
        </div>
      }
      visible={visible}
      draggable={false}
      resizable={false}
      pt={{ mask: { className: 'surface-ground' } }}
      className="w-5"
      onHide={() => {
        setVisible(!visible);
      }}
      closable={false}
      style={{ height: '50vh' }}
    >
      {introSteps[step]}
    </Dialog>
  );
};
