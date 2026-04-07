export type Permission = "전체 허용" | "편집 허용" | "읽기 허용";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  permission: Permission;
}
