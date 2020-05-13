<template>
  <mdb-container class="navbar-offset" fluid>
    <mdb-row>
      <mdb-col col="12">
        <mdb-datatable-2 v-model="data" striped bordered arrows :display="3" />
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbDatatable2 } from 'mdbvue'

export default {
  name: 'DatatablePage',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbDatatable2
  },
  data() {
    return {
      columns: [],
      rows: []
    }
  },
  computed: {
    data() {
      return {
        columns: ['Title', 'Abstract'].map((key) => ({
          label: key.toUpperCase(),
          field: key,
          sort: true
        })),
        rows: this.rows
      }
    }
  },
  mounted() {
    fetch('https://arcane-waters-24161.herokuapp.com/articles')
      .then((res) => res.json())
      .then((json) => {
        const keys = ['_id', 'Title', 'Abstract']
        const entries = this.filterData(json, keys)
        entries.map((entry) => {
          return this.rows.push(entry)
        })
      })
      .catch((err) => console.log(err))
  },
  methods: {
    filterData(dataArr, keys) {
      const data = dataArr.map((entry) => {
        const filteredEntry = {}
        keys.forEach((key) => {
          if (key in entry) {
            filteredEntry[key] = entry[key]
          }
        })
        return filteredEntry
      })
      return data
    }
  }
}
</script>
<style>
.navbar-offset {
  margin-top: 100px !important;
}
</style>
