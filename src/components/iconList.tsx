import { PropsWithChildren } from "react";
import { ClearingSuit, Item } from "../types";
import Icon from "./icon";

interface ItemListProps extends PropsWithChildren {
  list: (Item | ClearingSuit)[];
}

export const IconList: React.FC<ItemListProps> = ({ list, children = ", " }) => (
  <>
    {list.map((item, index) => (
      <Icon key={index} icon={item}>
        {index < list.length - 1 ? children : null}
      </Icon>
    ))}
  </>
);

export default IconList;
