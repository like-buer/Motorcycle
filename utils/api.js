import request from './request.js';



const api = {
	getQuestions(data) {
		return request({
			url: '/api/Bandk/GetBanks',
			method: 'post',
			type: 'application/json',
			data
		})
	}
}

export default {
	...api
}
