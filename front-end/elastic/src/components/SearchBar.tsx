import { Search, SendHorizonal } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!input.trim()) return

    try {
      const response = await fetch(
        `http://localhost:3333/wikipedia/search?query=${encodeURIComponent(
          input
        )}`
      )
      const data = await response.json()

      // Redireciona para a página de resultados, enviando os dados
      navigate('/result', { state: { results: data } })
    } catch (error) {
      console.error('Erro na busca:', error)
    }
  }

  return (
    <div className="panel__search--box">
      <input
        type="text"
        id="panel__search--bar"
        placeholder="Search for Math Articles"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="panel__search--search-icon-container">
        <Search className="icon-container__search-icon" />
        <SendHorizonal
          className="icon-container__send-icon"
          cursor={'pointer'}
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}
