<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:43:"./template/mobile/new/user\ajax_points.html";i:1490353004;}*/ ?>
<?php if(is_array($account_log) || $account_log instanceof \think\Collection): if( count($account_log)==0 ) : echo "" ;else: foreach($account_log as $key=>$vo): ?>
<li class="list_add J_add">
    <div class="td_l">
        <p>余额: <?php echo $vo['user_money']; ?></p>
        <p>积分:<?php echo $vo['pay_points']; ?></p>
    </div>
    <div class="td_r">
        <p class="il_money"><?php echo $vo['desc']; ?></p>
        <p class="time"><?php echo date('Y-m-d',$vo['change_time']); ?></p>
    </div>
</li>
<?php endforeach; endif; else: echo "" ;endif; ?>      