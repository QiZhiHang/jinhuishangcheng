<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:40:"./template/mobile/new/user\dalesong.html";i:1502430878;s:44:"./template/mobile/new/public\footer_nav.html";i:1497651631;s:42:"./template/mobile/new/public\wx_share.html";i:1490353004;}*/ ?>
<!DOCTYPE html >
<html>
<head>
<meta name="Generator" content="TPshop v1.1" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<title>大乐送-<?php echo $tpshop_config['shop_info_store_title']; ?></title>
<meta http-equiv="keywords" content="<?php echo $tpshop_config['shop_info_store_keyword']; ?>" />
<meta name="description" content="<?php echo $tpshop_config['shop_info_store_desc']; ?>" />
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
<link rel="stylesheet" type="text/css" href="__STATIC__/css/public.css"/>
<link rel="stylesheet" type="text/css" href="__STATIC__/css/index.css"/>
<script type="text/javascript" src="__STATIC__/js/jquery.js"></script>
<script type="text/javascript" src="__STATIC__/js/TouchSlide.1.1.js"></script>
<script type="text/javascript" src="__STATIC__/js/jquery.json.js"></script>
<script type="text/javascript" src="__STATIC__/js/touchslider.dev.js"></script>
<script type="text/javascript" src="__STATIC__/js/layer.js" ></script>
<script src="__PUBLIC__/js/global.js"></script>
<script src="__PUBLIC__/js/mobile_common.js"></script>
<link rel="stylesheet" type="text/css" href="__STATIC__/more/css/bj.css" />

</head>
<body>

    <div class="bj">

      <div class="ht">
        <p>金辉商城</p>
        <p><?php echo $today_num; ?></p>
      </div>
      
      
      <div class="yb">
        
      </div>
      
      <div class="ym">
        返现总额<span><?php echo $user_money; ?></span>
      </div>
      
      
      <div class="hw">
        <ul class="nr clear">

          <li>
            <p>每天返现</p>
            <p><span><?php echo $every_day_money; ?></span></p>
          </li>
           <li></li>
           <li>
            <p>现返现积分</p>
            <p><span><?php echo $now_money; ?></span></p>
          </li>

        </ul>

    
      </div>

    </div>


<div style="height:50px; line-height:50px; clear:both;"></div>
<div class="v_nav">
	<div class="vf_nav">
		<ul>
			<li> <a href="<?php echo U('Index/index'); ?>">
			    <i class="vf_1"></i>
			    <span>首页</span></a></li>
			<li><a href="<?php echo U('Goods/categoryList'); ?>">
			    <i class="vf_3"></i>
			    <span>分类</span></a></li>
			<li><a href="<?php echo U('User/dalesong'); ?>">
			    <i class="vf_2"></i>
			    <span>大乐送</span></a></li>
			<li>
			<a href="<?php echo U('Cart/cart'); ?>">
			   <em class="global-nav__nav-shop-cart-num" id="cart_quantity" style="right:9px;"></em>
			   <i class="vf_4"></i>
			   <span>购物车</span>
			   </a>
			</li>
			<li><a href="<?php echo U('User/index'); ?>">
			    <i class="vf_5"></i>
			    <span>我的</span></a>
			</li>
		</ul>
	</div>
</div> 
<script type="text/javascript">
$(document).ready(function(){
	  var cart_cn = getCookie('cn');
	  if(cart_cn == ''){
		$.ajax({
			type : "GET",
			url:"/index.php?m=Home&c=Cart&a=header_cart_list",//+tab,
			success: function(data){								 
				cart_cn = getCookie('cn');
				$('#cart_quantity').html(cart_cn);						
			}
		});	
	  }
	  $('#cart_quantity').html(cart_cn);
});
</script>
<!-- 微信浏览器 调用微信 分享js-->
<?php if($signPackage != null): ?>
	<script type="text/javascript" src="__STATIC__/js/jquery.js"></script>
<script src="__PUBLIC__/js/global.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">

<?php if(ACTION_NAME == 'goodsInfo'): ?>
   var ShareLink = "http://<?php echo $_SERVER[HTTP_HOST]; ?>/index.php?m=Mobile&c=Goods&a=goodsInfo&id=<?php echo $goods[goods_id]; ?>"; //默认分享链接
   var ShareImgUrl = "http://<?php echo $_SERVER[HTTP_HOST]; ?><?php echo goods_thum_images($goods[goods_id],400,400); ?>"; // 分享图标
