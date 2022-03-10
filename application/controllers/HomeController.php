<?php
class HomeController extends CI_Controller {

const TPL_MASTER = 'master';
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
	}

	public function index()
	{
		$this->load->view(self::TPL_MASTER, [
			'sub'  => 'client/home',
		]);
      $this->load->view("client/home");
	}
}
