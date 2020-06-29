<template>
  <mdb-container class="navbar-offset" fluid>
    <mdb-row>
      <mdb-col col="10">
        <mdb-card>
          <mdb-row>
            <mdb-col col="">
              <mdb-input
                v-model.lazy="value"
                label="Search..."
                class="p-2 m-2"
                @change="loadArticles"
              />
            </mdb-col>
            <mdb-col class="d-flex align-items-stretch" col="auto">
              <button
                type="button"
                class="btn btn-primary btn-lg m-0"
                @click="helpModal = true"
              >
                <mdb-icon icon="question" />
              </button>
            </mdb-col>
            <mdb-col class="d-flex align-items-stretch" col="auto">
              <json-CSV :data="articles" class="btn btn-primary btn-lg m-0">
                <mdb-icon icon="file-csv" />
                Export page
              </json-CSV>
            </mdb-col>
          </mdb-row>
        </mdb-card>
      </mdb-col>
      <mdb-col col="2" class="d-flex align-items-stretch">
        <mdb-card class="text-center" style="width: 100%">
          <mdb-row>
            <mdb-col class="p-2">
              Results
            </mdb-col>
            <mdb-col class="p-2">
              {{ articles_count }}
            </mdb-col>
          </mdb-row>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="loading">
      <mdb-col class="pt-5 text-center" col="12">
        <mdb-spinner />
      </mdb-col>
    </mdb-row>
    <mdb-row
      v-for="article in articles"
      v-else
      :key="article.Id"
      ref="content"
      class="item"
    >
      <mdb-col col="12">
        <mdb-card class="mt-2">
          <mdb-card-body cascade>
            <mdb-row>
              <mdb-col col="8">
                <a
                  class="d-inline-flex"
                  target="_blank"
                  :href="'https://doi.org/' + article.doi"
                >
                  <mdb-card-title
                    ><strong>
                      <text-highlight v-if="query" :queries="query">
                        {{ article.Title }}
                      </text-highlight>
                      <div v-else>
                        {{ article.Title }}
                      </div>
                    </strong></mdb-card-title
                  >
                </a>
                <br />
                <a
                  href="#!"
                  @click="value = 'Authors:&quot;' + article.Authors + '&quot;'"
                >
                  {{ article.Authors }}
                </a>
                |
                <a
                  href="#!"
                  @click="value = 'Year:&quot;' + article.Year + '&quot;'"
                >
                  {{ article.Year }}
                </a>
                |
                <a
                  href="#!"
                  @click="value = 'Source:&quot;' + article.Source + '&quot;'"
                >
                  {{ article.Source }}
                </a>
                <mdb-card-text>
                  <text-highlight v-if="query" :queries="query">
                    <div class="text-justify">{{ article.Abstract }}</div>
                  </text-highlight>
                  <div v-else>
                    <div class="text-justify">{{ article.Abstract }}</div>
                  </div>
                </mdb-card-text>
              </mdb-col>
              <mdb-col col="4" class="text-right">
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
                    {{ article.keywords }}
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mt-2">
                  <mdb-col col="6">
                    <strong>Share</strong>
                  </mdb-col>
                  <mdb-col col="6">
                    <ShareNetwork
                      network="linkedin"
                      :url="url"
                      :title="article.Title"
                      class="px-2 fa-lg li-ic"
                    >
                      <mdb-icon fab icon="linkedin" />
                    </ShareNetwork>
                    <ShareNetwork
                      network="twitter"
                      :url="url"
                      :title="article.Title"
                      class="px-2 fa-lg li-ic"
                    >
                      <mdb-icon fab icon="twitter" />
                    </ShareNetwork>
                    <ShareNetwork
                      network="facebook"
                      :url="url"
                      :title="article.Title"
                      class="px-2 fa-lg li-ic"
                    >
                      <mdb-icon fab icon="facebook" />
                    </ShareNetwork>
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mt-2">
                  <mdb-col col class="text-right">
                    <mdb-btn
                      tag="a"
                      gradient="blue"
                      target="_blank"
                      :href="'https://openaccessbutton.org/?id=' + article.doi"
                      >Open <mdb-icon icon="unlock-alt" /> Access</mdb-btn
                    >
                  </mdb-col>
                  <mdb-col col class="text-right">
                    <button
                      class="btn btn-primary"
                      :disabled="loading"
                      @click="citation(article.doi)"
                    >
                      Citation
                    </button>
                  </mdb-col>
                </mdb-row>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <mdb-row class="my-2">
      <mdb-col col="12">
        <paginate
          :page-count="Math.floor(articles_count / 20)"
          :click-handler="loadArticles"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :next-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-link-class="'page-link'"
          :active-class="'active text-primary primary'"
        >
        </paginate>
      </mdb-col>
    </mdb-row>

    <mdb-modal :show="modal" :centered="true" @close="modal = false" size="lg">
      <mdb-modal-header />
      <mdb-modal-body>
        <mdb-input type="textarea" :value="citation_content" rows="6" />
        <mdb-btn color="primary" @click="citeFormat('bibliography', 'apa')"
          >APA</mdb-btn
        >
        <mdb-btn
          color="primary"
          @click="citeFormat('bibliography', 'vancouver')"
          >Vancouver</mdb-btn
        >
        <mdb-btn color="primary" @click="citeFormat('bibtex')">BibTex</mdb-btn>
        <mdb-btn color="primary" @click="citeFormat('data')">JSON</mdb-btn>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn v-mdb-clipboard="citation_content">Copy</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal
      remove-backdrop
      :show="helpModal"
      class="navbar-offset"
      @close="helpModal = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Search Queries</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        Title:keyword | Title:"multiple keywords"<br />
        Abstract:keyword | Abstract:"multiple keywords"<br />
        Authors:keyword | Authors:"multiple keywords"<br />
        Source:keyword | Source:"multiple keywords"<br />
        Subject:keyword | Subject:"multiple keywords"<br />
        Year:from year<br />
        Citations:minimum count<br />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn @click.native="helpModal = false">Close</mdb-btn>
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
  mdbModalHeader,
  mdbModalBody,
  mdbModalFooter,
  mdbClipboard,
  mdbSpinner
} from 'mdbvue'
import Cite from 'citation-js'
import TextHighlight from 'vue-text-highlight'
import _ from 'lodash'
import JsPDF from 'jspdf'
import Paginate from 'vuejs-paginate'
import JsonCSV from 'vue-json-csv'

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
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
    TextHighlight,
    mdbSpinner,
    Paginate,
    JsonCSV
  },
  directives: { mdbClipboard },
  fetch() {
    this.loadArticles()
  },
  mounted() {
    this.$store.dispatch('ui/setSidebarVisibility', true)
  },
  data(context) {
    return {
      value:
        this.$route.query.q && this.$route.query.q !== ''
          ? this.$route.query.q
          : '',
      query: '',
      modal: false,
      helpModal: false,
      citationObj: '',
      citation_content: '',
      articles: [],
      articles_count: 0,
      sort: '',
      url: 'https://cyber-guard.github.io/corruption-client/',
      loading: false
    }
  },
  fetchOnServer: false,
  watchQuery: ['q'],
  methods: {
    download() {
      const doc = new JsPDF()
      const contentHtml = this.$refs.content.innerHTML
      doc.fromHTML(contentHtml, 15, 15, {
        width: 170
      })
      doc.save('sample.pdf')
    },
    citeFormat(format, template) {
      const options = {
        format: 'text',
        lang: 'en-US'
      }

      if (template) {
        options.template = template
      }

      this.citation_content = this.citationObj.format(format, options)
    },
    async citation(doi) {
      const cite = await Cite.async(doi)
      this.modal = true
      this.citationObj = cite
      this.citation_content = cite.format('bibliography', {
        format: 'text',
        template: 'apa',
        lang: 'en-US'
      })
    },
    loadArticles: _.debounce(async function(page) {
      const fields = {
        Citations: 'Citations_gte',
        Title: 'Title_contains',
        Abstract: 'Abstract_contains',
        // Keywords: 'Keywords_contains',
        Authors: 'Authors_contains',
        Source: 'Source_contains',
        Type: 'Type_contains',
        Subject: 'Subject_contains',
        Years: 'Year',
        Year: 'Year'
      }

      const matches = this.value.match(/\\?.|^$/g).reduce(
        (p, c) => {
          if (c === '"') {
            p.quote ^= 1
          } else if (!p.quote && c === ' ') {
            p.a.push('')
          } else {
            p.a[p.a.length - 1] += c.replace(/\\(.)/, '$1')
          }
          return p
        },
        { a: [''] }
      ).a

      const limit = 20
      const start = page * 10 || 0
      const sort = this.sort || 'Year:desc'
      let queryString = ''
      const myParams = {
        _limit: limit,
        _start: start,
        _sort: sort
      }

      if (matches && matches.length) {
        matches.forEach((match) => {
          const fieldValue = match.split(':')

          if (fieldValue[1] && fieldValue[0] in fields) {
            if (fieldValue[1].match('-') && fieldValue[0] === 'Years') {
              const years = fieldValue[1].split('-')
              myParams.Year_gte = years[0]
              myParams.Year_lte = years[1]
            } else {
              myParams[fields[fieldValue[0]]] = fieldValue[1]
            }
          } else {
            queryString += fieldValue[0] ? fieldValue[0] + ' ' : ''
          }
        })
      }

      myParams.Abstract_contains = myParams.Abstract_contains || queryString
      myParams.Title_contains = myParams.Title_contains || queryString
      // myParams.Keywords_contains = myParams.Keywords_contains || queryString

      this.query = queryString
      this.loading = true
      const data = await this.$axios.$get('/articles', {
        params: myParams
      })
      const count = await this.$axios.$get('/articles/count', {
        params: myParams
      })
      this.articles_count = count
      this.articles = data
      this.loading = false
    }, 500)
  }
}
</script>
<style>
.navbar-offset {
  margin-top: 100px !important;
}

.md-form {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
