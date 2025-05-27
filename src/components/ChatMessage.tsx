
import React, { useState, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (message.type === 'bot' && message.isTyping) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= message.content.length) {
          setDisplayedContent(message.content.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedContent(message.content);
      setIsTypingComplete(true);
    }
  }, [message.content, message.isTyping, message.type]);

  const isBot = message.type === 'bot';
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isBot ? 'bg-gradient-to-r from-purple-500 to-blue-500 mr-3' : 'bg-gradient-to-r from-green-500 to-teal-500 ml-3'
        }`}>
          {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
        </div>
        <div className={`px-4 py-3 rounded-2xl ${
          isBot 
            ? 'bg-white border border-gray-200 text-gray-800' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
        } shadow-lg`}>
          <div className="whitespace-pre-wrap">
            {displayedContent}
            {message.isTyping && !isTypingComplete && (
              <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
