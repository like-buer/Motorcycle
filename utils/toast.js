
export default _res => {
	if(typeof _res === 'string') {
		_res = {
			title: _res
		}
	}
	let _def = Object.assign({
		icon: 'none',
		duration: 2000
	}, _res)
	
	
	if(!_def.title) return;
	uni.showToast(_def);
}