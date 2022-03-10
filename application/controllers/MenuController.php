<?php
class MenuController extends CI_Controller {

	const TPL_MASTER = 'master';
	const TPL_MENU_LEFT = 'menu_left';
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('Category');
		$this->load->database();
		$this->load->driver('cache', ['adapter' => 'apc', 'backup' => 'file']);
	}

	public function menu_left()
	{
      if ($this->cache->get('menu_left')){
		  $data_category = $this->cache->get('menu_left');
	  }else{
		  $data_category = $this->Category->get_list();
		  $this->cache->save('menu_left', $data_category, 36000);
	  }
         $data = ['categories'=>$data_category];

		 $this->load->view('menu_left', $data);
	}
	public function menu_sub($id_cate){
		if ($this->cache->get('menu_sub')){
			$data_sub_category = $this->cache->get('menu_sub');
		}else{
			$data_sub_category = $this->Category->get_list_sub_category($id_cate);
			$this->cache->save('menu_sub',$data_sub_category);
		}
		$data = ['sub_category'=>$data_sub_category];
		return $this->load->view('menu_sub',$data);
	}
}
