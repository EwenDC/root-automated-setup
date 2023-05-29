import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Radiogroup from "../components/radiogroup";
import Section from "../components/section";
import { enableMapLandmark, mapFixedSuits, toggleMap } from "../features/componentsSlice";
import { selectMapArray } from "../features/selectors";
import { balanceMapSuits } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CodeObject } from "../types";

const getMapLabelKey = (map: CodeObject) => `map.${map.code}.name`;

const ChooseMapStep: React.FC = () => {
  const mapArray = useAppSelector(selectMapArray);
  const balancedSuits = useAppSelector((state) => state.setup.balancedSuits);
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
          label: t(`map.${code}.name`),
          fixedSuits,
          useLandmark,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, i18n.resolvedLanguage)),
    [mapArray, t, i18n.resolvedLanguage]
  );
  const onBalancedSuitsChange = useCallback(
    (value: boolean) => dispatch(balanceMapSuits(value)),
    [dispatch]
  );

  return (
    <Section titleKey="setupStep.chooseMap.title" textKey="setupStep.chooseMap.body">
      <ComponentToggle
        selector={selectMapArray}
        toggleComponent={toggleMap}
        getLabelKey={getMapLabelKey}
      />
      <Radiogroup
        id="balancedSuits"
        defaultValue={balancedSuits}
        onChange={onBalancedSuitsChange}
      />
      {sortedMaps
        .filter(({ fixedSuits }) => fixedSuits != null)
        .map(({ code, fixedSuits }) => (
          <Checkbox
            key={code}
            id={`${code}FixedSuits`}
            labelKey={`map.${code}.fixedSuits`}
            defaultValue={fixedSuits}
            onChange={(checked) => dispatch(mapFixedSuits(code, checked))}
          />
        ))}
      {sortedMaps
        .filter(({ useLandmark }) => useLandmark != null)
        .map(({ code, useLandmark }) => (
          <Checkbox
            key={code}
            id={`${code}UseLandmark`}
            labelKey={`map.${code}.useLandmark`}
            defaultValue={useLandmark}
            onChange={(checked) => dispatch(enableMapLandmark(code, checked))}
          />
        ))}
    </Section>
  );
};

export default memo(ChooseMapStep);
