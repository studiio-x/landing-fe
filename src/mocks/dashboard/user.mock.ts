import { User } from "@/types/dashboard/user.type";

export const MOCK_DATA_USERS: User[] = [
  {
    id: 1,
    name: "김류원",
    email: "cnkdnsjkn@ewhain.net",
    avatar: "/images/project/mockUserImg.png",
    permission: "FULL_ACCESS",
  },
  {
    id: 2,
    name: "박하경",
    email: "kcndnsjcksnd@g.hongik.ac.kr",
    avatar: "/images/project/mockUserImg.png",
    permission: "WRITE",
  },
  {
    id: 3,
    name: "유지민",
    email: "laxmkxlowej@gmail.com",
    avatar: "/images/project/mockUserImg.png",
    permission: "READ",
  },
  {
    id: 4,
    name: "송유선",
    email: "cnkd_sckdnsjkn@ewha.ac.kr",
    avatar: "/images/project/mockUserImg.png",
    permission: "FULL_ACCESS",
  },
];
