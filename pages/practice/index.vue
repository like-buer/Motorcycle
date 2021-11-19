<template>
	<view class="content">
		<template v-if="questionList.length">

			<view class="practive">
				<view class="question">
					{{ idx + 1 }}/400、{{ questionList[idx].BankName }}
				</view>
				<view class="pic" v-if="questionList[idx].Imgurl">
					<image src="http://jiakao-tiku.image.mucang.cn/tiku-media/2021/0729/210645/image-122.jpg"
						mode="heightFix"></image>
				</view>
				<view class="options">
					<view class="options--item" :class="{
					error: submitOption.includes(index) && !questionList[idx].Options.includes(index),
					success: submitOption.includes(index) && questionList[idx].Options.includes(index)
				}" @click="checkAnswer(index)" v-for="(item,index) in questionList[idx].Answer" :key="`answer_${index}`">
						{{ AnswerOption[index] }}、{{ item }}
					</view>
				</view>
			</view>
			<view class="gap"></view>
			<view class="remarks">
				解析：
				<view v-html="questionList[idx].Analysis"></view>
			</view>
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
				idx: 1,
				questionList: [],

				checkOption: [],
				submitOption: []
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			// 答题
			checkAnswer(idx) {
				console.log(idx)
				let _option = this.questionList[idx].Options;
				this.checkOption.push(idx)

				if (_option.length > 1) return;
				this.submitAnswer();
			},
			// 提交答案
			submitAnswer() {
				this.submitOption = Array.from(new Set(this.checkOption)).sort((a, b) => a - b)
				this.checkOption = [];

				// 此处判断是否回答正确以及下一题
				setTimeout(() => {
					this.submitOption = [];
					this.idx ++;
				},2000)
			},
			// 获取题库
			getList() {
				uni.request({
					url: 'http://47.98.213.156/Bandk/GetBanks', //仅为示例，并非真实接口地址。
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
	.content {
		.remarks {
			padding: 30rpx;
			background-color: #ffffff;
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
