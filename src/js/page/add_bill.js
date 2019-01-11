require(['../js/config.js'], function() {
	require(['mui', 'dom', 'picker', 'poppicker', 'dtpicker'], function(mui, dom) {
		function init() {
			mui.init();

			initSlider(); // 轮播图滚动条

			initDate(); // 初始化时间

			addEvent(); //绑定事件
		}

		var curYear = new Date().getFullYear(),
			curMonth = new Date().getMonth() + 1,
			curDay = new Date().getDate(),
			dtPicker = null,
			_timeSelect = dom('.time-select'),
			_money = dom('.cur-money');

		function initSlider() {
			document.querySelector('.mui-slider').addEventListener('slide', function(event) {
				//  event.detail.slideNumber  当前下标
				var _sliderLine = dom('.slider-line').querySelectorAll('span');
				for (var i = 0; i < _sliderLine.length; i++) {
					_sliderLine[i].classList.remove('active');
				}
				_sliderLine[event.detail.slideNumber].classList.add('active');
			});
		}

		function initDate() {
			//初始化dtPicker组件
			dtPicker = new mui.DtPicker({
				type: 'date'
			});

			//初始化当前年月
			curMonth = curMonth < 10 ? '0' + curMonth : curMonth;
			curDay = curDay < 10 ? '0' + curDay : curDay;
			_timeSelect.innerHTML = curMonth + '月' + curDay + '日';
		}

		function addEvent() {
			// 点击选择日期
			dom('.time-wrap').addEventListener('tap', function() {
				dtPicker.show(function(selectItems) {
					_timeSelect.innerHTML = selectItems.m.text + '月' + selectItems.d.text + '日';
				})
			})
			// 点击键盘
			mui('.key-wrap').on('tap', 'li', function() {
				var val = this.innerHTML,
					mVal = _money.innerHTML;

				if (val === '×') {
					_money.innerHTML = mVal.substr(0, mVal.length - 1);
					if (_money.innerHTML.length === 0) {
						_money.innerHTML = '0';
					}
					return;
				} else if (val === '完成') {
					console.log('添加成功');
					location.href = '../../page/add_classify.html';
					return;
				}

				if (mVal === '0.00' && val != '.') {
					_money.innerHTML = val;
				} else if (mVal.indexOf('.') != -1 && (val === '.' || mVal.split('.')[1].length === 2)) {
					_money.innerHTML = mVal;
				} else {
					_money.innerHTML += val;
				}
			})
		}

		init();
	})
})
