import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './LanguageSwitcher';

import styles from './Header.module.css';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            className={styles.logo}
            src="/merochef-logo.png"
            alt={t('header.appName')}
            width={44}
            height={44}
          />
          <div>
            <p className={styles.appName}>{t('header.appName')}</p>
            <p className={styles.subtitle}>{t('header.subtitle')}</p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
