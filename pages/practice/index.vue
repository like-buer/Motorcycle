<template>
	<view class="content">
		<view class="practive">
			<view class="question">
				1/400、骑摩托车需要佩戴头盔吗？
			</view>
			<view class="options">
				<view class="options--item">
					A、需要
				</view>
				<view class="options--item">
					B、不需要
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		// border: 1px solid red;

		// padding: 20rpx;

		.practive {
			padding: 30rpx;
			background-color: #f7f7f7;

			.question {
				color: #55617d;
			}

			.options {
				&--item {
					background-color: #FFFFFF;
					border-radius: 10rpx;
					margin-top: 20rpx;
					padding: 15px;
					color: #868686;

					box-shadow: 0rpx 2rpx 14rpx rgba(0, 0, 0, 0.03);

				}
			}
		}
	}
</style>
