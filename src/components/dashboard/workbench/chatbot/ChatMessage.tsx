import { useState } from "react";
import { ChatItem } from "@/types/dashboard/chat.type";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

const TypingDots = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 h-7 rounded-md bg-Grey-800">
      <span className="w-1.5 h-1.5 rounded-full bg-Red-500 animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-Red-400 animate-bounce [animation-delay:120ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-Red-350 animate-bounce [animation-delay:240ms]" />
    </div>
  );
};

const ConceptImageGrid = ({
  messageId,
  imageKeys,
  onConceptSelect,
}: {
  messageId: string;
  imageKeys: string[];
  onConceptSelect: (messageId: string, index: number) => void;
}) => {
  const t = useTranslations("dashboard.workbench.chatbot");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-68">
      <div className="grid grid-cols-2 gap-2">
        {imageKeys.map((key, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={clsx(
              "rounded p-[1.5px] transition-colors",
              selectedIndex === index
                ? "bg-linear-to-b from-Red-350 to-Red-500"
                : "bg-Grey-800",
            )}
          >
            <div className="rounded overflow-hidden">
              <Image
                src={key}
                width={132}
                height={132}
                alt={t("attachmentAlt")}
                className="w-33 h-33 object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
          </button>
        ))}
      </div>

      <div
        className={clsx(
          "w-35.25 p-px rounded-[36px] bg-linear-to-b transition-all",
          selectedIndex !== null
            ? "from-Grey-50/25 to-Grey-800/25 hover:from-Red-300/25 hover:to-Red-500/25"
            : "from-Grey-50/25 to-Grey-800/25",
        )}
      >
        <button
          type="button"
          disabled={selectedIndex === null}
          onClick={() =>
            selectedIndex !== null && onConceptSelect(messageId, selectedIndex)
          }
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            background:
              btnHovered && selectedIndex !== null
                ? "linear-gradient(rgba(255,134,134,0.03),rgba(255,134,134,0.03)), #16181D"
                : "linear-gradient(rgba(255,255,255,0.03),rgba(255,255,255,0.03)), #16181D",
          }}
          className="w-full py-3 rounded-[36px] Caption_semibold text-White hover:enabled:text-Red-400 disabled:text-Grey-600 disabled:cursor-not-allowed"
        >
          {t("selectConcept")}
        </button>
      </div>
    </div>
  );
};

const ChatMessageList = ({
  messages,
  onConceptSelect,
}: {
  messages: ChatItem[];
  onConceptSelect: (messageId: string, index: number) => void;
}) => {
  const t = useTranslations("dashboard.workbench.chatbot");

  return (
    <div className="flex flex-col gap-4">
      {messages.map((m) => {
        const isUser = m.role === "user";
        const isTyping = m.role === "assistant" && m.status === "typing";
        const hasAttachments = (m.attachments?.length ?? 0) > 0;
        const hasImageKeys = (m.imageKeys?.length ?? 0) > 0;

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
                        className="w-33 h-33 rounded object-cover"
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

                {hasImageKeys && m.conceptSelectable && (
                  <ConceptImageGrid
                    messageId={m.id}
                    imageKeys={m.imageKeys!}
                    onConceptSelect={onConceptSelect}
                  />
                )}

                {hasImageKeys && !m.conceptSelectable && (
                  m.imageKeys!.length === 1 ? (
                    <Image
                      src={m.imageKeys![0]}
                      width={272}
                      height={272}
                      alt={t("attachmentAlt")}
                      className="w-68 h-68 rounded object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-2 w-68">
                      {m.imageKeys!.map((key) => (
                        <Image
                          key={key}
                          src={key}
                          width={132}
                          height={132}
                          alt={t("attachmentAlt")}
                          className="w-33 h-33 rounded object-cover"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )
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
