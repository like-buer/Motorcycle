<template>
	<view class="login">
		<image class="logo" src=""></image>
		<evan-checkbox v-model="checked" iconSize="12" primaryColor="#2c5ccb" >
			<text class="agreen">
				登录代表您已同意 <text>《用户服务协议》</text> 及 <text>《隐私政策》</text>
			</text>
		</evan-checkbox>
		<button class="btn-login" type="default" open-type="getPhoneNumber" @getphonenumber="getphonenumber">登录</button>
	</view>
</template>

<script>
	import api from '@/utils/api.js'
	import toast from '@/utils/toast.js'
	export default {
		data(){
			return {
				checked: true
			}
		},
		methods: {
			getphonenumber(e) {
				let { iv, encryptedData } = e.detail;
				uni.login({
					provider: 'weixin',
					success: () => {
						uni.login({
							provider: 'weixin',
							success: ({code}) => {
								this.$store.dispatch('user/login', { iv, encryptedData, js_code: code }).then(() => {
									this.$store.dispatch('user/getUserInfo')
									toast('登录成功')
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)
								}).catch(() => {
									toast('网络异常，请重试')
								})
							},
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.btn-login {
			width: 100%;
			background-color: #2c5ccb;
			color: #FFFFFF;
			border-radius: 999rpx;
			margin-top: 50rpx;
		}
		
		.agreen {
			font-size: 26rpx;
		}
		
		.logo {
			border: 5rpx solid #2c5ccb;
			width: 180rpx;
			height: 180rpx;
			border-radius: 999rpx;
			margin: 100rpx;
		}
	}
</style>
