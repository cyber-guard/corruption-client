<template>
  <Sidebar>
    <navbar slot="nav"></navbar>
    <div slot="main" class="app-layout-main">
      <nuxt />
    </div>
  </Sidebar>
</template>

<script>
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default {
  methods: {
    onResize() {
      this.$store.dispatch('ui/setSidebarVisibility', window.innerWidth > 1084)
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<style>
.app-layout-main {
  margin-top: 100px;
}
</style>
