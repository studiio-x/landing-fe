import { Logo } from "@/assets/icons";

export default function Login() {
  return (
    <div className="pt-10 pb-12 px-[3.25rem]">
      <div>
        <Logo />
        <span>로그인하기</span>
      </div>
      <div>
        <span>구글로 로그인하기</span>
      </div>
      <div>또는</div>
      <form action="">
        <input type="text" aria-label="이메일" />
        <input type="text" aria-label="비밀번호" />
      </form>
    </div>
  );
}
