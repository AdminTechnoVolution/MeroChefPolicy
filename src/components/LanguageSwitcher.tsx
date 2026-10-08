import { useTranslation } from 'react-i18next';

import {
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../i18n';

import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.language.split('-')[0] as LanguageCode;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as LanguageCode;
    void i18n.changeLanguage(next);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // ignore storage failures
    }
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{t('language.label')}</span>
      <select
        className={styles.select}
        value={current}
        onChange={handleChange}
        aria-label={t('language.label')}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}
