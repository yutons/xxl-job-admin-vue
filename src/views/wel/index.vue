<template>
	<div>
		<basic-container>
			<avue-data-tabs :option="option"></avue-data-tabs>
		</basic-container>
	</div>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		name: "wel",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters(["userInfo"]),
			option() {
				return {
					span: 8,
					data: [{
							title: '运行中的任务数量',
							subtitle: this.$t("wel.data.subtitle"),
							count: 1000,
							allcount: 5000,
							text: '任务数量',
							color: "rgb(27, 201, 142)",
							key: '个'
						},
						{
							title: '调度成功次数',
							subtitle: this.$t("wel.data.subtitle"),
							count: 10000,
							allcount: 99990,
							text: '调度次数',
							color: "rgb(230, 71, 88)",
							key: '次'
						},
						{
							title: '在线的执行器数量',
							subtitle: this.$t("wel.data.subtitle"),
							count: 11,
							allcount: 110,
							text: '执行器数量',
							color: "rgb(56, 161, 242)",
							key: '个'
						}
					]
				};
			},
		},
		created() {},
		methods: {}
	};
</script>

<style scoped="scoped" lang="scss">
	.wel {
		&__header {
			padding: 25px 40px;
			border-bottom: 1px solid #e8e8e8;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__info {
			display: flex;
			align-items: center;

			&-img {
				border-radius: 72px;
				display: block;
				width: 72px;
				height: 72px;

				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			&-content {
				position: relative;
				margin-left: 24px;
				color: rgba(0, 0, 0, 0.45);
				line-height: 22px;
			}

			&-title {
				font-size: 20px;
				line-height: 28px;
				font-weight: 500;
				color: rgba(0, 0, 0, 0.85);
				margin-bottom: 12px;
			}

			&-subtitle {
				position: relative;
				font-size: 14px;
				color: rgba(0, 0, 0, 0.45);
				line-height: 22px;
			}
		}

		&__extra {
			&-item {
				position: relative;
				padding: 0 32px;
				display: inline-block;

				&:last-child {
					&::after {
						display: none;
					}
				}

				&:after {
					background-color: #e8e8e8;
					position: absolute;
					top: 30px;
					right: 0;
					width: 1px;
					height: 40px;
					content: "";
				}
			}

			&-title {
				color: rgba(0, 0, 0, 0.45);
				font-size: 14px;
				line-height: 22px;
				margin-bottom: 4px;
			}

			&-subtitle {
				color: rgba(0, 0, 0, 0.85);
				font-size: 30px;
				line-height: 38px;
				margin: 0;

				span {
					color: rgba(0, 0, 0, 0.45);
					font-size: 20px;
				}
			}
		}
	}
</style>
