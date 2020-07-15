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
                class="btn btn-primary btn-lg"
                @click="helpModal = true"
              >
                <mdb-icon icon="question" />
              </button>
            </mdb-col>
            <mdb-col class="d-flex align-items-stretch" col="auto">
              <json-CSV
                :fields="[
                  'Authors',
                  'docnumber',
                  'Title',
                  'Abstract',
                  'Link',
                  'doi',
                  'Year',
                  'Publisher',
                  'Citations',
                  'Type',
                  'Source',
                  'subjects',
                  'keywords'
                ]"
                :data="articles"
                class="btn btn-primary btn-lg"
              >
                <mdb-icon icon="file-csv" />
                Export page
              </json-CSV>
            </mdb-col>
          </mdb-row>
        </mdb-card>
      </mdb-col>
      <mdb-col col="2" class="d-flex align-items-stretch">
        <mdb-card
          class="justify-content-center align-items-center"
          style="width: 100%"
        >
          <mdb-row>
            <mdb-col>
              Results
            </mdb-col>
            <mdb-col>
              <b>{{ articles_count }}</b>
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
              <mdb-col col="9">
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
                  :key="author"
                  v-for="(author, index) in article.Authors"
                  href="#!"
                  @click="value = 'Authors:&quot;' + author + '&quot;'"
                  style="display:inline"
                >
                  {{ author }}
                  <div
                    v-if="index !== article.Authors.length - 1"
                    style="display:inline"
                  >
                    ,
                  </div>
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
                  <div class="text-justify">
                    <div v-if="query">
                      <text-highlight :queries="query">
                        {{ article.Abstract }}
                      </text-highlight>
                    </div>
                    <div v-else>{{ article.Abstract }}</div>
                    <a
                      href="#!"
                      :key="keyword + '-' + article.id"
                      v-for="keyword in article.keywords"
                      @click="value = 'Keywords:&quot;' + keyword + '&quot;'"
                    >
                      <mdb-badge color="primary" class="mt-2 ml-2">
                        <mdb-icon icon="key" size="2x" />
                        {{ keyword }}
                      </mdb-badge>
                    </a>
                  </div>
                </mdb-card-text>
              </mdb-col>
              <mdb-col col="3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" style="border: none;">
                    <div v-if="article.subjects && article.subjects.length > 0">
                      <strong>Subject</strong>
                      <a
                        :key="subject"
                        v-for="subject in article.subjects"
                        href="#!"
                        @click="value = 'Subject:&quot;' + subject + '&quot;'"
                      >
                        <mdb-badge color="primary" class="mr-1">
                          {{ subject }}
                        </mdb-badge>
                      </a>
                    </div>
                  </li>
                  <li class="list-group-item" style="border: none;">
                    <strong>Type</strong>
                    <a
                      href="#!"
                      @click="value = 'Type:&quot;' + article.Type + '&quot;'"
                    >
                      <mdb-badge color="primary">
                        {{ article.Type }}
                      </mdb-badge>
                    </a>
                  </li>
                  <li class="list-group-item" style="border: none;">
                    <strong>Citations</strong>
                    <mdb-badge color="primary">
                      {{ article.Citations }}
                    </mdb-badge>
                  </li>
                </ul>
                <mdb-row class="mt-2">
                  <mdb-col col class="text-center">
                    <mdb-btn
                      tag="a"
                      gradient="blue"
                      target="_blank"
                      class="article-btn"
                      :href="'https://openaccessbutton.org/?id=' + article.doi"
                      >Open <mdb-icon icon="unlock-alt" /> Access</mdb-btn
                    >
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mt-2">
                  <mdb-col col class="text-center">
                    <button
                      class="btn btn-primary article-btn"
                      :disabled="loading"
                      @click="citation(article.doi)"
                    >
                      Citation
                    </button>
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mt-2 text-center">
                  <mdb-col>
                    <ShareNetwork
                      network="linkedin"
                      :url="url"
                      :title="article.Title"
                      class="px-2 li-ic fa-3x"
                    >
                      <mdb-icon fab icon="linkedin" />
                    </ShareNetwork>
                    <ShareNetwork
                      network="twitter"
                      :url="url"
                      :title="article.Title"
                      class="px-2 li-ic fa-3x"
                    >
                      <mdb-icon fab icon="twitter" />
                    </ShareNetwork>
                    <ShareNetwork
                      network="facebook"
                      :url="url"
                      :title="article.Title"
                      class="px-2 li-ic fa-3x"
                    >
                      <mdb-icon fab icon="facebook" />
                    </ShareNetwork>
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
          :page-count="Math.ceil(articles_count / 20)"
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
  mdbSpinner,
  mdbBadge
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
    mdbBadge,
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
        Title: 'Title',
        Abstract: 'Abstract',
        Keywords: 'keywords',
        Authors: 'Authors',
        Source: 'Source',
        Type: 'Type',
        Subject: 'Subject',
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

      console.log(matches)

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
          } else if (fieldValue[0]) {
            queryString += fieldValue[0].match(/\s/)
              ? '"' + fieldValue[0] + '"'
              : fieldValue[0]
            queryString += ' '
          }
        })
      }

      // myParams.Abstract = myParams.Abstract || queryString
      // myParams.Title = myParams.Title || queryString
      // myParams.Keywords = myParams.Keywords || queryString
      queryString = queryString.trim()
      myParams.q = queryString

      this.query = queryString
      this.loading = true
      const data = await this.$axios.$get('/articles/searchAll', {
        params: myParams
      })
      this.articles = data.data
      this.articles_count = data.count
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

.list-group-item > strong,
.list-group-item > div > strong {
  display: inline-block;
  width: 100px;
  text-align: left;
}

.article-btn {
  min-width: 250px;
}
</style>
