import {
  SendHorizonal,
  MessageCircleMore,
  UserCircle2,
  LinkIcon
} from 'lucide-react'

import chatIcon from '../assets/chat-bot-icon.png'
import { SearchDocument } from './SearchDocument'

export const PanelChatBot = () => {
  return (
    <div className="panel__search-mode">
      <div className="search-mode__chat">
        <div className="search-mode__chat--response">
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

          {/*  */}
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
          <div>
            <SearchDocument />
          </div>
        </div>
        <div className="search-mode__chat--query">
          <div className="chat--query-item">
            <UserCircle2 />
            <div className="chat-bubble">
              Como faço para evitar que meu notebook fique lento depois de
              algumas horas ligado?
            </div>
          </div>

          {/*  */}
          <div className="chat--query-item">
            <UserCircle2 />
            <div className="chat-bubble">
              Como faço para evitar que meu notebook fique lento depois de
              algumas horas ligado?
            </div>
          </div>
          <div className="chat--query-item">
            <UserCircle2 />
            <div className="chat-bubble">
              Como faço para evitar que meu notebook fique lento depois de
              algumas horas ligado?
            </div>
          </div>
          <div className="chat--query-item">
            <UserCircle2 />
            <div className="chat-bubble">
              Como faço para evitar que meu notebook fique lento depois de
              algumas horas ligado?
            </div>
          </div>
          <div className="chat--query-item">
            <UserCircle2 />
            <div className="chat-bubble">
              Como faço para evitar que meu notebook fique lento depois de
              algumas horas ligado?
            </div>
          </div>
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
