import webpack from 'webpack'

export default {
  mode: 'spa',
   router: {
     base: '/corruption-client/',
     prefetchLinks: false
   },
  /*
   ** Headers of the page
   */
  head: {
    title:
      'The (Anti-)Corruption Corpus for Corruption Researchers & Practitioners',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'UA-103575743-1'
    }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'mdbvue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    'vue-social-sharing/nuxt'
  ],
  markdownit: {
    html: true,
    breaks: true,
    preset: 'default',
    injected: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    browserBaseURL: 'https://arcane-waters-24161.herokuapp.com/',
    progress: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ],
    extend(config, ctx) {}
  }
}
