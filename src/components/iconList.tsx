import { memo, PropsWithChildren } from "react";
import { ClearingSuit, Item } from "../types";
import Icon from "./icon";

type ItemListProps = PropsWithChildren<{
  list: (Item | ClearingSuit)[];
}>;

const IconList: React.FC<ItemListProps> = ({ list, children = ", " }) => (
  <>
    {list.map((item, index) => (
      <Icon key={index} icon={item}>
        {index < list.length - 1 ? children : null}
      </Icon>
    ))}
  </>
);

export default memo(IconList);
