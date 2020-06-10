export default {
  namespaced: true,
  state: {
    sidebarSlim: true,
    sidebarVisible: true,
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
    },
    setRouteSidebarItems({ commit }, items) {
      commit('setRouteSidebarItems', items)
    },
    setClientInformationVisible({ commit }, isVisible) {
      commit('setClientInformationVisible', isVisible)
    },
    setClientRelationshipsLeadsVisible({ commit }, isVisible) {
      commit('setClientRelationshipsLeadsVisible', isVisible)
    }
  },
  getters: {}
}
