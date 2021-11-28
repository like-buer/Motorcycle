<template>
	<view class="content">
		<view class="userinfo" @click="toLogin">
			<image :src="userInfo.Imgurl" mode="scaleToFill" class="pohoto" v-if="userInfo.Imgurl"></image>
			<image src="../../static/logo.png" mode="scaleToFill" class="pohoto" v-else></image>
			<view class="info">
				<view>{{ token ? userInfo.Name : '点击登录'}}</view>
				<view>你的学车之旅，我们一路陪伴~</view>
			</view>
		</view>

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
	import { mapGetters } from 'vuex'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
			...mapGetters(['token', 'userInfo'])
		},
		onLoad() {

		},
		methods: {
			// 用户登录
			toLogin() {
				if(this.token) {
					this.$store.dispatch('user/getUserPofile')
					return;
				}
				uni.navigateTo({
					url: '/pages/profile/login'
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
