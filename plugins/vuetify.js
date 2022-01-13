import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default ctx => {
    const vuetify = new Vuetify({
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: false,
      light: true,
      default: 'light',
      disable: false,
      options: {
        cspNonce: undefined,
        customProperties: true,
        themeCache: undefined,
      },
      themes:{

        light: {"menu--text": "#FFFFFF",anchor: "#ff0000"},
        dark: {
          primary: colors.blue.darken2,
          "menu--text": "#FFFFFF",
          fontcolor: colors.green.accent4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
});

ctx.app.vuetify = vuetify;
ctx.$vuetify = vuetify.framework;
};