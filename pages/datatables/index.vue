<template>
  <div>
    <v-switch @change="(e) => setLoading(e)"> </v-switch>
    <v-base-datatable
      :loading="getLoading"
      :items="items"
      :headers="headers"
      :table-options="{ groupBy: [], itemsPerPage: -1 }"
    >
    </v-base-datatable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vBaseDatatable from '~/components/datatables/v-base-datatable/data-table.vue'

export default {
  components: { vBaseDatatable },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
          default: 'tst',
          align: 'start',
          sortable: false,
          groupable: false,
          type: String,
          filters: [],
          component: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
            },
            on: [
              {
                name: 'blur',
                callback: this.itemComponentBlur,
              },
            ],
          },
          footer: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              dense: true,
              value: 2220,
              outlined: true,
            },
            on: [
              {
                name: 'blur',
                callback: this.itemComponentBlur,
              },
            ],
            value: '',
          },
        },
        {
          text: 'Value',
          value: 'val',
          groupable: false,
          type: Number,
          filters: [],
          component: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              type: 'number',
            },
            on: [
              {
                name: 'change',
                callback: this.itemComponentBlur,
              },
            ],
          },
          footer: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              dense: true,
              value: 2220,
              outlined: true,
            },
            on: [
              {
                name: 'blur',
                callback: (header, props, $event) => {
                  console.log('Event:', $event)
                  console.log('EVENT-Target:', $event.target)
                  console.log('HEADER:', header)
                  console.log('PROPS:', props)
                },
              },
            ],
            value: 'Normal <P>',
          },
        },
        {
          text: 'Active',
          value: 'active',
          groupable: false,
          type: Boolean,
          filters: [],
          component: {
            vType: 'v-checkbox',
            attrs: {
              'single-line': true,
              'hide-details': true,
              key: this.componentKey,
              type: 'boolean',
            },
            on: [
              {
                name: 'change',
                callback: this.checkboxChange,
              },
            ],
          },
        },
        {
          text: 'Created',
          value: 'created',
          groupable: false,
          type: Date,
          filters: [],
          component: {
            vType: 'v-data-table-date-picker',
            attrs: {
              'single-line': true,
              'hide-details': true,
              type: 'date',
            },
          },
        },
      ],
      items: [
        {
          id: 10,
          name: 'test-true',
          val: 15,
          active: true,
          created: '1975-08-01',
        },
        {
          id: 11,
          name: 'test-false',
          val: 15,
          active: false,
          created: '1975-08-02',
        },
        {
          id: 12,
          name: 'test-true',
          val: 18.5,
          active: true,
          created: '1975-08-03',
        },
        {
          id: 13,
          name: 'tent-false',
          val: 45.7,
          active: false,
          created: '1975-08-04',
        },
        {
          id: 14,
          name: 'tent-false',
          val: 15,
          active: false,
          created: '1975-08-05',
        },
        {
          id: 15,
          name: 'tent-true',
          val: 57,
          active: true,
          created: '1975-08-06',
        },
      ],
      componentKey: 0,
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
  },
  created() {
    this.setLoading(false)
  },
  methods: {
    itemComponentBlur(header, props, event) {
      console.log('Item Event:', event)
      console.log('Item Header:', header)
      console.log('Item Props:', JSON.stringify(props))
    },
    checkboxChange(header, props, event) {
      console.log('HEADER:', header)
      console.log('PROPS:', props)
      console.log('VALUE:', event)
    },
    ...mapActions(['setLoading']),
  },
}
</script>

<style></style>
