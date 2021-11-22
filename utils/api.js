import request from './request.js';



const api = {
	getQuestions(data) {
		return request({
			url: '/Bandk/GetBanks',
			method: 'get',
			type: 'application/json',
			data
		})
	}
}

export default {
	...api
}
