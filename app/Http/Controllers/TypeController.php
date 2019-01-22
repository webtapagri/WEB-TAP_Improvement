<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\MasterModel;
use App\Library\Validation;
use Redirect;
use Session;
use URL;

class TypeController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct(){
		$this->master = new MasterModel();
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		$data = array();
		$data['TypeList'] = $this->master->jenis_ss();
		return view("Type/list",$data);
	}
	/****	End View Function *****/
	
	/****	API Function *****/
	public function insertType(Request $request){
		$input = $request->all();
		$url = URL::to('/type/list');
		$msg = "Unknown error";
		if(isset($input['newTypeName'])&&$input['newTypeName']){
			$input['newTypeName'] = strtoupper($input['newTypeName']);
			$find = $this->master->getJenis_ssByName($input['newTypeName']);
			if($find){				
				$msg = "Nama Jenis ss ".$input['newTypeName']." sudah terdaftar";
			}
			else{
				$resultInsert = $this->master->insertType($input['newTypeName']);
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
			$find = $this->master->getJenis_ssByName($input['newName']);
			if($find){				
				$msg = "Nama Jenis ss ".$input['newName']." sudah terdaftar";
			}
			else{
				$resultUpdate = $this->master->changeType($input['typeId'],$input['newName']);
				if($resultUpdate){
					$result['success'] = true;
					$result['msg'] = "";
				}
			}
		}
		echo json_encode($result);
	}
	public function deleteType($id){
		$resultDelete = $this->master->deleteType($id);
		$url = URL::to('/type/list');
		return Redirect($url);
	}
	/****	End API Function *****/
}
