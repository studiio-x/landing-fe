import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";
import LoginModal from "@/components/dashboard/login/LoginModal";

export default function Login() {
  return (
    <>
      <Header tab={true} video={true} back={true} />
      <SideBar />
      <LoginModal />
    </>
  );
}
