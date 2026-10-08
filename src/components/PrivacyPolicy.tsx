import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CONTACT_EMAIL,
  SECTION_ORDER,
  THIRD_PARTY_LINKS,
  type SectionId,
} from '../config/site';

import styles from './PrivacyPolicy.module.css';

type Subsection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  /** Steps to follow, in order; otherwise the list is bullets. */
  ordered?: boolean;
};

type SectionContent = {
  title: string;
  paragraphs: string[];
  subsections?: Subsection[];
  list?: string[];
};

function interpolate(text: string): string {
  return text.replace(/\{\{email\}\}/g, CONTACT_EMAIL);
}

function renderParagraph(text: string, key: string) {
  const content = interpolate(text);
  const emailIndex = content.indexOf(CONTACT_EMAIL);

  if (emailIndex === -1) {
    return <p key={key}>{content}</p>;
  }

  const before = content.slice(0, emailIndex);
  const after = content.slice(emailIndex + CONTACT_EMAIL.length);

  return (
    <p key={key}>
      {before}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      {after}
    </p>
  );
}

export function PrivacyPolicy() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('meta.pageTitle');
    // Screen readers and search engines read the page's language from here.
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language]);

  // The sections are drawn after the page loads, so the browser cannot scroll to a link such as /#accountDeletion by itself.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{t('meta.title')}</h1>

      {SECTION_ORDER.map((sectionId: SectionId) => {
        const baseKey = `sections.${sectionId}`;
        const section = t(baseKey, { returnObjects: true }) as SectionContent;

        return (
          <section key={sectionId} id={sectionId} className={styles.section}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph, index) =>
              renderParagraph(paragraph, `${sectionId}-p-${index}`),
            )}

            {section.subsections?.map((subsection, index) => (
              <div key={`${sectionId}-sub-${index}`} className={styles.subsection}>
                <h3>{subsection.title}</h3>
                {subsection.paragraphs.map((paragraph, pIndex) =>
                  renderParagraph(
                    paragraph,
                    `${sectionId}-sub-${index}-p-${pIndex}`,
                  ),
                )}
                {subsection.list &&
                  (subsection.ordered ? (
                    <ol>
                      {subsection.list.map((item, itemIndex) => (
                        <li key={`${sectionId}-sub-${index}-li-${itemIndex}`}>
                          {interpolate(item)}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {subsection.list.map((item, itemIndex) => (
                        <li key={`${sectionId}-sub-${index}-li-${itemIndex}`}>
                          {interpolate(item)}
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            ))}

            {section.list && (
              <ul>
                {section.list.map((item, index) => (
                  <li key={`${sectionId}-li-${index}`}>{item}</li>
                ))}
              </ul>
            )}

            {sectionId === 'serviceProviders' && (
              <div className={styles.linksBlock}>
                <h3>{t('links.heading')}</h3>
                <ul className={styles.linksList}>
                  {THIRD_PARTY_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t(`links.${link.id}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </article>
  );
}
