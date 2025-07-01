import { useUser } from "../context/UserContex";
import { SelectableCard } from "./SelectableCard";

type OptionCardGridProps = {
  type: "theme" | "background" | "font";
  selected: string;
  onSelect: (value: string) => void;
};

export const OptionCardGrid = ({
  type,
  selected,
  onSelect
}: OptionCardGridProps) => {
  const handleCardSelect = (value: string) => {
    onSelect(value);
  };

  const { themeColor } = useUser();

  return (
    <div className="card-grid-wrapper">
      <div
        className="card-grid"
        style={
          {
            "--scrollbar-color": type === "font" ? selected : themeColor
          } as React.CSSProperties
        }
      >
        {type === "font" ? (
          <>
            <SelectableCard
              color="#41469a"
              name="Standard"
              selected={selected === "#41469a"}
              onSelect={handleCardSelect}
              value="#41469a"
            />
            <SelectableCard
              color="#00bfff"
              name="Sub zero"
              selected={selected === "#00bfff"}
              onSelect={handleCardSelect}
              value="#00bfff"
            />
            <SelectableCard
              color="#00FFD1"
              name="Vaporwave"
              selected={selected === "#00FFD1"}
              onSelect={handleCardSelect}
              value="#00FFD1"
            />
            <SelectableCard
              color="#FF007F"
              name="Rose Quartz"
              selected={selected === "#FF007F"}
              onSelect={handleCardSelect}
              value="#FF007F"
            />
            <SelectableCard
              color="#AFFF00"
              name="Cyber Lime"
              selected={selected === "#AFFF00"}
              onSelect={handleCardSelect}
              value="#AFFF00"
            />
            <SelectableCard
              color="#FF3C38"
              name="Crimson Edge"
              selected={selected === "#FF3C38"}
              onSelect={handleCardSelect}
              value="#FF3C38"
            />
            <SelectableCard
              color="#9D4EDD"
              name="Purple Haze"
              selected={selected === "#9D4EDD"}
              onSelect={handleCardSelect}
              value="#9D4EDD"
            />
          </>
        ) : type === "background" ? (
          <>
            <SelectableCard
              color={themeColor}
              name="None"
              background="none"
              selected={selected === "none"}
              onSelect={handleCardSelect}
              value="none"
            />
            <SelectableCard
              color={themeColor}
              name="Code of Creation"
              background="CodeOfCreation.svg"
              selected={selected === "CodeOfCreation.svg"}
              onSelect={handleCardSelect}
              value="CodeOfCreation.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Crimson Echo"
              background="CrimsonEcho.svg"
              selected={selected === "CrimsonEcho.svg"}
              onSelect={handleCardSelect}
              value="CrimsonEcho.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Crimson Shards"
              background="CrimsonShards.svg"
              selected={selected === "CrimsonShards.svg"}
              onSelect={handleCardSelect}
              value="CrimsonShards.svg"
            />

            <SelectableCard
              color={themeColor}
              name="Cyber Veins"
              background="CyberVeins.svg"
              selected={selected === "CyberVeins.svg"}
              onSelect={handleCardSelect}
              value="CyberVeins.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Dark Wave"
              background="DarkWave.svg"
              selected={selected === "DarkWave.svg"}
              onSelect={handleCardSelect}
              value="DarkWave.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Infernal Pulse"
              background="InfernalPulse.svg"
              selected={selected === "InfernalPulse.svg"}
              onSelect={handleCardSelect}
              value="InfernalPulse.svg"
            />
            <SelectableCard
              color={themeColor}
              name="MidnightX"
              background="MidnightX.svg"
              selected={selected === "MidnightX.svg"}
              onSelect={handleCardSelect}
              value="MidnightX.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Neon Vortex"
              background="NeonVortex.svg"
              selected={selected === "NeonVortex.svg"}
              onSelect={handleCardSelect}
              value="NeonVortex.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Blue Rift"
              background="BlueRift.svg"
              selected={selected === "BlueRift.svg"}
              onSelect={handleCardSelect}
              value="BlueRift.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Neural Fold"
              background="NeuralFold.svg"
              selected={selected === "NeuralFold.svg"}
              onSelect={handleCardSelect}
              value="NeuralFold.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Obsidian Blaze"
              background="ObsidianBlaze.svg"
              selected={selected === "ObsidianBlaze.svg"}
              onSelect={handleCardSelect}
              value="ObsidianBlaze.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Obsidian Pulse"
              background="ObsidianPulse.svg"
              selected={selected === "ObsidianPulse.svg"}
              onSelect={handleCardSelect}
              value="ObsidianPulse.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Scarlet Veins"
              background="ScarletVeins.svg"
              selected={selected === "ScarletVeins.svg"}
              onSelect={handleCardSelect}
              value="ScarletVeins.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Shadow Stream"
              background="ShadowStream.svg"
              selected={selected === "ShadowStream.svg"}
              onSelect={handleCardSelect}
              value="ShadowStream.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Silent Circuit"
              background="SilentCircuit.svg"
              selected={selected === "SilentCircuit.svg"}
              onSelect={handleCardSelect}
              value="SilentCircuit.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Singularity"
              background="Singularity.svg"
              selected={selected === "Singularity.svg"}
              onSelect={handleCardSelect}
              value="Singularity.svg"
            />
            <SelectableCard
              color={themeColor}
              name="Void Summit"
              background="VoidSummit.svg"
              selected={selected === "VoidSummit.svg"}
              onSelect={handleCardSelect}
              value="VoidSummit.svg"
            />
            <SelectableCard
              color={themeColor}
              name="White Eclipse"
              background="WhiteEclipse.svg"
              selected={selected === "WhiteEclipse.svg"}
              onSelect={handleCardSelect}
              value="WhiteEclipse.svg"
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
