import { useEffect, useState } from 'react'

export const WikiViewer = () => {
  const [htmlContent, setHtmlContent] = useState('')
  const title = 'Inteligência_artificial'

  useEffect(() => {
    const fetchWiki = async () => {
      const response = await fetch(
        `https://pt.wikipedia.org/api/rest_v1/page/html/${title}`
      )
      let html = await response.text()
      html = html.replace(/<\/?(html|body)[^>]*>/gi, '')
      setHtmlContent(html)
    }
    fetchWiki()
  }, [title])

  return (
    <div
      className="wiki-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    >
      {}
    </div>
  )
}
