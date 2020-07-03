<template>
  <div class="container">
    <mdb-card>
      <mdb-card-text class="p-5" v-html="content"></mdb-card-text>
    </mdb-card>
  </div>
</template>

<script>
import { mdbCard, mdbCardText } from 'mdbvue'

export default {
  name: 'Home',
  components: {
    mdbCard,
    mdbCardText
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/home')
    return { content: data.Content }
  },
  mounted() {
    this.$store.dispatch('ui/setSidebarVisibility', false)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 32;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
