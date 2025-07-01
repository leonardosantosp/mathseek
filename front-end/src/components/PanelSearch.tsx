import { Link } from "react-router-dom";
import { WeatherInfo } from "./WeatherInfo";
import wiki_icon from "../public/assets/wiki_icon.png";
import { EllipsisVertical, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import type { Result } from "../api-client/elastic";
import { getFavorites, removeFromFavorites } from "../api-client/favorite";
import type { User } from "../api-client/auth";
import { getUser } from "../api-client/user";
import { SidebarPanelSearch } from "./SidebarPanelSearch";
import { getShortcuts, removeFromShortcuts } from "../api-client/shortcut";

type PanelSearchProps = {
  sidebarSearchMode: boolean;
  setSidebarSearchMode: (mode: boolean) => void;
  formatDateTime: (type: string) => string;
  setViewSidebar: (view: boolean) => void;
};

export const PanelSearch = ({
  sidebarSearchMode,
  setSidebarSearchMode,
  formatDateTime,
  setViewSidebar
}: PanelSearchProps) => {
  const [favorites, setFavorites] = useState<Result[]>([]);
  const [shortcuts, setShortcuts] = useState<Result[]>([]);
  const [user, setUser] = useState<User>();
  const [mode, setMode] = useState<
    "History" | "Favorites" | "Shortcuts" | "Edit" | "Folders" | "Menu"
  >("Menu");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Pegando usuário
        const userData = await getUser();
        setUser(userData);

        if (userData?.config?.favorite?.length) {
          const favoritesResponse = await getFavorites(
            userData.config.favorite
          );
          setFavorites(favoritesResponse || []);
        } else {
          setFavorites([]);
        }

        if (userData?.config?.quickAccess?.length) {
          const shortcutsResponse = await getShortcuts(
            userData.config.quickAccess
          );
          setShortcuts(shortcutsResponse || []);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorite = async (documentId: number) => {
    const id = documentId.toString();
    try {
      await removeFromFavorites(id);
      setFavorites(prevFavorites =>
        prevFavorites.filter(item => item._id !== documentId)
      );
      if (user) {
        setUser({
          ...user,
          config: {
            ...user.config,
            favorite: user.config.favorite.filter(fav => fav !== parseInt(id))
          }
        });
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };
  const handleRemoveFromShortcuts = async (documentId: number) => {
    const id = documentId.toString();
    try {
      await removeFromShortcuts(id);
      setShortcuts(prevShortcuts =>
        prevShortcuts.filter(item => item._id !== documentId)
      );
      if (user) {
        setUser({
          ...user,
          config: {
            ...user.config,
            quickAccess: user.config.quickAccess.filter(
              short => short !== parseInt(id)
            )
          }
        });
      }
    } catch (error) {
      console.error("Failed to remove shortcuts:", error);
    }
  };

  return (
    <>
      <div className="panel__search-mode">
        <div className={`${sidebarSearchMode && "sidebar-search-mode"}`}>
          <div className="search__side-bar">
            <div className="search__side-bar--header">
              <h3>{mode}</h3>
              <X
                className="close-icon"
                onClick={() => {
                  setSidebarSearchMode(false);
                  setMode("Menu");
                }}
                cursor={"pointer"}
              />
            </div>
            <SidebarPanelSearch
              mode={mode}
              setMode={(
                item:
                  | "History"
                  | "Favorites"
                  | "Shortcuts"
                  | "Edit"
                  | "Folders"
                  | "Menu"
              ) => setMode(item)}
              favorites={favorites}
              shortcuts={shortcuts}
              removeFromFavorites={handleRemoveFromFavorite}
              removeFromShortcuts={handleRemoveFromShortcuts}
            />
          </div>
        </div>
        <div className="panel__search-mode--header">
          <div className="panel__search-mode--favorites">
            <>
              {favorites.slice(0, 6).map(item => (
                <div className="panel__search-mode--favorites-item">
                  <Link to={`/wiki/${item.title}`}>
                    <div className="favorites-item__title">
                      <img
                        src={wiki_icon}
                        alt="wikipedia icon"
                        width={20}
                        height={18}
                      />
                      {item.title.length <= 20 ? (
                        <p>{item.title}</p>
                      ) : (
                        <p>{item.title.substring(0, 20) + "..."}</p>
                      )}
                    </div>
                  </Link>
                  <X
                    size={15}
                    className="remove-favorites"
                    onClick={() => handleRemoveFromFavorite(item._id)}
                  />
                </div>
              ))}
              <p
                className="shor-more"
                onClick={() => {
                  setMode("Favorites");
                  setSidebarSearchMode(true);
                }}
              >
                {favorites.length > 6 && <p>ver mais</p>}
              </p>
            </>
          </div>
          <EllipsisVertical
            className="panel__search-mode--header-more-icon"
            onClick={() => {
              setSidebarSearchMode(true);
              setViewSidebar(false);
            }}
          />
        </div>

        <div className="panel__clock--weather--info">
          <p className="panel__clock">{formatDateTime("hour")}</p>
          <WeatherInfo />
        </div>

        <SearchBar />

        <div className="panel__shortcuts">
          {shortcuts.slice(0, 6).map(item => (
            <div className="panel__shortcuts--card">
              <div className="shortcuts__card--header">
                <X
                  size={15}
                  className="remove-favorites"
                  onClick={() => handleRemoveFromShortcuts(item._id)}
                />
              </div>
              <Link to={`/wiki/${item.title}`}>
                <img
                  src={wiki_icon}
                  alt="Article Image"
                  width={40}
                  height={37}
                />
                <p>{item.title.substring(0, 7) + "..."}</p>
              </Link>
            </div>
          ))}
          <p
            className="shor-more"
            onClick={() => {
              setMode("Shortcuts");
              setSidebarSearchMode(true);
            }}
          >
            {shortcuts.length > 6 && <p>ver mais</p>}
          </p>
        </div>
      </div>
    </>
  );
};
