import { getFirebaseBackend } from '../helpers/firebase/authUtils'

export const state = () => ({
    currentUser: sessionStorage.getItem('authUser'),
});

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().loginUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-unused-vars
            getFirebaseBackend().logout().then((response) => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    },

    // register the user
        register({ commit },payload) {
        return new Promise((resolve, reject) => {
        this.$axios
          .post(`register`, payload)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
  },
  updateInfluencer({ commit },payload) {
        return new Promise((resolve, reject) => {
        this.$axios
          .post(`update-influencer`, payload)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
      updateUser({ commit },payload) {
        return new Promise((resolve, reject) => {
        this.$axios
          .post(`update-profile`, payload)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  createInfluencer({ commit },payload) {
        return new Promise((resolve, reject) => {
        this.$axios
          .post(`create-influencer`, payload)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getInfluencers({ commit }) {
        return new Promise((resolve, reject) => {

        this.$axios
          .get(`get-influencers`)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

    getInfluencersDropdowns({ commit }) {
        return new Promise((resolve, reject) => {
        this.$axios
          .get(`get-influencers-dropdowns`)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

  getUserDetail({ commit },payload) {
        return new Promise((resolve, reject) => {
        this.$axios
          .get(`users/`+payload.uuid)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
  },

  getUserstats({ commit },payload) {
        return new Promise((resolve, reject) => {
        this.$axios
          .post(`msg-tracking/`)
          .then(response => {

            resolve(response)
          })
          .catch(error => reject(error))
      })
    },


  createTwilioNumber({ commit },payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`buy-twillio-numbers/1/`+payload.country_id+'/'+payload.state)
        .then(response => {

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
  isValidReference({ commit },id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`is-valid-reference/`+id)
        .then(response => {

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

    // register the user
    // eslint-disable-next-line no-unused-vars
    resetPassword({ commit, dispatch, getters }, { email } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().forgetPassword(email).then((response) => {
            const message = response.data
            return message
        });
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        const user = getFirebaseBackend().getAuthenticatedUser();
        commit('SET_CURRENT_USER', user)
        return user;
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
