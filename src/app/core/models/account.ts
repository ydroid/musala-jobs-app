import { RoleMapping } from './roleMapping';
import { Project } from './project';

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  avatarUrl: string;
  roleMapping: RoleMapping;
  socialAccount: boolean;
  projects: Project[];
}
