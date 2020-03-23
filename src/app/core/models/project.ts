import { ProjectType } from './projectType';
import { Account } from './account';

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: number;
  completedTasks: number;
  price: number;
  ownerId: string;
  projectType: ProjectType;
  projectTypeId: string;
  workedId: string;
  owner: Account;
}
