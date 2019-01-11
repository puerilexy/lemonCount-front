require(['../js/config.js'],function(){
	require(['mui','dom','getUid'],function(mui,dom,getUid){
		function init(){
			mui.init();
			renderData(); //渲染icon图标	
			addEvent(); //绑定事件
			initSlider(); //轮播滚动条
		}
		
		function renderData(){
			mui.ajax('/classify/api/iconlist',{
				async: 'true',
				success: function(res){
					if(res.code === 1){
						renderIcon(res.data);
					}
				}
			})
		}
		
		function renderIcon(data){

			// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] 
			
			//[ [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], [16,17,18,19,20]]  分成第一页，第二页
			
			//slice  不改变原数组  splice  改变原数组
			
			var page = Math.ceil(data.length / 15);  // 有几个内容区
			var target = [];
			
			for(var i = 0;i<page;i++){
				target.push(data.splice(0,15))
			}
			
			var str = '';
			var spans = '';
			target.forEach(function(item){
				str += `<div class="mui-slider-item"><ul>`  // 循环外面的内容区
				str += renderLis(item); // 循环li
				str += `</ul></div>` 
				spans += `<span></span>`
			})
			dom('.mui-slider-group').innerHTML = str;
			dom('.slider-line').innerHTML = spans;
			dom('.slider-line span').classList.add('active');
			//重新初始化mui.slider组件
			mui('.mui-slider').slider();
		}
		
		function renderLis(item){
			var lis = '';
			item.forEach(function(val){
				lis += `<li><span class="${val.icon}"></span></li>`
			})
			return lis;
		}
		
		function addEvent(){
			
			var _selectedIcon = dom('#selectedIcon');
			
			//点击选择分类图标
			mui('.mui-slider-group').on('tap','span',function(){
				 _selectedIcon.className = this.className;
			})
			
			//点击保存按钮
			dom('.save-btn').addEventListener('tap',function(){
				var intro = dom('.inp').value,
					type = '收入',
					icon = _selectedIcon.className;
									
				if(intro.trim() !== ''){
					getUid(function(uid){
						mui.ajax('/classify/api/addClassify',{
							type: 'post',
							dataType: 'json',
							data: {
								uid: uid,
								intro: intro,
								type: type,
								icon: icon
							},
							success: function(res){
								console.log(res)
							}
						})
					})
				}else{
					alert('请填写分类名')
				}
			})
		}

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
		
		init();
	})
})