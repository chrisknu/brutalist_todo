module.exports = {
  extends: [
    'plugin:security/recommended',
    'plugin:security-node/recommended'
  ],
  plugins: [
    'security',
    'security-node'
  ],
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
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-possible-timing-attacks': 'error'
  }
};