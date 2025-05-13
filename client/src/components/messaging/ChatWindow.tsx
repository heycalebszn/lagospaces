import { useState, useRef, useEffect } from 'react';

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  attachments?: {
    id: string;
    type: 'image' | 'video' | 'audio' | 'file';
    url: string;
    name?: string;
    previewUrl?: string;
  }[];
  isRead?: boolean;
}

interface ChatWindowProps {
  user?: ChatUser;
  messages: Message[];
  onSendMessage: (content: string, attachments?: File[]) => void;
}

const ChatWindow = ({ user, messages, onSendMessage }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage(newMessage, attachments);
      setNewMessage('');
      setAttachments([]);
    }
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };
  
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  
  messages.forEach((message) => {
    const date = message.timestamp.split(' ')[0]; // Extract date part
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-secondary-50">
        <div className="text-center text-secondary-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <p className="text-lg font-display font-medium">Select a conversation</p>
          <p className="mt-2">Choose a chat from the list to start messaging</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-secondary-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100 flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-secondary-700 font-semibold">
                  {user.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            {user.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white"></span>
            )}
          </div>
          
          <div>
            <h3 className="font-medium flex items-center gap-1">
              {user.name}
              {user.isVerified && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary-600">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              )}
            </h3>
            <p className="text-xs text-secondary-500">
              {user.isOnline ? 'Online' : user.lastSeen ? `Last seen ${user.lastSeen}` : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="p-2 rounded-full hover:bg-secondary-100 text-secondary-600"
            aria-label="Video call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-secondary-100 text-secondary-600"
            aria-label="Audio call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-secondary-100 text-secondary-600"
            aria-label="More options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-secondary-50">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="px-3 py-1 text-xs bg-secondary-200 text-secondary-700 rounded-full">
                {date}
              </span>
            </div>
            
            {msgs.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div 
                  className={`max-w-[75%] ${
                    message.isOwnMessage 
                      ? 'bg-primary-600 text-white rounded-t-2xl rounded-bl-2xl' 
                      : 'bg-white text-secondary-900 rounded-t-2xl rounded-br-2xl border border-secondary-200'
                  } px-4 py-3 shadow-sm`}
                >
                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mb-2 space-y-2">
                      {message.attachments.map((attachment) => (
                        <div key={attachment.id}>
                          {attachment.type === 'image' ? (
                            <div className="rounded-lg overflow-hidden">
                              <img 
                                src={attachment.url} 
                                alt={attachment.name || 'Image attachment'} 
                                className="w-full object-cover max-h-60"
                              />
                            </div>
                          ) : attachment.type === 'video' ? (
                            <div className="rounded-lg overflow-hidden">
                              <video 
                                src={attachment.url} 
                                controls 
                                className="w-full max-h-60"
                              ></video>
                            </div>
                          ) : (
                            <div className={`flex items-center gap-2 rounded-lg p-2 ${
                              message.isOwnMessage ? 'bg-primary-700' : 'bg-secondary-100'
                            }`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                              <span className="truncate">{attachment.name || 'File attachment'}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Message content */}
                  <p>{message.content}</p>
                  
                  {/* Message info */}
                  <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                    message.isOwnMessage ? 'text-primary-200' : 'text-secondary-500'
                  }`}>
                    <span>{message.timestamp.split(' ')[1]}</span>
                    
                    {message.isOwnMessage && (
                      message.isRead ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M4.5 3.75a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75zm7.5 0a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                        </svg>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <div className="p-2 bg-white border-t border-secondary-200 flex items-center gap-2 overflow-x-auto">
          {attachments.map((file, index) => (
            <div key={index} className="relative">
              <div className="h-16 w-16 border border-secondary-200 rounded-lg bg-secondary-50 flex items-center justify-center overflow-hidden">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                )}
              </div>
              
              <button
                onClick={() => removeAttachment(index)}
                className="absolute -top-1 -right-1 bg-secondary-800 text-white rounded-full w-5 h-5 flex items-center justify-center"
                aria-label="Remove attachment"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Message Input */}
      <div className="p-3 border-t border-secondary-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onClick={openFileSelector}
            className="p-2 rounded-full hover:bg-secondary-100 text-secondary-600"
            aria-label="Attach file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleAttachmentChange}
            multiple
          />
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input py-2.5 w-full"
            />
          </div>
          
          <button
            type="submit"
            disabled={!newMessage.trim() && attachments.length === 0}
            className={`p-2.5 rounded-full ${
              !newMessage.trim() && attachments.length === 0 
                ? 'bg-secondary-100 text-secondary-400' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow; 