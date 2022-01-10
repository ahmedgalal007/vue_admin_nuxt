<template>
  <v-menu bottom left offset-y>
    <template #activator="{ on, attrs }">
      <v-btn light fab small v-bind="attrs" v-on="on">
        <v-avatar rounded="true">
          <div
            class="rounded-circle"
            :style="`background:url('${
              $i18n.locales.filter((i) => i.code === $root.$i18n.locale)[0].src
            }') 0;display:block;width: 30px;height: 30px;border-radius: 50%;`"
          ></div>
          <!--img :src="items[selectedItem].src" /-->
        </v-avatar>
      </v-btn>
    </template>

    <v-list nav>
      <v-list-item-group v-model="selectedItem" mandatory color="indigo">
        <v-list-item
          v-for="item in availableLocales"
          :key="item.code"
          :value="item.code"
        >
          <!--v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon-->

          <a href="#" @click.self="setLanguage(item.code)">
            <v-list-item-avatar class="rounded-circle">
              <img :src="item.src" :alt="item.name" class="rounded-circle" />
            </v-list-item-avatar>
            {{ item.name }}
          </a>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'VLanguageMenu',
  props: { lang: { type: Number, default: 0 } },
  data() {
    return {
      selectedItem: this.$i18n.getBrowserLocale(),
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    getSelectedItem: (items, value) => {
      // eslint-disable-next-line eqeqeq
      const itm = items.filter((item) => item.value == value)
      return itm[0]
    },
    setLanguage(locale) {
      // this.$root.$i18n.switchLocalePath(locale);
      this.$root.$i18n.setLocale(locale);
      this.$root.$i18n.setLocaleCookie(locale);
    },
    getSelectedLocale(code) {
      
    },
  },
}
</script>

<style></style>
