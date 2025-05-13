import { useState } from 'react';

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastSeen?: string;
}

interface ChatPreview {
  id: string;
  user: ChatUser;
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    isOwnMessage?: boolean;
  };
  unreadCount?: number;
}

interface ChatListProps {
  chats: ChatPreview[];
  activeChat?: string;
  onChatSelect: (chatId: string) => void;
}

const ChatList = ({ chats, activeChat, onChatSelect }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter chats based on search query
  const filteredChats = searchQuery 
    ? chats.filter(chat => 
        chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;
  
  return (
    <div className="h-full flex flex-col border-r border-secondary-200">
      {/* Search */}
      <div className="p-4 border-b border-secondary-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pr-10"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          <ul>
            {filteredChats.map((chat) => (
              <li key={chat.id}>
                <button
                  onClick={() => onChatSelect(chat.id)}
                  className={`w-full text-left p-4 flex items-center gap-3 hover:bg-secondary-50 transition-colors ${
                    activeChat === chat.id ? 'bg-primary-50' : ''
                  }`}
                >
                  {/* Avatar with online indicator */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100 flex items-center justify-center border border-secondary-200">
                      {chat.user.avatar ? (
                        <img 
                          src={chat.user.avatar} 
                          alt={chat.user.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span className="text-secondary-700 font-semibold text-lg">
                          {chat.user.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    {chat.user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  
                  {/* Chat info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">
                        {chat.user.name}
                        {chat.user.isVerified && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block ml-1 text-primary-600">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                          </svg>
                        )}
                      </h3>
                      <span className="text-xs text-secondary-500">{chat.lastMessage.timestamp}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-1">
                      <p className={`text-sm truncate ${
                        chat.lastMessage.isRead ? 'text-secondary-500' : 'font-medium text-secondary-900'
                      }`}>
                        {chat.lastMessage.isOwnMessage && 'You: '}
                        {chat.lastMessage.content}
                      </p>
                      
                      {chat.unreadCount ? (
                        <span className="ml-2 flex-shrink-0 w-5 h-5 bg-accent-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-secondary-500">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList; 