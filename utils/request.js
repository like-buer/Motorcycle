/**
 * 请求工具类
 * wangfei
 * 2021年7月2日09:42:19
 */

export default __self => {
	console.log(`当前环境：${process.env.NODE_ENV}`)
	
	// 定义当前环境
	let isdev = process.env.NODE_ENV === 'development';
	const BASEURL = getApp().globalData.apiUrl;

	// 定义请求实体类
	let params = {
		// timeout: 10000, // 超时时间
	}

	let { url, method, type, data, query, file, inData } = __self;

	// URL
	params.url = BASEURL + url;
	// METHOD
	params.method = method.toLocaleUpperCase();
	// DATA
	params.data = data;

	// 请求格式
	let header = {
		"content-type": type || 'application/json',
		"source": "miniprogram"
	}
	
	
	// let sign = uni.getStorageSync('sign');
	// if (sign) {
	// 	header.sign = sign
	// }

	params.header = header;

	return new Promise((reslove, reject) => {
		uni.request(Object.assign({}, params, {
			success: ({ data }) => {
				reslove(data)
			},
			fail: () => {
				console.error('请求失败')
				reject('网络出小差了，请稍后再试~');
			}
		}))
	})
}
