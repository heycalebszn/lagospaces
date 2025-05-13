import { useState } from 'react';
import ChatList from '../components/messaging/ChatList';
import ChatWindow from '../components/messaging/ChatWindow';

// Mock data
const MOCK_CHATS = [
  {
    id: 'chat1',
    user: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true,
      isOnline: true,
    },
    lastMessage: {
      content: 'Is the apartment still available?',
      timestamp: '2023-05-15 14:30',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'chat2',
    user: {
      id: 'user2',
      name: 'David Okafor',
      isVerified: false,
      isOnline: false,
      lastSeen: 'Yesterday',
    },
    lastMessage: {
      content: 'I would like to schedule a viewing for the flat in Lekki',
      timestamp: '2023-05-15 11:45',
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: 'chat3',
    user: {
      id: 'user3',
      name: 'Jennifer Balogun',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isVerified: true,
      isOnline: true,
    },
    lastMessage: {
      content: 'The property looks amazing. When can I move in?',
      timestamp: '2023-05-14 18:22',
      isRead: true,
      isOwnMessage: true,
    },
    unreadCount: 0,
  },
  {
    id: 'chat4',
    user: {
      id: 'user4',
      name: 'Michael Adeyemi',
      isVerified: true,
      isOnline: false,
      lastSeen: '2 days ago',
    },
    lastMessage: {
      content: "Thank you for showing me the apartment. I'll get back to you soon.",
      timestamp: '2023-05-12 15:10',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'chat5',
    user: {
      id: 'user5',
      name: 'Tolu Akande',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      isVerified: false,
      isOnline: false,
      lastSeen: '1 week ago',
    },
    lastMessage: {
      content: 'Is there parking available?',
      timestamp: '2023-05-10 09:45',
      isRead: true,
    },
    unreadCount: 0,
  },
];

const MOCK_MESSAGES = {
  chat1: [
    {
      id: 'msg1',
      content: 'Hello, I saw your listing for the apartment on Victoria Island.',
      timestamp: '2023-05-15 14:25',
      isOwnMessage: false,
      isRead: true,
    },
    {
      id: 'msg2',
      content: 'Is the apartment still available?',
      timestamp: '2023-05-15 14:30',
      isOwnMessage: false,
      isRead: true,
    },
    {
      id: 'msg3',
      content: 'Yes, it is still available. Are you interested in viewing it?',
      timestamp: '2023-05-15 14:32',
      isOwnMessage: true,
      isRead: true,
    },
  ],
  chat2: [
    {
      id: 'msg1',
      content: "Hi, I'm interested in your 2-bedroom flat in Lekki Phase 1.",
      timestamp: '2023-05-15 11:40',
      isOwnMessage: false,
      isRead: true,
    },
    {
      id: 'msg2',
      content: 'I would like to schedule a viewing for the flat in Lekki',
      timestamp: '2023-05-15 11:45',
      isOwnMessage: false,
      isRead: false,
    },
  ],
  chat3: [
    {
      id: 'msg1',
      content: 'I love the penthouse you posted. How much is it again?',
      timestamp: '2023-05-14 18:15',
      isOwnMessage: false,
      isRead: true,
    },
    {
      id: 'msg2',
      content: "It's going for ₦950,000 per month. Utilities included.",
      timestamp: '2023-05-14 18:20',
      isOwnMessage: true,
      isRead: true,
    },
    {
      id: 'msg3',
      content: 'The property looks amazing. When can I move in?',
      timestamp: '2023-05-14 18:22',
      isOwnMessage: true,
      isRead: true,
    },
    {
      id: 'msg4',
      content: "Great! We can arrange for you to move in as early as next week if you're ready.",
      timestamp: '2023-05-14 18:30',
      isOwnMessage: false,
      isRead: true,
      attachments: [
        {
          id: 'att1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce',
          name: 'Penthouse-view.jpg',
        },
      ],
    },
  ],
  chat4: [
    {
      id: 'msg1',
      content: "Thank you for showing me the apartment. I'll get back to you soon.",
      timestamp: '2023-05-12 15:10',
      isOwnMessage: false,
      isRead: true,
    },
  ],
  chat5: [
    {
      id: 'msg1',
      content: "Hi, I'm interested in the studio apartment in Yaba.",
      timestamp: '2023-05-10 09:40',
      isOwnMessage: false,
      isRead: true,
    },
    {
      id: 'msg2',
      content: 'Is there parking available?',
      timestamp: '2023-05-10 09:45',
      isOwnMessage: false,
      isRead: true,
    },
    {
      id: 'msg3',
      content: "Yes, there's a dedicated parking spot for each unit.",
      timestamp: '2023-05-10 09:50',
      isOwnMessage: true,
      isRead: true,
    },
  ],
};

const MessagesPage = () => {
  const [activeChatId, setActiveChatId] = useState<string | undefined>(undefined);
  
  const activeChat = MOCK_CHATS.find(chat => chat.id === activeChatId);
  const messages = activeChatId ? MOCK_MESSAGES[activeChatId as keyof typeof MOCK_MESSAGES] || [] : [];
  
  const handleSendMessage = (content: string, attachments?: File[]) => {
    // In a real application, this would send the message to the server
    console.log('Sending message:', content, attachments);
    
    // For mock purposes, we would add the message to the conversation
    // and update the chat list, but this is just a prototype
  };
  
  return (
    <div className="h-[calc(100vh-74px)] flex bg-white">
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-secondary-200">
        <ChatList
          chats={MOCK_CHATS}
          activeChat={activeChatId}
          onChatSelect={setActiveChatId}
        />
      </div>
      
      <div className="hidden md:block md:w-2/3 lg:w-3/4">
        <ChatWindow
          user={activeChat?.user}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessagesPage; 