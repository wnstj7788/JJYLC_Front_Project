
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
        account: {
            email: ""
        }
    }
  },
  mutations: {
    setAccount(state, payload){
        state.account.email = payload;
    }
  }
})

export default store;