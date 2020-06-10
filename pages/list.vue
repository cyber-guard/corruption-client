<template>
  <mdb-container v-mdb-infite-scroll="loadArticles" class="navbar-offset" fluid>
    <mdb-row>
      <mdb-col col="10">
        <mdb-card>
          <mdb-input
            v-model="value"
            @input="loadArticles"
            label="Search..."
            size="lg"
            class="p-2 m-2"
          />
        </mdb-card>
      </mdb-col>
      <mdb-col col="2">
        <button class="btn btn-primary">{{ articles_count }}</button>
      </mdb-col>
    </mdb-row>
    <mdb-row v-for="article in articles" :key="article.Id" class="item">
      <mdb-col col="12">
        <mdb-card class="mt-2">
          <mdb-card-body cascade>
            <mdb-row>
              <mdb-col col="8">
                <mdb-card-title
                  ><strong>
                    <text-highlight :queries="value">
                      {{ article.Title }}
                    </text-highlight>
                  </strong></mdb-card-title
                >
                <h5 class="indigo-text">
                  <strong
                    >{{ article.Authors }}, {{ article.Year }},
                    {{ article.Source }}</strong
                  >
                </h5>
                <mdb-card-text>{{ article.Abstract }}</mdb-card-text>
              </mdb-col>
              <mdb-col col="4">
                <mdb-row>
                  <mdb-col col="6">
                    <strong>Subject</strong>
                  </mdb-col>
                  <mdb-col col="6">
                    {{ article.Subject }}
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col col="6">
                    <strong>Type</strong>
                  </mdb-col>
                  <mdb-col col="6">
                    {{ article.Type }}
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col col="6">
                    <strong>Citations</strong>
                  </mdb-col>
                  <mdb-col col="6">
                    {{ article.Citations }}
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col col="6">
                    <strong>Keywords</strong>
                  </mdb-col>
                  <mdb-col col="6">
                    N/A
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mt-2">
                  <mdb-col col="6">
                    <strong>Share</strong>
                  </mdb-col>
                  <mdb-col col="6">
                    <a class="px-2 fa-lg li-ic">
                      <mdb-icon fab icon="linkedin"
                    /></a>
                    <a class="px-2 fa-lg tw-ic">
                      <mdb-icon fab icon="twitter"
                    /></a>
                    <a class="px-2 fa-lg fb-ic">
                      <mdb-icon fab icon="facebook"
                    /></a>
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mt-2">
                  <mdb-col col="6" class="text-center">
                    <button
                      class="btn btn-primary"
                      :disabled="loading"
                      @click="citation(article.OA)"
                    >
                      Citation
                    </button>
                  </mdb-col>
                  <mdb-col col="6" class="text-center" v-html="article.OA">
                    {{ article.OA }}
                  </mdb-col>
                </mdb-row>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <mdb-modal :show="modal" :centered="true" @close="modal = false">
      <mdb-modal-body v-html="citation_content">{{
        citation_content
      }}</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
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
  mdbCardTitle,
  mdbBtn,
  mdbModal,
  mdbModalBody,
  mdbModalFooter,
  mdbInfiniteScroll
} from 'mdbvue'
import Cite from 'citation-js'
import TextHighlight from 'vue-text-highlight'
import _ from 'lodash'

export default {
  name: 'ListOfValues',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbInput,
    mdbCard,
    mdbCardText,
    mdbCardBody,
    mdbCardTitle,
    mdbBtn,
    mdbModal,
    mdbModalBody,
    mdbModalFooter,
    TextHighlight
  },
  directives: { mdbInfiniteScroll },
  async fetch() {
    const data = await this.$axios.$get('/articles', {
      params: {
        _limit: 10,
        Abstract_contains: this.value,
        Title_contains: this.value
      }
    })
    const count = await this.$axios.$get('/articles/count', {
      params: {
        Abstract_contains: this.value,
        Title_contains: this.value
      }
    })
    this.articles_count = count
    this.articles = data
  },
  fetchOnServer: false,
  data(context) {
    return {
      value: '',
      modal: false,
      citation_content: '',
      articles: [],
      articles_count: 0,
      loading: false
    }
  },
  methods: {
    async citation(url) {
      this.loading = true
      const doi = url.match(/href=".*?\?url=(.*?)"/)
      const cite = await Cite.async(doi[1])
      this.modal = true
      this.citation_content = cite.format('bibliography', {
        format: 'html',
        template: 'apa',
        lang: 'en-US'
      })
      this.loading = false
    },
    loadArticles: _.debounce(async function(e) {
      const data = await this.$axios.$get('/articles', {
        params: {
          _limit: 10,
          Abstract_contains: this.value,
          Title_contains: this.value
        }
      })
      const count = await this.$axios.$get('/articles/count', {
        params: {
          Abstract_contains: this.value,
          Title_contains: this.value
        }
      })
      // this.articles.push(data)
      this.articles_count = count
      this.articles = data
    }, 500)
  }
}
</script>
<style>
.navbar-offset {
  margin-top: 100px !important;
}
</style>
