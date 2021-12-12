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

		<swiper class="swiper1" :current="current" @change="changeSwiper">
			<swiper-item v-for="item in [0,1]">
				<view class="startList">
					<view class="item item--left">
						<view class="start" @click="toPractice(10, '随机练习')">
							<view class="icon">
								<image src="@/static/icon/icon06.png" mode=""></image>
							</view>
							<view class="title">
								随机练习
							</view>
						</view>
						<view class="start" @click="toPractice(50, '考前冲刺')">
							<view class="icon">
								<image src="@/static/icon/icon09.png" mode=""></image>
							</view>
							<view class="title">
								考前冲刺
							</view>
						</view>
					</view>
					<view class="item item--center">
						<view class="start order" @click="toPractice(0, '顺序练习' )">
							<view>顺序联系</view>
							<view v-if="current">{{ nowProp.LastQuestionNumTo4 }}/{{ nowProp.Banks4Count }}</view>
							<view v-else>{{ nowProp.LastQuestionNumTo1 }}/{{ nowProp.Banks1Count }}</view>
							<view class="bg1"></view>
							<view class="bg2"></view>
						</view>
						<view class="start exam" @click="toPractice(50, '模拟考试')">
							<view>模拟考试</view>
							<view v-if="current === 0 && ke1">成绩：{{ ke1 }}分</view>
							<view v-if="current === 1 && ke2">成绩：{{ ke2 }}分</view>
						</view>
					</view>
					<view class="item item--right">
						<view class="start" @click="toPractice(15, '小练习')">
							<view class="icon">
								<image src="@/static/icon/icon10.png" mode=""></image>
							</view>
							<view class="title">
								每日一练
							</view>
						</view>

						<view class="start" @click="toPractice(50, '易错巩固')">
							<view class="icon">
								<image src="@/static/icon/icon05.png" mode=""></image>
							</view>
							<view class="title">
								易错巩固
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,

				items: ['科目一', '科目四'],
				current: 0,
				activeColor: '#007aff',

				nowProp: {
					Banks1Count: 0,
					Banks4Count: 0,
					LastQuestionNumTo1: 0,
					LastQuestionNumTo4: 0
				},

				ke1: 0,
				ke2: 0

			}
		},
		computed: {
			...mapGetters(['token'])
		},
		onShow() {
			this.ke1 = uni.getStorageSync('ke1')
			this.ke2 = uni.getStorageSync('ke2')
			this.$store.dispatch('user/getUserInfo')
			this.getQuestion();
		},
		methods: {
			changeSwiper(e) {
				this.current = e.target.current;
				console.log(this.current)
			},
			toPractice(num, title) {
				let _querystr = `&type=${this.current ? 4 : 1}&title=${title}`
				if (typeof num === 'number' && !!num) {
					uni.navigateTo({
						url: `/pages/practice/index?sum=${num}${_querystr}`
					})
					return;
				}
				
				uni.navigateTo({
					url: `/pages/practice/index?idx=${ this.nowProp[ `LastQuestionNumTo${this.current ? 4 : 1}` ] }${_querystr}`
				})
			},
			// 获取题目配置信息
			getQuestion() {
				this.nowProp.LastQuestionNumTo1 = uni.getStorageSync('LastQuestionNumTo1');
				this.nowProp.LastQuestionNumTo4 = uni.getStorageSync('LastQuestionNumTo4');
				api.getQuestionConfigNoLogin().then(res => {
					let {
						Banks1Count,
						Banks4Count
					} = res.Data;
					this.nowProp.Banks1Count = Banks1Count;
					this.nowProp.Banks4Count = Banks4Count;
				})
				
				api.getQuestionConfig().then(res => {
					let {
						LastQuestionNumTo1,
						LastQuestionNumTo4
					} = res.Data;
					
					this.nowProp.LastQuestionNumTo1 = LastQuestionNumTo1  || 0;
					this.nowProp.LastQuestionNumTo4 = LastQuestionNumTo4  || 0;
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
					flex-grow: 3;

					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.start {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 50rpx 0;

						.icon {
							width: 90rpx;
							height: 90rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.title {
							color: #000;
							font-size: 24rpx;
							margin-top: 10rpx;
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
						// box-shadow: 20rpx 20rpx 60rpx #bebebe,
						// 	-20rpx -20rpx 60rpx #ffffff;

						&:nth-of-type(1) {
							background-color: #0895ff;
							box-shadow: 0 0 16rpx 0 #0895ff;
						}

						&:nth-of-type(2) {
							background-color: #2bc517;
							box-shadow: 0 0 16rpx 0 #2bc517;
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
		
		.swiper1 {
			height: 600rpx;
		}

		.swiper {
			height: 160rpx;

			image {
				height: 100%;
			}
		}
	}
</style>
