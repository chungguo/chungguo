const path = require("path");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src-elem 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com *.google.com *.gstatic.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.firebase.com *.firebaseio.com *.google.com *.gstatic.com;
  img-src *;
  style-src 'self' 'unsafe-inline';
  style-src-elem 'self' 'unsafe-inline' *.googleapis.com;
  font-src 'self' data: fonts.gstatic.com;
  object-src 'self';
  connect-src 'self' *.google-analytics.com *.googleapis.com vitals.vercel-insights.com;
  frame-src 'self' *.google.com *.firebaseapp.com;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

module.exports = {
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'chungguo': path.resolve(__dirname),
    };

    return config;
  },
  async generateBuildId() {
    // https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
    return process.env.GITHUB_SHA || 'chungguo';
  },
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders
      },
      {
        source: '/blog',
        headers: securityHeaders
      },
      {
        source: '/:slug*',
        headers: securityHeaders
      }
    ]
  }
}
