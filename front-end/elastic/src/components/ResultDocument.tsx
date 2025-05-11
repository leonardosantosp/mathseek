import { ArrowRight, Star, StarOff } from 'lucide-react'
import wiki from '../assets/wiki_icon.png'

type ResultDocumentProps = {
  favorite: boolean
}

export const ResultDocument = ({ favorite }: ResultDocumentProps) => {
  return (
    <div className="results__item">
      <div className="results__item-header">
        <img src={wiki} alt="wikipedia" height={28} width={30} />
        <div className="results__item-header-content">
          <div className="header-content__title">
            <p>Ciência da Computação</p>
            {favorite ? <Star size={15} /> : <StarOff size={15} />}
          </div>
          <div className="header-content__link">
            <p>http://mathseek/documents/ciencia-da-computação</p>
          </div>
        </div>
      </div>
      <div className="results__item--content">
        <p>
          Computer science is the study of computation, information, and
          automation. Computer science spans theoretical disciplines (such as
          algorithms, theory of computation, and information theory) to applied
          disciplines (including the design and implementation of hardware and
          software).
        </p>
      </div>
      <div className="results__item--go-link">
        <p>Go</p>
        <ArrowRight size={13} />
      </div>
    </div>
  )
}
