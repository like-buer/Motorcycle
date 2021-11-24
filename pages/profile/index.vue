<template>
	<view class="content">
		<view class="userinfo" @click="toLogin">
			<image src="../../static/logo.png" mode="scaleToFill" class="pohoto"></image>
			<view class="info">
				<view>点击登录</view>
				<view>你的学车之旅，我们一路陪伴~</view>
			</view>
		</view>

		<button type="default" open-type="getPhoneNumber" @getphonenumber="getphonenumber">获取用户信息</button>

		<button type="default" @click="getCode">code</button>

		<view class="gap"></view>

		<uni-list>
			<uni-list-item link>
				<template slot="header" class="btn">
					<button class="btn" open-type="share">推荐给好友</button>
				</template>
			</uni-list-item>
			<uni-list-item link>
				<template slot="header" class="btn">
					<button class="btn" open-type="contact">联系客服</button>
				</template>
			</uni-list-item>
			<uni-list-item link>
				<template slot="header" class="btn">
					<button class="btn" open-type="feedback">意见反馈</button>
				</template>
			</uni-list-item>
			<uni-list-item title="关于我们" link to="/pages/index/index"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			getphonenumber(e) {
				let { iv, encryptedData } = e.detail;
				
				uni.login({
					provider: 'weixin',
					success: ({code}) => {
						console.log({ iv, encryptedData, js_code: code })
						// return;
						api.login({ iv, encryptedData, js_code: code }).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
						})
					}
				})
				
			},
			getCode() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res);
					}
				})
			},
			// 用户登录
			toLogin() {
				// uni.login({
				// 	provider: 'weixin',
				// 	success: (res) => {
				// 		console.log(res);
				// 		// 获取用户信息
				// 		uni.getUserProfile({
				// 			// provider: 'weixin',
				// 			desc: '完善会员信息',
				// 			success: info => {
				// 				console.log(info)
				// 				// console.log('用户昵称为：' + info.userInfo.nickName);
				// 			}
				// 		});
				// 	}
				// });


				uni.getUserProfile({
					desc: '用于注册完善个人资料',
					success(e) {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {

		/deep/ .uni-list {
			&-item {
				height: 100rpx;

				.btn {
					background-color: transparent;
					padding: 0;
					color: #3b4144;
					font-size: 28rpx;
					width: 100%;
					text-align: left;

					&::after {
						border: none;
					}
				}
			}
		}

		.gap {
			background-color: #f7f7f7;
			height: 20rpx;
		}

		.userinfo {
			display: flex;
			padding: 20rpx;

			.info {
				margin-left: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				view {
					&:nth-of-type(1) {
						font-size: 26rpx;
						font-weight: 600;
					}

					&:nth-of-type(2) {
						font-size: 22rpx;
						color: #b8b8b8;
					}
				}
			}

			.pohoto {
				width: 100rpx;
				height: 100rpx;
				border-radius: 999rpx;
			}

		}
	}
</style>
