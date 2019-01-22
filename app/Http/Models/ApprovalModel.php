<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Session;

class ApprovalModel extends Model
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->ss = DB::connection('ss');
		$this->tap_dw = DB::connection('tapdw');
	}
	/****	End Exclusive Function *****/
	
	/****	Select Function *****/
	public function getAllPendingApproval($nik){
		$query  = "SELECT ti.IMPROVEMENT_ID,ti.APPLICANT_NIK,ti.JUDUL_SS,mc.COMPANY_NAME,
						COALESCE(hrisme.EMPLOYEE_FULLNAME,sapme.EMPLOYEE_NAME) AS APPLICANT_FULLNAME
					FROM TR_APPROVAL_STEP tas
					INNER JOIN TR_IMPROVEMENT ti ON tas.IMPROVEMENT_ID = ti.IMPROVEMENT_ID
					INNER JOIN TM_TYPE mt ON ti.JENIS_SS = mt.TYPE_ID
					INNER JOIN TM_COMP mc ON ti.PT_ID = mc.COMPANY_ID
					LEFT JOIN TM_EMPLOYEE_HRIS@PRODDW_LINK hrisme ON ti.APPLICANT_NIK=hrisme.EMPLOYEE_NIK
						AND (hrisme.EMPLOYEE_RESIGNDATE IS NULL OR hrisme.EMPLOYEE_RESIGNDATE>sysdate)
					LEFT JOIN TM_EMPLOYEE_SAP@PRODDW_LINK sapme ON ti.APPLICANT_NIK=sapme.NIK 
						AND (sapme.RES_DATE IS NULL OR sapme.RES_DATE>sysdate) 
						AND TO_CHAR(sapme.END_VALID,'YYYY')='9999'
					WHERE APPROVER_NIK='".$nik."' AND APPROVAL_PENDING=1";
		$getPendingApproval = $this->ss->select(DB::raw($query));
		return $getPendingApproval;
	}
	public function getApprovalStatus($improvement_id,$nik){
		$getApprovalStatus = $this->ss
								->table('TR_APPROVAL_STEP tas')
								->select('APPROVAL_STATUS')
								->where("IMPROVEMENT_ID","=",$improvement_id)
								->where("APPROVER_NIK","=",$nik)
								->get()->first();
		return $getApprovalStatus;
	}
	public function getApprovedImprovement($filter,$nik=null){
		$updateString = "SELECT tri.IMPROVEMENT_ID,tri.APPLICANT_NIK,ml.LOCATION_NAME,mc.COMPANY_NAME,
					md.DIVISION_NAME,mt.TYPE_NAME,tri.JUDUL_SS,
					trasapp.APPROVAL_STATUS mdev_approval,trasapp.APPROVER_COMMENT mdev_comment,
					trasver.APPROVER_COMMENT,trasver.APPROVER_NIK,trasver.ACTION_DATE,trasver.APPROVAL_STATUS verificator_approval,
					COALESCE(hrisme.EMPLOYEE_FULLNAME,sapme.EMPLOYEE_NAME) AS APPLICANT_FULLNAME,
					COALESCE(hrisme.EMPLOYEE_POSITION,sapme.JOB_CODE) AS APPLICANT_POSITION,
					COALESCE(hrismeapp.EMPLOYEE_FULLNAME,sapmeapp.EMPLOYEE_NAME) AS APPROVER_FULLNAME,
					COALESCE(hrismeapp.EMPLOYEE_POSITION,sapmeapp.JOB_CODE) AS APPROVER_POSITION
				FROM TR_IMPROVEMENT tri 
				INNER JOIN TR_APPROVAL_STEP trasapp ON tri.IMPROVEMENT_ID=trasapp.IMPROVEMENT_ID 
					AND trasapp.APPROVAL_STATUS<>0 ";
		if($nik){
			$updateString .="AND trasapp.APPROVER_NIK='{$nik}'";
		}
		else{
			$updateString .="INNER JOIN TM_USER mudept ON mudept.USER_LEVEL=2 AND mudept.NIK=trasapp.APPROVER_NIK ";
		}
		$updateString .="INNER JOIN TM_LOC ml ON tri.LOKASI_ID=ml.LOCATION_ID
				INNER JOIN TM_COMP mc ON tri.PT_ID=mc.COMPANY_ID
				INNER JOIN TM_DIVISION md ON tri.DIVISI_ID=md.DIVISION_ID
				INNER JOIN TM_TYPE mt ON tri.JENIS_SS=mt.TYPE_ID
                LEFT JOIN TR_APPROVAL_STEP trasver ON trasver.IMPROVEMENT_ID=trasapp.IMPROVEMENT_ID
					AND trasver.APPROVAL_STATUS<>0 AND trasver.APPROVER_NIK<>trasapp.APPROVER_NIK
				LEFT JOIN TM_EMPLOYEE_HRIS@PRODDW_LINK hrisme ON tri.APPLICANT_NIK=hrisme.EMPLOYEE_NIK
					AND (hrisme.EMPLOYEE_RESIGNDATE IS NULL OR hrisme.EMPLOYEE_RESIGNDATE>sysdate)
				LEFT JOIN TM_EMPLOYEE_SAP@PRODDW_LINK sapme ON tri.APPLICANT_NIK=sapme.NIK 
					AND (sapme.RES_DATE IS NULL OR sapme.RES_DATE>sysdate) 
					AND TO_CHAR(sapme.END_VALID,'YYYY')='9999'
				LEFT JOIN TM_EMPLOYEE_HRIS@PRODDW_LINK hrismeapp ON trasver.APPROVER_NIK=hrismeapp.EMPLOYEE_NIK
					AND (hrismeapp.EMPLOYEE_RESIGNDATE IS NULL OR hrismeapp.EMPLOYEE_RESIGNDATE>sysdate)
				LEFT JOIN TM_EMPLOYEE_SAP@PRODDW_LINK sapmeapp ON trasver.APPROVER_NIK=sapmeapp.NIK 
					AND (sapmeapp.RES_DATE IS NULL OR sapmeapp.RES_DATE>sysdate) 
					AND TO_CHAR(sapmeapp.END_VALID,'YYYY')='9999'
				WHERE 1=1 ";
		if(isset($filter["rn"])){
			$updateString .= "AND tri.IMPROVEMENT_ID LIKE '%".$filter["rn"]."%' ";
		}
		if(isset($filter["nik"])){
			$updateString .= "AND tri.APPLICANT_NIK LIKE '%".$filter["nik"]."%' ";
		}
		if(isset($filter["title"])){
			$updateString .= "AND tri.JUDUL_SS LIKE '%".$filter["title"]."%' ";
		}
		if(isset($filter["name"])){
			$updateString .= "AND (hrisme.EMPLOYEE_FULLNAME LIKE '%".$filter["name"]."%' 
									OR sapme.EMPLOYEE_NAME LIKE '%".$filter["name"]."%') ";
		}
		if(isset($filter["position"])){
			$updateString .= "AND (hrisme.EMPLOYEE_POSITION LIKE '%".$filter["position"]."%' 
									OR sapme.JOB_CODE LIKE '%".$filter["position"]."%') ";
		}
		if(isset($filter["location"])){
			$updateString .= "AND tri.LOKASI_ID='".$filter["location"]."' ";
		}
		if(isset($filter["pt"])){
			$updateString .= "AND tri.PT_ID='".$filter["pt"]."' ";
		}
		if(isset($filter["divisi"])){
			$updateString .= "AND tri.DIVISI_ID='".$filter["divisi"]."' ";
		}
		if(isset($filter["ss_jenis"])){
			$updateString .= "AND tri.JENIS_SS='".$filter["ss_jenis"]."' ";
		}
		$updateString .= "ORDER BY IMPROVEMENT_ID DESC,JUDUL_SS ASC,ACTION_DATE ASC";
		//echo $updateString;
		//$getApprovedImprovement = $this->ss->select(DB::raw($updateString),array('nik' => $nik));
		$getApprovedImprovement = $this->ss->select(DB::raw($updateString));
		return $getApprovedImprovement;
	}
	public function getApplicantNIK($reqnum){
		$getDeptImprovement = $this->ss
								->table('TR_IMPROVEMENT')
								->select('APPLICANT_NIK')
								->where('IMPROVEMENT_ID','=',$reqnum)
								->get()->first();
		return $getDeptImprovement;
	}
	public function getDeptImprovement(){
		$getDeptImprovement = $this->ss
								->table('TM_USER mu')
								->join('TM_USER_LEVEL mul', function($join)
								{
									$join->on('mu.USER_LEVEL', '=', 'mul.USER_LEVEL');
									$join->on('mul.USER_LEVEL_NAME', 'LIKE', DB::raw("'Dept Improvement'"));
								})
								->select('*')
								->where('mu.USER_ACTIVE','=',DB::raw("1"))
								->get();
		return $getDeptImprovement;
	}
	public function getVerificator($doc_type){
		$getVerificator = $this->ss
								->table('TM_USER mu')
								->join('TM_USER_LEVEL mul', function($join)
								{
									$join->on('mu.USER_LEVEL', '=', 'mul.USER_LEVEL');
									$join->on('mul.USER_LEVEL_NAME', 'LIKE', DB::raw("'%Verificator%'"));
								})
								->select('*')
								->where('mu.USER_ACTIVE','=',DB::raw("1"))
								->where('mu.DOC_TYPE_ID','=',$doc_type)
								->get();
		return $getVerificator;
	}
	public function getWaitingVerificator($improvementID){
		$getVerificator = $this->ss
								->table('TR_APPROVAL_STEP tas')
								->select('*')
								->where("IMPROVEMENT_ID","=",$improvementID)
								->where("APPROVAL_PENDING","=",'1')
								->get()->first();
		return $getVerificator;
	}
	public function getAllWaitingVerificator($reqNum=null){
		$query = "SELECT tri.IMPROVEMENT_ID,tri.JUDUL_SS,tras.APPROVER_NIK,mu.USER_EMAIL APPROVER_EMAIL,tri.APPLICANT_NIK,
						ml.LOCATION_NAME,mc.COMPANY_NAME,md.DIVISION_NAME,mt.TYPE_NAME,tri.DIVISI_ID,
						COALESCE(hrisme.EMPLOYEE_FULLNAME,sapme.EMPLOYEE_NAME) AS APPLICANT_FULLNAME,
						COALESCE(hrisme.EMPLOYEE_POSITION,sapme.JOB_CODE) AS APPLICANT_POSITION,
						COALESCE(hrismeapp.EMPLOYEE_FULLNAME,sapmeapp.EMPLOYEE_NAME) AS APPROVER_FULLNAME,
						COALESCE(hrismeapp.EMPLOYEE_POSITION,sapmeapp.JOB_CODE) AS APPROVER_POSITION
					FROM TR_APPROVAL_STEP tras
					INNER JOIN TR_IMPROVEMENT tri ON tras.IMPROVEMENT_ID=tri.IMPROVEMENT_ID
					INNER JOIN TM_LOC ml ON tri.LOKASI_ID=ml.LOCATION_ID
						AND ml.LOCATION_ACTIVE=1
					INNER JOIN TM_COMP mc ON tri.PT_ID=mc.COMPANY_ID
						AND mc.COMPANY_ACTIVE=1
					INNER JOIN TM_DIVISION md ON tri.DIVISI_ID=md.DIVISION_ID
						AND md.DIVISION_ACTIVE=1
					INNER JOIN TM_TYPE mt ON tri.JENIS_SS=mt.TYPE_ID
						AND mt.TYPE_ACTIVE=1
					INNER JOIN TM_USER mu ON tras.APPROVER_NIK=mu.NIK
						AND mu.USER_ACTIVE=1
					LEFT JOIN TM_EMPLOYEE_HRIS@PRODDW_LINK hrisme ON tri.APPLICANT_NIK=hrisme.EMPLOYEE_NIK
						AND (hrisme.EMPLOYEE_RESIGNDATE IS NULL OR hrisme.EMPLOYEE_RESIGNDATE>sysdate)
					LEFT JOIN TM_EMPLOYEE_SAP@PRODDW_LINK sapme ON tri.APPLICANT_NIK=sapme.NIK 
						AND (sapme.RES_DATE IS NULL OR sapme.RES_DATE>sysdate) 
						AND TO_CHAR(sapme.END_VALID,'YYYY')='9999'
					LEFT JOIN TM_EMPLOYEE_HRIS@PRODDW_LINK hrismeapp ON tras.APPROVER_NIK=hrismeapp.EMPLOYEE_NIK
						AND (hrismeapp.EMPLOYEE_RESIGNDATE IS NULL OR hrismeapp.EMPLOYEE_RESIGNDATE>sysdate)
					LEFT JOIN TM_EMPLOYEE_SAP@PRODDW_LINK sapmeapp ON tras.APPROVER_NIK=sapmeapp.NIK 
						AND (sapmeapp.RES_DATE IS NULL OR sapmeapp.RES_DATE>sysdate) 
						AND TO_CHAR(sapmeapp.END_VALID,'YYYY')='9999'
					WHERE tras.APPROVAL_PENDING=1 ";
		if($reqNum){
			$query.=" AND tras.IMPROVEMENT_ID='{$reqNum}' AND mu.USER_LEVEL=3";
		}
		else{
			$query.=" AND tras.IMPROVEMENT_ID NOT IN (
							SELECT IMPROVEMENT_ID
							FROM TR_APPROVAL_STEP tras
							INNER JOIN TM_USER mu ON tras.APPROVER_NIK = mu.NIK
								AND mu.USER_ACTIVE=1
							INNER JOIN TM_USER_LEVEL mul ON mul.USER_LEVEL=mu.USER_LEVEL
								AND mul.USER_LEVEL_ACTIVE=1 AND mul.USER_LEVEL_NAME LIKE '%Verificator%'
							INNER JOIN TM_APPROVAL_STATUS mas ON mas.APPROVAL_STATUS=tras.APPROVAL_STATUS
								AND mas.APPROVAL_STATUS_ACTIVE=1 AND mas.APPROVAL_STATUS_NAME LIKE '%Approved%'
							GROUP BY IMPROVEMENT_ID
							HAVING COUNT(APPROVAL_STEP_ID)>1)";
		}
		$query.=" ORDER BY APPROVER_NIK";
		$getAllWaitingVerificator = $this->ss->select(DB::raw($query));
		return $getAllWaitingVerificator;
	}
	/****	End Select Function *****/
	
	/****	Insert Function *****/
	public function insertStep($improvementID,$nik,$pending){
		$response = array();
		try {
			DB::beginTransaction();
			$response["message"]=$this->ss->table('TR_APPROVAL_STEP')
									->insert([
										'IMPROVEMENT_ID' => $improvementID, 
										'APPROVER_NIK' => $nik,
										'APPROVAL_PENDING' => $pending,
										'APPROVAL_STEP_USER_CREATED'=>Session::get('user_name')
									]);
			$response["success"]=true;
			DB::commit();
		} catch (\PDOException $e) {
			DB::rollBack();
			$response["success"]=false;
			$response["message"]=$e->getMessage();
		}
		return $response;
	}
	public function insertBulkStep($newStepList){
		$response = array();
		try {
			DB::beginTransaction();
			foreach($newStepList as $key => $value){			
				$response["message"]=$this->ss->table('TR_APPROVAL_STEP')
										->insert([
											'IMPROVEMENT_ID' => $value["improvementID"],
											'APPROVER_NIK' => $value["nik"],
											'APPROVAL_PENDING' => $value["pending"],
											'APPROVAL_STEP_USER_CREATED'=>Session::get('user_name')
										]);	
			}
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
	public function approve($improvementID,$status,$nik,$user_level,$comment=null){
		$response = array();
		$newData = [
			"APPROVAL_PENDING"=>0,
			"ACTION_DATE"=>DB::raw("SYSTIMESTAMP"),
			"APPROVAL_STATUS"=>$status,
			'APPROVAL_STEP_USER_UPDATED'=>Session::get('user_name'),
			'APPROVAL_STEP_TIME_UPDATED'=>DB::raw('sysdate')
		];
		if($comment){
			$newData["APPROVER_COMMENT"] = $comment;
		}
		try {
			DB::beginTransaction();
			$response["message"]=$this->ss->table( 'TR_APPROVAL_STEP' )
									->where('IMPROVEMENT_ID', $improvementID)
									->where('APPROVER_NIK', $nik)
									->update($newData);
			if($status==1){
				if($user_level==2){
					//Dept Improvement
					//Pending diubah ke verifikator
					$response["message"]=DB::update("
											UPDATE TR_APPROVAL_STEP
											SET APPROVAL_PENDING=1,
											APPROVAL_STEP_USER_UPDATED=?,
											APPROVAL_STEP_TIME_UPDATED=sysdate
											WHERE APPROVAL_STEP_ID IN(
												SELECT APPROVAL_STEP_ID FROM TR_APPROVAL_STEP a
												INNER JOIN TM_USER b ON a.APPROVER_NIK=b.NIK AND b.USER_ACTIVE=1
												INNER JOIN TM_USER_LEVEL c ON b.USER_LEVEL=c.USER_LEVEL 
													AND c.USER_LEVEL_ACTIVE=1 AND c.USER_LEVEL_NAME LIKE '%Verificator%'
												WHERE IMPROVEMENT_ID=?)",[Session::get('user_name'),$improvementID]);
				}
			}
			$response["improvement_id"] = $improvementID;
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
