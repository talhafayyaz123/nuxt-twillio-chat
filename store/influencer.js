
export const state = () => ({});

export const mutations = {
}

export const getters = {
}

export const actions = {


  getInfluencerDashboardInfo({ commit }) {
    return new Promise((resolve, reject) => {

      this.$axios
        .get(`get_influencer_dashboard_info`)
        .then(response => {

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(state))
  }
}
