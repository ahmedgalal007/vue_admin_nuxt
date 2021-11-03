<template>
  <v-data-table
    :headers="getHeaders"
    :items="getItems"
    item-key="id"
    :show-select="!getLoading"
    show-group-by
    :loading="getLoading"
    loading-text="Loading ..."
    class="mt-10 elevation-10"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus',
    }"
    :options="getTableOptions"
    :calculate-widths="false"
  >
    <!-- eslint-disable-next-line -->
    <template v-slot:body="{ entries }" v-if="getLoading">
      <tbody
        :style="{ height: '100%', border: 'none' }"
        class="text-center ma-auto"
      >
        <tr v-for="(item, i) in entries" :key="i" class="tr-no-hover">
          <td
            v-if="i === 0"
            :rowspan="entries.length"
            :colspan="headers.length"
            style="border: none"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="pink"
              indeterminate
            ></v-progress-circular>
          </td>
          <td
            style="
              border: none;
              width: 0;
              padding: 0;
              margin: 0;
              display: inline-block;
            "
          ></td>
        </tr>
      </tbody>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:body.prepend="{ headers }" v-if="!getLoading">
      <tr class="tr-no-hover">
        <td :colspan="headers.length">
          <v-filter-combobox
            :headers="getHeaders"
            @filter-datatable="setFilters"
          ></v-filter-combobox>
        </td>
      </tr>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:progress v-if="getLoading">
      <v-progress-linear
        dark
        color="orange"
        :height="2"
        indeterminate
      ></v-progress-linear>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-if="!getLoading" #header.data-table-select="{ on, props }">
      <v-simple-checkbox
        color="purple"
        v-bind="props"
        v-on="on"
      ></v-simple-checkbox>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-for="field in headers" #[getSlotName(field.value)]="props">
      <v-edit-dialog
        v-if="!getLoading"
        :key="getSlotName(field.value)"
        class="ma-0"
        :return-value.sync="props.item[field.value]"
        @save="save"
        @cancel="cancel"
        @open="open"
        @close="close"
      >
        // change #default to #input is you want edit mode
        <template #default class="ma-0">
          <component
            :is="field.component.vType"
            v-if="field.component.vType === 'v-checkbox'"
            v-model="props.item[field.value]"
            v-bind="field.component.attrs"
            v-on="vOnBindings(field.component.on, field, props)"
            @keyup.native="checkboxKeyup($event)"
            @keydown.tab.native="appendRow(field, props, $event)"
          ></component>
          <component
            :is="field.component.vType"
            v-else
            v-model="props.item[field.value]"
            v-bind="field.component.attrs"
            v-on="vOnBindings(field.component.on, field, props)"
            @keydown.tab.native="appendRow(field, props, $event)"
          >
          </component>
        </template>
      </v-edit-dialog>
    </template>
    <!-- eslint-disable-next-line -->
    <template
      v-if="!getLoading"
      #[`item.data-table-select`]="{ isSelected, select }"
    >
      <v-simple-checkbox
        color="green"
        :value="isSelected"
        @input="select($event)"
      ></v-simple-checkbox>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:body.append="props">
      <tr>
        <td v-for="h in props.headers" :key="h.value">
          <div v-if="h.value === 'data-table-select'">SS</div>
          <template v-if="h.footer && h.value !== 'data-table-select'">
            <component
              :is="h.footer.vType"
              v-if="h.footer.vType === 'v-checkbox'"
              v-bind="h.footer.attrs"
              v-on="vOnBindings(h.footer.on, h, props)"
              @keyup.native="checkboxKeyup($event)"
            >
            </component>
            <component
              :is="h.footer.vType"
              v-else
              v-bind="h.footer.attrs"
              v-on="vOnBindings(h.footer.on, h, props)"
            >
            </component>
          </template>
          <template v-if="!h.footer && h.value !== 'data-table-select'">
            <span></span>
          </template>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import filterArrayColumn from '../mixins/filterArrayColumn'

import VDataTableDatePicker from './components/v-data-table-date-picker.vue'
import vFilterCombobox from './components/v-filter-combobox.vue'

