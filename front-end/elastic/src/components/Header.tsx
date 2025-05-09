import { MoonStar, CircleUser, Sun } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const Header = () => {
  const { isLight, toggleTheme } = useContext(ThemeContext)
  return (
    <div className="header">
      <div className="header__logo">
        <span>π</span>
        <h1>MathSeek</h1>
      </div>
      <div className={`header__user ${isLight && 'header__user-light'}`}>
        <div className="header__user--theme" onClick={toggleTheme}>
          <div className={`header__user--slider ${isLight ? 'light' : 'dark'}`}>
            {isLight ? <Sun size={16} /> : <MoonStar size={16} />}
          </div>
        </div>

        <CircleUser className="header__user-user-icon" />
      </div>
    </div>
  )
}
