import securityPlugin from 'eslint-plugin-security';
import securityNodePlugin from 'eslint-plugin-security-node';

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'build/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/__tests__/**',
    ],
    plugins: {
      security: securityPlugin,
      'security-node': securityNodePlugin,
    },
    rules: {
      'security/detect-object-injection': 'error',
      'security/detect-non-literal-require': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-unsafe-regex': 'error',
      ...securityPlugin.configs.recommended.rules,
      ...securityNodePlugin.configs.recommended.rules,
    },
  },
];
