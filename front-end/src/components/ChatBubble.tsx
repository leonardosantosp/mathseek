import { UserCircle2, LinkIcon } from "lucide-react";

import chatIcon from "../public/assets/chat-bot-icon.png";
import { SearchDocument } from "./SearchDocument";
import type { Result } from "../api-client/elastic";
import { Link } from "react-router-dom";

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
          <div className="chat-bubble">
            <p>{text}</p>
          </div>
        </div>
      ) : type === "response" ? (
        <div className="chat--response-item">
          <img src={chatIcon} alt="" />

          <div className="chat-bubble">
            {text}
            {results && results.length > 0 && (
              <div className="bot-results">
                {results.map(item => (
                  <Link to={`/wiki/${item.title}`} target="_blank">
                    <LinkIcon size={10} />
                    {item.title}
                  </Link>
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
