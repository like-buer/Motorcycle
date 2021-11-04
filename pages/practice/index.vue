<template>
	<view class="content">
		<view class="practive">
			<view class="question">
				1/400、驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？
			</view>
			<view class="pic">
				<image src="http://jiakao-tiku.image.mucang.cn/tiku-media/2021/0729/210645/image-122.jpg" mode="heightFix"></image>
			</view>
			<view class="options">
				<view class="options--item success">
					A、过失行为
				</view>
				<view class="options--item error">
					B、违规行为
				</view>
				<view class="options--item">
					B、违章行为
				</view>
				<view class="options--item">
					B、违法行为
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
		.practive {
			padding: 30rpx;
			background-color: #f7f7f7;

			.question {
				color: #55617d;
				font-size: 30rpx;
				font-weight: 600;
			}
			
			.pic {
				display: flex;
				justify-content: center;
				padding: 30rpx;
				image {
					width: 100%;
					max-height: 260rpx;
					border-radius: 15rpx;
				}
			}

			.options {
				&--item {
					background-color: #FFFFFF;
					border-radius: 10rpx;
					margin-top: 20rpx;
					padding: 15px;
					font-size: 30rpx;
					color: #868686;
					box-shadow: 0rpx 2rpx 14rpx rgba(0, 0, 0, 0.03);
					
					
					&.success {
						background-color: #6ed53b;
						color: #FFFFFF;
					}
					&.error {
						background-color: #f96a6a;
						color: #FFFFFF;
					}

				}
			}
		}
	}
</style>
