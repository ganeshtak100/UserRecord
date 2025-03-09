export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  INITIAL_PAGE: 1,
} as const;

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-]{10,}$/,
} as const;
