import { Search, SendHorizonal } from 'lucide-react'
import { useState } from 'react'

export const SearchBar = () => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query) {
      alert(`Buscando por: ${query}`)
    } else {
      alert('Por favor, insira um termo de pesquisa.')
    }
  }

  return (
    <div className="panel__search--box">
      <input
        type="text"
        id="panel__search--bar"
        placeholder="Search for Math Articles"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="panel__search--search-icon-container">
        <Search className="icon-container__search-icon" />
        <SendHorizonal
          className="icon-container__send-icon"
          cursor={'pointer'}
        />
      </div>
    </div>
  )
}
