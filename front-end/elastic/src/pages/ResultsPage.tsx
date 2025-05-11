import { SearchBar } from '../components/SearchBar'
import { ResultDocument } from '../components/ResultDocument'
import { useState } from 'react'

const documents = [
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false
]

export const ResultPages = () => {
  const [numberOfResults, setNumberOfResults] = useState(10)

  const results = documents.slice(0, numberOfResults)

  return (
    <>
      <div className="result-page__search-bar-container">
        <SearchBar />
        <div className="result-page__number-of-results">
          <p>number of results per page:</p>
          <div className="result-page__number-of-results__buttons">
            <button
              className={`${numberOfResults === 5 && 'active'}`}
              onClick={() => setNumberOfResults(5)}
            >
              5
            </button>
            <button
              className={`${numberOfResults === 10 && 'active'}`}
              onClick={() => setNumberOfResults(10)}
            >
              10
            </button>
            <button
              className={`${numberOfResults === 15 && 'active'}`}
              onClick={() => setNumberOfResults(15)}
            >
              15
            </button>
          </div>
        </div>
      </div>
      <div className="results-container">
        {results.map((item, index) => (
          <ResultDocument key={index} favorite={item} />
        ))}
      </div>
    </>
  )
}