<?php else: ?>
   var ShareLink = "http://<?php echo $_SERVER[HTTP_HOST]; ?>/index.php?m=Mobile&c=Index&a=index"; //默认分享链接
   var ShareImgUrl = "http://<?php echo $_SERVER[HTTP_HOST]; ?><?php echo $tpshop_config['shop_info_store_logo']; ?>"; // 分享图标
<?php endif; ?>

var is_distribut = getCookie('is_distribut'); // 是否分销代理
var user_id = getCookie('user_id'); // 当前用户id
//alert(is_distribut+'=='+user_id);

// 如果已经登录了, 并且是分销商
if(parseInt(is_distribut) == 1 && parseInt(user_id) > 0)
{									
	ShareLink = ShareLink + "&first_leader="+user_id;									
}										


// 微信配置
wx.config({
    debug: false, 
    appId: "<?php echo $signPackage['appId']; ?>", 
    timestamp: '<?php echo $signPackage["timestamp"]; ?>', 
    nonceStr: '<?php echo $signPackage["nonceStr"]; ?>', 
    signature: '<?php echo $signPackage["signature"]; ?>',
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','hideOptionMenu'] // 功能列表，我们要使用JS-SDK的什么功能
});

// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
wx.ready(function(){
    // 获取"分享到朋友圈"按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: "<?php echo $tpshop_config['shop_info_store_title']; ?>", // 分享标题
        link:ShareLink,
        imgUrl:ShareImgUrl // 分享图标
    });

    // 获取"分享给朋友"按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: "<?php echo $tpshop_config['shop_info_store_title']; ?>", // 分享标题
        desc: "<?php echo $tpshop_config['shop_info_store_desc']; ?>", // 分享描述
        link:ShareLink,
        imgUrl:ShareImgUrl // 分享图标
    });
	// 分享到QQ
	wx.onMenuShareQQ({
        title: "<?php echo $tpshop_config['shop_info_store_title']; ?>", // 分享标题
        desc: "<?php echo $tpshop_config['shop_info_store_desc']; ?>", // 分享描述
        link:ShareLink,
        imgUrl:ShareImgUrl // 分享图标
	});	
	// 分享到QQ空间
	wx.onMenuShareQZone({
        title: "<?php echo $tpshop_config['shop_info_store_title']; ?>", // 分享标题
        desc: "<?php echo $tpshop_config['shop_info_store_desc']; ?>", // 分享描述
        link:ShareLink,
        imgUrl:ShareImgUrl // 分享图标
	});

   <?php if(CONTROLLER_NAME == 'User'): ?> 
	wx.hideOptionMenu();  // 用户中心 隐藏微信菜单
   <?php endif; ?>
	
});
</script>


<!--微信关注提醒 start-->
<?php if(\think\Session::get('subscribe') == 0): ?>
<button class="guide" onclick="follow_wx()">关注公众号</button>
<style type="text/css">
.guide{width:20px;height:100px;text-align: center;border-radius: 8px ;font-size:12px;padding:8px 0;border:1px solid #adadab;color:#000000;background-color: #fff;position: fixed;right: 6px;bottom: 200px;}
#cover{display:none;position:absolute;left:0;top:0;z-index:18888;background-color:#000000;opacity:0.7;}
#guide{display:none;position:absolute;top:5px;z-index:19999;}
#guide img{width: 70%;height: auto;display: block;margin: 0 auto;margin-top: 10px;}
</style>
<script type="text/javascript" src="__STATIC__/js/layer.js" ></script>
<script type="text/javascript">

  // 关注微信公众号二维码	 
function follow_wx()
{
	layer.open({
		type : 1,  
		title: '关注公众号',
		content: '<img src="<?php echo $wechat_config['qr']; ?>" width="200">',
		style: ''
	});
}
 
</script> 
<?php endif; ?>
<!--微信关注提醒  end-->
<?php endif; ?>
<!-- 微信浏览器 调用微信 分享js  end-->

</body>
</html>