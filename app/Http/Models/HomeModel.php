<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class HomeModel extends Model
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->ss = DB::connection('ss');
	}
	/****	End Exclusive Function *****/
	
	/****	Select Function *****/
	public function getUser($username){
		$getUser = $this->ss
						->table('TM_USER')
						->select('NIK','USER_NAME','USER_PASS','USER_ACTIVE','USER_LEVEL')
						->where('USER_NAME', $username)
						->where('USER_ACTIVE', '1')
						->get()->first();
		return $getUser;
	}
	/****	End Select Function *****/
	
	/****	Insert Function *****/
	/****	End Insert Function *****/
	
	/****	Update Function *****/
	/****	End Update Function *****/
	
	/****	Delete Function *****/
	/****	End Delete Function *****/
}
