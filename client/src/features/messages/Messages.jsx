import React, { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Phone, Video, Image, Paperclip, Send, Check, CheckCheck, ChevronLeft } from 'lucide-react';
import { io } from 'socket.io-client';
import { API_BASE_URL, getApiUrl } from '../../config/api';

export default function Messages({ user, targetConversationId, setTargetConversationId }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false); // Mobile state
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize socket
  useEffect(() => {
    if (user && !socketRef.current) {
        socketRef.current = io(API_BASE_URL, {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        socketRef.current.on('connect', () => {
            console.log('Socket connected');
        });
        
        socketRef.current.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });
    }

    return () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    };
  }, [user]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl('/messages'), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setConversations(data.data.conversations);
            }
        } catch (error) {
            console.error("Error fetching conversations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchConversations();
  }, [user]);

  // Handle target conversation selection
  useEffect(() => {
    if (targetConversationId && conversations.length > 0) {
      const target = conversations.find(c => c.id === targetConversationId);
      if (target) {
        setSelectedConversation(target);
        setTargetConversationId(null);
        setShowChat(true); // Open chat view on mobile
      }
    }
  }, [conversations, targetConversationId, setTargetConversationId]);

  // Handle new message via socket
  useEffect(() => {
    if (!socketRef.current) return;

    const handleNewMessage = (message) => {
        // If the message belongs to the current conversation, add it
        if (selectedConversation && message.conversationId === selectedConversation.id) {
            setMessages(prev => [...prev, message]);
            setTimeout(scrollToBottom, 100);
        }
        
        // Update conversation list last message/time
        setConversations(prev => {
            const updated = prev.map(conv => {
                if (conv.id === message.conversationId) {
                    return {
                        ...conv,
                        lastMessageAt: message.createdAt,
                        messages: [message] // Update preview
                    };
                }
                return conv;
            });
            // Sort by lastMessageAt
            return updated.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
        });
    };

    socketRef.current.on('new_message', handleNewMessage);

    return () => {
        socketRef.current?.off('new_message', handleNewMessage);
    };
  }, [selectedConversation]);

  // Fetch messages when conversation selected
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
        setIsLoadingMessages(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${activeConversation.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                // Backend returns DESC (newest first), but we want to display ASC (oldest first)
                // However, check backend: order: [['createdAt', 'DESC']]
                // So [newest, ..., oldest]
                // We need to reverse it to display [oldest, ..., newest]
                setMessages(data.data.messages.reverse());
                
                // Join room
                socketRef.current?.emit('join_conversation', selectedConversation.id);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoadingMessages(false);
            setTimeout(scrollToBottom, 100);
        }
    };

    fetchMessages();
    
    return () => {
        socketRef.current?.emit('leave_conversation', selectedConversation.id);
    };
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation) return;

    // Optimistic UI update
    const tempId = Date.now();
    const newMessage = {
        id: tempId,
        content: messageInput,
        senderId: user.id,
        conversationId: selectedConversation.id,
        createdAt: new Date().toISOString(),
        sender: { ...user }
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");
    setTimeout(scrollToBottom, 100);

    // Emit socket event
    socketRef.current?.emit('send_message', {
        conversationId: selectedConversation.id,
        content: newMessage.content
    });

    // Also save to DB via API for persistence (redundancy or primary)
    try {
        const token = localStorage.getItem('token');
        await fetch(getApiUrl('/messages'), {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                conversationId: selectedConversation.id,
                content: newMessage.content
            })
        });
    } catch (error) {
        console.error("Error sending message:", error);
    }
  };

  const handleContactClick = (conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  const getOtherParticipant = (conversation) => {
      if (!conversation || !conversation.participants) return {};
      return conversation.participants.find(p => p.id !== user.id) || conversation.participants[0] || {};
  };

  const formatTime = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row overflow-hidden h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)]">
      {/* Sidebar - Contact List */}
      <div className={`w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50 ${showChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-100 border-none focus:ring-2 focus:ring-sky-500 text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
             <div className="p-4 text-center text-slate-500">Loading conversations...</div>
          ) : conversations.length === 0 ? (
             <div className="p-4 text-center text-slate-500">No conversations yet</div>
          ) : (
             conversations.map(conversation => {
               const otherUser = getOtherParticipant(conversation);
               const lastMsg = conversation.messages && conversation.messages[0];
               return (
                <div 
                  key={conversation.id}
                  onClick={() => handleContactClick(conversation)}
                  className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-sky-50 border-r-4 border-sky-500' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="relative">
                    <img 
                        src={otherUser.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150"} 
                        alt={otherUser.firstName} 
                        className="w-12 h-12 rounded-full object-cover" 
                    />
                    {/* Online status indicator can be added here if we track it */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`text-sm font-semibold truncate ${selectedConversation?.id === conversation.id ? 'text-sky-900' : 'text-slate-900'}`}>
                        {otherUser.firstName} {otherUser.lastName}
                      </h3>
                      <span className="text-xs text-slate-500">{formatTime(conversation.lastMessageAt)}</span>
                    </div>
                    <p className={`text-xs truncate text-slate-500`}>
                      {lastMsg ? lastMsg.content : 'No messages yet'}
                    </p>
                  </div>
                </div>
               );
             })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col bg-white ${showChat ? 'flex' : 'hidden md:flex'}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
              <div className="flex items-center">
                <button 
                  onClick={handleBack}
                  className="md:hidden mr-3 p-2 hover:bg-slate-100 rounded-full text-slate-600"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="relative">
                  <img 
                    src={getOtherParticipant(selectedConversation).avatarUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150"} 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-slate-900">
                    {getOtherParticipant(selectedConversation).firstName} {getOtherParticipant(selectedConversation).lastName}
                  </h3>
                  {getOtherParticipant(selectedConversation).status === 'online' && (
                    <span className="text-xs text-emerald-600 font-medium">Online</span>
                  )}
                  {getOtherParticipant(selectedConversation).status !== 'online' && (
                    <span className="text-xs text-slate-400 font-medium">Offline</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Phone size={20} /></button>
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Video size={20} /></button>
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {isLoadingMessages ? (
                  <div className="flex justify-center p-4">Loading messages...</div>
              ) : messages.length === 0 ? (
                  <div className="flex justify-center p-4 text-slate-500">No messages here yet. Say hello!</div>
              ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderId === user.id;
                    return (
                        <div key={msg.id || Math.random()} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] lg:max-w-[60%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                            <div className={`p-3 rounded-2xl shadow-sm ${
                              isMe 
                                ? 'bg-sky-600 text-white rounded-br-none' 
                                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                            }`}>
                              <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                            <div className="flex items-center mt-1 space-x-1">
                              <span className="text-[10px] text-slate-400">{formatTime(msg.createdAt)}</span>
                              {isMe && (
                                <span className="text-sky-600">
                                  {msg.isRead ? <CheckCheck size={12} /> : <Check size={12} />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                    );
                  })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button type="button" className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors">
                  <Paperclip size={20} />
                </button>
                <button type="button" className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors">
                  <Image size={20} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!messageInput.trim()}
                  className={`p-2.5 rounded-full shadow-sm transition-all ${
                    messageInput.trim() 
                      ? 'bg-sky-600 text-white hover:bg-sky-700 hover:shadow-md' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Send size={32} className="text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-600">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
