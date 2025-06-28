import { X, ImagePlus, MonitorCog, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type MenuSidebarProps = {
  viewSidebar: boolean;
  setViewSidebar: (type: boolean) => void;
  setPanel: (item: "Personalization" | "standard") => void;
};

export const MenuSidebar = ({
  viewSidebar,
  setViewSidebar,
  setPanel
}: MenuSidebarProps) => {
  const [configs, setConfigs] = useState(true);

  return (
    <div className={`${viewSidebar && "sidebar-blur__active"}`}>
      <div className="panel__side-bar">
        <div className="panel__side-bar--header">
          <X
            className="close-icon"
            onClick={() => {
              setViewSidebar(false);
              setConfigs(true);
              setPanel("standard");
            }}
            cursor={"pointer"}
          />
        </div>
        <div className="side-bar__menu">
          <div className="side-bar__menu--items">
            <div
              className="menu--items-container"
              onClick={() => {
                setViewSidebar(false);
                setPanel("Personalization");
              }}
            >
              <ImagePlus />
              Customize
            </div>
          </div>
          <div className="side-bar__menu--items">
            <div
              className="menu--items-container"
              onClick={() => setConfigs(!configs)}
            >
              <MonitorCog />
              Advanced Configs
              {configs ? <ChevronDown /> : <ChevronUp />}
            </div>
          </div>
          <div className="config-menu" style={{ opacity: configs ? 0 : 1 }}>
            <h3>Results location:</h3>
            <div className="config-menu__input-wraper">
              <input
                type="radio"
                id="inline-cards"
                value="inline"
                name="results-location"
                className="radio-input"
              />
              <label htmlFor="inline-cards">Inline cards</label>
            </div>
            <div className="config-menu__input-wraper">
              <input
                type="radio"
                id="results-page"
                value="page"
                name="results-location"
                className="radio-input"
              />
              <label htmlFor="results-page">Dedicated results page</label>
            </div>
            <button className="config-menu__save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
