import Icon from "../icon";

interface ItemListProps {
  list: string[];
  children?: React.ReactNode;
}

export const IconList: React.FC<ItemListProps> = ({ list, children }) => (
  <>
    {list.map((item, index) => (
      <Icon key={index} icon={item}>
        {index < list.length - 1 ? children : undefined}
      </Icon>
    ))}
  </>
);

IconList.defaultProps = {
  children: ", ",
};
