import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { enableMapLandmark, toggleMap } from "../features/componentsSlice";
import { selectEnabledLandmarkMaps, selectMapArray } from "../features/selectors";
import { useAppDispatch, useAppSelector } from "../hooks";

const ChooseMapStep: React.FC = () => {
  const landmarkMaps = useAppSelector(selectEnabledLandmarkMaps);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const sortedLandmarkMaps = useMemo(() => {
    return landmarkMaps
      .map(({ code, useLandmark }) => ({
        code,
        label: t("map." + code + ".name"),
        useLandmark,
      }))
      .sort((a, b) => {
        return a.label.localeCompare(b.label, i18n.language);
      });
  }, [landmarkMaps, t, i18n.language]);

  return (
    <Section titleKey="setupStep.chooseMap.title" textKey="setupStep.chooseMap.body">
      <ComponentToggle
        selector={selectMapArray}
        toggleComponent={toggleMap}
        getLabelKey={(map) => "map." + map.code + ".name"}
      />
      {sortedLandmarkMaps.map(({ code, useLandmark }) => (
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
