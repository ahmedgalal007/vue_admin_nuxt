<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="2">
        <v-autocomplete
          v-model="filterColumn"
          :items="getItems[0].columns"
          hide-details
          dense
          class="shrink center"
          @click.prevent="() => {}"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="1">
        <v-autocomplete
          v-model="filterOperator"
          :items="Operators"
          hide-details
          dense
          class="center"
          @click.prevent="() => {}"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filterValue"
          hide-details
          dense
          class="shrink center"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1">
        <v-btn x-small color="red" @click="addToFilters">
          <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6"> </v-col>
    </v-row>

    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :search-input.sync="search"
      label="No Filters"
      multiple
      small-chips
      solo
      hide-details
      dense
    >
      <template #no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template #selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} darken-3`"
          dark
          :input-value="selected"
          label
          small
        >
          <v-icon nano left @click="removeFilter(parent, item)">
            $delete
          </v-icon>
          <span> ({{ item.column.text }}) </span>
          <span class="mx-1"> {{ item.operator.text }} </span>
          <span>('{{ item.text }}')</span>
          <v-icon right> mdi-filter </v-icon>
        </v-chip>
      </template>
      <template #item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip v-else :color="`${item.filterText} lighten-3`" dark label small>
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // this.items = [...this.getItems, ...this.getHeaders]
  },
  data: () => ({
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    editingIndex: -1,
    filterColumn: null,
    filterOperator: null,
    filterValue: null,
    filterInex: -1,
    items: [],
    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0,
  }),
  computed: {
    getHeaders() {
      return this.headers
    },
    getItems() {
      const rslt = {
        filterText: '',
        columns: [...this.items, ...this.getHeaders],
      } // [...this.items, ...this.getHeaders]
      console.log('result-before-map:', rslt)
      rslt.columns = rslt.columns.filter(
        (h) => h.value !== 'data-table-select' || h.header == null
      )
      // rslt.map((v) => {
      //   v.selected = true
      //   return v
      // })
      console.log('result-after-map:', rslt)
      return [rslt]
    },
    Operators() {
      return [
        { text: '=', value: 'equale', types: [String, Number, Date, Boolean] },
        {
          text: '!=',
          value: 'not-equale',
          types: [String, Number, Date, Boolean],
        },
        { text: '>', value: 'greater-than', types: [Number, Date] },
        { text: '<', value: 'less-than', types: [Number, Date] },
        { text: 'contains', value: 'contains', types: [String] },
        { text: '!contains', value: 'not-contains', types: [String] },
      ]
    },
  },
  watch: {
    model(val, prev) {
      // if (val.length === prev.length) return
      // this.model = val.map((v) => {
      //   console.log('V:', v)
      //   if (typeof v === 'string') {
      //     v = {
      //       filterText: v,
      //       text: v,
      //       color: this.colors[this.nonce - 1],
      //     }
      //     // this.items.push(v)
      //     // this.nonce++
      //   }
      //   return v
      // })
    },
  },

  methods: {
    addToFilters() {
      // * Arrange
      const column = this.getHeaders.filter(
        (o) => o.value === this.filterColumn
      )[0]
      const operator = this.Operators.filter(
        (o) => o.value === this.filterOperator
      )[0]
      // ! Check
      if (this.filterValue === null || column === null || operator === null)
        return
      console.log(typeof this.filterColumn)
      if (!(column instanceof Object) || column.value.length === 0) return
      if (!(operator instanceof Object)) return

      // TODO ACT
      const v = {
        column,
        operator,
        text: this.filterValue,
        color: this.colors[this.nonce - 1],
      }
      this.model.push(v)
      this.nonce = this.nonce > this.colors.length ? 0 : this.nonce + 1
      this.filterColumn = null
      this.filterOperator = null
      this.filterValue = null
      this.$emit('filter-datatable', this.model)
    },
    removeFilter(parent, item) {
      parent.selectItem(item)
      this.$emit('filter-datatable', this.model)
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false
      if (item.value === 'data-table-select') return false
      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text
        .toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase())
    },
  },
}
</script>
