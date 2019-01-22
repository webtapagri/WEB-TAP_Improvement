<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\MasterModel;
use App\Library\Validation;
use Redirect;
use Session;
use URL;

class LocationController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct(){
		$this->master = new MasterModel();
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		$data = array();
		$data['LocationList'] = $this->master->lokasi();
		return view("Location/list",$data);
	}
	/****	End View Function *****/
	
	/****	API Function *****/
	public function insertLocation(Request $request){
		$input = $request->all();
		$url = URL::to('/location/list');
		$msg = "Unknown error";
		if(isset($input['newLocationName'])&&$input['newLocationName']){
			$input['newLocationName'] = strtoupper($input['newLocationName']);
			$find = $this->master->getLokasiByName($input['newLocationName']);
			if($find){				
				$msg = "Nama Lokasi ".$input['newLocationName']." sudah terdaftar";
			}
			else{
				$resultInsert = $this->master->insertLocation($input['newLocationName']);
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
			$find = $this->master->getLokasiByName($input['newName']);
			if($find){				
				$msg = "Nama Lokasi ".$input['newName']." sudah terdaftar";
			}
			else{
				$resultUpdate = $this->master->changeLocation($input['locId'],$input['newName']);
				if($resultUpdate){
					$result['success'] = true;
					$result['msg'] = "";
				}
			}
		}
		echo json_encode($result);
	}
	public function deleteLocation($id){
		$resultDelete = $this->master->deleteLocation($id);
		$url = URL::to('/location/list');
		return Redirect($url);
	}
	/****	End API Function *****/
}
