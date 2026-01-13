import { LogoRed } from "@/assets/icons";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  return (
    <div className="w-[24.75rem] h-[35.8125rem] rounded-lg border border-Grey-600 bg-Grey-900 p-5 pb-4 flex flex-col">
      <div className="flex gap-1 flex-col pb-2 border-b border-Grey-600 shrink-0">
        <div className="flex gap-3 items-center">
          <div className="rounded-full h-[3.25rem] w-[3.25rem] p-[1px] bg-gradient-to-b from-Grey-400 to-Grey-700">
            <div className="h-full w-full rounded-full bg-Black flex items-center justify-center">
              <LogoRed className="w-[2.0625rem] h-[0.4368rem]" />
            </div>
          </div>
          <span className="Subhead_2_semibold text-Grey-100">StudioX 챗봇</span>
        </div>
        <span className="py-1 px-2 Body_3_medium text-Grey-300">
          원하는 수정 사항을 챗봇에게 요청하세요.
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4" />

      {/* Input */}
      <div className="flex flex-col gap-[0.65rem] items-center mt-5">
        <ChatInput />
        <span className="Caption_medium text-Grey-500">
          AI가 부정확한 결과를 생성할 수 있어요.
        </span>
      </div>
    </div>
  );
};

export default ChatContainer;
