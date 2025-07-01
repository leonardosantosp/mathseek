import { useState } from "react";
import { useUser } from "../context/UserContex";
import { OptionCardGrid } from "./OptionCardGrid";
import { updateGeneralSettings } from "../api-client/general-settings";

type CustomizeCardProps = {
  apply: () => void;
};

export const CustomizeCard = ({ apply }: CustomizeCardProps) => {
  const { setThemeColor, setBackground, themeColor, background } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(themeColor);
  const [selectedBackground, setSelectedBackground] = useState(background);

  const handleApply = async () => {
    setThemeColor(selectedTheme);
    setBackground(selectedBackground);
    await updateGeneralSettings({
      themeColor,
      backgroundImage: background
    });
    apply();
  };

  return (
    <div className="customize-card">
      <div className="customize-card__header">
        <h1>Personalization</h1>
      </div>

      <div className="customize-card__wrapper">
        <div className="customize-card__title">
          <h4>Color Themes</h4>
        </div>
        <OptionCardGrid
          type="font"
          selected={selectedTheme}
          onSelect={setSelectedTheme}
        />
      </div>
      <div className="customize-card__wrapper">
        <div className="customize-card__title">
          <h4>Background</h4>
        </div>
        <OptionCardGrid
          type="background"
          selected={selectedBackground}
          onSelect={setSelectedBackground}
        />
      </div>
      <div className="customize-button__container">
        <button style={{ backgroundColor: themeColor }} onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};
