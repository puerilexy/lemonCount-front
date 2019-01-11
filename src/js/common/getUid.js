define(function(){	
	var getUid = function(fn){
		var uid = localStorage.getItem('uid') || '';
		if(!uid){
			mui.ajax('/users/api/addUser',{
				type: 'post',
				dataType: 'json',
				success: function(res){
					if(res.code === 1){
						localStorage.setItem('uid',res.data);
						fn(res.data);
					}
				}
			})
		}else{
			fn(uid);
		}
	}
	
	return getUid;
})