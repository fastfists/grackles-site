import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - grackles-site",
    title: "grackles-site",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deeporange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  router: {
    scrollBehavior(to, from) {
      if (from.path != to.path) {
        if (to.hash) {
          setTimeout(() => {
            return window.scrollTo({
              top: document.querySelector(to.hash).offsetTop,
              behavior: "smooth"
            });
          }, 500);
        } else {
          return window.scrollTo({ top: 0, behavior: "instant" });
        }
      }

      if (to.hash) {
        var doc = document.querySelector(to.hash);
        if (doc == null) {
          return window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: "smooth"
        });
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
