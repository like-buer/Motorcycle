<template>
	<view class="">
		<template v-if="questionList.length">
			<swiper class="swiper" :current="current" @change="changeSwiper" @animationfinish="changeSwiperEnd"
				disable-touch>
				<swiper-item v-for="(item,idx) in questionList">
					<view class="content" v-if="item">
						<view class="practive">
							<view class="question">
								{{ idx + 1 }}/{{ questionnum }}、{{ item.BankName }}
							</view>
							<view class="pic" v-if="item.Imgurl">
								<image
									src="http://jiakao-tiku.image.mucang.cn/tiku-media/2021/0729/210645/image-122.jpg"
									mode="heightFix"></image>
							</view>
							<view class="options">
								<view class="options--item" :class="{
								error: answerList[idx].includes(index) && !item.Options.includes(index),
								success: answerList[idx].includes(index) && item.Options.includes(index)
							}" @click="checkAnswer(idx,index)" v-for="(_answer,index) in item.Answer" :key="item">
									{{ AnswerOption[index] }}、{{ _answer }}

									<view class="status">
										<image src="@/static/success.png" mode=""
											v-if="answerList[idx].includes(index) && item.Options.includes(index)">
										</image>
										<image src="@/static/error.png" mode=""
											v-if="answerList[idx].includes(index) && !item.Options.includes(index)">
										</image>
									</view>
								</view>
							</view>

							<view class="answer" v-if="answerList[idx].length">
								正确答案：{{ item.Options.map(_ => AnswerOption[_]).join('、')   }}
							</view>
						</view>
						<template v-if="answerList[idx].length">
							<view class="gap"></view>
							<view class="remarks">
								<view class="analysis">
									<text>解析</text>
								</view>
								<view class="text" v-html="item.Analysis"></view>
							</view>
						</template>
					</view>
					<view v-else>
						数据加载中...{{ current + 1 }}
					</view>
				</swiper-item>
			</swiper>
		</template>
		<view class="loading" v-else>
			数据加载中
		</view>
	</view>
</template>


<script>
	import {
		AnswerOption
	} from '@/config/config.js'

	import api from '@/utils/api.js'
	import {
		random
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				option: {},
				// ===========
				starIdx: 0,
				endIdx: 20,
				size: 20,
				// ===========

				AnswerOption,


				current: 0,
				questionnum: 400,
				questionList: [], // 当前的题目列表
				answerList: [], // 用户的答案列表
				scoreAnswerNum: 0, // 得分的题目

				checkOption: [],
				submitOption: [],


				awaitNextQuestion: null, // 下一题的定时器
			}
		},
		watch: {
			current(val) {
				// 限制总题数
				if (this.option.sum) return;
				if (this.endIdx >= this.questionnum) return;
				if (this.starIdx <= 1) return;
				if (this.questionList.filter(_ => !!_).length) {
					if (!this.questionList[val + 3]) {
						this.getList(this.endIdx + 1, this.endIdx + this.size);
					}
					if (!this.questionList[val - 3]) {
						this.getList(this.starIdx - this.size, this.starIdx - 1);
					}
				}
			}
		},
		onLoad(options) {
			this.option = options;
			console.log(options)
			let {
				idx,
				sum,
				type,
				title
			} = options;

			uni.setNavigationBarTitle({
				title
			});

			// 指定題目的练习
			if (sum) {
				this.current = 0;
				this.questionnum = sum;
				this.answerList = new Array(Number(sum)).fill([])
				this.getList(1, 1, sum);
				return;
			}
			
			console.log('=======================')
			console.log({...options})
			console.log(idx);
			this.current = Number(idx);
			this.answerList = new Array(this.questionnum).fill([])
			this.starIdx = Number(idx) - this.size;
			this.endIdx = Number(idx) + this.size;
			this.getList(this.starIdx, this.endIdx);
		},
		onShow() {
			this.current = 0;
		},
		methods: {
			changeSwiperEnd(e) {
				this.current = e.target.current;
			},
			changeSwiper(e) {
				this.submitOption = [];
				if (e.target.source === 'touch') {
					clearTimeout(this.awaitNextQuestion);
					this.awaitNextQuestion = null;
					return;
				}
			},
			// 答题
			checkAnswer(idx, index) {
				if(this.answerList[idx].length) return;
				if (this.submitOption.length) return;
				
				let _option = this.questionList[idx].Options;
				this.checkOption.push(index)
				if (_option.length > 1) return;
				this.submitAnswer(idx);
			},
			// 提交答案
			submitAnswer(idx) {
				// 保存用户进度
				if(this.option.title === '顺序练习') {
					let query = {};
					query[ `LastQuestionNumTo${ this.option.type }` ] = idx + 1
					api.EditUserInfo(query);
					uni.setStorageSync(`LastQuestionNumTo${ this.option.type }`, idx + 1)
				}
				this.submitOption = Array.from(new Set(this.checkOption)).sort((a, b) => a - b)
				this.answerList[idx] = this.submitOption;
				this.checkOption = [];

				if (this.checkTheAnswer(idx)) {
					this.scoreAnswerNum++;
					this.awaitNextQuestion = setTimeout(() => {
						if (idx + 1 === Number(this.questionnum) && this.option.title === '模拟考试') {
							uni.navigateTo({
								url: `/pages/practice/result?sum=${ this.questionnum }&num=${ this.scoreAnswerNum }&type=${ this.option.type }`,
							});
							return;
						}
						this.nextQuestion(idx);
					}, 1000)
				} else {
					if (idx + 1 === Number(this.questionnum) && this.option.title === '模拟考试') {
						uni.navigateTo({
							url: `/pages/practice/result?sum=${ this.questionnum }&num=${ this.scoreAnswerNum }&type=${ this.option.type }`,
						});
					}
				}
			},
			// 检查答案
			checkTheAnswer(idx) {
				if (this.submitOption.length !== this.questionList[idx].Options.length) return false;
				let result = true;
				this.questionList[idx].Options.forEach(item => {
					if (!this.submitOption.includes(item)) {
						result = false;
					}
				})
				return result;
			},
			// 下一题
			nextQuestion(idx) {
				this.submitOption = [];
				this.current = idx + 1;
			},
			// 获取题库
			getList(starIdx, endIdx, sum) {
				if (!sum) {
					starIdx = starIdx <= 1 ? 1 : starIdx;
					endIdx = endIdx >= this.questionnum ? this.questionnum : endIdx;
					this.starIdx = starIdx;
					this.endIdx = endIdx;
				}

				api.getQuestions({
					PageIndex: starIdx,
					PageSize: endIdx,
					BanksType: Number(this.option.type),
					RandomnNum: Number(sum)
				}).then(res => {
					if (!sum) {
						this.questionnum = res.Count;
						this.current = this.option.idx;
					}

					let _arr = [...this.questionList]
					let _data = res.Data.map((item, index) => {
						let _answer = [];
						try {
							_answer = JSON.parse(item.Answer)
						} catch (e) {
							_answer = ['数据异常，请联系管理员']
						}

						item.Answer = _answer;
						item.Options = JSON.parse(item.Options).map(_ => this
							.AnswerOption
							.findIndex(__ => __ === _));
						return item;
					});

					_data.forEach((item, index) => {
						_arr[starIdx + index - 1] = item;
					})
					this.questionList = _arr.filter(_ => !!_);
				})
			}
		}
	}
</script>


<style lang="less" scoped>
	/deep/ .swiper {
		height: 100vh;
		overflow-y: auto;
		position: relative;

		swiper-item {
			overflow-y: auto;
		}
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
