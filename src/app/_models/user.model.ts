import { Role } from './role';
import { Photo } from './photo';

export interface User {
  id: string;
  email: string;
  isVerified: string;
  name: string;
  phone?: string;
  gender: string;
  dateOfBirth: Date;
  role: Role;
  photoUrl: string;
  jwtToken?: string;
  created: Date;
  lastActive: Date;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  status?: string;
  verified?: boolean;
  photos?: Photo[];
}

export const Genders = [
  { gender: '', text: 'Any' },
  { gender: 'male', text: 'Male' },
  { gender: 'female', text: 'Female' },
];
export const Verification = [
  { verified: '', text: 'Any' },
  { verified: 'true', text: 'Verified' },
  { verified: 'false', text: 'Unverified' },
];

export const UserStatus = ['active', 'disabled', 'deleted'];

export const UserDetails = ['overview', 'matches', 'messages', 'linked-accounts'];
