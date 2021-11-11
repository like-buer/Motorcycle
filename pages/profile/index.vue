<template>
	<view class="content">
		<view class="userinfo">
			<image src="../../static/logo.png" mode="scaleToFill" class="pohoto"></image>
			<view class="info">
				<view>点击登录</view>
				<view>你的学车之旅，我们一路陪伴~</view>
			</view>
		</view>
		
		<view class="gap"></view>
		
		<list>
		    <list-item title="开启点击反馈" clickable  @click="onClick" ></list-item>
		    <list-item title="默认 navigateTo 方式跳转页面" link to="/pages/vue/index/index" @click="onClick($event,1)" ></list-item>
		    <list-item title="reLaunch 方式跳转页面" link="reLaunch" to="/pages/vue/index/index" @click="onClick($event,1)" ></list-item>
		</list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		border: 1px solid red;
		
		
		
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
