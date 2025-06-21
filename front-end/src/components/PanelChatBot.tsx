import { SendHorizonal, MessageCircleMore } from "lucide-react";

import { ChatBubble } from "./ChatBubble";
import { useState } from "react";

type Message = {
  text: string;
  type: "query" | "response";
};

export const PanelChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Adiciona a nova mensagem do usuário
    setMessages(prev => [...prev, { text: inputValue, type: "query" }]);
    setMessages(prev => [...prev, { text: "", type: "response" }]);
    // Limpa o input
    setInputValue("");

    // Aqui você poderia adicionar lógica para obter a resposta do chatbot
    // e então adicionar uma mensagem do tipo 'response'
  };

  return (
    <div className="panel__search-mode">
      <div className="search-mode__chat">
        <div className="search-mode__chat--response">
          {messages
            .filter(m => m.type === "response")
            .map((msg, i) => (
              <ChatBubble key={i} type={msg.type} text={msg.text} />
            ))}
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
