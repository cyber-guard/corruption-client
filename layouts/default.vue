<template>
  <div v-mdb-resize:start="checkWidth">
    <mdb-side-nav-2
      v-model="show"
      :data="navigation"
      color="white"
      :over="over"
      :sidenav-class="['grey', 'darken-3', 'mt-5']"
    >
      <mdb-navbar
        slot="nav"
        tag="div"
        position="top"
        color="teal"
        class="darken-4"
        dark
        :toggler="false"
        :style="{ zIndex: '1061' }"
      >
        <mdb-navbar-nav left>
          <mdb-icon
            icon="bars"
            class="white-text"
            size="sm"
            @click.native="show = !show"
          />
        </mdb-navbar-nav>
        <mdb-navbar-nav class="nav-flex-icons" left>
          <mdb-nav-item to="/" waves-fixed icon="code-branch"
            ><span class="ml-1">Home</span></mdb-nav-item
          >
          <mdb-nav-item to="/methodology" waves-fixed icon="eye"
            ><span class="ml-1">Methodology</span></mdb-nav-item
          >
          <mdb-nav-item to="/list" waves-fixed icon="file-code" far
            ><span class="ml-1">Data</span></mdb-nav-item
          >
        </mdb-navbar-nav>
      </mdb-navbar>

      <div slot="main" style="width: 100%" class="view">
        <nuxt />
      </div>
      <footer slot="footer">
        Copyright 2020
      </footer>
    </mdb-side-nav-2>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbSideNav2,
  mdbIcon,
  mdbResize
} from 'mdbvue'

export default {
  name: 'DoubleNavigationPagev1',
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbSideNav2,
    mdbIcon
  },
  directives: {
    mdbResize
  },
  data() {
    return {
      show: false,
      over: false,
      navigation: [
        {
          name: 'View data',
          icon: 'bars',
          children: [
            {
              name: 'Version 1',
              to: '/navigation/pro/double-navigation-v1'
            },
            {
              name: 'Version 2',
              to: '/navigation/pro/double-navigation-v2'
            },
            {
              name: 'Version 3',
              to: '/navigation/pro/double-navigation-v3'
            },
            {
              name: 'Version 4',
              to: '/navigation/pro/double-navigation-v4'
            },
            {
              name: 'Version 5',
              to: '/navigation/pro/double-navigation-v5'
            },
            {
              name: 'Version 6',
              to: '/navigation/pro/double-navigation-v6'
            }
          ]
        },
        {
          name: 'Getting started',
          icon: 'mdb',
          fab: true,
          children: [
            {
              name: 'Quick start',
              href:
                'https://mdbootstrap.com/docs/vue/getting-started/quick-start/'
            },
            {
              name: 'Technical Support',
              href: 'https://mdbootstrap.com/support/'
            }
          ]
        },
        {
          name: 'Documentation',
          icon: 'graduation-cap',
          href: 'https://mdbootstrap.com/docs/vue/'
        }
      ]
    }
  },
  methods: {
    checkWidth() {
      this.over = window.innerWidth < 900
    }
  }
}
</script>

<style scoped>
.view {
  background-color: azure;
}
.navbar i {
  cursor: pointer;
  color: '#123123';
}
</style>
