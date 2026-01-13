import { ChatItem } from "@/types/chat";
import clsx from "clsx";

const ChatMessageList = ({ messages }: { messages: ChatItem[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className={clsx(
            "flex",
            m.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={clsx(
              "max-w-80 px-3 py-1.5 rounded-lg Body_3_medium whitespace-pre-line",
              m.role === "user" ? "bg-Grey-700 text-Grey-50" : "text-Grey-100v bg-transparent"
            )}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
};

const ChatRecommendations = ({
  title,
  items,
  onClickItem,
}: {
  title: string;
  items: readonly string[];
  onClickItem: (text: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 h-full justify-end">
      <span className="Body_3_semibold text-Grey-300 pr-1 self-end">{title}</span>

      <div className="flex flex-col gap-2 items-end">
        {items.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => onClickItem(text)}
            className="max-w-80 rounded-md bg-Grey-700 px-3 py-1.5 Body_3_medium text-Grey-400 hover:text-Grey-50 text-left transition-colors"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatMessage = () => null;

ChatMessage.List = ChatMessageList;
ChatMessage.Recommendations = ChatRecommendations;

export default ChatMessage;
