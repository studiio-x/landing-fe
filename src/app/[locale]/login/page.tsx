import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";

export default function Login() {
  return (
    <>
      <Header tab={true} video={true} back={true} />
      <SideBar />
    </>
  );
}
