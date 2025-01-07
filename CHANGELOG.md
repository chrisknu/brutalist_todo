## [1.1.1](https://github.com/chrisknu/brutalist_todo/compare/v1.1.0...v1.1.1) (2025-01-07)


### Performance Improvements

* optimize app performance - Add CSP headers via middleware - Implement virtualization for todo list - Add DB connection pooling and caching - Optimize component rendering with memoization ([c21b540](https://github.com/chrisknu/brutalist_todo/commit/c21b540e037e32f99206237d5973cc205235f75b))
* optimize app performance and add lighthouse testing - Add CSP headers and security middleware - Implement virtualization for todo list - Add DB connection pooling and caching - Configure Lighthouse CI ([72aac08](https://github.com/chrisknu/brutalist_todo/commit/72aac086281976dca65e4eaef63f15add8cb6ebb))

# [1.1.0](https://github.com/chrisknu/brutalist_todo/compare/v1.0.7...v1.1.0) (2025-01-07)


### Bug Fixes

* Move themeColor to viewport export following Next.js best practices ([cbcc904](https://github.com/chrisknu/brutalist_todo/commit/cbcc90471d238d237f8b4d34a3c9c6fe161b4629))


### Features

* Add favicon and app icons ([e0e70a2](https://github.com/chrisknu/brutalist_todo/commit/e0e70a22fa3bbadbea7a8b6ee8707a9b1d9fefb0))
* Add PWA meta tags and iOS support ([e3f9311](https://github.com/chrisknu/brutalist_todo/commit/e3f9311eeb740f8ccca5cca352b09dc0c2796db2))
* Add PWA support with next-pwa and enhanced manifest ([57d2fb0](https://github.com/chrisknu/brutalist_todo/commit/57d2fb0cfc4fa663570747a323f9d15352463356))

## [1.0.7](https://github.com/chrisknu/brutalist_todo/compare/v1.0.6...v1.0.7) (2025-01-07)


### Bug Fixes

* address lighthouse CI security and performance issues ([9f2b376](https://github.com/chrisknu/brutalist_todo/commit/9f2b37643363125ef5a455bb1f98e9db639b0512))

## [1.0.6](https://github.com/chrisknu/brutalist_todo/compare/v1.0.5...v1.0.6) (2025-01-07)


### Bug Fixes

* update lighthouse configuration for Next.js 15 ([4749662](https://github.com/chrisknu/brutalist_todo/commit/4749662332254c17b631da480696659fab67d927))

## [1.0.5](https://github.com/chrisknu/brutalist_todo/compare/v1.0.4...v1.0.5) (2025-01-07)


### Bug Fixes

* update Next.js configuration for static exports ([b427b14](https://github.com/chrisknu/brutalist_todo/commit/b427b14cb9a28428b0fd1b7ebfad4db9b3365e91))

## [1.0.4](https://github.com/chrisknu/brutalist_todo/compare/v1.0.3...v1.0.4) (2025-01-07)


### Bug Fixes

* update lighthouse CI to use static export ([90618e2](https://github.com/chrisknu/brutalist_todo/commit/90618e2761b5e0a3b0b0207cae176239ef998388))

## [1.0.3](https://github.com/chrisknu/brutalist_todo/compare/v1.0.2...v1.0.3) (2025-01-07)


### Bug Fixes

* update lighthouse CI configuration to work with Next.js static analysis ([95ed663](https://github.com/chrisknu/brutalist_todo/commit/95ed663e2124c7db034f16dce97612b7edb73953))

## [1.0.2](https://github.com/chrisknu/brutalist_todo/compare/v1.0.1...v1.0.2) (2025-01-07)


### Bug Fixes

* correct color variable usage and fix inverted colors in light/dark modes ([4b1a012](https://github.com/chrisknu/brutalist_todo/commit/4b1a01286fb02a227704a59cc1913a03f2a18686))
* improve dark mode implementation to prevent flash and add proper color scheme ([4c02b4d](https://github.com/chrisknu/brutalist_todo/commit/4c02b4d23a23cebbc18cd9600fa35945905260f3))
* improve text contrast and visibility in dark mode ([4a7bdb4](https://github.com/chrisknu/brutalist_todo/commit/4a7bdb44e057eb491a8f5ffd39a5daeca36e2c7c))

## [1.0.1](https://github.com/chrisknu/brutalist_todo/compare/v1.0.0...v1.0.1) (2025-01-07)


### Bug Fixes

* update ESLint security configuration to use flat config system ([fe99979](https://github.com/chrisknu/brutalist_todo/commit/fe999798ea4807aeaa800c9de72ae948cec681b3))

# 1.0.0 (2025-01-06)


### Bug Fixes

* properly cleanup drag handlers to prevent multiple registration ([27ff331](https://github.com/chrisknu/brutalist_todo/commit/27ff3313b1f5754762899b6e9395dbf352b4ab58))
* resolve drag and drop context issues and improve UX ([92a1655](https://github.com/chrisknu/brutalist_todo/commit/92a1655c51dd227bbc048e74c0b948371b9cb20d))
* resolve drag and drop ID handling and improve dragging experience ([c2108db](https://github.com/chrisknu/brutalist_todo/commit/c2108db0b6ee9a177644a2e16ea77012fd826e2e))
* resolve drag and drop ID handling and sorting issues ([f131579](https://github.com/chrisknu/brutalist_todo/commit/f131579b93020ca1c84631cf100044d022d85468))
* resolve drag and drop structure and sorting issues ([54fb8b7](https://github.com/chrisknu/brutalist_todo/commit/54fb8b7ae5e4408e5e6f6e241411c949c66bae87))
* resolve drag and drop timing and ID issues ([79e33ed](https://github.com/chrisknu/brutalist_todo/commit/79e33edd76b09ed2f2b10a96a3ae51dd1e64657f))
* resolve droppable ID consistency issues ([40a6a48](https://github.com/chrisknu/brutalist_todo/commit/40a6a48c220ebc68e11745c8cb523d59ee029147))
* resolve todo app type issues and database operations ([6e9f093](https://github.com/chrisknu/brutalist_todo/commit/6e9f093d8897052848166128711d7b0cfc7a4a3c))
* resolve TypeScript errors and improve drag-and-drop type safety ([5dea3e0](https://github.com/chrisknu/brutalist_todo/commit/5dea3e070cc9dde6d6736b170ac4597640ad9b70))
* use correct droppable ID format ([60c46fb](https://github.com/chrisknu/brutalist_todo/commit/60c46fb37523c3747efc47050703135857acde40))


### Features

* add Web Speech API types and update VoiceInput component ([be12eaf](https://github.com/chrisknu/brutalist_todo/commit/be12eaf0fc063944c14c7bc892c8e173d5404736))
* implement drag and drop reordering with persistence ([82dad53](https://github.com/chrisknu/brutalist_todo/commit/82dad5333b83ae764b85904baf658731662a7b74))

# Changelog

All notable changes to this project will be documented in this file.
