export interface Report {
  id: number;
  userId: number;
  name: string;
  photoUrl: string;
  count: number;
}

export const ReportStatus = ['pending', 'approved', 'disapproved'];
