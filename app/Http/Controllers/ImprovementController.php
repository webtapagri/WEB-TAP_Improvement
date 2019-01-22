<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\ApprovalModel;
use App\Http\Models\MasterModel;
use App\Http\Models\ImprovementModel;
use App\Http\Models\UserModel;
use App\Library\Config;
use App\Library\Email;
use App\Library\Validation;
use File;
use Session;

class ImprovementController extends Controller
{
	/****	Exclusive Function *****/
	public function __construct() {
		$this->approval = new ApprovalModel();
		$this->master = new MasterModel();
		$this->improvement = new ImprovementModel();
		$this->user = new UserModel();
		$this->upload_base_dir = Config::$privateUploadPath;
	}
	
	private function createDir($upload_path) {
		if (!is_dir($upload_path)) {
			mkdir ($upload_path, 0755, true);
		}
	}
	
	private function getDeptImprovement(){
		return $this->approval->getDeptImprovement();
	}
	
	private function getVerificator($doc_type){
		return $this->approval->getVerificator($doc_type);
	}
	
	private function insertApproval($improvementID,$doc_type){
		$deptImprovement = $this->getDeptImprovement();
		$verificator = $this->getVerificator($doc_type);
		$pendingFlag=1;
		$stepList = array();
		foreach($deptImprovement as $key => $value){
			array_push($stepList,array("improvementID"=>$improvementID,
										"nik"=>$value->nik,
										"pending"=>$pendingFlag));
			$pendingFlag=0;
		}
		foreach($verificator as $key => $value){
			array_push($stepList,array("improvementID"=>$improvementID,
										"nik"=>$value->nik,
										"pending"=>$pendingFlag));
			$pendingFlag=0;
		}
		$newData = $this->approval->insertBulkStep($stepList);
		return $newData;
	}
	/****	End Exclusive Function *****/
	
	/****	View Function *****/
	public function index(){
		$data = array();
		$data['data_employee'] = $this->user->getEmployee(Session::get('nik'));
		$data['data_jenis_ss'] = $this->master->jenis_ss();
		$data['data_loc_ss'] = $this->master->lokasi();
		$data['data_pt_ss'] = $this->master->pt();
		$data['data_div_ss'] = $this->master->divisi();
		return view("Improvement/form_improvement",$data);
	}
	
	/****	End View Function *****/
	
