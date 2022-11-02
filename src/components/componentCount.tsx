import { useTranslation } from "react-i18next";
import { memo, useContext } from "react";
import { factionSelectContext } from "./factionSelect";

const imageSource: Record<string, "image" | "buildingImage" | "tokenImage"> = {
  warriors: "image",
  buildings: "buildingImage",
  tokens: "tokenImage",
};

interface ComponentCountProps {
  component: "warriors" | "buildings" | "tokens";
}

const ComponentCount: React.FC<ComponentCountProps> = ({ component }) => {
  const { selectedFaction } = useContext(factionSelectContext);
  const { t } = useTranslation();

  const componentCount = selectedFaction != null ? selectedFaction[component] : 0;

  if (componentCount > 0) {
    // We know currentFactionIndex is not null because if it was componentCount defaults to 0
    const componentImage = selectedFaction![imageSource[component]];
    return (
      <div className="count">
        <img
          src={componentImage}
          alt="" // Image is just decoration, so hide from screen readers
          aria-hidden="true"
        />{" "}
        &#215;
        {t("component." + component, {
          count: componentCount,
        })}
      </div>
    );
  }
  return null;
};

export default memo(ComponentCount);
