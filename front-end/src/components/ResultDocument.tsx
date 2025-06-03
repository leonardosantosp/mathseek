import { ArrowRight } from 'lucide-react'
import wiki from '../assets/wiki_icon.png'
import type { Result } from '../api-client/elastic'
import { Link } from 'react-router-dom'

type ResultDocumentProps = {
  result: Result
}

export const ResultDocument = ({ result }: ResultDocumentProps) => {
  return (
    <div className="results__item">
      <div className="results__item-header">
        <img src={wiki} alt="wikipedia" height={28} width={30} />
        <div className="results__item-header-content">
          <div className="header-content__title">
            <p>{result.title}</p>
          </div>
          <div className="header-content__link">
            <p>{result.url}</p>
          </div>
        </div>
      </div>
      <div className="results__item--content">
        <p>{result.content}</p>
      </div>
      <Link to={`/wiki/${result.title}`} state={{ id: result._id }}>
        <div className="results__item--go-link">
          <p>Go</p>
          <ArrowRight size={13} />
        </div>
      </Link>
    </div>
  )
}
