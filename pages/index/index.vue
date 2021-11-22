<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
			<swiper-item>
				<image src="https://sucimg.itc.cn/sblog/j8df6dd9728a37a1d83bb660cfa8fcf2e" mode="heightFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://sucimg.itc.cn/sblog/j8df6dd9728a37a1d83bb660cfa8fcf2e" mode="heightFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://sucimg.itc.cn/sblog/j8df6dd9728a37a1d83bb660cfa8fcf2e" mode="heightFix"></image>
			</swiper-item>
		</swiper>
		<uni-segmented-control :current="current" :values="items" style-type="text" :active-color="activeColor"
			@clickItem="onClickItem" />
		<view class="startList">
			<view class="item item--left">
				<view class="start">
					<view class="icon">
						<uni-icons type="cloud-download" size="26" color="#fff" />
					</view>
					<view class="title">
						随机练习
					</view>
				</view>
				<view class="start">
					<view class="icon">
						<uni-icons type="cloud-download" size="26" color="#fff" />
					</view>
					<view class="title">
						未做题
					</view>
				</view>
			</view>
			<view class="item item--center">
				<view class="start order" @click="toPractice">
					<view>顺序联系</view>
					<view>0/400</view>
				</view>
				<view class="start exam">
					<view>模拟考试</view>
					<view>仿真冲刺</view>
				</view>
			</view>
			<view class="item item--right">
				<view class="start" @click="toPractice(15)">
					<view class="icon">
						<uni-icons type="cloud-download" size="26" color="#fff" />
					</view>
					<view class="title">
						小练习
					</view>
				</view>

				<view class="start">
					<view class="icon">
						<uni-icons type="cloud-download" size="26" color="#fff" />
					</view>
					<view class="title">
						易错巩固
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				// interval: 2000,
				// duration: 500,

				items: ['科目一', '科目四'],
				current: 0,
				activeColor: '#007aff',

			}
		},
		onLoad() {
		},
		methods: {
			toPractice(num) {
				
				
				if(typeof num === 'number') {
					uni.navigateTo({
						url: `/pages/practice/index?sum=${num}`
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/practice/index?idx=0'
				})
			},
			// tab 切换
			onClickItem({
				currentIndex
			}) {
				this.current = currentIndex;
			}
		},
		onShareAppMessage(res) {
			return {
				title: '自定义分享标题',
				path: '/pages/index/index'
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		.startList {
			display: flex;
			background-color: #fdfffe;
			padding: 50rpx 0;

			.item {

				&--left,
				&--right {

					width: 1rpx;
					flex-grow: 2;

					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.start {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 50rpx 0;

						.icon {
							width: 80rpx;
							height: 80rpx;
							border-radius: 35rpx;
							background-color: #3adac8;
							display: flex;
							align-items: center;
							justify-content: center;

							box-shadow: 20rpx 20rpx 60rpx #bebebe,
								-20rpx -20rpx 60rpx #ffffff;
						}

						.title {
							color: #000;
							font-size: 30rpx;
							margin-top: 20rpx;
						}
					}
				}

				&--center {
					width: 1rpx;
					flex-grow: 3;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;

					.start {
						width: 200rpx;
						height: 200rpx;
						border-radius: 999px;

						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						box-shadow: 20rpx 20rpx 60rpx #bebebe,
							-20rpx -20rpx 60rpx #ffffff;

						&:nth-of-type(1) {
							background-color: #3aa5f9;
						}

						&:nth-of-type(2) {
							background-color: #0dcba9;
						}

						>view {
							&:nth-of-type(1) {
								font-size: 32rpx;
								font-weight: 600;
								color: #FFFFFF;
							}

							&:nth-of-type(2) {
								font-size: 26rpx;
								font-weight: 400;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}

		.swiper {
			height: 160rpx;

			image {
				height: 100%;
			}
		}
	}
</style>
