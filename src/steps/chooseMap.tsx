import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Radiogroup from "../components/radiogroup";
import Section from "../components/section";
import { enableMapLandmark, mapFixedSuits, toggleMap } from "../features/componentsSlice";
import { selectMapArray, selectSetupParameters } from "../features/selectors";
import { balanceMapSuits } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const ChooseMapStep: React.FC = () => {
  const mapArray = useAppSelector(selectMapArray);
  const { balancedSuits } = useAppSelector(selectSetupParameters);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const sortedMaps = useMemo(
    () =>
      mapArray
        .filter(
          ({ enabled, fixedSuits, useLandmark }) =>
            enabled && (fixedSuits != null || useLandmark != null)
        )
        .map(({ code, fixedSuits, useLandmark }) => ({
          code,
          label: t("map." + code + ".name"),
          fixedSuits,
          useLandmark,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, i18n.resolvedLanguage)),
    [mapArray, t, i18n.resolvedLanguage]
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
      {sortedMaps
        .filter(({ fixedSuits }) => fixedSuits != null)
        .map(({ code, fixedSuits }) => (
          <Checkbox
            key={code}
            id={code + "FixedSuits"}
            labelKey={"map." + code + ".fixedSuits"}
            defaultValue={fixedSuits}
            onChange={(checked) => dispatch(mapFixedSuits(code, checked))}
          />
        ))}
      {sortedMaps
        .filter(({ useLandmark }) => useLandmark != null)
        .map(({ code, useLandmark }) => (
          <Checkbox
            key={code}
            id={code + "UseLandmark"}
            labelKey={"map." + code + ".useLandmark"}
            defaultValue={useLandmark}
            onChange={(checked) => dispatch(enableMapLandmark(code, checked))}
          />
        ))}
    </Section>
  );
};

export default memo(ChooseMapStep);