export default {
  name: 'VBaseDatatable',
  components: { vFilterCombobox, VDataTableDatePicker },
  mixins: [filterArrayColumn],
  props: {
    loading: {
      type: Boolean,
      default: () => false,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    tableOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      entries: this.items,
      filters: [],
    }
  },
  computed: {
    getLoading() {
      console.log('this.loading:', this.loading)
      return this.loading
    },
    getHeaders() {
      return this.headers
    },
    getItems() {
      return this.filterDatatable()
    },
    getFilters() {
      return this.filters
    },
    getTableOptions() {
      return {
        page: 1,
        itemsPerPage: 10,
        sortBy: [] /* String[]  column names */,
        sortDesc: [] /* String[]  column names */,
        groupBy: [],
        groupDesc: [] /* boolean[] true/false ber column index */,
        multiSort: false,
        mustSort: false,
        ...this.tableOptions,
      }
    },
  },
  methods: {
    save: () => ({}),
    cancel: () => ({}),
    open: () => ({}),
    close: () => ({}),
    checkboxKeyup(event) {
      console.log('KEYUP:', event)
      if (event.key === 'Enter' || !event.key.replace(/\s/g, '').length) {
        document.getElementById(event.target.id).click()
      } else {
        console.log('Item Keyup:', String(event.key))
      }
      // console.log('$el:', document.getElementById(event.target.id).blur)
    },
    itemComponentLostFocus(props, event) {
      console.log('blurItemCell :', JSON.stringify(props))
    },
    getSlotName(name) {
      return 'item.' + name
    },
    // ! Events
    vOnBindings(events = [], header, props) {
      // const arr = events
      const hash = Object.fromEntries(
        events.map((e) => [e.name, e.callback.bind(this, header, props)])
      )
      return hash
    },
    appendRow(header, props, $event) {
      console.log('appendRow -> ', 'EVENT: => ', $event)
      if (this.IsLastCell(props, this.headers, this.entries)) {
        const row = this.generateNewRow(this.headers) // this.items.slice(-1)[0]

        this.entries = [...this.entries, row]
        console.log('New Row', this.model)
        // document.getElementById($event.target.id).focus()
        $event.target.focus()
      }
      return false
    },
    generateNewRow(headers) {
      const row = {}
      row.id = null
      headers.map((o) => {
        if (o.default) {
          row[o.value] = o.default
        } else {
          switch (o.type) {
            case Boolean:
              row[o.value] = false
              break
            case Number:
              row[o.value] = 0
              break
            case Date:
              row[o.value] = '1900-01-01'
              break
            default:
              row[o.value] = ''
              break
          }
        }
        return null
      })
      return row
    },
    // ! Filtering
    setFilters(model) {
      this.filters = model
    },
    filterDatatable() {
      console.log('Filter-Model:', this.getFilters)
      let filteredItems = [...this.entries]
      this.getFilters.map((o) => {
        console.log('Filter-Column:', o)
        if (o.column.type === String) {
          filteredItems = this.filterColumnString(
            filteredItems,
            o.column.value,
            o.operator.value,
            o.text
          )
          return true
        } else if (o.column.type === Number) {
          filteredItems = this.filterColumnNumber(
            filteredItems,
            o.column.value,
            o.operator.value,
            o.text
          )
          return true
        } else if (o.column.type === Date) {
          filteredItems = this.filterColumnDate(
            filteredItems,
            o.column.value,
            o.operator.value,
            o.text
          )
          return true
        } else if (o.column.type === Boolean) {
          filteredItems = this.filterColumnBoolean(
            filteredItems,
            o.column.value,
            o.operator.value,
            o.text
          )
          return true
        } else {
          return false
        }
      })
      console.log('Filtered-Items', filteredItems)
      return filteredItems
    },
  },
}
</script>

<style lang="css">
.v-data-table > .v-data-table__wrapper > table {
  min-height: 300px;
}
.tr-no-hover:hover {
  background-color: transparent !important;
}
.v-small-dialog__activator__content {
  display: initial;
}
</style>
