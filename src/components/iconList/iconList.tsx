import { ClearingSuit, Item } from "../../types";
import Icon from "../icon";

interface ItemListProps {
  list: (Item | ClearingSuit)[];
  children?: React.ReactNode;
}

export const IconList: React.FC<ItemListProps> = ({ list, children }) => (
  <>
    {list.map((item, index) => (
      <Icon key={index} icon={item}>
        {index < list.length - 1 ? children : null}
      </Icon>
    ))}
  </>
);

IconList.defaultProps = {
  children: ", ",
};
