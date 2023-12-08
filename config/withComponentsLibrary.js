/* eslint-disable */
const path = require('path')
const transpileModules = require('next-transpile-modules')

const reactPath = path.resolve(__dirname, '../node_modules/react')
const withTranspileModules = transpileModules(['components-front-end'])

const resolveUniqueReactForHooks = {
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ]
      }
    ]
  },
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', ...config.externals]
    }

    config.resolve.alias.react = reactPath

    return config
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['www.google.cl']
  },
  output: 'standalone',
  productionBrowserSourceMaps: /* process.env.NEXT_PUBLIC_ENV === 'labs' ?  */ true /* : false */
}

module.exports = () => {
  return withTranspileModules(resolveUniqueReactForHooks)
}
