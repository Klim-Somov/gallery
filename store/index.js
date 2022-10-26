import axios from 'axios'

export const state = () => ({
  isAdmin: false,
  showModal: false,
  artsIds: [],
  arts: [],
})

export const getters = {
  getIsAdmin(state) {
    return state.isAdmin
  },
  getShowModal(state) {
    return state.showModal
  },
  getArtsIds(state) {
    return state.artsIds
  },
  getArts(state) {
    return state.arts
  },
}

export const mutations = {
  toggleIsAdmin(state) {
    state.isAdmin = !state.isAdmin
  },
  setShowModal(state) {
    state.showModal = !state.showModal
  },

  setIds(state, payload) {
    state.artsIds = payload
  },
  setArts(state, payload) {
    state.arts = payload
  },
}

export const actions = {
  async getArtsFromApi({ commit, state }) {
    const { data } = await axios.get(
      'https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&hasImages=true&q=pictures'
    )
    commit('setIds', data.objectIDs)
    const res = await state.artsIds
      .slice(0, 30)
      .map((id) =>
        axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
      )
    const resArr = []
    await Promise.all(res).then((res) =>
      res.forEach((res) => {
        resArr.push(res.data)
      })
    )
    commit('setArts', resArr)
  },
}
