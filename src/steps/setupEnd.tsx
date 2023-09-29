import { memo, useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/button";
import Section from "../components/section";
import { stepActiveContext } from "../components/stepList";
import { resetFlow } from "../features/flowSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import RestartIcon from "../images/icons/restart.svg?react";

const SetupEndStep: React.FC = () => {
  const playerOrder = useAppSelector((state) => state.setup.playerOrder);
  const dispatch = useAppDispatch();
  const stepActive = useContext(stepActiveContext);
  const { t } = useTranslation();

  const translationOptions = useMemo(() => ({ count: playerOrder[0] }), [playerOrder]);
  const onRestartClick = useCallback(() => dispatch(resetFlow()), [dispatch]);

  return (
    <Section
      titleKey="setupStep.setupEnd.title"
      textKey="setupStep.setupEnd.body"
      translationOptions={translationOptions}
    >
      {stepActive ? (
        <Button Icon={RestartIcon} iconLeft={true} onClick={onRestartClick}>
          {t("label.restartSetup")}
        </Button>
      ) : null}
    </Section>
  );
};

export default memo(SetupEndStep);
