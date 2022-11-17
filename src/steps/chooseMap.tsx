import { Fragment, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Radiogroup from "../components/radiogroup";
import Section from "../components/section";
import { enableMapLandmark, mapFixedSuits, toggleMap } from "../features/componentsSlice";
import { selectMapArray, selectSetupParameters } from "../features/selectors";
import { balanceMapSuits } from "../features/setupSlice";
import { selectEnabled } from "../features/utils";
import { useAppDispatch, useAppSelector } from "../hooks";

const ChooseMapStep: React.FC = () => {
  const mapArray = useAppSelector(selectMapArray);
  const { balancedSuits } = useAppSelector(selectSetupParameters);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const sortedMaps = useMemo(
    () =>
      selectEnabled(mapArray)
        .map(({ code, fixedSuits, useLandmark }) => ({
          code,
          label: t("map." + code + ".name"),
          fixedSuits,
          useLandmark,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, i18n.language)),
    [mapArray, t, i18n.language]
  );

  return (
    <Section titleKey="setupStep.chooseMap.title" textKey="setupStep.chooseMap.body">
      <ComponentToggle
        selector={selectMapArray}
        toggleComponent={toggleMap}
        getLabelKey={(map) => "map." + map.code + ".name"}
      />
      <Radiogroup
        id="balancedSuits"
        defaultValue={balancedSuits}
        onChange={(value) => dispatch(balanceMapSuits(value))}
      />
      {sortedMaps.map(({ code, fixedSuits, useLandmark }) => (
        <Fragment key={code}>
          {fixedSuits != null ? (
            <Checkbox
              id={code + "FixedSuits"}
              labelKey={"map." + code + ".fixedSuits"}
              defaultValue={fixedSuits}
              onChange={(checked) => dispatch(mapFixedSuits(code, checked))}
            />
          ) : null}
          {useLandmark != null ? (
            <Checkbox
              id={code + "UseLandmark"}
              labelKey={"map." + code + ".useLandmark"}
              defaultValue={useLandmark}
              onChange={(checked) => dispatch(enableMapLandmark(code, checked))}
            />
          ) : null}
        </Fragment>
      ))}
    </Section>
  );
};

export default memo(ChooseMapStep);
