import { SendHorizonal, MessageCircleMore } from 'lucide-react'

import { ChatBubble } from './ChatBubble'

export const PanelChatBot = () => {
  return (
    <div className="panel__search-mode">
      <div className="search-mode__chat">
        <div className="search-mode__chat--response">
          <ChatBubble type="response" />
          <ChatBubble type="response" />
          <ChatBubble type="response" />
          <ChatBubble type="response" />
          <ChatBubble type="load" />
        </div>
        <div className="search-mode__chat--query">
          <ChatBubble type="query" />
          <ChatBubble type="query" />
          <ChatBubble type="query" />
          <ChatBubble type="query" />
          <ChatBubble type="query" />
          <ChatBubble type="query" />
        </div>
      </div>

      <div className="input-wrapper">
        <div className="input-container">
          <input type="text" placeholder="Ask me a question" />
          <div className="input-icon__container">
            <MessageCircleMore className="input-icon" />
            <SendHorizonal className="input-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}
