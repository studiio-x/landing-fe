import { Pencil, ProfileDefault } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import { useState, useRef, useEffect } from "react";
import LanguageDropdown from "./LanguageDropdown";
import { LanguageType } from "@/types/mypage/language.type";

const SettingsContent = () => {
  const [lang, setLang] = useState<LanguageType>("ko");
  const [nickname, setNickname] = useState("임세민");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const prevNicknameRef = useRef(nickname);

  useEffect(() => {
    if (isEditingNickname && nicknameInputRef.current) {
      nicknameInputRef.current.focus();
      nicknameInputRef.current.select();
    }
  }, [isEditingNickname]);

  const startEditingNickname = () => {
    prevNicknameRef.current = nickname;
    setIsEditingNickname(true);
  };

  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      prevNicknameRef.current = nickname;
    } else {
      setNickname(prevNicknameRef.current);
    }
    setIsEditingNickname(false);
  };

  const handleNicknameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNicknameSubmit();
    } else if (e.key === "Escape") {
      setNickname(prevNicknameRef.current);
      setIsEditingNickname(false);
    }
  };

  return (
    <>
      {/* 프로필 */}
      <div className="flex items-center pl-5 pb-8">
        <div className="flex flex-col gap-[0.875rem]">
          <span className="Subhead_2_semibold text-Grey-50">프로필</span>

          <div className="flex items-center gap-5">
            <div className="relative">
              <ProfileDefault className="w-[4.5rem] h-[4.5rem]" />
              <button
                aria-label="프로필 사진 변경"
                className="absolute bottom-0 right-0 w-6 h-6 bg-Grey-500 border-Grey-300 border flex items-center justify-center rounded-full"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="relative">
                  <span className="Subhead_1_semibold invisible whitespace-pre">
                    {nickname || " "}
                  </span>
                  {isEditingNickname ? (
                    <input
                      ref={nicknameInputRef}
                      type="text"
                      aria-label="닉네임"
                      autoFocus
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      onBlur={handleNicknameSubmit}
                      onKeyDown={handleNicknameKeyDown}
                      className="Subhead_1_semibold text-White bg-transparent outline-none absolute inset-0 w-full"
                    />
                  ) : (
                    <span className="Subhead_1_semibold text-White absolute inset-0">
                      {nickname}
                    </span>
                  )}
                </span>
                <button
                  aria-label="닉네임 수정"
                  onClick={() => startEditingNickname()}
                  className="w-6 h-6 rounded-full bg-Grey-500 flex justify-center items-center"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
              <span className="text-Grey-300 Body_2_medium">
                이메일sndckscsk@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 언어 설정 */}
      <div className="flex items-center justify-between px-5 py-4 border-y border-Grey-300/30">
        <div className="flex flex-col gap-1">
          <h3 className="Subhead_2_semibold text-Grey-50">언어 설정</h3>
          <p className="Caption_medium text-Grey-400">
            StudioX에서 사용하는 언어를 변경하세요.
          </p>
        </div>

        <LanguageDropdown
          value={lang}
          onChange={(v) => setLang(v as LanguageType)}
        />
      </div>

      {/* 로그아웃 */}
      <div className="flex justify-end pt-[7.1875rem]">
        <GlassButton
          variant="default"
          size="lg"
          className="Body_2_semibold !w-[12.375rem]"
        >
          로그아웃
        </GlassButton>
      </div>
    </>
  );
};

export default SettingsContent;
