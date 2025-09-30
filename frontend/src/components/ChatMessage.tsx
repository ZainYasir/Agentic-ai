import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isAnimating?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, isAnimating = false }) => {
  return (
    <div className={`flex items-start gap-4 mb-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-white/20 backdrop-blur-sm border border-white/30' 
          : 'bg-green-500'
      }`}>
        {isUser ? (
          <User size={18} className="text-white" />
        ) : (
          <Bot size={18} className="text-black" />
        )}
      </div>
      <div className={`flex-1 ${isUser ? 'max-w-2xl' : ''}`}>
        <div className={`rounded-2xl px-6 py-4 ${
          isUser 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white ml-auto' 
            : 'bg-black/40 backdrop-blur-sm border border-white/10 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};