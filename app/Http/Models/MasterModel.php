<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Session;

class MasterModel extends Model
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->conn = DB::connection('ss');
	}
	/****	End Exclusive Function *****/
	
	/****	Select Function *****/
	public function divisi(){
		return $this->conn->table( 'TM_DIVISION' )->select('DIVISION_ID AS CODE','DIVISION_NAME AS NAME')
					->where(['DIVISION_ACTIVE'=>1])->orderBy('DIVISION_NAME')->get();
	}
	public function getDivisi($divisionId){
		return $this->conn->table( 'TM_DIVISION' )->select('DIVISION_ID AS CODE','DIVISION_NAME AS NAME')
					->where(['DIVISION_ACTIVE'=>1,'DIVISION_ID'=>$divisionId])->get()->first();
	}
	public function getDivisiByName($division){
		return $this->conn->table( 'TM_DIVISION' )->select('DIVISION_ID AS CODE','DIVISION_NAME AS NAME')
					->where(['DIVISION_ACTIVE'=>1,'DIVISION_NAME'=>$division])->get()->first();
	}
	public function userLevel(){
		return $this->conn->table( 'TM_USER_LEVEL' )->select('USER_LEVEL AS CODE','USER_LEVEL_NAME AS NAME')
					->where(['USER_LEVEL_ACTIVE'=>1])->orderBy('USER_LEVEL_NAME')->get();
	}
	public function getUserLevel($userLevel){
		return $this->conn->table( 'TM_USER_LEVEL' )->select('USER_LEVEL AS CODE','USER_LEVEL_NAME AS NAME')
					->where(['USER_LEVEL_ACTIVE'=>1,'USER_LEVEL'=>$userLevel])->get()->first();
	}
	public function getUserLevelByName($userLevel){
		return $this->conn->table( 'TM_USER_LEVEL' )->select('USER_LEVEL AS CODE','USER_LEVEL_NAME AS NAME')
					->where(['USER_LEVEL_ACTIVE'=>1,'USER_LEVEL_NAME'=>$userLevel])->get()->first();
	}
	public function jenis_ss(){
		return $this->conn->table("TM_TYPE")->select('TYPE_ID AS CODE','TYPE_NAME AS NAME')
					->where(['TYPE_ACTIVE'=>1])->orderBy('TYPE_NAME')->get();
	}
	public function getJenis_ss($typeId){
		return $this->conn->table("TM_TYPE")->select('TYPE_ID AS CODE','TYPE_NAME AS NAME')
					->where(['TYPE_ACTIVE'=>1,'TYPE_ID'=>$typeId])->get()->first();
	}
	public function getJenis_ssByName($type){
		return $this->conn->table("TM_TYPE")->select('TYPE_ID AS CODE','TYPE_NAME AS NAME')
					->where(['TYPE_ACTIVE'=>1,'TYPE_NAME'=>$type])->get()->first();
	}
	public function lokasi(){
		return $this->conn->table( 'TM_LOC' )->select('LOCATION_ID AS CODE','LOCATION_NAME AS NAME')
					->where(['LOCATION_ACTIVE'=>1])->orderBy('LOCATION_NAME')->get();
	}
	public function getLokasi($lokasiId){
		return $this->conn->table( 'TM_LOC' )->select('LOCATION_ID AS CODE','LOCATION_NAME AS NAME')
					->where(['LOCATION_ACTIVE'=>1,'LOCATION_ID'=>$lokasiId])->get()->first();
	}
	public function getLokasiByName($lokasi){
		return $this->conn->table( 'TM_LOC' )->select('LOCATION_ID AS CODE','LOCATION_NAME AS NAME')
					->where(['LOCATION_ACTIVE'=>1,'LOCATION_NAME'=>$lokasi])->get()->first();
	}
	public function pt(){
		return $this->conn->table( 'TM_COMP' )->select('COMPANY_ID AS CODE','COMPANY_NAME AS NAME')
					->where(['COMPANY_ACTIVE'=>1])->orderBy('COMPANY_NAME')->get();
	}
	public function getPt($compId){
		return $this->conn->table( 'TM_COMP' )->select('COMPANY_ID AS CODE','COMPANY_NAME AS NAME')
					->where(['COMPANY_ACTIVE'=>1,'COMPANY_ID'=>$compId])->get()->first();
	}
	public function getPtByName($comp){
		return $this->conn->table( 'TM_COMP' )->select('COMPANY_ID AS CODE','COMPANY_NAME AS NAME')
					->where(['COMPANY_ACTIVE'=>1,'COMPANY_NAME'=>$comp])->get()->first();
	}
	/****	End Select Function *****/
	
	/****	Insert Function *****/
	public function insertCompany($newCompName){
		return $this->conn->table( 'TM_COMP' )->insert(
			['COMPANY_NAME' => strtoupper($newCompName),
				'COMPANY_USER_CREATED'=>Session::get('user_name')]
		);
	}
	public function insertDivision($newDivName){
		return $this->conn->table( 'TM_DIVISION' )->insert(
			['DIVISION_NAME' => strtoupper($newDivName),
				'DIVISION_USER_CREATED'=>Session::get('user_name')]
		);
	}
	public function insertLocation($newLocName){
		return $this->conn->table( 'TM_LOC' )->insert(
			['LOCATION_NAME' => strtoupper($newLocName),
				'LOCATION_USER_CREATED'=>Session::get('user_name')]
		);
	}
	public function insertType($newTypeName){
		return $this->conn->table( 'TM_TYPE' )->insert(
			['TYPE_NAME' => strtoupper($newTypeName),
				'TYPE_USER_CREATED'=>Session::get('user_name')]
		);
	}
	/****	End Insert Function *****/
	
	/****	Update Function *****/
	public function changeCompany($compID,$newCompName){
		return $this->conn->table( 'TM_COMP' )->where('COMPANY_ID', $compID)
			->update([
				'COMPANY_NAME'=>strtoupper($newCompName),
				'COMPANY_USER_UPDATED'=>Session::get('user_name'),
				'COMPANY_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	public function changeDivision($divID,$newDivName){
		return $this->conn->table( 'TM_DIVISION' )->where('DIVISION_ID', $divID)
			->update([
				'DIVISION_NAME'=>strtoupper($newDivName),
				'DIVISION_USER_UPDATED'=>Session::get('user_name'),
				'DIVISION_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	public function changeLocation($locID,$newLocName){
		return $this->conn->table( 'TM_LOC' )->where('LOCATION_ID', $locID)
			->update([
				'LOCATION_NAME'=>strtoupper($newLocName),
				'LOCATION_USER_UPDATED'=>Session::get('user_name'),
				'LOCATION_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	public function changeType($typeID,$newTypeName){
		return $this->conn->table( 'TM_TYPE' )->where('TYPE_ID', $typeID)
			->update([
				'TYPE_NAME'=>strtoupper($newTypeName),
				'TYPE_USER_UPDATED'=>Session::get('user_name'),
				'TYPE_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	/****	End Update Function *****/
	
	/****	Delete Function *****/
	public function deleteCompany($companyID){
		return $this->conn->table( 'TM_COMP' )->where('COMPANY_ID', $companyID)
			->update([
				'COMPANY_ACTIVE'=>0,
				'COMPANY_USER_UPDATED'=>Session::get('user_name'),
				'COMPANY_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	public function deleteDivision($divID){
		return $this->conn->table( 'TM_DIVISION' )->where('DIVISION_ID', $divID)
			->update([
				'DIVISION_ACTIVE'=>0,
				'DIVISION_USER_UPDATED'=>Session::get('user_name'),
				'DIVISION_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	public function deleteLocation($locationID){
		return $this->conn->table( 'TM_LOC' )->where('LOCATION_ID', $locationID)
			->update([
				'LOCATION_ACTIVE'=>0,
				'LOCATION_USER_UPDATED'=>Session::get('user_name'),
				'LOCATION_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	public function deleteType($typeID){
		return $this->conn->table( 'TM_TYPE' )->where('TYPE_ID', $typeID)
			->update([
				'TYPE_ACTIVE'=>0,
				'TYPE_USER_UPDATED'=>Session::get('user_name'),
				'TYPE_TIME_UPDATED'=>DB::raw('sysdate')]);
	}
	/****	End Delete Function *****/
}
