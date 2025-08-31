import { useContext } from 'react'

import { selectedFactionContext } from '../hooks'
import LocaleText from './localeText'

interface ComponentCountProps {
  component: 'buildings' | 'tokens' | 'warriors'
}

const ComponentCount: React.FC<ComponentCountProps> = ({ component }) => {
  const selectedFaction = useContext(selectedFactionContext)

  if (selectedFaction) {
    const count =
      component === 'warriors'
        ? selectedFaction.pieces.warriors
        : (selectedFaction.pieces[component]?.count ?? 0)

    if (count > 0) {
      const image =
        component === 'warriors' ? selectedFaction.image : selectedFaction.pieces[component]?.image

      return (
        <div className="count">
          <img
            src={image}
            alt="" // Image is just decoration, so hide from screen readers
            aria-hidden="true"
          />{' '}
          &#215;
          <LocaleText
            i18nKey={`component.${component}`}
            count={count}
          />
        </div>
      )
    }
  }
  return null
}

export default ComponentCount
