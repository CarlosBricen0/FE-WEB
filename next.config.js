const path = require('path');
module.exports = {
  transpilePackages: ['components-front-end'],
  images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }] },
  outputFileTracingRoot: path.join(__dirname, '..'),
  webpack(config, { isServer }) {
    if (!isServer) config.resolve.alias = { ...config.resolve.alias,
      react: path.dirname(require.resolve('react/package.json')),
      'react-dom': path.dirname(require.resolve('react-dom/package.json')),
    };
    return config;
  }
};
