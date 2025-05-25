import { SearchBar } from '../components/SearchBar'
import { ResultDocument } from '../components/ResultDocument'
import { useEffect, useState } from 'react'
import { Pagination } from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'

export const ResultPages = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch(
        `http://localhost:3333/wikipedia/search?query=${query}&page=${page}&pageSize=${pageSize}`
      )
      const data = await response.json()
      setResults(data.results)
      setTotal(data.total)
    }

    fetchDocuments()
  }, [query, page, pageSize])

  const updatePagination = (
    newPage: number,
    newPageSize: number = pageSize
  ) => {
    setSearchParams({
      query,
      page: newPage.toString(),
      pageSize: newPageSize.toString()
    })
  }

  const numberPages = Math.ceil(total / pageSize)

  return (
    <>
      <div className="result-page__search-bar-container">
        <SearchBar />

        <div className="result-page__number-of-results">
          <p>number of results per page:</p>
          <div className="result-page__number-of-results__buttons">
            {[5, 10, 15].map(size => (
              <button
                key={size}
                className={pageSize === size ? 'active' : ''}
                onClick={() => updatePagination(1, size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-container">
        <p className="results__query">{query}</p>
        <p className="total-results">Total Results: {total}</p>
        {results.map((item, index) => (
          <ResultDocument key={index} result={item} />
        ))}
        <Pagination
          changePage={(newPage: number) => updatePagination(newPage)}
          numPages={numberPages}
          page={page}
          pageInfo={true}
        />
      </div>
    </>
  )
}
