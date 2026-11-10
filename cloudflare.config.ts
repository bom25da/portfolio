import { defineConfig } from 'cf/config';

export default defineConfig({
  accountId: '2fa435b9ebc013cd81961684f045499d',
  worker: {
    name: 'springcotton-portfolio',
    compatibilityDate: '2026-11-10',
    domains: ['springcotton.com'],
    observability: {
      enabled: true,
      logs: { enabled: true },
      traces: { enabled: true, headSamplingRate: 0.01 },
    },
    assets: { notFoundHandling: 'single-page-application' },
  },
});
