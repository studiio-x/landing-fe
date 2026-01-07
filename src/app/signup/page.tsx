import { LogoRed } from "@/assets/icons";

export default function SignUp() {
  return (
    <div className="flex h-full">
      {/* 좌측 영상 */}
      <section className="flex-[56%] h-full relative flex justify-center items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/landing/main-poster.png"
        >
          <source src="/videos/guide-optimized.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,8,0.80)] to-[rgba(8,8,8,0.45)]" />
        <LogoRed className=" z-50 w-[21rem] h-auto" />
      </section>

      {/* 우측 로그인 */}
      <section className="flex-[44%] pt-[11.25rem] px-[8.5rem]">
        <div className="Heading_1_semibold text-Grey-50 mb-10">회원가입</div>
        <form>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            className="bg-Grey-800 py-3 px-4 mb-4 placeholder:text-Body_2_medium w-full rounded-[4px]"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="appearance-none  w-[1.125rem] h-[1.125rem] rounded-sm border-Grey-300 border-2 checked:bg-Grey-300 checked:border-Grey-300 "
            />
            <span className="Body_3_regular text-Grey-300">
              약관 및 개인정보 처리방침에 동의합니다.
            </span>
          </label>
          <button className="mt-10 w-full bg-[rgba(255,48,48,0.45)] rounded-[4px] Body_2_semibold py-[0.78125rem]">
            등록하기
          </button>
        </form>
        <div className="mt-3 flex gap-2 justify-center">
          <span className="Body_3_regular text-Grey-400">
            이미 계정이 있나요?
          </span>
          <span className="Body_3_semibold text-Grey-200">로그인 하기</span>
        </div>
      </section>
    </div>
  );
}
