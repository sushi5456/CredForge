import { mockDatabase } from './mockDatabase';
import { User, UserRole } from '../types';

class UserService {
  public getAllUsers(): User[] {
    return mockDatabase.getUsers();
  }

  public getUsersByRole(role: UserRole): User[] {
    return mockDatabase.getUsers().filter(u => u.role === role);
  }

  public getUserById(id: string): User | undefined {
    return mockDatabase.getUserById(id);
  }
}

export const userService = new UserService();
