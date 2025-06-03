import { UserCircle2, LinkIcon } from 'lucide-react'

import chatIcon from '../assets/chat-bot-icon.png'
import { SearchDocument } from './SearchDocument'

type ChatBubbleProps = {
  type: 'response' | 'query' | 'load'
}

export const ChatBubble = ({ type }: ChatBubbleProps) => {
  return (
    <>
      {type === 'query' ? (
        <div className="chat--query-item">
          <UserCircle2 />
          <div className="chat-bubble">
            Como faço para evitar que meu notebook fique lento depois de algumas
            horas ligado?
          </div>
        </div>
      ) : type === 'response' ? (
        <div className="chat--response-item">
          <img src={chatIcon} alt="" />

          <div className="chat-bubble">
            Aqui estão alguns resultados:
            <div className="bot-results">
              <span>
                <LinkIcon size={10} />
                Como Posso melhorar o desempenho do meu Notebook?
              </span>
              <span>
                <LinkIcon size={10} />
                Como Posso melhorar o desempenho do meu Notebook?
              </span>
              <span>
                <LinkIcon size={10} />
                Como Posso melhorar o desempenho do meu Notebook?
              </span>
            </div>
          </div>
        </div>
      ) : (
        <SearchDocument />
      )}
    </>
  )
}
