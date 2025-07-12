
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    { type: 'bot', content: 'Hello! I\'m your J.V.Enterprises assistant. How can I help you with industrial spare parts today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    setInputMessage('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Thank you for your question. Our team specializes in a wide range of industrial spare parts. Would you like specific information about any category?",
        "I'd be happy to help with that. We have extensive inventory of mechanical, electrical, and hydraulic components. Can you provide more details about what you're looking for?",
        "J.V.Enterprises stocks parts from all major manufacturers. We can also source rare or discontinued items. Is there a particular brand you're interested in?",
        "We offer next-day delivery on most in-stock items. Would you like me to check availability for a specific part?",
        "Our technical support team can help with compatibility questions. Would you like me to connect you with a specialist?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { type: 'bot', content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button 
          onClick={toggleChat} 
          className="w-16 h-16 rounded-full bg-violet hover:bg-violet-dark shadow-lg group overflow-hidden transition-all duration-300 hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-violet-light opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <MessageCircle className="z-10 text-white" size={28} />
          <span className="absolute -bottom-10 left-0 right-0 text-xs text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-300">Chat with us</span>
        </Button>
      ) : (
        <div className="bg-white rounded-xl shadow-xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden transition-all duration-300 animate-fade-in border-2 border-violet">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-primary to-violet-light p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={24} />
              <div>
                <h3 className="font-bold">J.V.Enterprises Assistant</h3>
                <p className="text-xs opacity-80">We're here to help</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/20">
              <X size={20} />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={cn(
                  "mb-4 max-w-[80%] animate-fade-in",
                  message.type === 'user' ? "ml-auto" : "mr-auto"
                )}
              >
                <div className={cn(
                  "p-3 rounded-xl",
                  message.type === 'user' 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-200"
                )}>
                  {message.content}
                  {message.type === 'bot' && (
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Sparkles size={12} className="mr-1 text-violet" />
                      <span>J.V.Enterprises Bot</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <span className="animate-bounce delay-0">●</span>
                    <span className="animate-bounce delay-150">●</span>
                    <span className="animate-bounce delay-300">●</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                className="min-h-[50px] resize-none"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={inputMessage.trim() === ''}
                className="bg-primary hover:bg-violet-dark text-white h-[50px] w-[50px]"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
