import { Role } from './role';

export interface RoleMapping {
  id: string;
  principalType: string;
  principalId: string;
  roleId: string;
  role: Role;
}
