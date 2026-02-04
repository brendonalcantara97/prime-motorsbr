import { TrackingEventName, TrackingPayload } from './types';

declare global {
  interface Window {
    dataLayer: Array<Record<string, string | number | undefined>>;
  }
}

const PAGE_NAME = 'prime_motors_x12_landing';
const UTM_KEY = 'prime_motors_x12_utm';
const DEFAULT_WHATSAPP_NUMBER = '5547999862050';

interface UTMContext {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const getParam = (key: string): string | undefined => {
  const value = new URLSearchParams(window.location.search).get(key);
  return value ?? undefined;
};

export const persistUtmContext = (): void => {
  const current: UTMContext = {
    utm_source: getParam('utm_source'),
    utm_medium: getParam('utm_medium'),
    utm_campaign: getParam('utm_campaign')
  };

  const hasCurrent = Object.values(current).some(Boolean);
  if (hasCurrent) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(current));
  }
};

export const getUtmContext = (): UTMContext => {
  const raw = sessionStorage.getItem(UTM_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as UTMContext;
  } catch {
    return {};
  }
};

export const initDataLayer = (): void => {
  window.dataLayer = window.dataLayer || [];
};

export const initGtm = (): void => {
  const gtmId = (import.meta.env.VITE_GTM_ID || '').trim();
  if (!gtmId) return;
  initDataLayer();

  const existing = document.querySelector(`script[data-gtm-id="${gtmId}"]`);
  if (existing) return;

  const script = document.createElement('script');
  script.async = true;
  script.dataset.gtmId = gtmId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  window.dataLayer.push({
    event: 'gtm.js',
    'gtm.start': Date.now()
  });
};

export const trackEvent = (name: TrackingEventName, payload: TrackingPayload = {}): void => {
  if (typeof window === 'undefined') return;
  initDataLayer();

  const utm = getUtmContext();
  window.dataLayer.push({
    event: name,
    page_name: PAGE_NAME,
    ...utm,
    ...payload
  });
};

export const sanitizePhone = (value: string): string => value.replace(/\D/g, '');

export const buildWhatsAppUrl = (message: string): string => {
  const envNumber = sanitizePhone((import.meta.env.VITE_WHATSAPP_NUMBER || '').trim());
  const fallbackNumber = sanitizePhone(DEFAULT_WHATSAPP_NUMBER);
  const number = envNumber || fallbackNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
