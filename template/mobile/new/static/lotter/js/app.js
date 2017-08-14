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
	//杞洏寮€濮嬬殑鍒濆鍖栧嚱鏁� 浠ュ強鐐瑰嚮浜嬩欢 閫氳繃閾惧紡璋冪敤鍔犺浇 鑰岄潪init()鍒濆鍖栧姞杞�,杩欐牱鍋�,褰撴湭寮€濮嬫垨鑰呭凡缁撴潫椤甸潰涓嶉渶瑕佽浆鍔ㄧ殑鏃跺€�,涓嶉摼寮忚皟鐢ㄦ鏂规硶灏辫
	wheelStart : function () {
		var t = this;
		t.nowRan = 0; //褰撳墠寮у害
		t.once = true; //鏄惁绗竴娆�
		t.onStart = true; //鏄惁寮€濮嬩簡杞姩

		//鐐瑰嚮浜嬩欢
		t.valueJson['startBtn'].click(function () {
			if(t.onStart == true) { //鍙湁 涓� true 鐨� 鏃跺€� 鎵嶅厑璁歌浆鍔�
				t.onStart = false;

				//濡傛灉寮€鍚簡鍏虫敞 骞朵笖 褰撳墠 鐢ㄦ埛 娌℃湁鍏虫敞
				if(t.valueJson['is_gz'] == 1 && t.valueJson['is_follow'] == 2) {
					t.dialog($('.gz')); //寮瑰嚭鍏虫敞鎻愮ず妗�
				}else {

					//ajax 浜嬩欢 鑾峰彇
					//寰楀埌鐨勫弬鏁拌缁嗚浜や簰鏂囨。
					
					/*$.ajax({
						'type' : 'POST',
						'url' : t.valueJson['clickAjaxUrl'],
						success : function (data) {*/
							var data = {'status' : 1, 'actionStatus' : 1, 'ran' : 40, 'onceran' : 40, 'num' : 1}
							if(data['status'] == 1) { //琛ㄧず鎴愬姛 
								t.showWheel(data); //鎵ц杞姩鏁堟灉
							}else if(data['status'] == 2){ //閲戦涓嶈冻 鎴栬€呮鏁颁笉瓒�
								t.dialog($('.info'),data); //娌℃湁鎸夐挳鐨勬彁绀轰俊鎭�
							}else {         //鍑虹幇浜嗗紓甯搁敊璇�
								t.dialog($('.again'),data);  //鎵ц甯︽寜閽殑鎻愮ず妗�
							}
						/*}
					});*/
				}
			}
		});
	},

	//杞洏杞姩鍏蜂綋绠楁硶
	showWheel : function (data) {
		var t = this;
		//闇€瑕佽浆鍔ㄧ殑鍊� 绛変笌褰撳墠鍊� + 榛樿杞姩7200搴� + 鍚庡彴璁＄畻浼犺繃鏉ョ殑搴︽暟
		var ra = t.nowRan + t.valueJson['actionRan'] + data['ran'];

		//绗竴娆＄殑璇� 寮у害瑕佸姞涓婃瘡涓€鍧楀姬搴︾殑涓€鍗�
		if(t.once) {
			t.once = false;
			ra = ra + (data['onceran'] / 2)
		}

		//娉ㄦ剰鎸囬拡 鍜� 杞洏 鍙嶆柟鍚戣浆鍔� 鏉ヨ揪鍒� 鎸囬拡 涓嶅姩鐨勬晥鏋�
		t.valueJson['wheelBody'].css('webkitTransform','rotate('+ ra +'deg)');
		t.valueJson['startBtn'].css('webkitTransform','rotate('+ (-ra) +'deg)');

		//閲嶆柊鑾峰彇褰撳墠鐨勫害鏁�
		t.nowRan = ra;

		//杞洏杞姩闇€瑕�4S  杩欓噷 4.5S 鍚� 鎵ц 鍚勭寮瑰嚭鎻愮ず淇℃伅妗嗙殑浜嬩欢
		setTimeout(function () {
			t.showDialog(data);
			t.onStart = true;
		},4500);
	},

	//鏍规嵁鍚勭涓嶅悓鐨勫弬鏁� 鏄剧ず寮瑰嚭灞傜殑鎻愮ず妗�
	showDialog : function (data) {
		var t = this;

		if(data['actionStatus'] == 1) {  //鍊间负1 琛ㄧず 鎶藉彇鍒颁簡鐜伴噾绾㈠寘
			t.deduct(data); //鎵ｉ櫎娆℃暟;
			t.dialog($('.theForm'), data); //鑾峰緱濂栧搧鐨� 鎻愮ず淇℃伅妗�
		}else if(data['actionStatus'] == 2) {   //鍊间负2 琛ㄧず 鍐嶆潵涓€娆�  鍐嶆潵涓€娆′笉鎵ｉ櫎娆℃暟
			t.dialog($('.again'), data);//鍐嶆潵涓€娆�
		}else if(data['actionStatus'] == 3) {  //鍊间负3 琛ㄧず 璋㈣阿鍙備笌
			t.deduct(data); //鎵ｉ櫎娆℃暟;  
			t.dialog($('.again'), data);//璋㈣阿鍙備笌
		}
	},

	//鎵ｉ櫎娆℃暟鐨勭浉鍏虫搷浣�  娆℃暟鐨� 鍙傛暟 涔熸槸ajax 鍚庡彴浼犻€掕繃鏉�
	deduct : function (data) {
		$('.g-num').find('em').html(data['num']);
	},

	//寮瑰嚭灞�
	dialog : function (obj, data, bl) {
		if(data && !bl) { //鍏虫敞 鍐嶆潵涓€娆�  璋㈣阿鍙備笌  绯荤粺寮傚父 閮芥槸鎵ц姝ゅ
			obj.find('d-main').children('p').html(data['mess']);
		}

		//鎵撳紑寮瑰嚭灞�
		obj.css('display','block');

	}

}