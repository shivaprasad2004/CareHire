import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video, Image, Paperclip, Send, Check, CheckCheck } from 'lucide-react';

const CONTACTS = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    role: "Chief Resident",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150",
    lastMessage: "The patient's vitals are stable now.",
    time: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Medical Student",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150",
    lastMessage: "Thanks for the recommendation!",
    time: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Sarah Parker",
    role: "Nurse Practitioner",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150",
    lastMessage: "Can we reschedule the rounds?",
    time: "Tue",
    unread: 0,
    online: true
  }
];

const CHAT_HISTORY = [
  {
    id: 1,
    sender: "other",
    text: "Hi! I wanted to discuss the case study you shared yesterday.",
    time: "10:15 AM"
  },
  {
    id: 2,
    sender: "me",
    text: "Of course, Dr. Chen. I'm available now.",
    time: "10:18 AM",
    status: "read"
  },
  {
    id: 3,
    sender: "other",
    text: "Great. The patient's vitals are stable now, but we should monitor the BP.",
    time: "10:30 AM"
  }
];

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-200 shadow-sm flex overflow-hidden">
      {/* Sidebar - Contact List */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
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
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${
                selectedContact.id === contact.id ? 'bg-sky-50 border-r-4 border-sky-500' : 'hover:bg-slate-100'
              }`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`text-sm font-semibold truncate ${selectedContact.id === contact.id ? 'text-sky-900' : 'text-slate-900'}`}>
                    {contact.name}
                  </h3>
                  <span className="text-xs text-slate-500">{contact.time}</span>
                </div>
                <p className={`text-xs truncate ${contact.unread > 0 ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                  {contact.lastMessage}
                </p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
          <div className="flex items-center space-x-3">
            <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-slate-900">{selectedContact.name}</h3>
              <p className="text-xs text-emerald-600 font-medium">{selectedContact.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Phone size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Video size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="flex justify-center">
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today</span>
          </div>
          
          {CHAT_HISTORY.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.sender === 'me' 
                  ? 'bg-sky-500 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end mt-1 space-x-1 text-[10px] ${
                  msg.sender === 'me' ? 'text-sky-100' : 'text-slate-400'
                }`}>
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && (
                    msg.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              <Paperclip size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              <Image size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 placeholder:text-slate-400"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button className={`p-2 rounded-lg transition-all ${
              messageInput.trim() 
                ? 'bg-sky-500 text-white shadow-md hover:bg-sky-600' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
