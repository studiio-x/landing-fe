import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";

export default function Login() {
  return (
    <>
      <Header tap={true} video={true} back={true} />
      <SideBar />
    </>
  );
}
