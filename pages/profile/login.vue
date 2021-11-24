<template>
	<view class="login">
		<image class="logo" src="@/static/center/logo.png"></image>
		<checkbox-group>
			<label>
				<checkbox value="cb" checked="true">
					登录代表您已同意 <text>《用户服务协议》</text> 及 <text>《隐私政策》</text>
				</checkbox>
			</label>
		</checkbox-group>
		<button type="default" open-type="getPhoneNumber" @getphonenumber="getphonenumber">获取用户信息</button>
	</view>
</template>

<script>
	import api from '@/utils/api.js'
	export default {
		methods: {
			getphonenumber(e) {
				let { iv, encryptedData } = e.detail;
				uni.login({
					provider: 'weixin',
					success: () => {
						uni.login({
							provider: 'weixin',
							success: ({code}) => {
								api.login({ iv, encryptedData, js_code: code }).then(res => {
									console.log(res)
								}).catch(err => {
									console.log(err)
								})
							}
						})
					}
				})
				
			},
		}
	}
</script>

<style lang="less" scoped>
	.login {
		padding: 30rpx;
	}
</style>
