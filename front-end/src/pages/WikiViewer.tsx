import { useEffect, useState } from "react";
import { ScrollText, Route, Star } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { useLocation, useParams } from "react-router-dom";
import { addNumViewDoc } from "../api-client/elastic";
import { Loading } from "../components/Loading";

export const WikiViewer = () => {
  const location = useLocation();
  const documentId = location.state?.id;
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { title } = useParams();

  console.log(documentId);

  useEffect(() => {
    if (!title) return;
    const fetchWiki = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/html/${title}`
        );
        let html = await response.text();

        html = html.replace(/<\/?(html|body|base)[^>]*>/gi, "");
        html = html.replace(/<a [^>]*>/gi, "");
        html = html.replace(/<\/a>/gi, "");

        setHtmlContent(html);
        await addNumViewDoc(documentId);
      } catch (error) {
        console.error("Error fetching wiki content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWiki();
  }, [title, documentId]);

  if (!title) {
    return <div>No title provided</div>;
  }

  return (
    <>
      <div className="result-page--wrapper">
        <span className="result-page__search-bar-container">
          <SearchBar />
        </span>
      </div>

      {isLoading ? (
        <div className="wiki-loading-container">
          <Loading />
        </div>
      ) : (
        <>
          <div className="wiki-background">
            <div className="wiki">
              <div className="wiki__header">
                <h2>{title.replace(/_/g, " ")}</h2>
                <div className="wiki__header--menu">
                  <ScrollText className="menu-item" />
                  <Route className="menu-item" />
                  <Star className="menu-item" />
                </div>
              </div>

              <div
                className="wiki__content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              >
                {}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
