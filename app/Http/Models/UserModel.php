<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Session;

class UserModel extends Model
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->ss = DB::connection('ss');
		$this->tap_dw = DB::connection('tapdw');
	}
	/****	End Exclusive Function *****/
	
	/****	Select Function *****/
	public function getAllEmployee(){
		$union_employee = $this->tap_dw
								->select(DB::raw("SELECT me.EMPLOYEE_NIK AS NIK,me.EMPLOYEE_FULLNAME AS FULLNAME,
													me.EMPLOYEE_POSITION AS POSITION
													FROM TM_EMPLOYEE_HRIS me
													WHERE EMPLOYEE_RESIGNDATE IS NULL OR EMPLOYEE_RESIGNDATE>sysdate
													UNION
													SELECT me.NIK,me.EMPLOYEE_NAME AS FULLNAME,me.JOB_CODE AS POSITION 
													FROM TM_EMPLOYEE_SAP me
													WHERE (me.RES_DATE IS NULL OR me.RES_DATE>sysdate) 
														AND TO_CHAR(me.END_VALID,'YYYY')='9999' "));
		return $union_employee;
	}
	public function getAllUser(){
		$getUser = $this->ss
						->table('TM_USER mu')
						->join('TM_USER_LEVEL mul', 'mu.USER_LEVEL', '=', 'mul.USER_LEVEL')
						->leftJoin('TM_TYPE mt', 'mu.DOC_TYPE_ID', '=', 'mt.TYPE_ID')
						->select('mu.NIK','mu.USER_NAME','mu.USER_ACTIVE','mu.USER_LEVEL',
								'mul.USER_LEVEL_NAME','mt.TYPE_NAME')
						->get();
		return $getUser;
	}
	public function getEmployee($nik){
		$union_employee = $this->tap_dw
								->select(DB::raw("SELECT me.EMPLOYEE_NIK AS NIK,me.EMPLOYEE_FULLNAME AS FULLNAME,
													me.EMPLOYEE_POSITION AS POSITION
													FROM TM_EMPLOYEE_HRIS me
													WHERE me.EMPLOYEE_NIK='".$nik."'
														AND (EMPLOYEE_RESIGNDATE IS NULL OR EMPLOYEE_RESIGNDATE>sysdate)
													UNION
													SELECT me.NIK,me.EMPLOYEE_NAME AS FULLNAME,me.JOB_CODE AS POSITION 
													FROM TM_EMPLOYEE_SAP me
													WHERE me.NIK='".$nik."'
														AND (me.RES_DATE IS NULL OR me.RES_DATE>sysdate) 
														AND TO_CHAR(me.END_VALID,'YYYY')='9999' "));
		return count($union_employee)>0?$union_employee[0]:false;
	}
	public function getNIK($username){
		$getNIK = $this->ss
						->table('TM_USER mu')
						->select('mu.NIK')
						->where('mu.USER_NAME','=',$username)
						->where('mu.USER_ACTIVE','=',1)
						->get()->first();
		return $getNIK;
	}
	public function getUserData($nik){
		$getUser = $this->ss
						->table('TM_USER mu')
						->join('TM_USER_LEVEL mul', 'mu.USER_LEVEL', '=', 'mul.USER_LEVEL')
						->select('*')
						->where('mu.NIK','=',$nik)
						->where('mu.USER_ACTIVE','=',1)
						->get()->first();
		return $getUser;
	}
	/****	End Select Function *****/
	
	/****	Insert Function *****/
	public function insertNewUser($nik,$username,$password,$user_level,$user_fullname,$user_email,$doc_type=null){
		$this->ss->table('TM_USER')
				->insert([
					'NIK' => $nik, 
					'USER_NAME' => $username,
					'USER_PASS' => $password,
					'USER_ACTIVE' => 1,
					'USER_LEVEL' => $user_level,
					'USER_FULLNAME' => $user_fullname,
					'USER_EMAIL' => $user_email,
					'DOC_TYPE_ID' => $doc_type,
					'USER_USER_CREATED'=>Session::get('user_name')
				]);
		$insertedData = $this->ss
						->table('TM_USER mu')
						->select('*')
						->where('NIK','=',$nik)
						->get()->first();
		return $insertedData;
	}
	/****	End Insert Function *****/
	
	/****	Update Function *****/
	public function changeStatus($nik,$current){
		$result = $this->ss
						->table('TM_USER mu')
						->where('NIK', $nik)
						->update(['USER_ACTIVE' => $current,
								'USER_USER_UPDATED'=>Session::get('user_name'),
								'USER_TIME_UPDATED'=>DB::raw('sysdate')]);
		return $result;
	}
	public function changePass($nik,$new_pass){
		$result = $this->ss
						->table('TM_USER mu')
						->where('NIK', $nik)
						->update(['USER_PASS' => $new_pass,
								'USER_USER_UPDATED'=>Session::get('user_name'),
								'USER_TIME_UPDATED'=>DB::raw('sysdate')]);
		return $result;
	}
	public function updateUserData($nik,$user_level,$email,$type_improvement){
		$result = $this->ss
						->table('TM_USER mu')
						->where('NIK', $nik)
						->update(['USER_LEVEL' => $user_level,
									'USER_EMAIL' => $email,
									'DOC_TYPE_ID' => $type_improvement,
									'USER_USER_UPDATED'=>Session::get('user_name'),
									'USER_TIME_UPDATED'=>DB::raw('sysdate')]);
		return $result;
	}
	/****	End Update Function *****/
	
	/****	Delete Function *****/
	/****	End Delete Function *****/
}
