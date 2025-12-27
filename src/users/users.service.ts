import { Injectable } from '@nestjs/common';

export interface UserRecord {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
}

@Injectable()
export class UsersService {
  private users: UserRecord[] = [
    { id: 1, email: 'admin@example.com', role: 'admin', isActive: true },
    { id: 2, email: 'teacher@example.com', role: 'prof', isActive: true },
  ];

  list(): UserRecord[] {
    return this.users;
  }
}
