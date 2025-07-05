import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { selectedFactionContext } from "./factionSelect";

const imageSource = {
  warriors: "image",
  buildings: "buildingImage",
  tokens: "tokenImage",
} as const;

interface ComponentCountProps {
  component: keyof typeof imageSource;
}

const ComponentCount: React.FC<ComponentCountProps> = ({ component }) => {
  const selectedFaction = useContext(selectedFactionContext);
  const { t } = useTranslation();

  if (selectedFaction && selectedFaction[component] > 0) {
    const componentImage = selectedFaction[imageSource[component]];
    return (
      <div className="count">
        <img
          src={componentImage}
          alt="" // Image is just decoration, so hide from screen readers
          aria-hidden="true"
        />{" "}
        &#215;
        {t(`component.${component}`, {
          count: selectedFaction[component],
        })}
      </div>
    );
  }
  return null;
};

export default ComponentCount;
