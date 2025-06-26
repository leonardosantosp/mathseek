import { Link } from "react-router-dom";
import { WeatherInfo } from "./WeatherInfo";
import wiki_icon from "../assets/wiki_icon.png";
import {
  EllipsisVertical,
  History,
  Star,
  RouteIcon,
  Pencil,
  Folders,
  X
} from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import type { Result } from "../api-client/elastic";
import { getFavorites } from "../api-client/favorite";
import type { User } from "../api-client/auth";
import { getUser } from "../api-client/user";

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
  const [user, setUser] = useState<User>();

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <div className="panel__search-mode">
        <div className={`${sidebarSearchMode && "sidebar-search-mode"}`}>
          <div className="search__side-bar">
            <div className="search__side-bar--header">
              <X
                className="close-icon"
                onClick={() => setSidebarSearchMode(false)}
                cursor={"pointer"}
              />
            </div>
            <div className="search__side-bar--menu">
              <div className="side-bar--menu-item">
                <History />
                <p>History</p>
              </div>
              <div className="side-bar--menu-item">
                <Star />
                <p>Favorites</p>
              </div>
              <div className="side-bar--menu-item">
                <RouteIcon />
                <p>Shortcuts</p>
              </div>
              <div className="side-bar--menu-item">
                <Pencil />
                <p>Edit</p>
              </div>
              <div className="side-bar--menu-item">
                <Folders />
                <p>Folders</p>
              </div>
            </div>
          </div>
        </div>
        <div className="panel__search-mode--header">
          <div className="panel__search-mode--favorites">
            <>
              {favorites.map(item => (
                <Link to={`/wiki/${item.title}`}>
                  <div className="panel__search-mode--favorites-item">
                    <img
                      src={wiki_icon}
                      alt="wikipedia icon"
                      width={20}
                      height={18}
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              ))}
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
          <div className="panel__shortcuts--card">
            <img src={wiki_icon} alt="Article Image" width={40} height={37} />
            <p>Mathematics in Nature</p>
          </div>
          <div className="panel__shortcuts--card">
            <img src={wiki_icon} alt="Article Image" width={40} height={37} />
            <p>Complex Numbers</p>
          </div>
          <div className="panel__shortcuts--card">
            <img src={wiki_icon} alt="Article Image" width={40} height={37} />
            <p>Complex Numbers</p>
          </div>
          <div className="panel__shortcuts--card">
            <img src={wiki_icon} alt="Article Image" width={40} height={37} />
            <p>Complex Numbers</p>
          </div>
          <div className="panel__shortcuts--card">
            <img src={wiki_icon} alt="Article Image" width={40} height={37} />
            <p>Complex Numbers</p>
          </div>
          <div className="panel__shortcuts--card">
            <img src={wiki_icon} alt="Article Image" width={40} height={37} />
            <p>Complex Numbers</p>
          </div>
        </div>
      </div>
    </>
  );
};
