import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import { useState } from 'react'

type PaginationProps = {
  numPages: number
  page: number
  changePage: (newPage: number) => void
  pageInfo: boolean
}

export const Pagination = ({
  numPages,
  page,
  changePage,
  pageInfo
}: PaginationProps) => {
  const [inputPage, setInputPage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseInt(inputPage)
      if (!isNaN(parsed) && parsed >= 1 && parsed <= numPages) {
        changePage(parsed - 1)
        setInputPage('')
      }
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination__buttons">
        <button className="pagination__button" disabled={page - 1 === -1}>
          <CircleChevronLeft onClick={() => changePage(page - 1)} size={18} />
        </button>

        {Array.from({ length: numPages }).map((_, index) => (
          <button
            key={index}
            className={`pagination__dots ${
              index === page && 'pagination__dots-active'
            }`}
            onClick={() => changePage(index)}
          >
            {}
          </button>
        ))}
        <button className="pagination__button" disabled={page + 1 === numPages}>
          <CircleChevronRight onClick={() => changePage(page + 1)} size={18} />
        </button>
      </div>
      {pageInfo && (
        <div className="pagination__info">
          <input
            type="number"
            value={inputPage}
            placeholder={`${page + 1}`}
            onChange={e => setInputPage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p>of {numPages}</p>
        </div>
      )}
    </div>
  )
}
