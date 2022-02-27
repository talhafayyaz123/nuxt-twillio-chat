export const state = () =>({
    loading: 0,
    type: ''
});

export const mutations = {
    success(state, type) {
        state.loading = 1;
        state.type = type;
    },
    error(state, message) {
        state.type = 'danger';
        state.message = message;
    },
    clear(state,type) {
        state.loading = 0;
        state.type = type;
    }
};

export const actions = {
    success({ commit }, type) {
        commit('success', type);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit },type) {
        commit('clear',type);
    }
    
};

export const getters={

     getSpinner: (state)=>(type)=>{
         return state.find(list=> list.type===type).loading
     }

     

}
