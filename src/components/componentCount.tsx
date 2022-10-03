import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import { selectFactionPool, selectFlowState } from "../features/selectors";

const imageSource: {
  [component: string]: "image" | "buildingImage" | "tokenImage";
} = {
  warriors: "image",
  buildings: "buildingImage",
  tokens: "tokenImage",
};

interface ComponentCountProps {
  component: "warriors" | "buildings" | "tokens";
}

export const ComponentCount: React.FC<ComponentCountProps> = ({ component }) => {
  const { currentFactionIndex } = useAppSelector(selectFlowState);
  const factionPool = useAppSelector(selectFactionPool);
  const { t } = useTranslation();

  const componentCount =
    currentFactionIndex != null ? factionPool[currentFactionIndex][component] : 0;

  if (componentCount > 0) {
    // We know currentFactionIndex is not null because if it was componentCount defaults to 0
    const componentImage = factionPool[currentFactionIndex!][imageSource[component]];
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

export default ComponentCount;
