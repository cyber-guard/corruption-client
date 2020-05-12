<template>
  <mdb-container>
    <mdb-row>
      <mdb-col col="12">
        <mdb-card class="mt-5">
          <mdb-input
            v-model="value"
            label="Search..."
            size="lg"
            class="p-2 m-2"
            @input="$fetch"
          />
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <mdb-row v-for="article in articles" :key="article" class="item">
      <mdb-col col="12">
        <mdb-card class="mt-2">
          <mdb-card-body cascade>
            <mdb-row>
              <mdb-col col="8">
                <mdb-card-title
                  ><strong>{{ article.Title }}</strong></mdb-card-title
                >
                <h5 class="indigo-text">
                  <strong
                    >{{ article.Author }}, {{ article.Year }},
                    {{ article.Source }}</strong
                  >
                </h5>
                <mdb-card-text>{{ article.Abstract }}</mdb-card-text>
              </mdb-col>
              <mdb-col col="4">
                <mdb-card-title><strong>Share</strong></mdb-card-title>
                <a class="px-2 fa-lg li-ic"> <mdb-icon fab icon="linkedin"/></a>
                <a class="px-2 fa-lg tw-ic"> <mdb-icon fab icon="twitter"/></a>
                <a class="px-2 fa-lg fb-ic"> <mdb-icon fab icon="facebook"/></a>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbIcon,
  mdbInput,
  mdbCard,
  mdbCardText,
  mdbCardBody,
  mdbCardTitle
} from 'mdbvue'
export default {
  name: 'Input',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbInput,
    mdbCard,
    mdbCardText,
    mdbCardBody,
    mdbCardTitle
  },
  async fetch() {
    const data = await this.$axios.$get('/articles', {
      params: {
        _limit: 10,
        Abstract_contains: this.value,
        Title_contains: this.value
      }
    })
    this.articles = data
  },
  fetchOnServer: false,
  data() {
    return {
      value: '',
      articles: []
    }
  }
}
</script>
