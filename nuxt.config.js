import pkg from './package';
import info from './content/setup/info';
import path from 'path';
import glob from 'glob';

var dynamicRoutes = getDynamicPaths({
  '/blog': 'blog/*.json',
});

console.log(dynamicRoutes);

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: info.sitename,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/usage
    ['@reallifedigital/nuxt-image-loader-module', { // Doc: https://github.com/reallifedigital/nuxt-image-loader-module
      imagesBaseDir: 'static',
      imageStyles: {
        thumbnailOrg: { actions: ['gravity|Center', 'resize|120|180^', 'extent|320|180|+0|+90'] },
        galleryThumbnail: { macros: ['scaleAndCrop|480|320'] },
        galleryThumbnailSmall: { macros: ['scaleAndCrop|320|214'] },
        small: { macros: ['scaleAndCrop|160|90'] },
        medium: { macros: ['scaleAndCrop|320|180'] },
        large: { macros: ['scaleAndCrop|640|360'] },
      },
      // Optional responsive style profiles:
      responsiveStyles: {
        galleryThumbnailResponsive: {
          srcset: 'galleryThumbnailSmall 320w, galleryThumbnail 480w',
          sizes: '(min-width: 600px) 480px, 320px',
        },
      },
    }]
  ],
  markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
  generate: {
    routes: dynamicRoutes
  }
};

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
