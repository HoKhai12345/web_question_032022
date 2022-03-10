<?php
class Category extends CI_Model {
	const PRIMARY_ID = 'id';
	const TABLE_NAME = 'category_question';
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
	public function getIdCategory($slug){
        $this->db->select("id");
        $this->db->from(self::TABLE_NAME);
        $this->db->where(['status'=>self::STATUS_ACTIVE,'slug'=>$slug]);
        return $this->db->get()->row();
	}
	public function get_category_with_id($id){
		$this->db->select("*");
		$this->db->from(self::TABLE_NAME);
		$this->db->where('id' , $id);
		$this->db->where('status',self::STATUS_ACTIVE);
		return $this->db->get()->row();
	}
}
