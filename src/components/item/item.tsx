import { useTranslation } from "react-i18next";
import styles from "./item.module.css";

interface ItemProps {
  item: string;
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const itemName = t("component." + item);
  return (
    <img
      className={styles.item}
      src={process.env.PUBLIC_URL + "/images/items/" + item + ".png"}
      alt={itemName}
      title={itemName}
    />
  );
};
