import request from './request.js';

const api = {
	getQuestions(data) {
		return request({
			url: '/api/Bandk/GetBanks',
			method: 'post',
			type: 'application/json',
			data
		})
	},
	login(data) {
		return request({
			url: '/api/HttpRequets/GetLoginCode',
			method: 'post',
			type: 'application/json',
			data
		})
	},
	getUserInfo(data) {
		return request({
			url: '/api/Login/GetUserInfo',
			method: 'post',
			type: 'application/json',
			data
		})
	},
	EditUserInfo(data) {
		return request({
			url: '/api/Login/UpdateUser',
			method: 'post',
			type: 'application/json',
			data
		})
	},
	getQuestionConfig(){
		return request({
			url: '/api/Bandk/GetbanksCount',
			method: 'get',
			type: 'application/json'
		})
	}
	
}

export default {
	...api
}
