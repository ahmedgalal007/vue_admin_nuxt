<template>
  <v-menu bottom left offset-y>
    <template #activator="{ on, attrs }">
      <v-btn light fab small v-bind="attrs" v-on="on">
        <v-avatar rounded="true">
          <div
            class="rounded-circle"
            :style="`background:url('${items[selectedItem].src}') 0;display:block;width: 30px;height: 30px;border-radius: 50%;`"
          ></div>
          <!--img :src="items[selectedItem].src" /-->
        </v-avatar>
      </v-btn>
    </template>

    <v-list nav>
      <v-list-item-group v-model="selectedItem" mandatory color="indigo">
        <v-list-item v-for="(item, i) in items" :key="i" :value="i">
          <!--v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon-->

          <nuxt-link :to="switchLocalePath(item.value)">
            <v-list-item-avatar class="rounded-circle">
              <img :src="item.src" :alt="item.value" class="rounded-circle" />
            </v-list-item-avatar>
          </nuxt-link>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
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
      selectedItem: 1,
      items: [
        {
          text: 'English',
          value: 'en',
          src: '/images/svg/flags/gb.svg',
        },
        {
          text: 'Arabic',
          value: 'ar',
          src: '/images/svg/flags/sa.svg',
        },
      ],
    }
  },
  methods: {
    getSelectedItem: (items, value) => {
      // eslint-disable-next-line eqeqeq
      const itm = items.filter((item) => item.value == value)
      return itm[0]
    },
  },
}
</script>

<style></style>
