import chatIcon from "../public/assets/chat-bot-icon.png";
import { ChatbBotLoading } from "./ChatBotLoading";
export const SearchDocument = () => {
  return (
    <div className="search-document__bubble">
      <img src={chatIcon} alt="" />
      <div className="chat-bubble">
        <ChatbBotLoading />
      </div>
    </div>
  );
};
