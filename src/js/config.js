require.config({
	baseUrl:'/js/',
	paths: {
		'mui': './libs/mui.min',
		'picker': './libs/mui.picker.min',
		'poppicker': './libs/mui.poppicker',
		'dtpicker': './libs/mui.dtpicker',
		
		'dom': './common/dom'
	},
	shim: {
		'picker': {
			deps: ['mui']
		},
		'poppicker': {
			deps: ['mui']
		},
		'dtpicker': {
			deps: ['mui']
		}
	}
})