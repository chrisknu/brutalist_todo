module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: ['--no-sandbox'],
        skipAudits: ['uses-http2', 'installable-manifest'],
      },
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { minScore: 0.8 }],
        'largest-contentful-paint': ['error', { minScore: 0.8 }],
        'speed-index': ['error', { minScore: 0.8 }],
        interactive: ['error', { minScore: 0.8 }],
        'total-blocking-time': ['error', { minScore: 0.8 }],
        'cumulative-layout-shift': ['error', { minScore: 0.8 }],
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warning', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'bootup-time': ['warning', { minScore: 0.7 }],
        'dom-size': ['warning', { minScore: 0.7 }],
        'mainthread-work-breakdown': ['warning', { minScore: 0.7 }],
        'render-blocking-resources': ['warning', { maxLength: 2 }],
        'server-response-time': ['warning', { minScore: 0.8 }],
        'errors-in-console': ['error', { maxLength: 0 }],
        'csp-xss': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
