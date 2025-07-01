type SelectableCardProps = {
  color: string;
  name: string;
  background?: string;
  font?: string;
  value: string;
  selected?: boolean;
  onSelect: (value: string) => void;
};

export const SelectableCard = ({
  color,
  name,
  background,
  font,
  onSelect,
  selected,
  value
}: SelectableCardProps) => {
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div className="selectable-card__container">
      <div
        className="selectable-card-border"
        style={{ backgroundColor: color }}
      >
        <div
          className="selectable-card"
          style={{
            backgroundImage: `url(src/public/assets/card-backgrounds/${background})`
          }}
        >
          <div className="selectable-card__header">
            <p style={{ color: color }}>𝜋</p>
          </div>
          {font && <p style={{ fontFamily: font }}>Mathseek</p>}
        </div>
      </div>

      <div className="selectable-card__input">
        <input
          type="radio"
          id={value}
          value={value}
          checked={selected}
          onChange={() => onSelect(value)}
          name={background ? "custom-background" : "custom-theme"}
          className="radio-input-card"
          style={
            {
              "--radio-border-color": color,
              "--radio-checked-color": color,
              "--radio-shadow-color": `rgba(${hexToRgb(color)}, 0.2)`,
              "--radio-focus-color": `rgba(${hexToRgb(color)}, 0.4)`
            } as React.CSSProperties
          }
        />
        <label htmlFor={value}>{name}</label>
      </div>
    </div>
  );
};
