import { useTranslation } from "react-i18next";
import { ClearingSuit, Item } from "../types";

import foxIcon from "../images/suits/fox.png";
import mouseIcon from "../images/suits/mouse.png";
import rabbitIcon from "../images/suits/rabbit.png";

import bagImage from "../images/items/bag.png";
import bootImage from "../images/items/boot.png";
import coinImage from "../images/items/coin.png";
import crossbowImage from "../images/items/crossbow.png";
import hammerImage from "../images/items/hammer.png";
import swordImage from "../images/items/sword.png";
import teaImage from "../images/items/tea.png";
import torchImage from "../images/items/torch.png";

const iconDict: Record<Item | ClearingSuit, { key: string; image: string }> = {
  fox: {
    key: "label.fox",
    image: foxIcon,
  },
  mouse: {
    key: "label.mouse",
    image: mouseIcon,
  },
  rabbit: {
    key: "label.rabbit",
    image: rabbitIcon,
  },
  bag: {
    key: "component.bag",
    image: bagImage,
  },
  boot: {
    key: "component.boot",
    image: bootImage,
  },
  coin: {
    key: "component.coin",
    image: coinImage,
  },
  crossbow: {
    key: "component.crossbow",
    image: crossbowImage,
  },
  hammer: {
    key: "component.hammer",
    image: hammerImage,
  },
  sword: {
    key: "component.sword",
    image: swordImage,
  },
  tea: {
    key: "component.tea",
    image: teaImage,
  },
  torch: {
    key: "component.torch",
    image: torchImage,
  },
};

interface ItemProps {
  icon: Item | ClearingSuit;
  children?: React.ReactNode;
}

export const Icon: React.FC<ItemProps> = ({ icon, children }) => {
  const { t } = useTranslation();
  const iconAlt = t(iconDict[icon]?.key);
  return (
    <>
      <img className="icon" src={iconDict[icon]?.image} alt={iconAlt} title={iconAlt} />
      {children}
    </>
  );
};

export default Icon;
