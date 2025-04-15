export interface ChatMessage {
    type: 'GROUP' | 'PRIVATE' | 'SYSTEM';
    sender: string;
    content: string;
    timestamp: Date;
    tutorId?: number;
  }