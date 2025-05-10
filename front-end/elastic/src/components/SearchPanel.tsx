import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import {
  FileSearch,
  BotMessageSquare,
  Cog,
  EllipsisVertical,
  MapPin,
  Thermometer,
  Cloud,
  SendHorizonal,
  Search
} from 'lucide-react'

import wiki_icon from '../assets/wiki_icon.png'
import blackHole from '../assets/black-hole.png'
import blackHoleWhite from '../assets/black-hole-white.png'

export const SearchPanel = () => {
  const [query, setQuery] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const { isLight } = useContext(ThemeContext)
  const [searchMode, setSearchMode] = useState<'search' | 'chatbot'>('search')

  const months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ'
  ]

  const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

  const handleSearch = () => {
    if (query) {
      alert(`Buscando por: ${query}`)
    } else {
      alert('Por favor, insira um termo de pesquisa.')
    }
  }

  const formatDateTime = (type: string) => {
    if (type === 'day') {
      return `${days[dateTime.getDay()]} ${String(dateTime.getDate()).padStart(
        2,
        '0'
      )} `
    }
    if (type === 'month') {
      return months[dateTime.getMonth()]
    }
    if (type === 'hour') {
      return `${String(dateTime.getHours()).padStart(2, '0')}:${String(
        dateTime.getMinutes()
      ).padStart(2, '0')}`
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="black-hole-container">
        {!isLight ? (
          <img src={blackHole} alt="black hole" className="black-hole" />
        ) : (
          <img
            src={blackHoleWhite}
            alt="black hole"
            className="black-hole-white"
            width={800}
            height={502}
          />
        )}
      </div>

      <div className="container__panel">
        <div className="panel-background">
          <div className="panel">
            <div className="panel__header">
              <div className="panel__header--mode">
                <div
                  className={`panel__header--mode-item ${
                    searchMode === 'search' && 'search-active'
                  }`}
                  onClick={() => setSearchMode('search')}
                >
                  <FileSearch />
                </div>
                <div
                  className={`panel__header--mode-item ${
                    searchMode === 'chatbot' && 'chatbot-active'
                  }`}
                  onClick={() => setSearchMode('chatbot')}
                >
                  <BotMessageSquare />
                </div>
              </div>
              <div className="panel__header--info">
                <p>{formatDateTime('day')}</p>
                <p>{formatDateTime('month')}</p>
                <p>{formatDateTime('hour')}</p>
                <Cog className="panel__header--info-config" />
              </div>
            </div>
            <div className="panel__search-mode">
              <div className="panel__search-mode--header">
                <div className="panel__search-mode--favorites">
                  <div className="panel__search-mode--favorites-item">
                    <img
                      src={wiki_icon}
                      alt="wikipedia icon"
                      width={20}
                      height={18}
                    />
                    <p>Ciência da Computação</p>
                  </div>
                  <div className="panel__search-mode--favorites-item">
                    <img
                      src={wiki_icon}
                      alt="wikipedia icon"
                      width={20}
                      height={18}
                    />
                    <p>Ciência da Computação</p>
                  </div>
                  <div className="panel__search-mode--favorites-item">
                    <img
                      src={wiki_icon}
                      alt="wikipedia icon"
                      width={20}
                      height={18}
                    />
                    <p>Ciência da Computação</p>
                  </div>
                </div>
                <EllipsisVertical className="panel__search-mode--header-more-icon" />
              </div>

              <div className="panel__clock--weather--info">
                <p className="panel__clock">{formatDateTime('hour')}</p>
                <div className="panel__weather--info">
                  <div className="panel__weather--info-item">
                    <MapPin />
                    <span>Alfenas MG</span>
                  </div>
                  <div className="panel__weather--info-item">
                    <Thermometer />
                    <span>16°C</span>
                  </div>
                  <div className="panel__weather--info-item">
                    <Cloud />
                    <span>Nublado</span>
                  </div>
                </div>
              </div>
              <div className="panel__search--box">
                <input
                  type="text"
                  id="panel__search--bar"
                  placeholder="Search for Math Articles"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <div className="panel__search--search-icon-container">
                  <Search />
                  <SendHorizonal
                    className="icon-container__send-icon"
                    cursor={'pointer'}
                  />
                </div>
              </div>
              <div className="panel__shortcuts">
                <div className="panel__shortcuts--card">
                  <img
                    src={wiki_icon}
                    alt="Article Image"
                    width={40}
                    height={37}
                  />
                  <p>Mathematics in Nature</p>
                </div>
                <div className="panel__shortcuts--card">
                  <img
                    src={wiki_icon}
                    alt="Article Image"
                    width={40}
                    height={37}
                  />
                  <p>Complex Numbers</p>
                </div>
                <div className="panel__shortcuts--card">
                  <img
                    src={wiki_icon}
                    alt="Article Image"
                    width={40}
                    height={37}
                  />
                  <p>Complex Numbers</p>
                </div>
                <div className="panel__shortcuts--card">
                  <img
                    src={wiki_icon}
                    alt="Article Image"
                    width={40}
                    height={37}
                  />
                  <p>Complex Numbers</p>
                </div>
                <div className="panel__shortcuts--card">
                  <img
                    src={wiki_icon}
                    alt="Article Image"
                    width={40}
                    height={37}
                  />
                  <p>Complex Numbers</p>
                </div>
                <div className="panel__shortcuts--card">
                  <img
                    src={wiki_icon}
                    alt="Article Image"
                    width={40}
                    height={37}
                  />
                  <p>Complex Numbers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchPanel
