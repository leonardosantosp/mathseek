import { SendHorizonal, MessageCircleMore } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { useState } from "react";
import { semanticSearch } from "../api-client/elastic";
import type { Result } from "../api-client/elastic";
import chatIcon from "../public/assets/chat-bot-icon.png";

type Message = {
  text: string;
  type: "query" | "response";
};

export const PanelChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [documents, setDocuments] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Adiciona a nova mensagem do usuário
    setMessages(prev => [...prev, { text: inputValue, type: "query" }]);

    try {
      const response = await semanticSearch(inputValue);

      setDocuments(prev => [...prev, ...response.results]);

      setMessages(prev => [
        ...prev,
        {
          text: "Here are some results:",
          type: "response"
        }
      ]);
      setLoading(false);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "An error occurred while searching", type: "response" }
      ]);
      setLoading(false);
    }
    setInputValue("");
  };

  return (
    <div className="panel__search-mode">
      <div className="search-mode__chat">
        {messages.length === 0 && (
          <div className="chat-initial__container">
            <div className="chat-initial__title">
              <img src={chatIcon} alt="chat icon" height={30} width={30} />
              <h3>Search with AI:</h3>
            </div>
            <p>
              The system understands the meaning behind your words, not just the
              exact text.
            </p>
          </div>
        )}
        {send && (
          <>
            <div className="search-mode__chat--response">
              {messages
                .filter(m => m.type === "response")
                .map((msg, i) => {
                  // Pega os documentos correspondentes a esta resposta (3 por grupo)
                  const startIndex = i * 3;
                  const endIndex = startIndex + 3;
                  const currentResults = documents.slice(startIndex, endIndex);

                  return (
                    <ChatBubble
                      key={i}
                      type={msg.type}
                      text={msg.text}
                      results={currentResults}
                    />
                  );
                })}
              {loading && <ChatBubble type="load" />}
            </div>
            <div className="search-mode__chat--query">
              {messages
                .filter(m => m.type === "query")
                .map((msg, i) => (
                  <ChatBubble key={i} type={msg.type} text={msg.text} />
                ))}
            </div>
          </>
        )}
      </div>

      <div className="input-wrapper">
        <div className="input-container">
          <MessageCircleMore className="input-icon" />

          <input
            type="text"
            placeholder="Ask me a question"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          {/* <div className="input-icon__container"> */}
          <SendHorizonal
            className="input-icon"
            cursor="pointer"
            onClick={e => {
              handleSubmit(e), setLoading(true), setSend(true);
            }}
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
