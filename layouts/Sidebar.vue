<template>
  <mdb-side-nav-2
    :value="sidebarVisible"
    :width="350"
    :duration="0"
    sidenav-class="white text-left sidebar h-100"
    :backdrop="false"
    color="grey-text"
  >
    <div slot="content">
      <div class="mt-2">
        <mdb-input v-model="title" label="Title" size="sm" />
        <mdb-input v-model="abstract" label="Abstract" size="sm" />
        <mdb-input v-model="authors" label="Authors" size="sm" />
        <mdb-input v-model="source" label="Source" size="sm" />
        <mdb-input v-model="type" label="Type" size="sm" />
        <mdb-input v-model="keywords" label="Keywords" size="sm" />
        Year
        <vue-slider class="mx-2" v-model="year" v-bind="optionsYear" />
        Citations
        <vue-slider class="mx-2" v-model="citations" v-bind="optionsCit" />
        <mdb-btn color="primary" @click="searchQuery">Search</mdb-btn>
        <mdb-btn color="grey" @click="resetQuery">Reset</mdb-btn>
      </div>
    </div>
    <template slot="nav">
      <slot name="nav"></slot>
    </template>
    <template slot="main">
      <slot name="main"></slot>
    </template>
  </mdb-side-nav-2>
</template>

<script>
import { mdbSideNav2, mdbInput, mdbBtn } from 'mdbvue'
import { mapState } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    mdbSideNav2,
    mdbInput,
    mdbBtn,
    VueSlider
  },
  computed: {
    ...mapState({
      sidebarSlim: (state) => state.ui.sidebarSlim,
      sidebarVisible: (state) => state.ui.sidebarVisible,
      routeSidebarItems: (state) => state.ui.routeSidebarItems
    }),

    displaySidebarItems() {
      let output = this.groupsContent

      if (
        this.routeSidebarItems.data &&
        this.routeSidebarItems.data.length > 0
      ) {
        output = [...this.groupsContent, this.routeSidebarItems]
      }
      return output
    }
  },
  methods: {
    setSidebarVisibility(slim) {
      this.$store.dispatch('ui/setSidebarSlim', slim)
    },
    searchQuery() {
      let totalQuery = ''
      totalQuery = this.title
        ? totalQuery + `Title:"${this.title}" `
        : totalQuery
      totalQuery = this.abstract
        ? totalQuery + `Abstract:"${this.abstract}" `
        : totalQuery
      totalQuery = this.authors
        ? totalQuery + `Authors:"${this.authors}" `
        : totalQuery
      totalQuery = this.source
        ? totalQuery + `Source:"${this.source}" `
        : totalQuery
      totalQuery = this.type ? totalQuery + `Type:"${this.type}" ` : totalQuery
      totalQuery = this.keywords
        ? totalQuery + `Keywords:"${this.keywords}" `
        : totalQuery

      totalQuery = totalQuery + `Years:${this.year[0]}-${this.year[1]} `
      totalQuery = totalQuery + `Citations:${this.citations} `
      this.$router.push({ name: 'list', query: { q: totalQuery } })
    },
    resetQuery() {
      this.title = ''
      this.abstract = ''
      this.authors = ''
      this.source = ''
      this.type = ''
      this.keywords = ''
      this.year = [1900, 2020]
      this.citations = 0
      this.$router.push({ name: 'list' })
    }
  },
  data() {
    return {
      title: '',
      abstract: '',
      authors: '',
      source: '',
      type: '',
      keywords: '',
      citations: 0,
      year: [1900, 2020],
      optionsYear: {
        min: 1900,
        max: 2020,
        dotSize: 14,
        width: 'auto',
        height: 10,
        contained: false,
        direction: 'ltr',
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: 0,
        maxRange: 0,
        order: true,
        marks: false,
        process: true
      },
      optionsCit: {
        min: 0,
        max: 1000,
        dotSize: 14,
        width: 'auto',
        height: 10,
        contained: false,
        direction: 'ltr',
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: 0,
        maxRange: 0,
        order: true,
        marks: false,
        process: true
      }
    }
  }
}
</script>

<style>
.sidebar {
  margin-top: 80px;
}

#app div.mdbvue-sidenav {
  top: 58px;
}

.mdbvue-sidenav * {
  white-space: nowrap;
}
</style>
