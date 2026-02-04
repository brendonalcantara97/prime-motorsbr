
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: 'primary' | 'accent-blue' | 'gradient';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ModelVariant {
  id: string;
  name: string;
  finish: string;
  image: string;
  whatsappMessage: string;
  specs: string[];
}

export type TrackingEventName =
  | 'view_page'
  | 'view_hero'
  | 'carousel_slide_change'
  | 'carousel_nav_click'
  | 'cta_whatsapp_click'
  | 'model_cta_click'
  | 'scroll_50'
  | 'scroll_90'
  | 'faq_open';

export interface TrackingPayload {
  page_name?: string;
  section?: string;
  cta_id?: string;
  model_name?: string;
  slide_index?: number;
  interaction?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: string | number | undefined;
}
