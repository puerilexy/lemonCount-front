require(['./js/config.js'], function() {
	require(['mui', 'dom', 'picker', 'poppicker', 'dtpicker'], function(mui, dom) {
		function init() {
			mui.init(); // 初始化mui模板
			initScroll(); //初始化scroll控件
			initDate(); //初始化时间
			addEvent(); //绑定事件
		}

		var picker = null, //初始化picker
			dtPicker = null, //初始化dtpicker
			curYear = new Date().getFullYear(), //当前年份
			curMonth = new Date().getMonth() + 1, //当前月份
			curStatus = 'month',

			_selectStatus = dom('.select-status'),
			_selectDate = dom('.select-date'),
			_textStatus = dom('.text-status'),
			_textDate = dom('.text-date'),
			_conTable = dom('.con-top-table'),
			_goAddBill = dom('.go-add');
			

		function initScroll() {
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		}

		function initDate() {
			//初始化popPicker组件,选择年月
			picker = new mui.PopPicker();
			picker.setData([{
				value: 'month',
				text: '月'
			}, {
				value: 'year',
				text: '年'
			}]);

			//初始化当前年月
			curMonth = curMonth < 10 ? '0' + curMonth : curMonth;
			_textDate.innerHTML = curYear + '-' + curMonth;

			//初始化dtpicker组件
			dtPicker = new mui.DtPicker({
				type: 'month'
			});

		}

		function addEvent() {
			//点击年月
			_selectStatus.addEventListener('tap', function() {
				picker.show(function(selectItems) {

					_textStatus.innerText = selectItems[0].text;

					curStatus = selectItems[0].value;
					var _monthH5 = dom('[data-id=title-m]'),
						_yearH5 = dom('[data-id=title-y]'),
						_mPicker = dom(['[data-id=picker-m]']),
						_yPicker = dom('[data-id=picker-y]'),
						_mWrap = dom('.month-wrap'),
						_yWrap = dom('.year-wrap');

					if (curStatus === 'month') { //选择月

						_textDate.innerHTML = curYear + '-' + curMonth;
						
						// 选择列表的显示隐藏
						_monthH5.style.display = 'inline-block';
						_mPicker.style.display = 'block';
						_yearH5.style.width = '50%';
						_yPicker.style.width = '50%';
						
						// 账单的显示隐藏
						_mWrap.style.display = 'block';
						_yWrap.style.display = 'none';
						
					} else { //选择年

						_textDate.innerHTML = curYear;
						
						// 选择列表的显示隐藏
						_monthH5.style.display = 'none';
						_mPicker.style.display = 'none';
						_yearH5.style.width = '100%';
						_yPicker.style.width = '100%';
						
						// 账单的显示隐藏
						_mWrap.style.display = 'none';
						_yWrap.style.display = 'block';
					}
				})
			});
			//点击日期
			_selectDate.addEventListener('tap', function() {
				dtPicker.show(function(selectItems) {
					if (curStatus === 'month') { //选择月						
						_textDate.innerHTML = selectItems.y.text + '-' + selectItems.m.text;
					} else { //选择年					
						_textDate.innerHTML = selectItems.y.text
					}
				})
			})
			//点击显示侧滑导航
			dom('.show-aside').addEventListener('tap',function(){
				mui('.mui-off-canvas-wrap').offCanvas('show');
			})
			//点击账单、图表table切换
			mui('.con-top-table').on('tap','.table-btn',function(){
				var spans = _conTable.querySelectorAll('span');
				for (var i = 0; i < spans.length; i++) {
					spans[i].classList.remove('nav-active');
				}
				this.classList.add('nav-active');
				
				var text = this.innerText,
					_billWrap = dom('.bill-wrap'),
					_tableWrap = dom('.table-wrap');
					
				if(text === '账单'){
					_billWrap.style.display = 'block';
					_tableWrap.style.display = 'none';
				}else{
					_billWrap.style.display = 'none';
					_tableWrap.style.display = 'block';
				}
					
			})
			//点击跳转到添加账单页面
			_goAddBill.addEventListener('tap',function(){
				location.href = '../../page/add_bill.html';
			})
		}

		init();
	})
})
