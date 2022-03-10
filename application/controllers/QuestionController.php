<?php
class QuestionController extends CI_Controller {

	const TPL_MASTER = 'master';
	const TPL_MENU_LEFT = 'menu_left';
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('Question');
		$this->load->model('Category');
		$this->load->database();
	}

	public function question($slug_category)
	{
		$id_cate = $this->Category->getIdCategory($slug_category);
		$page = isset($_GET['page'])?$_GET['page']:null;
        if (!$id_cate){
        	return "NO CATEGORY";
		}else{
			if ($page == null){
				$data = ['id_cate'=>$id_cate->id];
				$this->load->view(self::TPL_MASTER, [
					'sub'  => 'client/list_question',
					'data' => $data
				]);
			}else{
				$data = ['id_cate'=>$id_cate->id , 'page'=>$page];
				$this->load->view(self::TPL_MASTER, [
					'sub'  => 'client/question',
					'data' => $data
				]);
			}

		}
	}
	public function menu_sub($id_cate){
		$data_sub_category = $this->Category->get_list_sub_category($id_cate);
		$data = ['sub_category'=>$data_sub_category];
		return $this->load->view('menu_sub',$data);
	}
	public function apiListQuestionWidthCategory($categoryId,$page){
		$data = $this->Question->get_data_width_categoryId($categoryId,$page);
		$dataJson = json_encode($data);
		echo $dataJson;
	}
	public function apiListPageQuestion($id_cate){
		$count_data = $this->Question->get_count_question($id_cate);
		$category = $this->Category->get_category_with_id($id_cate);
		$slug_category = $category->slug;
		$total_page =ceil($count_data/4);
		$data = [
			"count_data" => $count_data,
			"limit" => 4,
			"total_page"=>$total_page,
			"slug_category" =>$slug_category
		];
		echo json_encode($data);
	}



}
