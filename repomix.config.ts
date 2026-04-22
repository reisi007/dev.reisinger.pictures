import type { RepomixConfig } from 'repomix';

const config: RepomixConfig = {
  output: {
    filePath: 'repomix-dev.md',
    style: 'markdown',
    removeComments: false,
    copyToClipboard: false,
  },
  ignore: {
    useGitignore: true,
    customPatterns: [
      '.cache/**',
      '.run/**',
      'dist/**',
      'node_modules/**',
      'scripts/**',
    ],
  },
  include: ['**/*'],
};

export default config;
