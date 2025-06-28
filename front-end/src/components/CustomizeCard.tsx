import { OptionCardGrid } from "./OptionCardGrid";

type CustomizeCardProps = {
  color: string;
  apply: () => void;
};

export const CustomizeCard = ({ color, apply }: CustomizeCardProps) => {
  return (
    <div className="customize-card">
      <div className="customize-card__header">
        <h1>Personalization</h1>
      </div>

      <div className="customize-card__wrapper">
        <div className="customize-card__title">
          <h4>Color Themes</h4>
        </div>
        <OptionCardGrid type="font" color="#00bfff" />
      </div>
      <div className="customize-card__wrapper">
        <div className="customize-card__title">
          <h4>Background</h4>
        </div>
        <OptionCardGrid type="background" color="#00bfff" />
      </div>
      <div className="customize-button__container">
        <button style={{ backgroundColor: color }} onClick={apply}>
          Apply
        </button>
      </div>
    </div>
  );
};
