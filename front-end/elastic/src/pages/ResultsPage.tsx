import { SearchBar } from '../components/SearchBar'
import { ResultDocument } from '../components/ResultDocument'
import { useState } from 'react'
import { Pagination } from '../components/Pagination'
import { useLocation } from 'react-router-dom'

export const ResultPages = () => {
  const location = useLocation()
  const results = location.state?.results || []
  const [numberOfResults, setNumberOfResults] = useState(10)
  const [page, setPage] = useState(0)

  const firstIndex = page * numberOfResults
  const lastIndex = (page + 1) * numberOfResults
  const numberPages = Math.ceil(results.length / numberOfResults)

  return (
    <>
      <div className="result-page__search-bar-container">
        <SearchBar />
        <div className="result-page__number-of-results">
          <p>number of results per page:</p>
          <div className="result-page__number-of-results__buttons">
            <button
              className={`${numberOfResults === 5 && 'active'}`}
              onClick={() => {
                setNumberOfResults(5)
                setPage(0)
              }}
            >
              5
            </button>
            <button
              className={`${numberOfResults === 10 && 'active'}`}
              onClick={() => {
                setNumberOfResults(10)
                setPage(0)
              }}
            >
              10
            </button>
            <button
              className={`${numberOfResults === 15 && 'active'}`}
              onClick={() => {
                setNumberOfResults(15)
                setPage(0)
              }}
            >
              15
            </button>
          </div>
        </div>
      </div>
      <div className="results-container">
        {results.slice(firstIndex, lastIndex).map((item, index) => (
          <ResultDocument key={index} result={item} />
        ))}
        <Pagination
          changePage={(newPage: number) => setPage(newPage)}
          numPages={numberPages}
          page={page}
          pageInfo={true}
        />
      </div>
    </>
  )
}
