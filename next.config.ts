import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect bare "/" to default locale.
      // permanent: false (307) so it can be changed without CDN cache issues.
      { source: '/', destination: '/es', permanent: false },
    ];
  },
};

export default nextConfig;
