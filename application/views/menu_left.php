<div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
	<!-- LEFT-CATEGORY-MENU START -->
	<div class="left-category-menu">
		<div class="left-product-cat">
			<div class="category-heading">
				<h2>category</h2>
			</div>
			<!-- CATEGORY-MENU-LIST START -->
			<div class="category-menu-list">
				<ul>
					<?php foreach ($categories as $item){ ?>
					<li id="li_category" style="background-color: <?php echo $item->background_color ?>;border-radius: 30px"><a style="color: white;font-weight: 900" href="<?php echo base_url('/QuestionGame/'.$item->slug)  ?>"><span style="width: 60px;" class="cat-thumb hidden-md hidden-sm hidden-xs"><img src="<?php echo base_url('bstore/img/'.$item->icon)?>" alt="" /></span><?php echo $item->category_name ?></a>
						<!-- CAT-LEFT MEGA MENU START -->
						<input type="hidden" id="id_category" value="<?php echo $item->id ?>">
						<div id="sub_category"></div>


						<!-- CAT-LEFT MEGA MENU END -->
					</li>
					<?php } ?>
				</ul>
			</div>
			<!-- CATEGORY-MENU-LIST END -->
		</div>
	</div>
	<!-- LEFT-CATEGORY-MENU END -->
</div>
<script>
	if (localStorage.getItem('menuSub') == null) {
		const id_category = $("#id_category").val();
		$.ajax({
			url: 'http://web_tu_lam.khaiho.io/subCate/'+id_category,
			type: 'GET',
		}).then(function (result) {
			$("#sub_category").html(result);
			console.log("SUB")
			localStorage.setItem('menuSub',result);
		})
	}else {
		$("#sub_category").html(localStorage.getItem('menuSub'));
	}

</script>
