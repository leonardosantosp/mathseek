import { Search } from 'lucide-react'
import { Pagination } from './Pagination'
import { useEffect, useState } from 'react'
import { type Result, getMostViewedDocs } from '../api-client/elastic'

export const MathTopics = () => {
  const [page, setPage] = useState(1)
  const size = 3
  const [documents, setDocuments] = useState<Result[]>([])
  const totalDocuments = 9
  const numPages = Math.ceil(totalDocuments / size)

  useEffect(() => {
    const fetchMostViewDocuments = async () => {
      const response = await getMostViewedDocs(totalDocuments)
      setDocuments(response)
    }
    fetchMostViewDocuments()
  }, [])

  const firstIndex = (page - 1) * size
  const lastIndex = page * size

  return (
    <>
      <div className="math-topics__card">
        <h2 className="math-topics__title">Trending Math Topics</h2>
        <div className="math-topics__card-container">
          {documents.slice(firstIndex, lastIndex).map(document => (
            <>
              <div className="math-topics__card-item">
                <div className="math-topics__card-item--header">
                  <p>{document.title}</p>
                  <Search className="math-topics__card-item--search" />
                </div>
                <div className="math-topics__card-item--text">
                  <p>{document.content}</p>
                </div>
              </div>
            </>
          ))}
        </div>

        <Pagination
          page={page}
          changePage={(newPage: number) => setPage(newPage)}
          numPages={numPages}
          pageInfo={false}
          showNumbers={false}
        />
      </div>
    </>
  )
}
