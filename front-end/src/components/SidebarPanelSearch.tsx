import type { ComponentType, SVGProps } from "react";

import {
  Folders,
  History,
  Pencil,
  RouteIcon,
  Star,
  XCircle
} from "lucide-react";
import type { Result } from "../api-client/elastic";

type SidebarPanelSearchProps = {
  mode: "History" | "Favorites" | "Shortcuts" | "Edit" | "Folders" | "Menu";
  setMode: (
    item: "History" | "Favorites" | "Shortcuts" | "Edit" | "Folders" | "Menu"
  ) => void;
  favorites: Result[];
  removeFromFavorites: (documentId: number) => void;
};

export const SidebarPanelSearch = ({
  mode,
  favorites,
  setMode,
  removeFromFavorites
}: SidebarPanelSearchProps) => {
  return (
    <>
      {mode === "Menu" ? (
        <div className="search__side-bar--menu">
          <div
            className="side-bar--menu-item"
            onClick={() => setMode("History")}
          >
            <History />
            <p>History</p>
          </div>
          <div
            className="side-bar--menu-item"
            onClick={() => setMode("Favorites")}
          >
            <Star />
            <p>Favorites</p>
          </div>
          <div
            className="side-bar--menu-item"
            onClick={() => setMode("Shortcuts")}
          >
            <RouteIcon />
            <p>Shortcuts</p>
          </div>
          <div className="side-bar--menu-item" onClick={() => setMode("Edit")}>
            <Pencil />
            <p>Edit</p>
          </div>
          <div
            className="side-bar--menu-item"
            onClick={() => setMode("Folders")}
          >
            <Folders />
            <p>Folders</p>
          </div>
        </div>
      ) : mode === "History" ? (
        <div className="side-bar__panel-card--menu">
          <div className="side-bar__panel-card--menu-item">
            <p>Machine Learning</p>
            <XCircle onClick={() => {}} className="remove-icon" size={18} />
          </div>
        </div>
      ) : mode == "Favorites" ? (
        <>
          {favorites.map(item => (
            <div className="side-bar__panel-card--menu-item">
              <p>{item.title}</p>
              <XCircle
                onClick={() => removeFromFavorites(item._id)}
                className="remove-icon"
                size={18}
              />
            </div>
          ))}
        </>
      ) : mode === "Shortcuts" ? (
        <></>
      ) : mode === "Edit" ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
};
