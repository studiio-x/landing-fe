export type Permission = "전체 허용" | "편집 허용" | "읽기 허용";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  permission: Permission;
}

export const MOCK_DATA_USERS: User[] = [
  {
    id: 1,
    name: "김류원",
    email: "cnkdnsjkn@ewhain.net",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
  {
    id: 2,
    name: "박하경",
    email: "kcndnsjcksnd@g.hongik.ac.kr",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
  {
    id: 3,
    name: "유지민",
    email: "laxmkxlowej@gmail.com",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
  {
    id: 4,
    name: "송유선",
    email: "cnkd_sckdnsjkn@ewha.ac.kr",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
];
