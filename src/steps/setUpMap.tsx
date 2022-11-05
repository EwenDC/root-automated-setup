import { memo } from "react";
import Section from "../components/section";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";

const SetUpMapStep: React.FC = () => {
  const { map } = useAppSelector(selectSetupParameters);
  return <Section subtitleKey={"map." + map + ".setupTitle"} textKey={"map." + map + ".setup"} />;
};

export default memo(SetUpMapStep);
