<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\MasterModel;
use App\Library\Validation;
use Redirect;
use Session;
use URL;

class DivisionController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct(){
		$this->master = new MasterModel();
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		$data = array();
		$data['DivisionList'] = $this->master->divisi();
		return view("Division/list",$data);
	}
	/****	End View Function *****/
	
	/****	API Function *****/
	public function insertDivision(Request $request){
		$input = $request->all();
		$url = URL::to('/division/list');
		$msg = "Unknown error";
		if(isset($input['newDivisionName'])&&$input['newDivisionName']){
			$input['newDivisionName'] = strtoupper($input['newDivisionName']);
			$find = $this->master->getDivisiByName($input['newDivisionName']);
			if($find){				
				$msg = "Nama Divisi ".$input['newDivisionName']." sudah terdaftar";
			}
			else{
				$resultInsert = $this->master->insertDivision($input['newDivisionName']);
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
			$find = $this->master->getDivisiByName($input['newName']);
			if($find){				
				$msg = "Nama Divisi ".$input['newName']." sudah terdaftar";
			}
			else{
				$resultUpdate = $this->master->changeDivision($input['divId'],$input['newName']);
				if($resultUpdate){
					$result['success'] = true;
					$result['msg'] = "";
				}
			}
		}
		echo json_encode($result);
	}
	public function deleteDivision($id){
		$resultDelete = $this->master->deleteDivision($id);
		$url = URL::to('/division/list');
		return Redirect($url);
	}
	/****	End API Function *****/
}
