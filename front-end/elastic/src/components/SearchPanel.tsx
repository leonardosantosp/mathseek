import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import {
  FileSearch,
  BotMessageSquare,
  Cog,
  EllipsisVertical,
  X,
  ImagePlus,
  MonitorCog,
  History,
  Star,
  RouteIcon,
  Pencil,
  Folders
} from 'lucide-react'

import wiki_icon from '../assets/wiki_icon.png'
import blackHole from '../assets/black-hole.png'
import blackHoleWhite from '../assets/black-hole-white.png'
import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { WeatherInfo } from './WeatherInfo'

export const SearchPanel = () => {
  const [dateTime, setDateTime] = useState(new Date())
  const [viewSidebar, setViewSidebar] = useState(false)
  const [sidebarSearchMode, setSidebarSearchMode] = useState(false)
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
          <div className={`${viewSidebar && 'sidebar-blur__active'}`}>
            <div className="panel__side-bar">
              <div className="panel__side-bar--header">
                <X
                  className="close-icon"
                  onClick={() => setViewSidebar(false)}
                  cursor={'pointer'}
                />
              </div>
              <div className="side-bar__menu">
                <div className="side-bar__menu--items">
                  <div className="menu--items-container">
                    <ImagePlus />
                    Customize
                  </div>
                </div>
                <div className="side-bar__menu--items">
                  <div className="menu--items-container">
                    <MonitorCog />
                    Advanced Configs
                  </div>
                </div>
                <div className="side-bar__menu--items"></div>
              </div>
            </div>
          </div>
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
                <Cog
                  className="panel__header--info-config"
                  onClick={() => {
                    setViewSidebar(true)
                    setSidebarSearchMode(false)
                  }}
                />
              </div>
            </div>
            <div className="panel__search-mode">
              <div className={`${sidebarSearchMode && 'sidebar-search-mode'}`}>
                <div className="search__side-bar">
                  <div className="search__side-bar--header">
                    <X
                      className="close-icon"
                      onClick={() => setSidebarSearchMode(false)}
                      cursor={'pointer'}
                    />
                  </div>
                  <div className="search__side-bar--menu">
                    <div className="side-bar--menu-item">
                      <History />
                      <p>History</p>
                    </div>
                    <div className="side-bar--menu-item">
                      <Star />
                      <p>Favorites</p>
                    </div>
                    <div className="side-bar--menu-item">
                      <RouteIcon />
                      <p>Shortcuts</p>
                    </div>
                    <div className="side-bar--menu-item">
                      <Pencil />
                      <p>Edit</p>
                    </div>
                    <div className="side-bar--menu-item">
                      <Folders />
                      <p>Folders</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel__search-mode--header">
                <div className="panel__search-mode--favorites">
                  <Link to="/result">
                    <div className="panel__search-mode--favorites-item">
                      <img
                        src={wiki_icon}
                        alt="wikipedia icon"
                        width={20}
                        height={18}
                      />
                      <p>Ciência da Computação</p>
                    </div>
                  </Link>
                  <Link to="/result">
                    <div className="panel__search-mode--favorites-item">
                      <img
                        src={wiki_icon}
                        alt="wikipedia icon"
                        width={20}
                        height={18}
                      />
                      <p>Ciência da Computação</p>
                    </div>
                  </Link>
                </div>
                <EllipsisVertical
                  className="panel__search-mode--header-more-icon"
                  onClick={() => {
                    setSidebarSearchMode(true)
                    setViewSidebar(false)
                  }}
                />
              </div>

              <div className="panel__clock--weather--info">
                <p className="panel__clock">{formatDateTime('hour')}</p>
                <WeatherInfo />
              </div>

              <SearchBar />

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
