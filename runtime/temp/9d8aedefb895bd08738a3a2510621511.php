<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:45:"./template/mobile/new/user\order_confirm.html";i:1502186218;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="__STATIC__/new2/css/style.css">
    <link rel="stylesheet" type="text/css" href="__STATIC__/new2/css/iconfont.css"/>
    <script src="__STATIC__/new2/js/jquery-3.1.1.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="__STATIC__/new2/js/mobile-util.js" type="text/javascript" charset="utf-8"></script>
</head>
<body class="f3">
<div class="classreturn loginsignup">
    <div class="content">
        <div class="ds-in-bl return">
            <a href="<?php echo U('Mobile/user/order_list'); ?>"><img src="__STATIC__/images/return.png" alt="返回"></a>
        </div>
        <div class="ds-in-bl search center">
            <span>确认收货成功</span>
        </div>
        <!--<div class="ds-in-bl menu mess">
            <a href="javascript:void(0);"><img src="images/mess.png" alt=""></a>
        </div>-->
    </div>
</div>
<div class="euresucess">
    <img src="__STATIC__/images/sch.png"/>
    <p>确认收货成功</p>
</div>
<div class="sonfbst">
    <div class="maleri30">
        <!--<span><i class="fbs"></i>立即发表评价晒图，最多可获得50积分</span>-->
    </div>
</div>
<div class="quedbox bg_white">
    <div class="fukcuid mae">
        <div class="maleri30">
            <?php if(is_array($order_goods['result']) || $order_goods['result'] instanceof \think\Collection): if( count($order_goods['result'])==0 ) : echo "" ;else: foreach($order_goods['result'] as $key=>$good): ?>
                <div class="shopprice p">
                    <div class="img_or fl"><img src="<?php echo $good[original_img]; ?>"></div>
                    <div class="fon_or fl">
                        <h2 class="similar-product-text"><a href="<?php echo U('Mobile/Goods/goodsinfo',array('id'=>$good[goods_id])); ?>"><?php echo $good[goods_name]; ?></a></h2>
                        <a class="compj" href="<?php echo U('Mobile/User/add_comment',array('rec_id'=>$good[rec_id])); ?>">去评价</a>
                    </div>
                </div>
            <?php endforeach; endif; else: echo "" ;endif; ?>
        </div>
    </div>
</div>
</body>
</html>
