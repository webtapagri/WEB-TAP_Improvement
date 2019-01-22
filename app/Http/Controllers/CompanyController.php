<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\MasterModel;
use App\Library\Validation;
use Redirect;
use Session;
use URL;

class CompanyController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct(){
		$this->master = new MasterModel();
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		$data = array();
		$data['CompanyList'] = $this->master->pt();
		return view("Company/list",$data);
	}
	/****	End View Function *****/
	
	/****	API Function *****/
	public function insertCompany(Request $request){
		$input = $request->all();
		$url = URL::to('/company/list');
		$msg = "Unknown error";
		if(isset($input['newCompanyName'])&&$input['newCompanyName']){
			$input['newCompanyName'] = strtoupper($input['newCompanyName']);
			$find = $this->master->getPtByName($input['newCompanyName']);
			if($find){				
				$msg = "Nama PT ".$input['newCompanyName']." sudah terdaftar";
			}
			else{
				$resultInsert = $this->master->insertCompany($input['newCompanyName']);
				if($resultInsert){
					Session::put('msg', Validation::successMessage("Success"));
					return Redirect($url);
				}
				$msg = "Insert failed";
			}
		}
		else{
			$msg = "Name must be filled";
		}
		Session::put('msg', Validation::validationMessage($msg));
		return Redirect($url);
	}
	public function submitChange(Request $request){
		$input = $request->all();
		$result = array();
		$result['success'] = false;
		$result['msg'] = "Unknown error";
		if(isset($input['newName'])&&$input['newName']){
			$input['newName'] = strtoupper($input['newName']);
			$find = $this->master->getPtByName($input['newName']);
			if($find){				
				$msg = "Nama PT ".$input['newName']." sudah terdaftar";
			}
			else{
				$resultUpdate = $this->master->changeCompany($input['compId'],$input['newName']);
				if($resultUpdate){
					$result['success'] = true;
					$result['msg'] = "";
				}
			}
		}
		echo json_encode($result);
	}
	public function deleteCompany($id){
		$resultDelete = $this->master->deleteCompany($id);
		$url = URL::to('/company/list');
		return Redirect($url);
	}
	/****	End API Function *****/
}
