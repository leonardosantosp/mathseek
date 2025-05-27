import { Copyright } from 'lucide-react'
import piLogo from '../assets/piLogo.png'
export const Footer = () => {
  return (
    <div className="footer">
      <div className="header__logo footer_logo">
        <img src={piLogo} alt="" />
        <h1>MathSeek</h1>
      </div>
      <div className="footer__copy-container">
        <Copyright color="white" size={15} className="copy-icon" />
        <p>2025 MathSeek. All rights reserved.</p>
      </div>
    </div>
  )
}
