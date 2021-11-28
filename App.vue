<script>
	export default {
		globalData: {
			apiUrl: `http://47.98.213.156`,
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

	@import './common/uni.css';
</style>
