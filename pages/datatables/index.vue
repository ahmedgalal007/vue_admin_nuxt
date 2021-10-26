<template>
  <div>
    <v-switch v-model="isLoading"> </v-switch>
    <v-base-datatable
      :loading="isLoading"
      :items="items"
      :headers="headers"
      :table-options="{ groupBy: ['name'], itemsPerPage: 5 }"
    >
    </v-base-datatable>
  </div>
</template>

<script>
import vBaseDatatable from '~/components/datatables/v-base-datatable/data-table.vue'
export default {
  components: { vBaseDatatable },
  data: () => ({
    isLoading: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        groupable: true,
        value: 'name',
        type: String,
        component: {
          vType: 'v-text-field',
          attrs: {
            'single-line': true,
            'hide-details': true,
          },
        },
      },
      {
        text: 'Value',
        value: 'val',
        groupable: false,
        type: Number,
        component: {
          vType: 'v-text-field',
          attrs: {
            'single-line': true,
            'hide-details': true,
            type: 'number',
          },
        },
      },
    ],
    items: [
      { id: 10, name: 'test', val: 15 },
      { id: 11, name: 'test', val: 15 },
      { id: 12, name: 'test', val: 18.5 },
      { id: 13, name: 'tent', val: 45.7 },
      { id: 14, name: 'tent', val: 15 },
      { id: 15, name: 'tent', val: 57 },
    ],
  }),
}
</script>

<style></style>
