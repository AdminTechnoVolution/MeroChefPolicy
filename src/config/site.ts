export const APP_NAME = 'Mero Chef';
export const CONTACT_EMAIL = 'privacy+merochef@techno-volution.com';
export const SITE_URL = 'https://merochef.com';
export const EFFECTIVE_DATE = '2026-10-09';

export const THIRD_PARTY_LINKS = [
  {
    id: 'google',
    url: 'https://policies.google.com/privacy',
  },
  {
    id: 'googlePlay',
    url: 'https://policies.google.com/privacy',
  },
  {
    id: 'apple',
    url: 'https://www.apple.com/legal/privacy/',
  },
  {
    id: 'azure',
    url: 'https://privacy.microsoft.com/privacystatement',
  },
  {
    id: 'mongoDB',
    url: 'https://www.mongodb.com/legal/privacy-policy',
  },
  {
    id: 'redis',
    url: 'https://redis.io/legal/privacy-policy/',
  },
  {
    id: 'admob',
    url: 'https://policies.google.com/technologies/ads',
  },
  {
    id: 'openRouter',
    url: 'https://openrouter.ai/privacy',
  },
] as const;

export const SECTION_ORDER = [
  'introduction',
  'informationCollection',
  'permissions',
  'logData',
  'cookies',
  'advertising',
  'serviceProviders',
  'internationalTransfers',
  'retention',
  'privacyRights',
  'security',
  'linksToOtherSites',
  'childrensPrivacy',
  'changes',
  'accountDeletion',
  'contactUs',
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];
