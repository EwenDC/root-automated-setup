import type { PropsWithChildren } from 'react'

import type { ClearingSuit, Item } from '../types'

import Icon from './icon'

type ItemListProps = PropsWithChildren<{
  list: (ClearingSuit | Item)[]
}>

const IconList: React.FC<ItemListProps> = ({ list, children = ', ' }) => (
  <>
    {list.map((item, index) => (
      <Icon
        key={index}
        icon={item}
      >
        {index < list.length - 1 ? children : null}
      </Icon>
    ))}
  </>
)

export default IconList
