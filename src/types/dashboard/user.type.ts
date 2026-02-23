export type Permission = "fullAccess" | "editOnly" | "readOnly";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  permission: Permission;
}
