import { Back, Logo, Person, Video } from "@/assets/icons";

interface HeaderProps {
  back?: boolean;
  tap?: boolean;
  video?: boolean;
}

const Header = ({ back = false, tap = false, video = false }: HeaderProps) => {
  return (
    <header className="px-[6.125rem] pt-5 py-3 flex">
      <div className="flex gap-4">
        {back && <Back />}
        <Logo className="w-[5.3125rem]" />
      </div>

      {/* 탭  */}
      <div className="flex-1">{tap && <div></div>}</div>

      <div className="flex gap-10">
        {/* 사용방법 */}
        {video && (
          <div className="flex gap-1">
            <Video />
            <span>사용방법</span>
          </div>
        )}
        <Person className="w-[1.125rem]" />
      </div>
    </header>
  );
};

export default Header;
