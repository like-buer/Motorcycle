import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import user from './modules/user.js'


import getters from './getter.js'

const store = new Vuex.Store({
	modules: {
		user
	},
	getters
})


console.log(store)


export default store
