// export type Permission = "fullAccess" | "editOnly" | "readOnly";
import { Permission } from "../api/project.type";
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  permission: Permission;
}
