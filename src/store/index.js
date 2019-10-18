import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import mutations from './mutations'

Vue.use(Vuex)


const state = {
    cartList:[]
}

export default new Vuex.Store({
  state,
  mutations,
  strict:true,
  plugins:[logger()],
  // actions
})