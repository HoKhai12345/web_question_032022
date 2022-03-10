<div class="cat-left-drop-menu">
	<div class="cat-left-drop-menu-left">
		<ul>
			<?php foreach ($sub_category as $itemSub){ ?>
			<li style="background-color: <?php echo $itemSub->background_color?>;border-radius:30px "><a style="font-size: 20px;color: whitesmoke;font-weight: bold" href="<?php echo base_url('/QuestionGame/'.$itemSub->slug)  ?>"><?php echo $itemSub->category_name ?></a></li>
			<?php } ?>
<!--			<li><a href="shop-gird.html">T-shirts</a></li>-->
		</ul>
	</div>
</div>
