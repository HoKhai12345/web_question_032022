<?php
class Question extends CI_Model {
	const PRIMARY_ID = 'id';
	const TABLE_NAME = 'question';
	const TABLE_CATE = 'category_question';
	const STATUS_ACTIVE = 1;
	const STATUS_UNACTIVE = 0;

	function __construct()
	{

	}
	public function get_list(){
		$this->db->select("*");
		$this->db->from(self::TABLE_NAME);
		$this->db->where([ 'status'=>self::STATUS_ACTIVE , 'parent'=>0]);
		return $this->db->get()->result();
	}
	public function get_list_sub_category($id){
		$this->db->select("*");
		$this->db->from(self::TABLE_NAME);
		$this->db->where('parent' , $id);
		$this->db->where('status',self::STATUS_ACTIVE);
		return $this->db->get()->result();
	}
	public function get_data_width_categoryId($categoryId,$page = 1){
		$start = ($page-1) * 4 ;
		$this->db->select('*');
		$this->db->from(self::TABLE_NAME);
		$this->db->join(self::TABLE_CATE, self::TABLE_CATE.'.id = ' . self::TABLE_NAME .'.categoryId');
		$this->db->where([self::TABLE_NAME.".status"=>1,self::TABLE_NAME.".categoryId"=>$categoryId]);
		$this->db->limit(4,$start);
		return $this->db->get()->result();
	}
	public function get_count_question($id_cate){
		$this->db->select('*');
		$this->db->from(self::TABLE_NAME);
		$this->db->where(["status"=>1,"categoryId"=>$id_cate]);
		return $this->db->count_all_results();
	}
}

