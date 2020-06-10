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
        darkWaves
        class="px-3 py-2 mr-2 d-none d-lg-inline"
        style="margin-left: -10px;"
        @click="toggleSidebar"
      >
        <mdb-icon icon="bars" class="black-text" />
      </mdb-btn>
      <img src="../assets/logo.png" height="30px" alt />
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item href="/corruption-client" active>Home</mdb-nav-item>
        <mdb-nav-item href="/corruption-client/methodology"
          >Methodology</mdb-nav-item
        >
        <mdb-nav-item href="/corruption-client/list">View data</mdb-nav-item>
      </mdb-navbar-nav>
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
  mdbIcon
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
    mdbIcon
  },
  computed: {
    ...mapState({
      slimIsCollapsed: (state) => state.ui.sidebarSlim
    })
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('ui/setSidebarSlim', !this.slimIsCollapsed)
    }
  },
  data() {
    return {
      clientAccount: [
        {
          name: 'Regional Key Accounts',
          children: [
            { name: 'ThyssenKrupp', url: '#', to: '/client' },
            { name: 'Enbridge', url: '#', to: '/client' },
            { name: 'Liberty Gobal', url: '#', to: '/client' }
          ]
        },
        {
          name: 'Regional Prioriry Accounts',
          children: [
            { name: 'Arkema', url: '#', to: '/client' },
            { name: 'AXA', url: '#', to: '/client' },
            { name: 'Engie', url: '#', to: '/client' },
            { name: 'Gfk', url: '#', to: '/client' },
            { name: 'Lactais', url: '#', to: '/client' },
            { name: 'KKR', url: '#', to: '/client' },
            { name: 'Servier', url: '#', to: '/client' }
          ]
        },
        {
          name: 'Accelerator Accounts',
          children: [
            { name: 'Air Products', url: '#', to: '/client' },
            { name: 'Bosch', url: '#', to: '/client' },
            { name: 'Deutsche Bahn', url: '#', to: '/client' },
            { name: 'Honeywell', url: '#', to: '/client' },
            { name: 'Landis + Gyr', url: '#', to: '/client' },
            { name: 'Shawcor', url: '#', to: '/client' },
            { name: 'TUI', url: '#', to: '/client' },
            { name: 'UniCredit', url: '#', to: '/client' },
            { name: 'Yamaha', url: '#', to: '/client' }
          ]
        },
        {
          name: 'Sector Priority Accounts',
          children: [
            { name: 'Eni', url: '#', to: '/client' },
            { name: 'Flex', url: '#', to: '/client' },
            { name: 'Stadler', url: '#', to: '/client' },
            { name: 'UniCredit', url: '#', to: '/client' }
          ]
        },
        {
          name: 'Local Priority Accounts',
          children: [
            {
              name: 'Netherlands',
              children: [{ name: 'ING', url: '#', to: '/client' }]
            }
          ]
        }
      ],

      articleCategories: [
        {
          name: 'Guidelines and Key Policies',
          children: [
            { name: 'Working together', url: '#', to: '/article' },
            { name: 'Conflicts', url: '#', to: '/article' },
            { name: 'Credit sharing', url: '#', to: '/article' },
            { name: 'Pricing and global billing', url: '#', to: '/article' },
            { name: 'Confidential clients', url: '#', to: '/article' },
            { name: 'Client agreements', url: '#', to: '/article' }
          ]
        },
        {
          name: 'Client listening',
          children: [
            { name: 'PSG Program (Europe)', url: '#', to: '/article' },
            { name: 'Country Program (Europe)', url: '#', to: '/article' },
            {
              name: "The benefits of client's listening and how to use it",
              url: '#',
              to: '/article'
            },
            { name: 'Country program (Europe)', url: '#', to: '/article' }
          ]
        },
        {
          name: 'Digital and innovation',
          children: [
            {
              name: 'Beyond the law client solutions',
              url: '#',
              to: '/article'
            },
            { name: 'Innovation Ambassadors', url: '#', to: '/article' }
          ]
        },
        {
          name: 'Key Client Initiatives',
          children: [
            { name: 'NextClient: About the program', url: '#', to: '/article' },
            {
              name: 'About NextClient: Sector Accounts',
              url: '#',
              to: '/article'
            },
            { name: 'Project Bridge Accounts', url: '#', to: '/article' },
            {
              name: 'About NextClient: Accelerator Accounts',
              url: '#',
              to: '/article'
            },
            {
              name: 'About NextClient: Local Priority Accounts',
              url: '#',
              to: '/article'
            }
          ]
        },
        {
          name: 'About NextClient',
          children: []
        }
      ]
    }
  }
}
</script>

<style>
.theme {
  color: #ee4428;
}
</style>
