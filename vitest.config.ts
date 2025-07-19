import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    /* for example, use 'jsdom' for browser-like environment */
    environment: 'jsdom',
    /* ... */
  },
});
