import { ResultDocument } from "../components/ResultDocument";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchDocs, type Result } from "../api-client/elastic";
import blackHole from "../assets/black-hole.png";
import blackHoleWhite from "../assets/black-hole-white.png";
import { Loading } from "../components/Loading";
import { ThemeContext } from "../context/ThemeContext";
import { SearchBar } from "../components/SearchBar";

export const ResultPages = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const [isLoading, setIsLoading] = useState(true);

  const [results, setResults] = useState<Result[]>([]);
  const [total, setTotal] = useState(0);
  const { isLight } = useContext(ThemeContext);

  useEffect(() => {
    if (isNaN(page) || page <= 0) {
      navigate(`/search?query=${query}&page=1&pageSize=10`, {
        replace: true
      });
    }

    if (isNaN(pageSize) || pageSize <= 0) {
      navigate(`/search?query=${query}&page=${page}&pageSize=10`, {
        replace: true
      });
    }

    if (pageSize > 100) {
      navigate(`/search?query=${query}&page=${page}&pageSize=100`, {
        replace: true
      });
    }
  }, [page, pageSize, navigate]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await searchDocs(query, page, pageSize);
      setResults(response.results);
      setTotal(response.total);
      setIsLoading(false);
    };

    fetchDocuments();
  }, [query, page, pageSize]);

  const updatePagination = (
    newPage: number,
    newPageSize: number = pageSize
  ) => {
    setSearchParams({
      query,
      page: newPage.toString(),
      pageSize: newPageSize.toString()
    });
  };

  const numberPages = Math.ceil(total / pageSize);

  return (
    <>
      <div className="result-page__search-bar-container">
        <div className="result-page__number-of-results">
          <p>number of results per page:</p>
          <div className="result-page__number-of-results__buttons">
            {[5, 10, 15].map(size => (
              <button
                key={size}
                className={pageSize === size ? "active" : ""}
                onClick={() => updatePagination(1, size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

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
              changePage={(newPage: number) => updatePagination(newPage)}
              numPages={numberPages}
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
