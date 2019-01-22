<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\ApprovalModel;
use App\Http\Models\ImprovementModel;
use App\Http\Models\MasterModel;
use App\Http\Models\UserModel;
use App\Library\Config;
use App\Library\Email;
use App\Library\Validation;
use Session;
use Excel;

class ApprovalController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->approval = new ApprovalModel();
		$this->improvement = new ImprovementModel();
		$this->master = new MasterModel();
		$this->user = new UserModel();
		$this->upload_base_dir = Config::$publicUploadPath;
	}
	private function preprocessingApprovedImprovementData($raw){
		$retObj = array();
		$flagImprovement = "";
		$curr_index = -1;
		$max_approver = 0;
		$approver_num = 0;
		foreach($raw as $approval){
			if($flagImprovement!=$approval->improvement_id){
				if($approver_num>$max_approver){
					$max_approver=$approver_num;
				}
				$approver_num=0;
				$flagImprovement=$approval->improvement_id;
				$tempObj = new \stdClass();
				$tempObj->request_number = $approval->improvement_id;
				$tempObj->requester_nik = $approval->applicant_nik;
				$tempObj->requester_name = $approval->applicant_fullname;
				$tempObj->requester_position = $approval->applicant_position;
				$tempObj->location = $approval->location_name;
				$tempObj->company = $approval->company_name;
				$tempObj->division = $approval->division_name;
				$tempObj->type = $approval->type_name;
				$tempObj->title = $approval->judul_ss;
				$tempObj->mdev_approval = $approval->mdev_approval;
				$tempObj->mdev_comment = $approval->mdev_comment;
				$tempObj->approver = array();
				array_push($retObj,$tempObj);
				$curr_index++;
			}
			$tempObj = new \stdClass();
			$tempObj->name=$approval->approver_fullname;
			$tempObj->note=$approval->approver_comment;
			$tempObj->verificator_approval=$approval->verificator_approval;
			array_push($retObj[$curr_index]->approver,$tempObj);
			$approver_num++;
		}
		if($approver_num>$max_approver){
			$max_approver=$approver_num;
		}
		return array("documentList"=>$retObj,"maxVerificator"=>$max_approver);
	}
	private function preprocessingWaitingVerificatorData($raw){
		$retObj = array();
		$currApproverNIK = "";
		$curr_index = -1;
		foreach($raw as $verificator){
			if($verificator->approver_nik!=$currApproverNIK){
				$tempObj = new \stdClass();
				$tempObj->recipient_full_name = $verificator->approver_fullname;
				$tempObj->recipient_email = $verificator->approver_email;
				$tempObj->request_list = array();
				array_push($retObj,$tempObj);
				$curr_index++;
				$currApproverNIK=$verificator->approver_nik;
			}
			$tempObj = new \stdClass();
			$tempObj->request_number=$verificator->improvement_id;
			$tempObj->applicant_nik=$verificator->applicant_nik;
			$tempObj->applicant_fullname=$verificator->applicant_fullname;
			$tempObj->applicant_position=$verificator->applicant_position;
			$tempObj->location=$verificator->location_name;
			$tempObj->company=$verificator->company_name;
			$tempObj->division=$verificator->division_name;
			$tempObj->type=$verificator->type_name;
			$tempObj->title=$verificator->judul_ss;
			array_push($retObj[$curr_index]->request_list,$tempObj);
		}
		return $retObj;
	}
	private function sendNotificationEmail($requestNum,$requestTitle,$userLevel,$applicantData,$masterRequestData,$flagStatus,$approver_nik){
		if($userLevel==2){
			if($flagStatus==1){
				//Dept Imp melakukan approval -> kirim email notif ke verifikator
				$allWaitingVerificator = $this->approval->getAllWaitingVerificator($requestNum);
				foreach($allWaitingVerificator as $verificator){
					$verificatorData = $this->user->getUserData($verificator->approver_nik);
					$mailData = [
									'request_num' => $requestNum,
									'title'=>$requestTitle,
									'approver_full_name'=>$verificatorData->user_fullname,
									'applicant'=>$applicantData,
									'location'=>$masterRequestData->location,
									'company'=>$masterRequestData->company,
									'division'=>$masterRequestData->division,
									'type'=>$masterRequestData->type
								];
					Email::sendRequestNotificationEmail($mailData,$verificatorData->user_email,"EMAIL NOTIFIKASI SS REQUEST");	
				}
			}
			else if($flagStatus==2){
				//Dept Imp reject -> kirim email notif ke applicant
				$applicantUserData = $this->user->getUserData($applicantData->nik);
				$verificatorData = $this->user->getUserData($approver_nik);
				$mailData = [
								'request_num' => $requestNum,
								'title'=>$requestTitle,
								'applicant'=>$applicantData,
								'approver_full_name'=>$verificatorData->user_fullname,
								'location'=>$masterRequestData->location,
								'company'=>$masterRequestData->company,
								'division'=>$masterRequestData->division,
								'type'=>$masterRequestData->type
							];
				Email::sendRejectNotificationEmail($mailData,$applicantUserData->user_email,"EMAIL NOTIFIKASI PENOLAKAN SS REQUEST");	
			}
		}
		else if($userLevel==3){
			//Verifikator melakukan approval -> kirim email ke notif ke Dept Imp
			$allDeptImprovement = $this->approval->getDeptImprovement();
			foreach($allDeptImprovement as $deptImprovement){
				$deptImprovementData = $this->user->getUserData($deptImprovement->nik);
				$verificatorData = $this->user->getUserData($approver_nik);
				$mailData = [
								'request_num' => $requestNum,
								'title'=>$requestTitle,
								'dept_improvement_full_name'=>$deptImprovementData->user_fullname,
								'approver_full_name'=>$verificatorData->user_fullname,
								'applicant'=>$applicantData,
								'location'=>$masterRequestData->location,
								'company'=>$masterRequestData->company,
								'division'=>$masterRequestData->division,
								'type'=>$masterRequestData->type,
								'approval_status'=>$flagStatus
							];
				Email::sendRequestNotificationEmail($mailData,$deptImprovementData->user_email,"EMAIL NOTIFIKASI SS REQUEST");	
			}
		}
	}
	private function sendReminderEmail($data,$to){
		Email::sendReminderEmail($data,$to,"SS Reminder");
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		$data = array();
		return view("Approval/list",$data);
	}
	public function detail($improvementId){
		$data = array();
		$data['upload_path'] = $this->upload_base_dir;
		$data['data_improvement'] = $this->improvement->getImprovementData($improvementId);
		$data['data_employee'] = $this->user->getEmployee($data['data_improvement']->applicant_nik);
		return view("Approval/detail",$data);
	}
	public function tracking(Request $req) {
		$data = array();

		//$nik = '00001642';
		if(Session::get("user_level")==0){
			$rawDBData = $this->approval->getApprovedImprovement($req->all());
		}
		else{
			$rawDBData = $this->approval->getApprovedImprovement($req->all(),Session::get("nik"));
		}
		//$rawDBData = $this->approval->getApprovedImprovement($nik,$req->all());
		$processingResult = $this->preprocessingApprovedImprovementData($rawDBData);
		$data['data_jenis_ss'] = $this->master->jenis_ss();
		$data['data_loc_ss'] = $this->master->lokasi();
		$data['data_pt_ss'] = $this->master->pt();
		$data['data_div_ss'] = $this->master->divisi();
		$data['filter'] = $req->all();
		$data['data_improvement'] = $processingResult["documentList"];
		$data['max_verificator'] = $processingResult["maxVerificator"];

		if (isset($req->download) && $req->download == '1') {

			$filename = 'Improvement_Analysis_List_' . date('Y-m-d-H-i-s');

			$data = ['Request Number', 'NIK', 'Nama', 'Jabatan', 'Lokasi', 'Nama PT', 'Divisi', 'Jenis SS', 'Judul SS'];
			$i = 1;
			$new = array();
			for ($i=1; $i <= $processingResult["maxVerificator"]; $i++) {
				$new[$i] = ['Ver. ' . $i, 'Note','Approval'];
			}

			$fin = array();
			$fin[] = "Approval by MDev";
			$fin[] = "Comment by MDev";
			foreach ($new as $k => $v) {
				foreach ($v as $key => $val) {
					$fin[] = $val;
				}
			}

			$data = [0 => array_merge($data, $fin)];

			$findata = array();
			$processingResult['documentList'] = json_decode(json_encode($processingResult['documentList']), true);

			foreach ($processingResult['documentList'] as $k => $v) {
				for ($i = 0; $i < $processingResult["maxVerificator"]; $i++) {
					$cos[$i] = (isset($v['approver'][$i])) ? [$v['approver'][$i]['name'], $v['approver'][$i]['note'],$v['approver'][$i]['verificator_approval']] : ['', '',''];
				}
				$newfin = array();
				$mdevApproval = array();
				$j = 1;
				foreach ($cos as $keys => $vals) {
					foreach ($vals as $rwkeys => $rw) {
						if($rwkeys==2){
							if($rw==1){
								$newfin[] = 'Accept';
							}
							else if($rw==2){
								$newfin[] = 'Reject';
							}
						}
						else{
							$newfin[] = $rw;
						}
						$j++;
					}
				}
				if($v['mdev_approval']==1){
					$mdevApproval[]="Accept";
				}
				else if($v['mdev_approval']==2){
					$mdevApproval[]="Reject";
				}
				$mdevApproval[] = $v['mdev_comment'];

				$findata[$k] = [
					$v['request_number'],
					$v['requester_nik'],
					$v['requester_name'],
					$v['requester_position'],
					$v['location'],
					$v['company'],
					$v['division'],
					$v['type'],
					$v['title']
				];
				$findata[$k] = array_merge($findata[$k], $mdevApproval);
				$findata[$k] = array_merge($findata[$k], $newfin);
			}

			$finaldata = array_merge($data, $findata);

			Excel::create($filename, function($excel) use ($finaldata) {
				$excel->sheet('Sheet 1', function ($sheet) use ($finaldata) {
					$sheet->fromArray($finaldata, NULL, 'A2', false, false);
				});
			})->download('xlsx');
		}
		return view("Approval/tracking",$data);
	}
	public function submitApproval(Request $req){
		$result = array();
		$result['status'] = false;
		$result['message'] = 'Unknown error';
		$approvalStatus = $this->approval->getApprovalStatus($req->improvement_id,Session::get("nik"));
		if($approvalStatus->approval_status==0){
			if($req->submit=="approve"){
				//Tombol approve
				$flagStatus = 1;
			}
			else if($req->submit=="reject"){
				//Tombol reject
				$flagStatus = 2;
			}
			if(isset($req->approver_comment)){
				$comment = $req->approver_comment;
				$this->approval->approve($req->improvement_id,$flagStatus,Session::get("nik"),Session::get("user_level"),$comment);
				$applicantData = new \stdClass();
				$masterRequestData = new \stdClass();
				$applicantData->nik = $req->applicant_nik;
				$applicantData->fullname = $req->applicant_fullname;
				$applicantData->position = $req->applicant_position;
				$masterRequestData->location = $req->location;
				$masterRequestData->company = $req->company;
				$masterRequestData->division = $req->division;
				$masterRequestData->type = $req->type;
				$this->sendNotificationEmail($req->improvement_id,$req->title,Session::get("user_level"),
									$applicantData,$masterRequestData,$flagStatus,Session::get("nik"));
				$result['status'] = true;
				$result['message'] = 'Success';
			}
			else{
				$result['message'] = 'Komentar harus diisi';
			}
		}
		else{
			$result['message'] = 'Approval sudah pernah dilakukan';
		}
		if($result['status']){
			if($req->submit=="reject"&&Session::get("user_level")==2){
				
			}
			$msg = Validation::successMessage($result['message']);
			Session::put('msg', $msg);
			return Redirect('/approval');
		}
		else{
			$msg = Validation::validationMessage($result['message']);
			Session::put('msg', $msg);
			return Redirect('/approval/detail/'.$req->improvement_id);
		}
	}
	/****	End View Function *****/
	
	/****	API Function *****/
	public function getAllPendingApproval(){
		$allPendingApprovalList = $this->approval->getAllPendingApproval(Session::get("nik"));
		return response()->json([
			"allPendingApprovalList"=>$allPendingApprovalList
		]);
	}
	public function reminderPendingApproval(){
		$rawWaitingVerificatorData = $this->approval->getAllWaitingVerificator();
		$verificatorData = $this->preprocessingWaitingVerificatorData($rawWaitingVerificatorData);
		foreach($verificatorData as $verificator){
			$mailData =[
							'recipient_full_name'=>$verificator->recipient_full_name,
							'request_list'=>$verificator->request_list
						];
			$this->sendReminderEmail($mailData,$verificator->recipient_email);
		}
	}
	/****	End API Function *****/
}
