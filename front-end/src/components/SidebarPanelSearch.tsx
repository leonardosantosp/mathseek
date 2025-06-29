import type { ComponentType, SVGProps } from "react";

import {
  Folders,
  History,
  Pencil,
  RouteIcon,
  Star,
  XCircle
} from "lucide-react";

type SidebarPanelSearchProps = {
  onClick?: () => void;
  mode: "History" | "Favorites" | "Shortcuts" | "Edit" | "Folders" | "Menu";
  setMode: (
    item: "History" | "Favorites" | "Shortcuts" | "Edit" | "Folders" | "Menu"
  ) => void;
};

type LucideIconProps = SVGProps<SVGSVGElement>;

export const SidebarPanelSearch = ({
  onClick,
  mode,
  setMode
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
          <div className="side-bar__panel-card--menu-item">
            <p>Artificial Inteligence</p>
            <XCircle onClick={() => {}} className="remove-icon" size={18} />
          </div>
          <div className="side-bar__panel-card--menu-item">
            <p>Quadratic Equation</p>
            <XCircle onClick={() => {}} className="remove-icon" size={18} />
          </div>
        </div>
      ) : mode == "Favorites" ? (
        <></>
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
