import React from 'react';
import { Bot } from 'lucide-react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
        <Bot size={18} className="text-black" />
      </div>
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};