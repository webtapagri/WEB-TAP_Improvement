<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Session;

class ImprovementModel extends Model
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->ss = DB::connection('ss');
	}
	/****	End Exclusive Function *****/
	
	/****	Select Function *****/
	public function getImprovementData($improvementId){
		$getImprovement = $this->ss
							->table('TR_IMPROVEMENT ta')
							->join('TM_LOC ml', 'ta.LOKASI_ID', '=', 'ml.LOCATION_ID')
							->join('TM_COMP mc', 'ta.PT_ID', '=', 'mc.COMPANY_ID')
							->join('TM_DIVISION md', 'ta.DIVISI_ID', '=', 'md.DIVISION_ID')
							->join('TM_TYPE mt', 'ta.JENIS_SS', '=', 'mt.TYPE_ID')
							->select('*')
							->where('ta.IMPROVEMENT_ID','=',$improvementId)
							->get()->first();
		return $getImprovement;
	}
	/****	End Select Function *****/
	
	/****	Insert Function *****/
	public function insertNew($data){
		$data['IMPROVEMENT_USER_CREATED']=Session::get('user_name');
		$response = array();
		try {
			DB::beginTransaction();
			$response["message"]=$this->ss->table( 'TR_IMPROVEMENT' )->insert( $data );
			$newID = $this->ss->table( 'TR_IMPROVEMENT' )
						->select( DB::raw('MAX(IMPROVEMENT_ID) AS IMPROVEMENT_ID') )->get()->first();
			$response["improvement_id"] = $newID->improvement_id;
			$response["success"]=true;
			DB::commit();
		} catch (\PDOException $e) {
			DB::rollBack();
			$response["success"]=false;
			$response["message"]=$e->getMessage();
		}
		return $response;
	}
	/****	End Insert Function *****/
	
	/****	Update Function *****/
	public function updateFileName($improvementId,$filename){
		$response = array();
		try {
			DB::beginTransaction();
			$response["message"]=$this->ss->table( 'TR_IMPROVEMENT' )
									->where('IMPROVEMENT_ID', $improvementId)
									->update(['UPLOAD_FILE' => $filename,
												'IMPROVEMENT_USER_UPDATED'=>Session::get('user_name'),
												'IMPROVEMENT_TIME_UPDATED'=>DB::raw('sysdate')]);
			$response["improvement_id"] = $improvementId;
			$response["success"]=true;
			DB::commit();
		} catch (\PDOException $e) {
			DB::rollBack();
			$response["success"]=false;
			$response["message"]=$e->getMessage();
		}
		return $response;
	}
	/****	End Update Function *****/
	
	/****	Delete Function *****/
	/****	End Delete Function *****/
}
