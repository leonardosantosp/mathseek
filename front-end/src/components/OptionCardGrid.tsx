import { SelectableCard } from "./SelectableCard";

type OptionCardGridProps = {
  type: "theme" | "background" | "font";
  color: string;
};

export const OptionCardGrid = ({ type, color }: OptionCardGridProps) => {
  return (
    <div className="card-grid-wrapper">
      <div
        className="card-grid"
        style={
          {
            "--scrollbar-color": color // Define a variável CSS
          } as React.CSSProperties
        }
      >
        {type === "font" ? (
          <>
            <SelectableCard color="#00bfff" name="Sub zero" />
            <SelectableCard color="#00FFD1" name="Vaporwave" />
            <SelectableCard color="#FF007F" name="Rose Quartz" />
            <SelectableCard color="#AFFF00" name="Cyber Lime" />
            <SelectableCard color="#FF3C38" name="Crimson Edge" />
            <SelectableCard color="#9D4EDD" name="Purple Haze" />
          </>
        ) : type === "background" ? (
          <>
            <SelectableCard
              color="#00bfff"
              name="Code of Creation"
              background="CodeOfCreation.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Crimson Echo"
              background="CrimsonEcho.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Crimson Shards"
              background="CrimsonShards.svg"
            />

            <SelectableCard
              color="#00bfff"
              name="Cyber Veins"
              background="CyberVeins.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Dark Wave"
              background="DarkWave.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Infernal Pulse"
              background="InfernalPulse.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="MidnightX"
              background="MidnightX.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Neon Vortex"
              background="NeonVortex.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Blue Rift"
              background="BlueRift.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Neural Fold"
              background="NeuralFold.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Obsidian Blaze"
              background="ObsidianBlaze.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Obsidian Pulse"
              background="ObsidianPulse.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Scarlet Veins"
              background="ScarletVeins.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Shadow Stream"
              background="ShadowStream.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Silent Circuit"
              background="SilentCircuit.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Singularity"
              background="Singularity.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="Void Summit"
              background="VoidSummit.svg"
            />
            <SelectableCard
              color="#00bfff"
              name="White Eclipse"
              background="WhiteEclipse.svg"
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
