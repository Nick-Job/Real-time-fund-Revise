/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = 'Real-time-fund-Revise';
let basePath = isGithubActions ? `/${repo}` : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
};

module.exports = nextConfig;
