import chatIcon from '../assets/chat-bot-icon.png'
export const SearchDocument = () => {
  return (
    <div className="search-document__bubble">
      <img src={chatIcon} alt="" />
      <div className="chat-bubble">
        <p className="typing-effect">Pesquisando por documentos</p>
      </div>
    </div>
  )
}
