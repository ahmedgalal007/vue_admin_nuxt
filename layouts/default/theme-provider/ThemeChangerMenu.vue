<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template #activator="{ on }">
      <v-btn large icon v-on="on">
        <v-icon size="30" >mdi-palette</v-icon>
      </v-btn>
    </template>
    <v-card>
      <!--      menu content goes here -->
      <v-list-item>
        <v-list-item-content
          ><v-list-item-title class="font-weight-bold">
            Dark Mode</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="$vuetify.theme.dark" />
        </v-list-item-action>
      </v-list-item>

      <!--      menu content end -->
      <v-divider />
    </v-card>
    <v-card-text>
      <v-card
        v-for="(theme, index) in themes"
        :key="index"
        :disabled="$vuetify.theme.themes.name === theme.name"
        class="my-2"
        hover
        outlined
        @click="setTheme(theme)"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ theme.name }}</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-avatar
              v-if="$vuetify.theme.themes.name === theme.name"
              color="success"
              size="30"
            >
              <v-icon>mdi-check</v-icon>
            </v-avatar>
          </v-list-item-action>
        </v-list-item>
        <div class="my-2">
          <v-tooltip
            v-for="(key, i) in Object.keys(theme.dark)"
            :key="i"
            top
          >
            <template #activator="{ on, attrs }"> 
              <v-chip
                class="mx-1"
                label
                x-small
                v-bind="attrs"
                :color="theme.dark[key]"
                v-on="on"
              >
              </v-chip>
            </template>
            <span>{{key}}</span>
          </v-tooltip>
        </div>
        <div class="my-2">
          <v-tooltip
            v-for="(key, x) in Object.keys(theme.light)"
            :key="x"
            top
          >
            <template #activator="{ on, attrs }"> 
              <v-chip
                class="mx-1"
                label
                x-small
                v-bind="attrs"
                :color="theme.light[key]"
                v-on="on"
              >
              </v-chip>
            </template>
            <span>{{key}}</span>
          </v-tooltip>
        </div>
      </v-card>
    </v-card-text>
  </v-menu>
</template>

<script>
export default {
  name: 'ThemeChanger',
  data: () => ({
    menu: false,
    themes: [
      require('./MaterialLightBlueTheme.json'),
      require('./MaterialLightRedTheme.json'),
      require('./MaterialRedTheme.json'),
      require('./MaterialCayanTheme.json'),
      require('./MaterialBlueTheme.json')
    ],
  }),
  methods: {
    setTheme(theme) {
      // close menu
      this.menu = false
      const name = theme.name
      const dark = theme.dark
      const light = theme.light

      console.log("Theme--light",this.$vuetify.theme.themes.light);
      console.log("Theme--dark",this.$vuetify.theme.themes.dark);
      // set themes
      Object.keys(dark).forEach((i) => {
        this.$vuetify.theme.themes.dark[i] = dark[i]
      })
      Object.keys(light).forEach((i) => {
        this.$vuetify.theme.themes.light[i] = light[i]
      })
      // also save theme name to disable selection
      this.$vuetify.theme.themes.name = name

      // this.$vuetify.theme.themes.light.primaryText = this.$vuetify.theme.themes.light["primary--text"]
      // this.$vuetify.theme.themes.dark.primaryText = this.$vuetify.theme.themes.dark["primary--text"]
    },
  },
}
</script>