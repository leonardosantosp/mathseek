import { SendHorizonal, MessageCircleMore } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { useState } from "react";
import { semanticSearch } from "../api-client/elastic";
import type { Result } from "../api-client/elastic";

type Message = {
  text: string;
  type: "query" | "response";
};

export const PanelChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [documents, setDocuments] = useState<Result[]>([]);

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
          text: "Aqui estão alguns resultados:",
          type: "response"
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Ocorreu um erro na busca.", type: "response" }
      ]);
    }
    setInputValue("");
  };

  return (
    <div className="panel__search-mode">
      <div className="search-mode__chat">
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
        </div>
        <div className="search-mode__chat--query">
          {messages
            .filter(m => m.type === "query")
            .map((msg, i) => (
              <ChatBubble key={i} type={msg.type} text={msg.text} />
            ))}
        </div>
      </div>

      <div className="input-wrapper">
        <div className="input-container">
          <input
            type="text"
            placeholder="Ask me a question"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div className="input-icon__container">
            <MessageCircleMore className="input-icon" />
            <SendHorizonal
              className="input-icon"
              cursor="pointer"
              onClick={e => handleSubmit(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