	/****	API Function *****/
	public function submitImprovement(Request $req){
		# STATUS
		$result = array();
		$result['status'] = false;
		$result['message'] = '';
		$ss_upload = $_FILES['ss_upload'];
		if(!isset($req->location)||$req->input('location')==''){
			$result['message'] = 'Lokasi harus dipilih';
		}
		/*else if(!((isset($req->kualitas_sebelum)&&$req->kualitas_sebelum!='')||
					(isset($req->cost_sebelum)&&$req->cost_sebelum!='')||
					(isset($req->delivery_sebelum)&&$req->delivery_sebelum!='')||
					(isset($req->moral_sebelum)&&$req->moral_sebelum!='')||
					(isset($req->environment_sebelum)&&$req->environment_sebelum!='')||
					(isset($req->productivity_sebelum)&&$req->productivity_sebelum!='')
				)){
			$result['message'] = 'Dampak perlu diisi salah satu';
		}
		else if(!((isset($req->kualitas_sebelum)&&$req->kualitas_sebelum!=''&&isset($req->kualitas_sesudah)&&$req->kualitas_sesudah!='')||
					(isset($req->cost_sebelum)&&$req->cost_sebelum!=''&&isset($req->cost_sesudah)&&$req->cost_sesudah!='')||
					(isset($req->delivery_sebelum)&&$req->delivery_sebelum!=''&&isset($req->delivery_sesudah)&&$req->delivery_sesudah!='')||
					(isset($req->moral_sebelum)&&$req->moral_sebelum!=''&&isset($req->moral_sesudah)&&$req->moral_sesudah!='')||
					(isset($req->environment_sebelum)&&$req->environment_sebelum!=''&&
						isset($req->environment_sesudah)&&$req->environment_sesudah!='')||
					(isset($req->productivity_sebelum)&&$req->productivity_sebelum!=''&&
						isset($req->productivity_sesudah)&&$req->productivity_sesudah!='')
				)){
			$result['message'] = 'Dampak perlu diisi sebelum dan sesudahnya';
		}*/
		else if(!isset($req->pt)||$req->input('pt')==''){
			$result['message'] = 'Pt harus dipilih';
		}
		else if(!isset($req->divisi)||$req->input('divisi')==''){
			$result['message'] = 'Divisi harus dipilih';
		}
		else if(!isset($req->ss_judul)||$req->ss_judul==''){
			$result['message'] = 'Judul ss harus diisi';
		}
		else if(!isset($req->ss_jenis)||$req->ss_jenis==''){
			$result['message'] = 'Jenis ss harus dipilih';
		}
		else if(!isset($req->ss_nomor)||$req->ss_nomor==''||!is_numeric($req->ss_nomor)){
			$result['message'] = 'Nomor ss harus diisi dan berupa angka';
		}
		else if(empty($ss_upload)){
			$result['message'] = 'File ss harus diisi';
		}
		else if($ss_upload["size"]>5242880){
			$result['message'] = 'File ss tidak boleh lebih dari 2MB';
		}
		else{
			# DATA
			$data = [
				'APPLICANT_NIK' => $req->nik,
				'LOKASI_ID' => $req->input('location'),
				'PT_ID' => $req->input('pt'),
				'DIVISI_ID' => $req->input('divisi'),
				'JUDUL_SS' => $req->ss_judul,
				'JENIS_SS' => $req->ss_jenis,
				'SS_KE' => $req->ss_nomor,
				'KUALITAS_SEBELUM_PERBAIKAN' => $req->kualitas_sebelum,
				'KUALITAS_SESUDAH_PERBAIKAN' => $req->kualitas_sesudah,
				'BIAYA_SEBELUM_PERBAIKAN' => $req->cost_sebelum,
				'BIAYA_SESUDAH_PERBAIKAN' => $req->cost_sesudah,
				'PENGIRIMAN_SEBELUM_PERBAIKAN' => $req->delivery_sebelum,
				'PENGIRIMAN_SESUDAH_PERBAIKAN' => $req->delivery_sesudah,
				'MORAL_SEBELUM_PERBAIKAN' => $req->moral_sebelum,
				'MORAL_SESUDAH_PERBAIKAN' => $req->moral_sesudah,
				'LINGKUNGAN_SEBELUM_PERBAIKAN' => $req->environment_sebelum,
				'LINGKUNGAN_SESUDAH_PERBAIKAN' => $req->environment_sesudah,
				'PRODUKTIV_SEBELUM_PERBAIKAN' => $req->productivity_sebelum,
				'PRODUKTIV_SESUDAH_PERBAIKAN' => $req->productivity_sesudah
			];
				
			// INSERT DATA
			$insertResponse = $this->improvement->insertNew($data);

			if($insertResponse["success"]){
				$insertApprovalResponse = $this->insertApproval($insertResponse["improvement_id"],$req->ss_jenis);
				if($insertApprovalResponse["success"]){
					$pendingVerificator = $this->approval->getWaitingVerificator($insertResponse["improvement_id"]);
					if($pendingVerificator){
						$pendingVerificatorData = $this->user->getUserData($pendingVerificator->approver_nik);
						if($pendingVerificatorData){
							$applicantData = $this->user->getEmployee($req->nik);
							$target_email = $pendingVerificatorData->user_email;
							$mailData = [
											'request_num' => $insertResponse["improvement_id"],
											'approver_full_name'=>$pendingVerificatorData->user_fullname,
											'applicant'=>$applicantData,
											'location'=>$this->master->getLokasi($req->input('location'))->name,
											'company'=>$this->master->getPt($req->input('pt'))->name,
											'division'=>$this->master->getDivisi($req->input('divisi'))->name,
											'type'=>$this->master->getJenis_ss($req->ss_jenis)->name,
											'title'=>$req->ss_judul
										];
							Email::sendRequestNotificationEmail($mailData,$target_email,"EMAIL NOTIFIKASI SS REQUEST");

							$this->createDir($this->upload_base_dir);
							// UPLOAD FILES - ILUSTRASI MASALAH
							if ( !empty( $ss_upload ) ) {
								$ss_upload["name"] = $data['JUDUL_SS']."_".$insertResponse["improvement_id"].".pdf";
								File::put($this->upload_base_dir.$ss_upload["name"], file_get_contents($ss_upload["tmp_name"]));
								move_uploaded_file($ss_upload["tmp_name"],$ss_upload["name"]);
								$updateFile = $this->improvement->updateFileName($insertResponse["improvement_id"],$ss_upload["name"]);
								if($updateFile["success"]){								
									$result['status'] = true;
									$result['message'] = 'Berhasil membuat form improvement';
								}
								else{								
									$result['message'] = 'Failed to upload file';
								}
							}
						}
						else{
							$result['message'] = 'Pending verificator not registered';
						}
					}
					else{
						$result['message'] = 'No pending verificator';
					}
				}
				else{
					$line = preg_split( "/((\r?\n)|(\r\n?))/", $insertApprovalResponse["message"] );
					print_r($line);
					$result['message'] = str_replace( 'Error Message : ', '', $line [1] );
				}
			} else {
				$line = preg_split( "/((\r?\n)|(\r\n?))/", $insertResponse["message"] );
				$result['message'] = str_replace( 'Error Message : ', '', $line [1] );
			}
		}
		$msg = "";
		if($result['status']){
			$msg = Validation::successMessage($result['message']);
		}
		else{
			$msg = Validation::validationMessage($result['message']);
		}
		Session::put('msg', $msg);
		return Redirect('/improvement');
	}
	/****	End API Function *****/
}
