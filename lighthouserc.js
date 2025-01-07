module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: ['--show-paint-rects'],
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'csp-xss': ['error', { minScore: 0.9 }],
        'dom-size': ['error', { minScore: 0.7 }],
        'mainthread-work-breakdown': ['error', { minScore: 0.7 }],
        'server-response-time': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
