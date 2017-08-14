<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:49:"./template/mobile/new/user\ajax_comment_list.html";i:1490353004;}*/ ?>
<?php if(is_array($comment_list) || $comment_list instanceof \think\Collection): if( count($comment_list)==0 ) : echo "" ;else: foreach($comment_list as $k=>$vo): ?> 
    <div class="pingjia">
          <h2>购买时间：<?php echo date('Y-m-d H:i',$vo['add_time']); ?></h2>
          <dl>
          <dt><img src="<?php echo goods_thum_images($vo['goods_id'],200,200); ?>"></dt>
          <dd><span><?php echo $vo['goods_name']; ?></span><strong>￥<?php echo $vo['goods_price']; ?></strong></dd>
          <dd>
          	<?php if($vo[is_comment] == 0): ?>
          	<a class="remark" href="<?php echo U('User/add_comment',array('rec_id'=>$vo[rec_id])); ?>">评价订单</a>
          	<?php else: ?>
          	<a class="remark" href="<?php echo U('User/order_detail',array('id'=>$vo[order_id])); ?>">查看订单</a>
          	<?php endif; ?>
          </dd>
          </dl>
	     <?php if($vo[is_comment] == 1): ?>
		 	<div class="pj_main">
		       <ul>

		       		<li><em>评价：</em><img src="__STATIC__/images/stars<?php echo $vo['goods_rank']; ?>.png"></li>                
                    
		       		<li class="pj_w"><?php echo htmlspecialchars_decode($vo['content']); ?></li>
		       </ul>		
				<!--晒单-->
				<?php if($v['img'] != ''): ?>
			       <ul>
			       		<li><em>晒单：<?php echo $vo['comment']['title']; ?></em></li>
			       		<li class="pj_w"><?php echo $vo['comment']['message']; ?></li>
			       </ul>
			       <div class="sd_img">
			        <dl id="gallery">
					<?php if(is_array($vo['img']) || $vo['img'] instanceof \think\Collection): if( count($vo['img'])==0 ) : echo "" ;else: foreach($vo['img'] as $key=>$v2): ?>
				       <dd><a href="<?php echo $v2; ?>"><img src="<?php echo $v2; ?>" width="100px" heigth="100px"></a></dd>
					<?php endforeach; endif; else: echo "" ;endif; ?>
			        </dl>
			       </div>
				<?php endif; ?>
				<!--管理员回复-->			
				<?php if(is_array($replyList) || $replyList instanceof \think\Collection): if( count($replyList)==0 ) : echo "" ;else: foreach($replyList as $key=>$val): ?>
				       <ul style="border-top:1px dashed #e5e5e5; padding-top:8px; margin-top:10px">
				       <li><em style=" color:#F60">管理员<?php echo $val['user_name']; ?>回复：</em></li>
				       <li class="pj_w" style=" color:#F60; font-size:12px;"><?php echo $val['content']; ?></li>
				       </ul>
				<?php endforeach; endif; else: echo "" ;endif; ?> 
		  	</div>
		<?php endif; ?>                
    </div>
<?php endforeach; endif; else: echo "" ;endif; ?> 