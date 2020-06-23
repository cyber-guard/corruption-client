<template>
  <mdb-side-nav-2
    :value="sidebarVisible"
    :data="displaySidebarItems"
    :slim-collapsed="sidebarSlim"
    groups
    slim
    :width="350"
    :duration="0"
    sidenav-class="white text-left sidebar h-100"
    :backdrop="false"
    color="grey-text"
    @toggleSlim="setSidebarVisibility"
  >
    <template slot="nav">
      <slot name="nav"></slot>
    </template>
    <template slot="main">
      <slot name="main"></slot>
    </template>
  </mdb-side-nav-2>
</template>

<script>
import { mdbSideNav2 } from 'mdbvue'
import { mapState } from 'vuex'

export default {
  components: {
    mdbSideNav2
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
    }
  },
  data() {
    return {
      groupsContent: [
        {
          data: [
            {
              name: 'Home',
              icon: 'home',
              to: '/'
            },
            {
              name: 'List View',
              icon: 'list-alt',
              to: '/list'
            },
            {
              name: 'Visualization',
              icon: 'chart-bar',
              to: '/visual'
            }
          ]
        }
      ]
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
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
