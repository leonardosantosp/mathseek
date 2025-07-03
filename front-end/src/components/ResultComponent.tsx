import { useContext, useEffect, useState } from "react";
import { searchDocs, type Result } from "../api-client/elastic";
import { ThemeContext } from "../context/ThemeContext";
import blackHoleWhite from "../public/assets/black-hole-white.png";
import blackHole from "../public/assets/black-hole.png";
import { SearchBar } from "./SearchBar";
import { Loading } from "./Loading";
import { ResultDocument } from "./ResultDocument";
import { Pagination } from "./Pagination";

type ResultComponentProps = {
  query: string;
};

export const ResultComponent = ({ query }: ResultComponentProps) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { isLight } = useContext(ThemeContext);

  const [results, setResults] = useState<Result[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await searchDocs(query, page, 10);
      setResults(response.results);
      setTotal(response.total);
      setIsLoading(false);
    };

    fetchDocuments();
  }, [query, page]);

  return (
    <>
      <div className="results-container">
        <div className="search-container">
          <div className="black-hole-container">
            {isLight ? (
              <img
                src={blackHoleWhite}
                alt="black hole"
                className="black-hole-white-result"
              />
            ) : (
              <img src={blackHole} alt="black hole" className="black-hole" />
            )}
          </div>
          <SearchBar />
        </div>
        {isLoading ? (
          <Loading />
        ) : total > 0 ? (
          <>
            <div className="query-container">
              <h1 className="results__query">{query}</h1>
              <p className="total-results">Total Results: {total}</p>
            </div>
            <div className="results-item__container">
              {results.map(item => (
                <ResultDocument key={item._id} result={item} />
              ))}
            </div>

            <Pagination
              changePage={(newPage: number) => setPage(newPage)}
              numPages={total / 10}
              page={page}
              pageInfo={true}
              showNumbers={true}
            />
          </>
        ) : (
          <div className="query-container">
            <h1 className="results__query">No Results</h1>
          </div>
        )}
      </div>
    </>
  );
};
