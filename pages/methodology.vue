<template>
  <div class="container">
    <mdb-card v-html="$md.render(content)"></mdb-card>
  </div>
</template>

<script>
import { mdbCard } from 'mdbvue'

export default {
  name: 'Methogology',
  components: {
    mdbCard
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/methodology')
    return { content: data.Content }
  }
}
</script>

<style>
.container {
  min-height: 90vh;
}
</style>
