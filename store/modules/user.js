

import api from '@/utils/api.js';
import toast from '@/utils/toast.js'

const state = {
	token: uni.getStorageSync('token') || '',
	userInfo: {}
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
		uni.setStorageSync('token', token)
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo;
	}
}

const actions = {
	login({ commit }, user) {
		return new Promise((reslove,reject) => {
			api.login({ ...user }).then(res => {
				commit('SET_TOKEN', res.Data.Token)
				reslove()
			}).catch(err => {
				commit('SET_TOKEN', '')
				commit('SET_USERINFO', {})
				reject()
			})
		})
	},
	getUserInfo({ commit }) {
		return new Promise((reslove, reject) => {
			api.getUserInfo().then(res => {
				commit('SET_USERINFO', res.Data)
				reslove()
			}).catch(err => {
				commit('SET_TOKEN', '')
				commit('SET_USERINFO', {})
				reject()
			})
		})
	},
	getUserPofile({ commit }){
		uni.getUserProfile({
			desc: '用于完善会员资料',
			success: res => {
				api.EditUserInfo({
					Imgurl: res.userInfo.avatarUrl,
					Name: res.userInfo.nickName
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
