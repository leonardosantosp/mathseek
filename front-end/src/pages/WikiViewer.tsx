import { useEffect, useState } from 'react'
import { ScrollText, Route, Star } from 'lucide-react'
import { SearchBar } from '../components/SearchBar'
import { useParams } from 'react-router-dom'

export const WikiViewer = () => {
  const [htmlContent, setHtmlContent] = useState('')
  const { title } = useParams()

  useEffect(() => {
    const fetchWiki = async () => {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/html/${title}`
      )
      let html = await response.text()

      html = html.replace(/<\/?(html|body|base)[^>]*>/gi, '')
      html = html.replace(/<a [^>]*>/gi, '')
      html = html.replace(/<\/a>/gi, '')

      setHtmlContent(html)
    }

    fetchWiki()
  }, [title])

  if (!title) return

  return (
    <>
      <div className="result-page--wrapper">
        <span className="result-page__search-bar-container">
          <SearchBar />
        </span>
      </div>

      <div className="wiki-background">
        <div className="wiki">
          <div className="wiki__header">
            <h2>{title.replace(/_/g, ' ')}</h2>
            <div className="wiki__header--menu">
              <ScrollText className="menu-item" />
              <Route className="menu-item" />
              <Star className="menu-item" />
            </div>
          </div>

          <div
            className="wiki__content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          >
            {}
          </div>
        </div>
      </div>
    </>
  )
}
