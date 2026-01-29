import { ChatItem } from "@/types/dashboard/chat.type";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const TypingDots = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 h-7 rounded-md bg-Grey-800">
      <span className="w-1.5 h-1.5 rounded-full bg-Red-500 animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-Red-400 animate-bounce [animation-delay:120ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-Red-350 animate-bounce [animation-delay:240ms]" />
    </div>
  );
};

const ChatMessageList = ({ messages }: { messages: ChatItem[] }) => {
  const t = useTranslations("dashboard.workbench.chatbot");

  return (
    <div className="flex flex-col gap-4">
      {messages.map((m) => {
        const isUser = m.role === "user";
        const isTyping = m.role === "assistant" && m.status === "typing";
        const hasAttachments = (m.attachments?.length ?? 0) > 0;

        return (
          <div
            key={m.id}
            className={clsx("flex", isUser ? "justify-end" : "justify-start")}
          >
            {isTyping ? (
              <TypingDots />
            ) : (
              <div className={clsx("max-w-80 flex flex-col gap-2")}>
                {hasAttachments && (
                  <div
                    className={clsx(
                      "grid gap-2",
                      (m.attachments?.length ?? 0) === 1
                        ? "grid-cols-1"
                        : "grid-cols-2",
                    )}
                  >
                    {m.attachments!.map((a) => (
                      <img
                        key={a.id}
                        src={a.imageUrl}
                        alt={t("attachmentAlt")}
                        className="w-[8.25rem] h-[8.25rem] rounded object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                {m.text?.trim() && (
                  <div
                    className={clsx(
                      "max-w-80 px-3 py-1.5 rounded-lg Body_3_medium whitespace-pre-line",
                      isUser
                        ? "bg-Grey-700 text-Grey-50"
                        : "text-Grey-100 bg-transparent",
                    )}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ChatRecommendations = ({
  items,
  onClickItem,
}: {
  items: readonly string[];
  onClickItem: (text: string) => void;
}) => {
  const t = useTranslations("dashboard.workbench.chatbot");

  return (
    <div className="flex flex-col gap-2 h-full justify-end">
      <span className="Body_3_semibold text-Grey-300 pr-1 self-end">
        {t("recommendedLabel")}
      </span>

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
