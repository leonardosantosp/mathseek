import { UserCircle2, LinkIcon } from "lucide-react";

import chatIcon from "../assets/chat-bot-icon.png";
import { SearchDocument } from "./SearchDocument";
import type { Result } from "../api-client/elastic";

type ChatBubbleProps = {
  type: "response" | "query" | "load";
  text?: string;
  results?: Result[];
};

export const ChatBubble = ({ type, text, results }: ChatBubbleProps) => {
  return (
    <>
      {type === "query" ? (
        <div className="chat--query-item">
          <UserCircle2 />
          <div className="chat-bubble">{text}</div>
        </div>
      ) : type === "response" ? (
        <div className="chat--response-item">
          <img src={chatIcon} alt="" />

          <div className="chat-bubble">
            {text}
            {results && results.length > 0 && (
              <div className="bot-results">
                {results.map((item, index) => (
                  <span key={index}>
                    <LinkIcon size={10} />
                    {item.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <SearchDocument />
      )}
    </>
  );
};
