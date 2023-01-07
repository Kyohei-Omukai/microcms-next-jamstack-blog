import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'jamstack-practice',
  apiKey: process.env.API_KEY,
});