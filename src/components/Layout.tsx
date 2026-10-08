import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CONTACT_EMAIL,
  EFFECTIVE_DATE,
} from '../config/site';

import { Header } from './Header';

import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

function formatEffectiveDate(locale: string): string {
  const date = new Date(`${EFFECTIVE_DATE}T00:00:00`);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const formattedDate = formatEffectiveDate(i18n.language);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>{t('footer.effectiveDate', { date: formattedDate })}</p>
        <p>
          {t('footer.contact')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </footer>
    </div>
  );
}
