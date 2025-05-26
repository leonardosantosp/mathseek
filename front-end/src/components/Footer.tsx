import { Copyright } from 'lucide-react'

export const Footer = () => {
  return (
    <div className="footer">
      <div className="header__logo footer_logo">
        <span>π</span>
        <h1>MathSeek</h1>
      </div>
      <div className="footer__copy-container">
        <Copyright color="white" size={15} className="copy-icon" />
        <p>2025 MathSeek. All rights reserved.</p>
      </div>
    </div>
  )
}
