import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, MessageCircle, Home, Search, Library, Plus, Heart, Download, User, Bot, Settings, Mic } from 'lucide-react';
import { sendChatMessage } from './api';
import { ChatMessage } from './components/ChatMessage';
import { LoadingIndicator } from './components/LoadingIndicator';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastMessageId, setLastMessageId] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: lastMessageId + 1,
      text: inputText.trim(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);
    setLastMessageId(prev => prev + 1);

    try {
      const response = await sendChatMessage(userMessage.text);
      const botMessage: Message = {
        id: lastMessageId + 2,
        text: response,
        isUser: false
      };
      setMessages(prev => [...prev, botMessage]);
      setLastMessageId(prev => prev + 2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
    setLastMessageId(0);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" 
         style={{ backgroundImage: 'url(/wallpaperflare.com_wallpaper.jpg)' }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Sidebar - Spotify Style */}
        <div className="w-64 bg-black/80 backdrop-blur-md border-r border-white/10 flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <span className="text-white font-bold text-lg">AI Chat</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-3 space-y-2">
            {/* <div className="flex items-center gap-4 px-3 py-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-white/10">
              <Home size={20} />
              <span className="font-medium">Home</span>
            </div>
            <div className="flex items-center gap-4 px-3 py-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-white/10">
              <Search size={20} />
              <span className="font-medium">Search</span>
            </div> */}
            <div className="flex items-center gap-4 px-3 py-2 text-green-500 bg-white/10 rounded-md">
              <MessageCircle size={20} />
              <span className="font-medium">Chat</span>
            </div>
          </nav>

          {/* Library Section */}
          {/* <div className="mt-8 px-3">
            <div className="flex items-center justify-between px-3 py-2 text-white/70 hover:text-white transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Library size={20} />
                <span className="font-medium">Your Chats</span>
              </div>
              <Plus size={16} />
            </div>
          </div> */}

          {/* Chat History */}
          {/* <div className="flex-1 px-3 mt-4 space-y-1">
            <div className="px-3 py-2 text-white/50 hover:text-white/70 transition-colors cursor-pointer rounded-md hover:bg-white/5 text-sm">
              Previous conversation
            </div>
            <div className="px-3 py-2 text-white/50 hover:text-white/70 transition-colors cursor-pointer rounded-md hover:bg-white/5 text-sm">
              AI Help Session
            </div>
          </div> */}

          {/* Bottom Actions */}
          {/* <div className="p-3 space-y-2 border-t border-white/10">
            <div className="flex items-center gap-4 px-3 py-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-white/10">
              <Download size={16} />
              <span className="text-sm">Install App</span>
            </div>
            <div className="flex items-center gap-4 px-3 py-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-white/10">
              <Settings size={16} />
              <span className="text-sm">Settings</span>
            </div>
          </div> */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
                <p className="text-white/60 text-sm mt-1">Ask me anything</p>
              </div>
              <div className="flex items-center gap-4">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                  >
                    <Trash2 size={16} />
                    Clear
                  </button>
                )}
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="max-w-4xl mx-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Welcome to AI Chat</h2>
                    <p className="text-white/60 text-lg max-w-md mx-auto">Start a conversation and let me help you with anything you need</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage 
                        key={message.id}
                        message={message.text}
                        isUser={message.isUser}
                        isAnimating={index === messages.length - 1 && !message.isUser}
                      />
                    ))}
                    {isLoading && <LoadingIndicator />}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 mb-4 backdrop-blur-sm">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area - Spotify Style */}
            <div className="bg-black/80 backdrop-blur-md border-t border-white/10 px-6 py-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 bg-white/10 rounded-full px-4 py-3 backdrop-blur-sm border border-white/20">
                  <Mic className="w-5 h-5 text-white/60" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="w-10 h-10 bg-green-500 hover:bg-green-400 disabled:bg-white/20 text-black disabled:text-white/40 rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
