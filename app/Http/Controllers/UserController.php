<?php

namespace App\Http\Controllers;

use App\Http\Models\UserModel;
use App\Http\Models\MasterModel;
use App\Library\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Redirect;
use Session;
use URL;

class UserController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->user = new UserModel();
		$this->master = new MasterModel();
	}
	private function getEmployeeData($nik){
		$employeeData = $this->user->getEmployee($nik);
		return $employeeData;
	}
	private function getUserData($nik){
		$found_user = $this->user->getUserData($nik);
		return $found_user;
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
    public function index(){
		return view("User/list");
	}
	public function changeEmployee(){
		Session::forget("ChoosenEmployeeForNewUser");
		$url = URL::to('/user/create');
		return Redirect($url);
	}
	public function changeStatus($current,$nik=null){
		if($current==1){
			$current=0;
		}
		else if($current==0){
			$current=1;
		}
		$result = false;
		if($nik){
			$result = $this->user->changeStatus($nik,$current);
		}
		$url = URL::to('/user/list');
		if($result){
			return Redirect($url);
		}
		else{
			Session::put('msg', Validation::validationMessage("Gagal mengubah status user"));
			return Redirect($url);
		}
	}
	public function chooseEmployee($nik){
		Session::put("ChoosenEmployeeForNewUser",$nik);
		$url = URL::to('/user/create');
		return Redirect($url);
	}
	public function detail($nik){
		$data = array();
		$data['UserData'] = $this->user->getUserData($nik);
		$data['EmployeeData'] = $this->user->getEmployee($nik);
		$data['UserLevels'] = $this->master->userLevel();
		$data['TypeList'] = $this->master->jenis_ss();
		return view("User/detail",$data);
	}
    public function create(){
		$data = array();
		if(Session::has("ChoosenEmployeeForNewUser")){
			$data['ChoosenEmployeeData'] = $this->getEmployeeData(Session::get("ChoosenEmployeeForNewUser"));
			$data['UserLevels'] = $this->master->userLevel();
			$data['TypeList'] = $this->master->jenis_ss();
		}
		return view("User/create",$data);
	}
	public function submit(Request $request){
		$input = $request->input();
		$validation = false;
		$errorMessage = "Unknown error";
		if(!isset($input['username'])||$input['username']==''){
			$errorMessage = "Username harus diisi";
		}
		else if(!isset($input['password'])||$input['password']==''){
			$errorMessage = "Password harus diisi";
		}
		else if(!isset($input['confirm_password'])||$input['confirm_password']==''){
			$errorMessage = "Konfirmasi password harus diisi";
		}
		else if(!isset($input['user_level'])||$input['user_level']==''){
			$errorMessage = "User level harus dipilih";
		}
		else if($input['user_level']!=1&&(!isset($input['email'])||$input['email']=='')){
			$errorMessage = "Email user harus diisi untuk tipe user selain user";
		}
		else if($input['password']!=$input['confirm_password']){
			$errorMessage = "Password dan konfirmasi password tidak cocok";
		}
		else if(($input['user_level']==3)&&(!isset($input['type_improvement'])||$input['type_improvement']=='')){
			//user level dept improvement atau verificator tapi tidak memilih tipe improvement
			$errorMessage = "Tipe perbaikan harus dipilih jika user level adalah verificator";
		}
		else{
			$existsUser = $this->user->getNIK($input['username']);
			if($existsUser){
				$errorMessage = "Username sudah digunakan dengan NIK ".$existsUser->nik;
			}
			else{
				$newId = $this->user->insertNewUser($input['nik'],$input['username'],Hash::make($input['password']),
													$input['user_level'],$input['fullname'],$input['email'],$input['type_improvement']);
				if($newId){
					$validation = true;
				}
			}
		}
		if($validation){
			Session::forget("ChoosenEmployeeForNewUser");
			$url = URL::to('/user/list');
			Session::put('msg', Validation::successMessage("Berhasil menambah user"));
			return Redirect($url);
		}
		else{
			$url = URL::to('/user/create');
			Session::put('msg', Validation::validationMessage($errorMessage));
			return Redirect($url);
		}
	}
	/****	End View Function *****/
	
	/****	API Function *****/
	public function getAllUser(){
		$allUserList = $this->user->getAllUser();
		return response()->json([
			"allUserList"=>$allUserList
		]);
	}
	public function getAllEmployee(){
		$allEmployeeList = $this->user->getAllEmployee();
		return response()->json([
			"allEmployeeList"=>$allEmployeeList
		]);
	}
	public function getEmployee(Request $request){
		$employeeData = $this->getEmployeeData($nik);
		return response()->json([
			"employeeData"=>$employeeData
		]);
	}
    public function resetPass(Request $request){
		$res = array();
		$res["success"] = false;
		$res["msg"] = "Unknown error";
		if($request->has('nik')){
			$nik = $request->input("nik");
			if($this->getUserData($nik)){
				//$new_pass = str_random(7);
				$new_pass = "tap12345";
				$chPassRes = $this->user->changePass($nik,Hash::make($new_pass));
				if($chPassRes){
					$res["nik"] = $nik;
					$res["new_pass"] = $new_pass;
					$res["success"] = true;
					$res["msg"] = "Password berhasil dirubah";
				}
			}
			else{
				$res["msg"] = "NIK ".$nik." belum terdaftar";
			}
		}
		return response()->json($res);
	}
	public function submitEdit(Request $request){
		$input = $request->input();
		$validation = false;
		$errorMessage = "Unknown error";
		if(!isset($input['email'])||$input['email']==''){
			$errorMessage = "Email user harus diisi";
		}
		else if(!isset($input['user_level'])||$input['user_level']==''){
			$errorMessage = "User level harus dipilih";
		}
		else if(($input['user_level']==3)&&(!isset($input['type_improvement'])||$input['type_improvement']=='')){
			//user level dept improvement atau verificator tapi tidak memilih tipe improvement
			$errorMessage = "Tipe perbaikan harus dipilih jika user level adalah verificator";
		}
		else{
			$res = $this->user->updateUserData($input['nik'],$input['user_level'],$input['email'],$input['type_improvement']);
			if($res){
				$validation = true;
			}
		}
		$url = URL::to('/user/list');
		if($validation){
			Session::put('msg', Validation::successMessage("Berhasil mengubah user"));
			return Redirect($url);
		}
		else{
			Session::put('msg', Validation::validationMessage($errorMessage));
			return Redirect($url);
		}
	}
	/****	End API Function *****/
}
