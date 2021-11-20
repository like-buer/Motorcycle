<template>
	<view class="">

		<template v-if="questionList.length">
			<swiper class="swiper" :current="current" @change="changeSwiper">
				<swiper-item v-for="(item,idx) in questionList">
					<view class="content">
						<view class="practive">
							<view class="question">
								{{ idx + 1 }}/400、{{ item.BankName }}
							</view>
							<view class="pic" v-if="item.Imgurl">
								<image
									src="http://jiakao-tiku.image.mucang.cn/tiku-media/2021/0729/210645/image-122.jpg"
									mode="heightFix"></image>
							</view>
							<view class="options">
								<view class="options--item" :class="{
								error: submitOption.includes(index) && !item.Options.includes(index),
								success: submitOption.includes(index) && item.Options.includes(index)
							}" @click="checkAnswer(index)" v-for="(_answer,index) in item.Answer" :key="item">
									{{ AnswerOption[index] }}、{{ _answer }}

									<view class="status">
										<image src="@/static/success.png" mode=""
											v-if="submitOption.includes(index) && item.Options.includes(index)">
										</image>
										<image src="@/static/error.png" mode=""
											v-if="submitOption.includes(index) && !item.Options.includes(index)">
										</image>
									</view>
								</view>
							</view>

							<view class="answer" v-if="isAnalysis">
								<!-- 正确答案：{{ item.Options.map(_ => AnswerOption[_]).join('、')   }} -->
							</view>
						</view>
						<template v-if="isAnalysis">
							<view class="gap"></view>
							<view class="remarks">
								<view class="analysis">
									<text>解析</text>
								</view>
								<view class="text" v-html="item.Analysis"></view>
							</view>
						</template>
					</view>
				</swiper-item>
			</swiper>
		</template>
	</view>
</template>


<script>
	import {
		AnswerOption
	} from '@/config/config.js'
	export default {
		data() {
			return {
				AnswerOption,
				// idx: 1,
				current: 0,
				questionList: [],

				checkOption: [],
				submitOption: [],


				isAnalysis: false
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			changeSwiper(e){
				this.current = e.target.current;
				this.isAnalysis = false;
				this.submitOption = [];
			},
			// 答题
			checkAnswer(idx) {
				if (this.submitOption.length) return
				
				let _option = this.questionList[this.current].Options;
				this.checkOption.push(idx)

				if (_option.length > 1) return;
				console.log(this.checkOption)
				this.submitAnswer();
			},
			// 提交答案
			submitAnswer() {
				this.submitOption = Array.from(new Set(this.checkOption)).sort((a, b) => a - b)
				this.checkOption = [];

				if (this.endNowAnswer()) {
					setTimeout(() => {
						this.nextQuestion();
					}, 1000)
				} else {
					this.showAnalysis();
				}
			},
			// 检查答案
			endNowAnswer() {
				if (this.submitOption.length !== this.questionList[this.current].Options.length) return false;
				let result = true;
				this.questionList[this.current].Options.forEach(item => {
					if (!this.submitOption.includes(item)) {
						result = false;
					}
				})
				return result;
			},
			// 查看解析
			showAnalysis() {
				this.isAnalysis = true;
			},
			// 下一题
			nextQuestion() {
				this.submitOption = [];
				this.current++;
			},
			// 获取题库
			getList() {
				uni.request({
					url: 'http://47.98.213.156/Bandk/GetBanks',
					success: (res) => {
						if (res.statusCode === 200) {
							this.questionList = JSON.parse(res.data.Data).map(item => {
								let _answer = [];
								try {
									_answer = JSON.parse(item.Answer)
								} catch (e) {
									_answer = ['数据异常，请联系管理员']
								}

								item.Answer = _answer;
								item.Options = JSON.parse(item.Options).map(_ => this.AnswerOption
									.findIndex(__ => __ === _));
								console.log(item.Options)
								return item;
							});
							console.log(this.questionList)
						}
					}
				});
			}
		}
	}
</script>


<style lang="less" scoped>
	.swiper {
		height: 100vh;
		overflow-y: auto;
	}

	.content {

		.answer {
			font-weight: bold;
			padding: 10rpx 20rpx;
			border-radius: 5rpx;
			background-color: #f2f5fa;
			margin-top: 30rpx;
		}

		.remarks {
			padding: 30rpx;
			background-color: #ffffff;

			.text {
				margin-top: 10rpx;
			}

			.analysis {
				text {
					background-color: #3aa5f9;
					clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
					color: #fff;
					font-size: 22rpx;
					padding: 5rpx 20rpx 5rpx 10rpx;
				}
			}
		}

		.gap {
			background-color: #f7f7f7;
			height: 20rpx;
		}

		.practive {
			padding: 30rpx;
			background-color: #ffffff;

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
					background-color: #f7f7f7;
					border-radius: 10rpx;
					margin-top: 20rpx;
					padding: 15px;
					font-size: 30rpx;
					color: #868686;
					box-shadow: 0rpx 2rpx 14rpx rgba(0, 0, 0, 0.03);
					position: relative;

					.status {
						position: absolute;
						right: 20rpx;
						top: calc(50% - 35rpx);
						display: flex;
						width: 70rpx;
						height: 70rpx;

						image {
							width: 70rpx;
							height: 70rpx;
						}
					}


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
