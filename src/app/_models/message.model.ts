export interface MessageBubble {
  id: number;
  senderId: number;
  senderName: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientName: string;
  recipientPhotoUrl: string;
  content: string;
  isRead: boolean;
  dateRead: Date;
  messageSent: Date;
}

export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  name: string;
  photoUrl: string;
  content: string;
  dateRead: Date;
  messageSent: Date;
  type: 'Text' | 'Image' | 'Gif' | 'Location';
}
