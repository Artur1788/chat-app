import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useContext,
  useState,
} from 'react';

import { BotIcon, LoaderCircle, SendHorizonal, User } from 'lucide-react';

import { GeminiContext } from '../../contexts';
import { Message } from '../../types';
import './main.css';
import Markdown from 'react-markdown';

export const Main: FC = () => {
  const { sendMessage } = useContext(GeminiContext);
  const [text, setText] = useState<string>('');
  const [animatedMessage, setAnimatedMessage] = useState<string>('');
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [isShowChat, setIsShowChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  function showTextWithAnimation(responseText: string) {
    for (let i = 0; i < responseText.length; i++) {
      setTimeout(() => {
        setAnimatedMessage((prevText) => prevText + responseText[i]);
      }, i * 10);
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsShowChat(true);
      setText('');
      setAnimatedMessage('');
      setMessageHistory((prev) => [...prev, { text, isUser: true }]);
      const result = await sendMessage(text);
      const tranformed = result.replace(/```html|```|```xml/g, '');

      setMessageHistory((prev) => [
        ...prev,
        { text: tranformed, isUser: false },
      ]);
      showTextWithAnimation(tranformed);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // console.log(tranformed);
  };

  return (
    <main className='relative flex flex-col flex-grow'>
      {/* Header */}
      <div className='flex justify-between items-center mb-5 px-4 py-2'>
        <h3 className='font-bold text-neutral-100 text-xl italic'>Gemini</h3>
        <div className='flex items-center hover:bg-neutral-700 p-2 rounded-full transition-colors duration-150 cursor-pointer'>
          <User className='w-6 h-6 text-neutral-100' />
        </div>
      </div>

      {/* Text area */}
      <div className='flex flex-grow bg-transparent px-6 py-4 rounded-lg w-[min(500px,100%)] max-h-[calc(100dvh-150px)] text-neutral-300 overflow-x-scroll overflow-y-auto hide-scroll self-center'>
        {isShowChat ? (
          <div className='flex flex-col gap-y-8 w-full'>
            {!!messageHistory.length &&
              messageHistory.map((message, i) =>
                message.isUser ? (
                  // User Message
                  <div
                    className='flex gap-x-4'
                    key={i + message.text}
                  >
                    <User className='w-6 h-6 text-neutral-100' />
                    <p className='text-lg text-neutral-100'>{message.text}</p>
                  </div>
                ) : i === messageHistory.length - 1 ? (
                  // Bot Message
                  <div
                    className='flex gap-x-4'
                    key={i + message.text}
                  >
                    <BotIcon className='flex-shrink-0 w-6 h-6 text-neutral-100' />
                    <div className='flex flex-wrap text-neutral-100'>
                      <Markdown>{animatedMessage}</Markdown>
                    </div>
                  </div>
                ) : (
                  <div
                    className='flex gap-x-4'
                    key={i + message.text}
                  >
                    <BotIcon className='flex-shrink-0 w-6 h-6 text-neutral-100' />
                    <div className='flex flex-wrap text-neutral-100'>
                      <Markdown>{message.text}</Markdown>
                    </div>
                  </div>
                )
              )}
            {isLoading && (
              <div className='flex gap-x-4'>
                <BotIcon className='flex-shrink-0 w-6 h-6 text-neutral-100' />
                <LoaderCircle className='flex-shrink-0 w-8 h-8 text-blue-500 animate-spin' />
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className='relative before:-top-16 before:bottom-0 z-10 before:-z-10 before:absolute flex justify-center items-center before:opacity-50 before:custom-gradient px-4 before:w-full before:h-28 before:pointer-events-none'>
        <form
          onSubmit={handleSubmit}
          className='flex justify-between items-center bg-[#282a2c] px-4 py-4 rounded-full w-full'
        >
          <div className='flex-grow text-neutral-200'>
            <label htmlFor='chat'>
              <input
                onChange={handleText}
                value={text}
                disabled={isLoading}
                type='text'
                id='chat'
                placeholder='Ask Gemini...'
                className='bg-transparent disabled:opacity-50 pr-3 border-none w-full text-neutral-100 outline-none'
              />
            </label>
          </div>
          <div className='flex items-center'>
            <button
              type='submit'
              title='Send'
              className='disabled:opacity-50 rounded-full duration-150 cursor-pointer disabled:cursor-not-allowed'
              disabled={!text}
            >
              <SendHorizonal className='w-6 h-6 text-neutral-100' />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
