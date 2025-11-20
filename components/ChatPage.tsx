
import React, { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';
import { ChatContact, ChatMessage } from '../types';

const MOCK_CONTACTS: ChatContact[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://picsum.photos/seed/maria/200/200',
    lastMessage: 'Doutora, a dor diminuiu um pouco após o medicamento.',
    timestamp: '10:42',
    unreadCount: 2,
    status: 'online'
  },
  {
    id: '2',
    name: 'João Santos',
    avatar: 'https://picsum.photos/seed/joao/200/200',
    lastMessage: 'Confirmado para amanhã?',
    timestamp: 'Ontem',
    unreadCount: 0,
    status: 'offline'
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatar: 'https://picsum.photos/seed/ana/200/200',
    lastMessage: 'Obrigada pelo atendimento!',
    timestamp: 'Ontem',
    unreadCount: 0,
    status: 'offline'
  },
  {
    id: '4',
    name: 'Pedro Alves',
    avatar: 'https://picsum.photos/seed/pedro/200/200',
    lastMessage: 'Enviei os exames por email.',
    timestamp: 'Terça',
    unreadCount: 1,
    status: 'online'
  }
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  '1': [
    { id: '1', senderId: '1', text: 'Bom dia, Dra. Amanda.', timestamp: '10:30', isMe: false },
    { id: '2', senderId: '1', text: 'Estou sentindo aquela dor novamente.', timestamp: '10:31', isMe: false },
    { id: '3', senderId: 'me', text: 'Bom dia, Maria. A dor é na mesma intensidade?', timestamp: '10:35', isMe: true },
    { id: '4', senderId: '1', text: 'Um pouco mais fraca, mas persistente.', timestamp: '10:36', isMe: false },
    { id: '5', senderId: 'me', text: 'Certo. Tomou a medicação que prescrevi?', timestamp: '10:38', isMe: true },
    { id: '6', senderId: '1', text: 'Sim, tomei faz 20 minutos.', timestamp: '10:40', isMe: false },
    { id: '7', senderId: '1', text: 'Doutora, a dor diminuiu um pouco após o medicamento.', timestamp: '10:42', isMe: false },
  ]
};

const ChatPage: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>(MOCK_CONTACTS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const selectedContact = MOCK_CONTACTS.find(c => c.id === selectedContactId);
  const currentMessages = messages[selectedContactId] || [];

  const filteredContacts = MOCK_CONTACTS.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
    }));
    setMessageInput('');
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar - Contact List */}
      <div className="w-full md:w-96 border-r border-gray-200 flex flex-col bg-white z-10">
        <div className="p-6 pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Mensagens</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Buscar pacientes..."
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors border-l-4 ${
                selectedContactId === contact.id
                  ? 'bg-teal-50 border-teal-500'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-12 h-12 rounded-full object-cover border border-gray-100"
                />
                {contact.status === 'online' && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`text-sm font-semibold truncate ${selectedContactId === contact.id ? 'text-teal-900' : 'text-gray-900'}`}>
                    {contact.name}
                  </h3>
                  <span className="text-xs text-gray-400">{contact.timestamp}</span>
                </div>
                <p className={`text-sm truncate ${selectedContactId === contact.id ? 'text-teal-700' : 'text-gray-500'}`}>
                  {contact.lastMessage}
                </p>
              </div>
              {contact.unreadCount > 0 && (
                <div className="bg-teal-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {contact.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                   <img 
                    src={selectedContact.avatar} 
                    alt={selectedContact.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                   {selectedContact.status === 'online' && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">{selectedContact.name}</h2>
                  <p className="text-xs text-teal-600 font-medium">
                    {selectedContact.status === 'online' ? 'Online agora' : 'Visto por último hoje'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                <div className="flex justify-center">
                    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">Hoje</span>
                </div>
                
                {currentMessages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[70%] group flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`px-5 py-3 rounded-2xl shadow-sm relative text-sm leading-relaxed ${
                                msg.isMe 
                                    ? 'bg-teal-600 text-white rounded-tr-none' 
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                            <div className="flex items-center gap-1 mt-1 px-1">
                                <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                                {msg.isMe && <CheckCheck size={12} className="text-teal-600" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Smile size={20} />
                  </button>
                </div>
                <button 
                    type="submit"
                    disabled={!messageInput.trim()} 
                    className="p-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-teal-600/20"
                >
                  <Send size={20} className="ml-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50 text-gray-400">
            <p>Selecione um paciente para iniciar o chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
