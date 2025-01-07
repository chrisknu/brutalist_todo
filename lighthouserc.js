module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--headless=new',
          '--ignore-certificate-errors',
        ],
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2', 'redirects-http'],
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'csp-xss': 'off',
        'dom-size': ['error', { minScore: 0.7 }],
        'mainthread-work-breakdown': ['error', { minScore: 0.7 }],
        'server-response-time': ['error', { minScore: 0.8 }],
        'first-contentful-paint': ['error', { minScore: 0.8 }],
        'largest-contentful-paint': ['error', { minScore: 0.8 }],
        'total-blocking-time': ['error', { minScore: 0.8 }],
        'cumulative-layout-shift': ['error', { minScore: 0.8 }],
        'uses-http2': 'off',
        'redirects-http': 'off',
        'uses-long-cache-ttl': 'off',
        'unused-javascript': 'off',
        'uses-responsive-images': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
