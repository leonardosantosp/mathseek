import { useEffect, useState } from "react";
import { ScrollText, Route, Star } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { addNumViewDoc } from "../api-client/elastic";
import { Loading } from "../components/Loading";
import { SearchBar } from "../components/SearchBar";
import { addToFavorites } from "../api-client/favorite";
import { addToShortcuts } from "../api-client/shortcut";

export const WikiViewer = () => {
  const location = useLocation();
  const documentId = location.state?.id;
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { title } = useParams();

  const handleAddFavorite = async () => {
    try {
      await addToFavorites(parseInt(documentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddShortcuts = async () => {
    try {
      await addToShortcuts(parseInt(documentId));
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="result-page--container">
          <SearchBar />
        </div>
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
                  <button className="menu-button" onClick={handleAddShortcuts}>
                    <Route className="menu-item" />
                  </button>
                  <button className="menu-button" onClick={handleAddFavorite}>
                    <Star className="menu-item" />
                  </button>
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
