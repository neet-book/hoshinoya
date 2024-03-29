const path = require('path')

module.exports = {
  // mode: 'universal',
  /*
  ** Headers of the page
  *
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** root path
   */
  srcDir: './',
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/base.css',
    '~/assets/style/fonts.css',
    '~/assets/style/normalize.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: 'plugins/message-box.js' , mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  buildModules: ['@nuxt/typescript-build', '@nuxt/postcss8'],
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  telemetry: false,
  router: {
    middleware: 'router-redirect'
  },
  alias: {
    api: path.resolve(__dirname, 'server/api')
  }
}
