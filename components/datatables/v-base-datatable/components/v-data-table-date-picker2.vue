<template>
  <div>
    <!--div class="mb-6">
      Active picker: <code>{{ activePicker || 'null' }}</code>
    </div-->
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          :hide-details="hideDetails"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    hideDetails: { type: Boolean, default: () => false },
    value: {
      type: String,
      default: '',
    },
  },
  setup: () => {
    this.date = this.value
  },
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  computed: {
    getDate() {
      return this.date
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    handleInput(e) {
      console.log('Value:', this.value)
      this.$emit('input', this.date)
    },
  },
}
</script>
