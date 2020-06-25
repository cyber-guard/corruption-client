export default {
  namespaced: true,
  state: {
    sidebarSlim: false,
    sidebarVisible: false,
    routeSidebarItems: {},
    clientInformationVisible: false,
    clientRelationshipsLeadsVisible: false
  },
  mutations: {
    setSidebarSlim(state, isSlim) {
      state.sidebarSlim = isSlim
    },
    setSidebarVisibility(state, isVisible) {
      state.sidebarVisible = isVisible
    },
    setRouteSidebarItems(state, items) {
      state.routeSidebarItems = items
    },
    setClientInformationVisible(state, isVisible) {
      state.clientInformationVisible = isVisible
    },
    setClientRelationshipsLeadsVisible(state, isVisible) {
      state.clientRelationshipsLeadsVisible = isVisible
    }
  },
  actions: {
    setSidebarSlim({ commit }, isSlim) {
      commit('setSidebarSlim', isSlim)
    },
    setSidebarVisibility({ commit }, isVisible) {
      commit('setSidebarVisibility', isVisible)
    }
  },
  getters: {}
}
