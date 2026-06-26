#!/bin/sh
# Remove dev-only packages to free disk space on EdgeOne CI (/dev/shm is limited).
rm -rf \
  node_modules/@tauri-apps \
  node_modules/jest \
  node_modules/jest-environment-jsdom \
  node_modules/@testing-library \
  node_modules/webpack \
  node_modules/eslint \
  node_modules/prettier \
  node_modules/husky \
  node_modules/lint-staged \
  node_modules/ts-node \
  .next/cache
