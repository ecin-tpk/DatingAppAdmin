export interface Report {
  id: number;
  senderId: number;
  senderName: string;
  userId: number;
  userName: string;
  photoUrl: string;
  status: string;
  reportedFor: string;
  approvedCount: number;
  reportSent: Date;
}

export const ReportStatus = ['pending', 'approved', 'disapproved'];
