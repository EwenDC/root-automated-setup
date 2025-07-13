import { useTranslation } from 'react-i18next'

import rootLogo from '../images/logo.png'

const Header: React.FC = () => {
  const { t } = useTranslation()
  return (
    <header>
      <img
        src={rootLogo}
        alt={t('label.logoAlt')}
      />
      <h1>{t('label.logoText')}</h1>
    </header>
  )
}

export default Header
