<template>
  <div class="container">
    <mdb-card>
      <mdb-card-text class="p-5" v-html="$md.render(content)"></mdb-card-text>
    </mdb-card>
  </div>
</template>

<script>
import { mdbCard, mdbCardText } from 'mdbvue'

export default {
  name: 'Methogology',
  components: {
    mdbCard,
    mdbCardText
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
