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
    <template v-slot:body="{ items }" v-if="getLoading">
      <tbody
        :style="{ height: '100%', border: 'none' }"
        class="text-center ma-auto"
      >
        <tr v-for="(item, i) in items" :key="i" class="tr-no-hover">
          <td
            v-if="i === 0"
            :rowspan="items.length"
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
            v-model="props.item[field.value]"
            v-bind="field.component.attrs"
            @blur="logItems(props, $event)"
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
    <template v-if="!getLoading" v-slot:body.append="{ headers }">
      <tr>
        <td :colspan="headers.length">This is an appended row</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import VDataTableDatePicker from './components/v-data-table-date-picker.vue'
import vFilterCombobox from './components/v-filter-combobox.vue'
export default {
  components: { vFilterCombobox, VDataTableDatePicker },
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
      default: () => new Array(5).fill(null),
    },
    tableOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      filters: [],
    }
  },
  computed: {
    getLoading() {
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
    logItems(props, event) {
      console.log(JSON.stringify(props))
    },
    getSlotName(name) {
      return 'item.' + name
    },
    // ! Filtering
    // eslint-disable-next-line spaced-comment
    //#region Filtering
    setFilters(model) {
      this.filters = model
    },
    filterDatatable() {
      console.log('Filter-Model:', this.getFilters)
      let filteredItems = [...this.items]
      this.getFilters.map((o) => {
        console.log('Filter-Column:', o)
        if (o.column.type === String) {
          filteredItems = this.filterColumnString(
            filteredItems,
            o.column,
            o.operator,
            o.text
          )
          return true
        } else if (o.column.type === Number) {
          filteredItems = this.filterColumnNumber(
            filteredItems,
            o.column,
            o.operator,
            o.text
          )
          return true
        } else if (o.column.type === Date) {
          filteredItems = this.filterColumnDate(
            filteredItems,
            o.column,
            o.operator,
            o.text
          )
          return true
        } else if (o.column.type === Boolean) {
          filteredItems = this.filterColumnBoolean(
            filteredItems,
            o.column,
            o.operator,
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
    filterColumnString(items, column, operator, value) {
      return items.filter((item) =>
        item[column.value]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
      )
    },
    filterColumnNumber(items, column, operator, value) {
      return items.filter((item) => {
        console.log(
          'Number-Filter:',
          parseFloat(item[column.value], 10),
          ' - ',
          parseFloat(value, 10)
        )
        if (!isNaN(value) || !isNaN(item[column.value])) {
          return this.compareItemIsEqualeGreaterLess(
            parseFloat(item[column.value], 10),
            operator,
            parseFloat(value, 10)
          )
        }
        return false
      })
    },
    filterColumnDate(items, column, operator, value) {
      return items.filter((item) =>
        this.compareItemIsEqualeGreaterLess(item[column.value], operator, value)
      )
    },
    filterColumnBoolean(items, column, operator, value) {
      const isTrue = (val) => val === true || val === 'true' || val === 1

      return items.filter((item) => {
        if (isTrue(value) && isTrue(item[column.value])) {
          if (operator.value === 'equale') {
            return isTrue(item[column.value]) === isTrue(value)
          } else if (operator.value === 'not-equale') {
            return isTrue(item[column.value]) !== isTrue(value)
          }
        }
        return false
      })
    },
    compareItemIsEqualeGreaterLess(item, operator, value) {
      if (operator.value === 'equale') {
        return item === value
      } else if (operator.value === 'not-equale') {
        return item !== value
      } else if (operator.value === 'greater-than') {
        console.log(operator.value, ' - ', item, ' - ', value)
        return item > value
      } else if (operator.value === 'less-than') {
        return item < value
      }
      return false
    },
    // eslint-disable-next-line spaced-comment
    //#endregion
  },
}
</script>

<style lang="css" scoped>
.v-data-table > .v-data-table__wrapper > table {
  min-height: 300px;
}
.tr-no-hover:hover {
  background-color: transparent !important;
}
</style>