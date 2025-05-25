import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import { useState } from 'react'

type PaginationProps = {
  numPages: number
  page: number
  changePage: (newPage: number) => void
  pageInfo: boolean
  showNumbers: boolean
}

export const Pagination = ({
  numPages,
  page,
  changePage,
  pageInfo,
  showNumbers
}: PaginationProps) => {
  const [inputPage, setInputPage] = useState('')

  const maxVisiblePages = 11
  let start = Math.max(1, page - 5)
  let end = Math.min(numPages, page + 5)

  if (end - start + 1 < maxVisiblePages) {
    if (start === 1) {
      end = Math.min(numPages, start + maxVisiblePages - 1)
    } else if (end === numPages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseInt(inputPage)
      if (!isNaN(parsed) && parsed >= 1 && parsed <= numPages) {
        changePage(parsed)
        setInputPage('')
      }
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination__buttons">
        <button className="pagination__button" disabled={page - 1 === 0}>
          <CircleChevronLeft onClick={() => changePage(page - 1)} size={18} />
        </button>

        {pages.map(pageNumber => (
          <div className="pagination_wrapper">
            <button
              key={pageNumber}
              className={`pagination__dots ${
                pageNumber === page ? 'pagination__dots-active' : ''
              }`}
              onClick={() => changePage(pageNumber)}
            >
              {}
            </button>
            {showNumbers && <p>{pageNumber}</p>}
          </div>
        ))}
        <button className="pagination__button" disabled={page === numPages}>
          <CircleChevronRight onClick={() => changePage(page + 1)} size={18} />
        </button>
      </div>
      {pageInfo && (
        <div className="pagination__info">
          <input
            type="number"
            value={inputPage}
            placeholder={`${page}`}
            onChange={e => setInputPage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p>of {numPages}</p>
        </div>
      )}
    </div>
  )
}
