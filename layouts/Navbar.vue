<template>
  <mdb-navbar
    slot="nav"
    position="top"
    tag="div"
    :toggler="false"
    color="white"
    style="z-index: 2000"
    expand="medium"
  >
    <mdb-navbar-brand href="/" class="mr-3">
      <mdb-btn
        flat
        size="lg"
        dark-waves
        class="px-3 py-2 mr-2 d-none d-lg-inline"
        style="margin-left: -10px;"
        @click="toggleSidebar"
      >
        <mdb-icon icon="bars" class="black-text" />
      </mdb-btn>
      <img src="../assets/logo.png" height="60px" alt />
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item to="/" active>Home</mdb-nav-item>
        <mdb-nav-item to="/methodology">Methodology</mdb-nav-item>
        <mdb-nav-item to="/list">View data</mdb-nav-item>
      </mdb-navbar-nav>
      <mdb-form-inline>
        <mdb-input
          v-model="topQuery"
          class="mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          style="width: 250px"
        />
        <mdb-btn outline="primary" class="my-0" size="sm" @click="searchQuery"
          >Search</mdb-btn
        >
      </mdb-form-inline>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbNavbarBrand,
  mdbBtn,
  mdbIcon,
  mdbInput,
  mdbFormInline
} from 'mdbvue'

import { mapState } from 'vuex'

export default {
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbNavbarBrand,
    mdbBtn,
    mdbIcon,
    mdbInput,
    mdbFormInline
  },
  computed: {
    ...mapState({
      sidebarVisible: (state) => state.ui.sidebarVisible,
      slimIsCollapsed: (state) => state.ui.sidebarSlim
    })
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('ui/setSidebarVisibility', !this.sidebarVisible)
    },
    searchQuery() {
      this.$router.push({ name: 'list', query: { q: this.topQuery } })
    }
  },
  data() {
    return {
      topQuery: ''
    }
  }
}
</script>

<style>
.theme {
  color: #ee4428;
}
</style>
