import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? '/diego-lopes-career-map' : '',
  assetPrefix: isGitHubPages ? '/diego-lopes-career-map/' : '',
};

export default nextConfig;
