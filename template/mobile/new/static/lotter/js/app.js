var indexApp = {

	//鍏ュ彛鏂规硶
	init : function (valueJson) {
		this.valueJson = valueJson; //鑾峰彇鍓嶅彴椤甸潰浼犲叆鐨勫弬鏁�
		this.wheelInit(); //涓€浜涙牱寮忕殑鍒濆鍖� 濡傚渾褰㈢殑楂樺害璁剧疆绛�
		this.resize(); //onresize 浜嬩欢 閲嶇疆鏍峰紡
		this.cancel($('.false')); //娉ㄥ唽鍙栨秷鎸夐挳鐨勭偣鍑讳簨浠�
		this.cancel($('.close'));//娉ㄥ唽鍐嶆潵涓€娆℃寜閽殑鐐瑰嚮浜嬩欢
		return this; //杩斿洖瀵硅薄鏈韩,浣垮叾鍙互閾惧紡璋冪敤
	},
	//杞洏鍒濆鍖�
	wheelInit : function () {
		var t = this;
		t.valueJson['wheelBody'].css('height', t.valueJson['wheelBody'].css('width'));
		t.valueJson['wheelSmall'].css('height', t.valueJson['wheelSmall'].css('width'));
		t.showStars(); //鏌愬嚑涓皬鍦嗙偣楂樹寒
	},
	//绐楀彛鏀瑰彉鏃剁殑閲嶆柊璁剧疆鏍峰紡
	resize : function () {
		var t = this;
		$(window).resize(function () {
			t.wheelInit();//绐楀彛鍙戠敓鍙樺寲鐨勬椂鍊欓噸缃牱寮�
		});
	},
	//璁＄畻骞朵笖鎺掑垪灏忓渾鐐�
	showStars : function () {
		var t = this;
		for(var i=0; i < t.valueJson['starsNum']; i++) {
			var oStar = document.createElement('div');

			if(i%2 == 0) { //濂囨暟鐨勫渾鐐瑰鍔犻珮浜殑鏁堟灉(澶栭槾褰�)
				oStar.style.boxShadow = '0 0 5px #fff';
			}	
			oStar.className = 'stars';
			oStar.style.left = t.valueJson['starsPostion'][i][0] + '%';
			oStar.style.top = t.valueJson['starsPostion'][i][1] + '%';
			t.valueJson['wheelBody'].append(oStar);

		}
	},
	//鍙栨秷鎸夐挳浜嬩欢缁戝畾
	cancel : function (obj) {
		obj.click(function () {
			$(this).parents('.dialog').css('display','none');
		});
	},
	
	wheelStart : function () {
		var t = this;
		t.nowRan = 0; //当前弧度
		t.once = true; //是否第一次
		t.onStart = true; //是否开始了转动
		t.runnum = 0;
		
		//鐐瑰嚮浜嬩欢
		t.valueJson['startBtn'].click(function () {
			if(t.onStart == true) { //鍙湁 涓� true 鐨� 鏃跺€� 鎵嶅厑璁歌浆鍔�
				t.onStart = false;

				//濡傛灉寮€鍚簡鍏虫敞 骞朵笖 褰撳墠 鐢ㄦ埛 娌℃湁鍏虫敞
				if(t.valueJson['is_gz'] == 1 && t.valueJson['is_follow'] == 2) {
					t.dialog($('.gz')); //寮瑰嚭鍏虫敞鎻愮ず妗�
				}else {

					//转盘开始的初始化函数 以及点击事件 通过链式调用加载 而非init()初始化加载,这样做,当未开始或者已结束页面不需要转动的时候,不链式调用此方法就行
					
					$.ajax({
						'type' : 'GET',
						'url' : t.valueJson['clickAjaxUrl'],
						success : function (data) {
							data = JSON.parse(data)
							if(data.status == 1) { //琛ㄧず鎴愬姛 \
								t.showWheel(data); //鎵ц杞姩鏁堟灉
							}else if(data['status'] == 2){ //閲戦涓嶈冻 鎴栬€呮鏁颁笉瓒�
								
								t.dialog($('.info'),data); //娌℃湁鎸夐挳鐨勬彁绀轰俊鎭�
							}else {         //鍑虹幇浜嗗紓甯搁敊璇�
								
								t.dialog($('.again'),data);  //鎵ц甯︽寜閽殑鎻愮ず妗�
							}
						}
					});
				}
			}
		});
	},

	//转盘转动具体算法
	
	showWheel : function (data) {
		//alert(data)
		var t = this;
		//console.log(t)
	//需要转动的值 等与当前值 + 默认转动7200度 + 后台计算传过来的度数
		var ra = t.nowRan + t.valueJson['actionRan'] + data['ran'];
		var aa = t.runnum + data['ran'];

		//第一次的话 弧度要加上每一块弧度的一半
		if(t.once) {
			t.once = false;
			ra = ra + (data['onceran'] / 2)
		}

		//注意指针 和 转盘 反方向转动 来达到 指针 不动的效果
		t.valueJson['wheelBody'].css('webkitTransform','rotate('+ ra +'deg)');
		t.valueJson['startBtn'].css('webkitTransform','rotate('+ (-ra) +'deg)');

		//重新获取当前的度数
	
		t.nowRan = ra;
		
	 	//alert(parseInt((t.nowRan-20) / 7200))
		data['numss'] = parseInt((t.nowRan-20) / 7200);
	 	//data['runnum'] = t.runnum;
	 	if(aa >=360){

	 		aa = aa - 360;
	 	}
	 	t.runnum = aa;
	 	data['runnum'] = t.runnum;
	 	console.log(data)
		//转盘转动需要4S  这里 4.5S 后 执行 各种弹出提示信息框的事件
		setTimeout(function () {
			t.showDialog(data);
			t.onStart = true;
		},4500);
	},

	//根据各种不同的参数 显示弹出层的提示框
	showDialog : function (data) {
		var t = this;
		//alert(data['actionStatus'])
		if(data['actionStatus'] == 1) {  //值为1 表示 抽取到了现金红包
			t.deduct(data); //扣除次数;
			t.dialog($('.theForm'), data); //获得奖品的 提示信息框
		}else if(data['actionStatus'] == 2) {   //值为2 表示 再来一次  再来一次不扣除次数
			t.dialog($('.again'), data);//再来一次
		}else if(data['actionStatus'] == 3) {  //值为3 表示 谢谢参与
			t.deduct(data); //扣除次数;   
			t.dialog($('.again'), data);//谢谢参与
		}
	},

	//扣除次数的相关操作  次数的 参数 也是ajax 后台传递过来
	deduct : function (data) {
		$('.g-num').find('em').html(data['num']);
	},

	//弹出层
	dialog : function (obj, data, bl) {
		var t = this;
		if(data && !bl) { //关注 再来一次  谢谢参与  系统异常 都是执行此处
			obj.find('d-main').children('p').html(data['mess']);
		}
		var aa = data['runnum']/40;
		
		if(aa == 0 || aa == 9){

			$('#my_d_main').html('谢谢惠顾，下次努力');
		}else if(aa == 1){

			$('#my_d_main').html('恭喜您，获得二积分，已转入您的账户中');

		}else if(aa == 2){
			$('#my_d_main').html('谢谢惠顾，下次努力');
		}else if(aa == 3){

			$('#my_d_main').html('恭喜您，获得三积分，已转入您的账户中');

		}else if(aa == 4){

			$('#my_d_main').html('谢谢惠顾，下次努力');
		}else if(aa == 5){

			$('#my_d_main').html('恭喜您，获得四积分，已转入您的账户中');

		}else if(aa==6){

			$('#my_d_main').html('谢谢惠顾，下次努力');
		}else if(aa ==7){

			$('#my_d_main').html('谢谢惠顾，下次努力');
		}else if(aa == 8){

			$('#my_d_main').html('恭喜您，获得一积分，已转入您的账户中');
		}
		
		obj.css('display','block');
		t.del_pay_points(aa);
	},

	del_pay_points : function (aa){

		$.ajax({
			url:"{:U('user/delLottery')}",
			data:{aa:aa},
			dataType:'JSON',
			type:'GET',
			success:function(data){

				//alert(data)
			}

		})

	}	

}
