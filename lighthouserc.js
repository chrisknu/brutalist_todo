module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless'],
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2'],
      },
    },
    assert: {
      assertions: {
        'csp-xss': ['error', { minScore: 0.9 }],
        'dom-size': ['error', { minScore: 0.7 }],
        'mainthread-work-breakdown': ['error', { minScore: 0.7 }],
        'server-response-time': ['error', { minScore: 0.8 }],
        'first-contentful-paint': ['error', { minScore: 0.8 }],
        'largest-contentful-paint': ['error', { minScore: 0.8 }],
        'total-blocking-time': ['error', { minScore: 0.8 }],
        'cumulative-layout-shift': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
