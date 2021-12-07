<template>
	<view class="">

		<progress-bar :progress="progress" />

		<uni-list>
			<uni-list-item link title="回顾试卷" note="题目拿捏不准？看看学霸分析" rightText="回顾试卷" @click="toBack"></uni-list-item>
			<uni-list-item link title="再考一次" note="成绩不满意？再考一次证明实力" rightText="重新考试" @click="toPractice(50, '模拟考试')">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import progressBar from '@/components/chocolate-progress-bar/chocolate-progress-bar.vue'
	export default {
		components: {
			progressBar
		},
		data() {
			return {
				sum: 100,
				num: 0,
				type: 1
			}
		},
		computed: {
			progress() {
				return (this.num / this.sum) * 100
			}
		},
		onLoad(option) {
			let {
				sum,
				num,
				type
			} = option;
			console.log({
				sum,
				num,
				type
			})
			this.sum = sum;
			this.num = num;
			this.type = type;
			uni.setStorageSync(Number(type) === 1 ? 'ke1' : 'ke2', (this.num / this.sum) * 100)
		},
		methods: {
			toBack(){
				uni.navigateBack()
			},
			toPractice(num, title) {
				let _querystr = `&type=${this.current ? 4 : 1}&title=${title}`

				if (typeof num === 'number' && !!num) {
					uni.redirectTo({
						url: `/pages/practice/index?sum=${num}${_querystr}`
					})
					return;
				}
				uni.redirectTo({
					url: `/pages/practice/index?idx=0${_querystr}`
				})
			},
		}
	}
</script>

<style>
</style>
