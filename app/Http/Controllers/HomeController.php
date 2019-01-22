<?php

namespace App\Http\Controllers;

use App\Http\Models\HomeModel;
use App\Http\Models\UserModel;
use App\Library\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Redirect;
use Session;
use URL;

class HomeController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->home = new HomeModel();
		$this->user = new UserModel();
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		return view('homepage');
	}
	public function login(Request $request){
		if (Session::get('nik') != null) {
			$url = URL::to('/');
			return Redirect($url);
		}
		return view('login');
	}
	public function changePass(){
		return view('changepass');
	}
	public function submitChangePass(Request $request){
		$input = $request->input();
		$validation = false;
		$errorMessage = "Unknown error";
		$url = URL::to('/changepass');
		if(!isset($input['oldPass'])||$input['oldPass']==''){
			$errorMessage = "Password lama harus diisi";
		}
		else if(!isset($input['newPass'])||$input['newPass']==''){
			$errorMessage = "Password baru harus diisi";
		}
		else if(!isset($input['confNewPass'])||$input['confNewPass']==''){
			$errorMessage = "Konfirmasi password baru harus diisi";
		}
		else if($input['newPass']!=$input['confNewPass']){
			$errorMessage = "Password baru dan konfirmasi password baru tidak cocok";
		}
		else{
			$existsUser = $this->user->getNIK(Session::get('user_name'));
			if(!$existsUser){
				$errorMessage = "Username tidak dikenali";
			}
			else{
				$newId = $this->user->changePass(Session::get('nik'),Hash::make($input['newPass']));
				if($newId){
					$validation = true;
				}
			}
		}
		if($validation){
			Session::put('msg', Validation::successMessage("Berhasil menambah user"));
			return Redirect($url)->with("msg");
		}
		else{
			Session::put('msg', Validation::validationMessage($errorMessage));
			return Redirect($url);
		}
	}
	/****	End View Function *****/
	
	/****	API Function *****/
    public function logout() {
        Session::flush();
        Session::regenerate();
        $url = URL::to('/login');
        Session::put('pre-url', $url);
        return Redirect($url);
    }
    public function submitLogin(Request $request) {
        $url = URL::to('/');
        $getaktifuser = $this->home->getUser($request->username);
		$msg = "";
		if (isset($getaktifuser)&& Hash::check($request->password,$getaktifuser->user_pass)) {
			if ($getaktifuser->user_active == 1) {
				//Hardcode menu
				$menu = array();
				if($getaktifuser->user_level==0){
					$submenu = array();
					array_push($submenu,array(
											"id"=>"2",
											"target"=>"/master/user",
											"name"=>"User",
											"iconClass"=>"fa fa-users"));
					array_push($submenu,array(
											"id"=>"3",
											"target"=>"/master/location",
											"name"=>"Lokasi",
											"iconClass"=>"fa fa-location-arrow"));
					array_push($submenu,array(
											"id"=>"4",
											"target"=>"/master/company",
											"name"=>"PT",
											"iconClass"=>"fa fa-building"));
					array_push($submenu,array(
											"id"=>"5",
											"target"=>"/master/division",
											"name"=>"Divisi",
											"iconClass"=>"fa fa-male"));
					array_push($submenu,array(
											"id"=>"6",
											"target"=>"/master/type",
											"name"=>"Jenis SS",
											"iconClass"=>"fa fa-file"));
					array_push($menu,array(
											"id"=>"1",
											"target"=>"/master",
											"name"=>"Master Data",
											"iconClass"=>"fa fa-bars",
											"submenu"=>$submenu));
					$submenu = array();
					array_push($submenu,array(
											"id"=>"8",
											"target"=>"/approval/tracking",
											"name"=>"Approval Tracking",
											"iconClass"=>"fa fa-history"));
					array_push($menu,array(
											"id"=>"7",
											"target"=>"/approval",
											"name"=>"Report",
											"iconClass"=>"fa fa-file",
											"submenu"=>$submenu));
				}
				else if($getaktifuser->user_level==1){
					array_push($menu,array(
											"id"=>"9",
											"target"=>"/improvement",
											"name"=>"Form Improvement",
											"iconClass"=>"fa fa-file"));
				}
				else if($getaktifuser->user_level==2){
					$submenu = array();
					array_push($submenu,array(
											"id"=>"11",
											"target"=>"/approval",
											"name"=>"Outstanding",
											"iconClass"=>"fa fa-check"));
					array_push($menu,array(
											"id"=>"10",
											"target"=>"/approval",
											"name"=>"Approval",
											"iconClass"=>"fa fa-file",
											"submenu"=>$submenu));
					$submenu = array();
					array_push($submenu,array(
											"id"=>"13",
											"target"=>"/approval/tracking",
											"name"=>"Approval Tracking",
											"iconClass"=>"fa fa-history"));
					array_push($menu,array(
											"id"=>"12",
											"target"=>"/approval",
											"name"=>"Report",
											"iconClass"=>"fa fa-file",
											"submenu"=>$submenu));
				}
				else if($getaktifuser->user_level==3){
					$submenu = array();
					array_push($submenu,array(
											"id"=>"11",
											"target"=>"/approval",
											"name"=>"Outstanding",
											"iconClass"=>"fa fa-check"));
					array_push($menu,array(
											"id"=>"10",
											"target"=>"/approval",
											"name"=>"Approval",
											"iconClass"=>"fa fa-file",
											"submenu"=>$submenu));
				}
				// Save Session
				Session::put('nik', $getaktifuser->nik);
				Session::put('user_name', $getaktifuser->user_name);
				Session::put('user_level', $getaktifuser->user_level);
				Session::put('user_menu', $menu);
				Session::save();
				// SUCCESS LOGIN
				$lastUrl = Session::get('pre-url');
				if ($lastUrl != null&&$lastUrl != url('login')) {
					return redirect($lastUrl);
				}
				else {
					return Redirect('/');
				}
			}
			else {
				$msg = Validation::validationMessage('Anda Tidak Memiliki Hak Akses');
			}//END IF GETAKTIFUSER
		}
		else {
			if (isset($getaktifuser)) {
				$msg = Validation::validationMessage('Username atau Password Salah');
			}
			else {
				$msg = Validation::validationMessage('Username Belum Terdaftar');
			} //END ELSE --JIKA USER ID BELUM TERDAFTAR PADA DATABASE--
		} // CLose if isset($getaktifuser)
		
		Session::put('pesan', $msg);
		return Redirect('/login');
    }
	/****	End API Function *****/
}
