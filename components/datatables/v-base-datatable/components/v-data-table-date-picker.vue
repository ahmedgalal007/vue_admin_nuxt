<template>
  <div
    ref="date-container"
    class="editor"
    contenteditable="contenteditable"
    tabindex="-1"
    @input="updateDate()"
  >
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          hint="MM/DD/YYYY format"
          persistent-hint
          :hide-details="hideDetails"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="updateDate()"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: { type: String, default: '' },
    hideDetails: { type: Boolean, default: false },
  },
  setup(props) {
    this.dateFormatted = props.value
    this.date = Date.parse('01 Jan 1970 00:00:00 GMT')
  },
  data(vm) {
    return {
      date: this.value,
      // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //   .toISOString()
      //   .substr(0, 10),
      dateFormatted: vm.formatDate(this.value),
      menu1: false,
    }
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
      // eslint-disable-next-line vue/no-mutating-props
      // this.value = this.getContent
      console.log(
        'date value: ',
        val,
        ', date Formated:',
        this.computedDateFormatted
      )
    },
  },

  methods: {
    updateDate() {
      this.menu1 = false
      // this.$emit('input', this.dateFormatted)
      this.$emit('input', this.date)
    },
    formatDate(date) {
      if (!date) return null
      console.log('formate Date Input:', date)
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
