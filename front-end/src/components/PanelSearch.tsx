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
            <Link to="/result">
              <div className="panel__search-mode--favorites-item">
                <img
                  src={wiki_icon}
                  alt="wikipedia icon"
                  width={20}
                  height={18}
                />
                <p>Ciência da Computação</p>
              </div>
            </Link>
            <Link to="/result">
              <div className="panel__search-mode--favorites-item">
                <img
                  src={wiki_icon}
                  alt="wikipedia icon"
                  width={20}
                  height={18}
                />
                <p>Ciência da Computação</p>
              </div>
            </Link>
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
