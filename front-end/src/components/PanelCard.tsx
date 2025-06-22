import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import {
  FileSearch,
  BotMessageSquare,
  Cog,
  X,
  ImagePlus,
  MonitorCog
} from 'lucide-react'

import blackHole from '../assets/black-hole.png'
import blackHoleWhite from '../assets/black-hole-white.png'
import { PanelSearch } from './PanelSearch'
import { PanelChatBot } from './PanelChatBot'

export const PanelCard = () => {
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
    return ''
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
            {searchMode === 'search' ? (
              <PanelSearch
                formatDateTime={(type: string) => formatDateTime(type)}
                setSidebarSearchMode={(type: boolean) =>
                  setSidebarSearchMode(type)
                }
                sidebarSearchMode={sidebarSearchMode}
                setViewSidebar={(type: boolean) => setViewSidebar(type)}
              />
            ) : (
              <PanelChatBot />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
