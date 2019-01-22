@extends('layouts-master.master')

@section('tittle', 'Improvement')

@section('cascanding')

<link rel="stylesheet" type="text/css" href="{{ asset('css/ptk.css') }}">
<link rel="stylesheet" href="{{ asset('dist/Parsley.js-2.6.0/src/parsley.css') }}">
<link rel="stylesheet" href="{{ asset('dist/plugins/datepicker/datepicker3.css') }}">
<link rel="stylesheet" href="{{ asset('dist/selectize/dist/css/selectize.bootstrap3.css') }}">

{!! Html::style('vendor/dialog/dist/css/bootstrap-dialog.css') !!}
<style type="text/css">
	.selectize-control::before {
			-moz-transition: opacity 0.2s;
			-webkit-transition: opacity 0.2s;
			transition: opacity 0.2s;
			content: ' ';
			z-index: 2;
			position: absolute;
			display: block;
			top: 12px;
			right: 34px;
			width: 16px;
			height: 16px;
			background: url(images/spinner.gif);
			background-size: 16px 16px;
			opacity: 0;
		}
		.selectize-control.loading::before {
			opacity: 0.4;
		}
</style>

@endsection()

@section('content')

	<h3><strong>Improvement</strong></h3>
	<div class="row">
		<div class="box box-success">
			<div class="box-header with-border">
				<h5 class="box-title">
					<span id="box-notifier">FORM</span>
				</h5>
				<div class="box-tools pull-right">
					<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
				</div>
			</div><!-- /.box-header -->

			<form class="form-horizontal" method="POST" action="{{url('/improvement/submitimprovement')}}" id="bast_form" enctype="multipart/form-data">
				{{ csrf_field() }}
				<input type="hidden" name="deskripsi" id="deskripsi">
				<div class="box-body">
					@if(session('msg'))
						{!! session('msg') !!}
						{{session()->forget('msg')}}
					@endif
					<div class="panel panel-default">
						<div class="panel-body">
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">NIK</label>
								<div class="col-sm-4">
									<input class="form-control" type="text" id="nik" name="nik" 
										value="{{ $data_employee->nik }}" readonly>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Nama</label>
								<div class="col-sm-4">
									<input class="form-control" type="text" id="nama" 
										value="{{ $data_employee->fullname }}" readonly>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Jabatan</label>
								<div class="col-sm-4">
									<input class="form-control" type="text" id="jabatan" 
										value="{{ $data_employee->position }}" readonly>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Lokasi<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<select class="improvement-select form-control" name="location">
										<option value="">---	Lokasi	----</option>
										@if(isset($data_loc_ss))
											@foreach ( $data_loc_ss as $loc_ss)
												<option value="{{ $loc_ss->code }}">{{ $loc_ss->name }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Nama PT<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<select class="improvement-select form-control" name="pt">
										<option value="">---	PT	----</option>
										@if(isset($data_pt_ss))
											@foreach ( $data_pt_ss as $pt_ss)
												<option value="{{ $pt_ss->code }}">{{ $pt_ss->name }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Divisi<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<select class="improvement-select form-control" name="divisi">
										<option value="">---	Divisi	----</option>
										@if(isset($data_div_ss))
											@foreach ( $data_div_ss as $div_ss)
												<option value="{{ $div_ss->code }}">{{ $div_ss->name }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Jenis SS<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<select class="improvement-select form-control" name="ss_jenis" required>
										<option value="">-- Pilih Jenis SS --</option>
										@foreach ( $data_jenis_ss as $jenis_ss)
											<option value="{{ $jenis_ss->code }}">{{ $jenis_ss->name }}</option>
										@endforeach
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Judul SS<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<input class="form-control" type="text" autocomplete="off" name="ss_judul" required>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">SS Ke<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<input class="form-control" type="text" name="ss_nomor" autocomplete="off" required>
								</div>
							</div>
							<div class="form-group">
								<label for="po_sap" class="col-sm-2 control-label">Upload form SS<span class="text-danger">*</span></label>
								<div class="col-sm-4">
									<input class="form-control" type="file" name="ss_upload" accept="application/pdf" required>
								</div>
								<small class="col-sm-1">[maks 2MB]</small>
								<iframe id="file_upload_review" frameborder="0" scrolling="no" height="600" class="col-sm-8 hidden"></iframe>
							</div>
							<br /><hr />
							<div class="row">
								<div class="col-md-12">
									<table class="table table-bordered">
										<tr>
											<th style="text-align: left;">DAMPAK QCDSMEP</th>
										</tr>
										<tr>
											<td><br />Quality</td>
											<td>
												Sebelum: <input type="text" maxlength="100" class="form-control" name="kualitas_sebelum">
											</td>
											<td>
												Sesudah: <input type="text" maxlength="100" class="form-control" name="kualitas_sesudah">
											</td>
										</tr>
										<tr>
											<td><br />Cost</td>
											<td>
												Sebelum: <input type="text" maxlength="100" class="form-control" name="cost_sebelum">
											</td>
											<td>
												Sesudah: <input type="text" maxlength="100" class="form-control" name="cost_sesudah">
											</td>
										</tr>
										<tr>
											<td><br />Delivery</td>
											<td>
												Sebelum: <input type="text" maxlength="100" class="form-control" name="delivery_sebelum">
											</td>
											<td>
												Sesudah: <input type="text" maxlength="100" class="form-control" name="delivery_sesudah">
											</td>
										</tr>
										<tr>
											<td><br />Moral</td>
											<td>
												Sebelum: <input type="text" maxlength="100" class="form-control" name="moral_sebelum">
											</td>
											<td>
												Sesudah: <input type="text" maxlength="100" class="form-control" name="moral_sesudah">
											</td>
										</tr>
										<tr>
											<td><br />Environment</td>
											<td>
												Sebelum: <input type="text" maxlength="100" class="form-control" name="environment_sebelum">
											</td>
											<td>
												Sesudah: <input type="text" maxlength="100" class="form-control" name="environment_sesudah">
											</td>
										</tr>
										<tr>
											<td><br />Productivity</td>
											<td>
												Sebelum: <input type="text" maxlength="100" class="form-control" name="productivity_sebelum">
											</td>
											<td>
												Sesudah: <input type="text" maxlength="100" class="form-control" name="productivity_sesudah">
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
								</div>
								<div class="col-md-6">
									<button id="submit_improvement" class="btn btn-primary pull-right">Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>


@endsection()

@push('js')


<script src="{{ asset('js/accounting.min.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/jszip.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ asset('dist/plugins/datatables/extensions/FixedColumns/js/dataTables.fixedColumns.min.js') }}"></script>
<script src="{{ asset('dist/plugins/datatables/dataTables.fixedColumns.min.js') }}"></script>
<script src="{{ asset('assets/dist/js/app.min.js')}}"></script>
<script src="{{ asset('dist/plugins/select2/select2.full.js') }}"></script>
<script src="{{ asset('dist/selectize/dist/js/standalone/selectize.js') }}"></script>
<script src="{{ asset('dist/plugins/datepicker/bootstrap-datepicker.js') }}"></script>
<script src="{{ asset('dist/is.js/is.min.js') }}"></script>
<script src="{{ asset('/dist/Parsley.js-2.6.0/dist/parsley.js') }}"></script>
<script src="{{ asset('dist/Parsley.js-2.6.0/dist/i18n/idn.js') }}"></script>
{!! Html::script('vendor/dialog/dist/js/bootstrap-dialog.js') !!}
{!! Html::script('vendor/jquery-loading-overlay/src/loadingoverlay.js') !!}

<script type="text/javascript">

	$( document ).ready ( function() {
		$("#bast_form").submit(function(e){
			if($(this).parsley().isValid()){				
				$("#loadingSpinner").modal("show")
			}
		})
		$("[name='ss_upload']").change(function(){
			var pdffile= this.files[0];
			var pdffile_url=URL.createObjectURL(pdffile);
			$('#file_upload_review').removeClass('hidden');
			$('#file_upload_review').attr('src',pdffile_url);
		})
		
		$('input[type=text]').keyup(function () {
			this.value = this.value.toUpperCase();
		})
	} );

	// Delete Record File Attachment
	function delete_record_file_attachment( type, sequence ) {
		switch ( type ) {
			// Ilustrasi Masalah
			case 'imasl':
				$( "#imasl-record-" + sequence ).empty();
			break;
			// Ilustrasi Ide Perbaikan
			case 'iperb':
				$( "#iperb-record-" + sequence ).empty();
			break;
			// Implementasi Perbaikan
			case 'imple':
				$( "#imple-record-" + sequence ).empty();
			break;
		}
	}

	// Search Data Karyawan
	function set_data_karyawan( q ) {
		$.ajax( {
			url: "{{ url( 'improvement/search_asisten_lapangan' ) }}/?q=" + q,
			type: "GET",
			success: function( result ) {
				if(result.length==0){
					alert("Karyawan tidak ditemukan");
					$( "#nama" ).val("");
					$( "#nik" ).val("");
					$( "#departemen" ).val("");
					$( "#location" ).val("");
					$( "#divisi" ).val("");
					$( "#jabatan" ).val("");
					$( "#pt" ).empty();
					return;
				}
				$( "#nama" ).val( result.employee_fullname );
				$( "#nik" ).val( result.employee_nik );
				$( "#divisi" ).val(result.employee_divcode);
				$( "#jabatan" ).val(result.employee_position);
				$( "#jabatan_id" ).val(result.employee_positioncode);
				$( "#location" ).val( result.employee_locationcode );
				$( "#departemen" ).val( result.employee_department );
				$( "#pt" ).val(result.employee_companycode);
			},
			error: function() {
				//$( "#nama" ).val( 'Unknown' );
			}
		} );
	}
	
	// Validation input length
	function lengthValidation(inputObj){
		var maxLength = parseInt($(inputObj).attr("maxlength"));
		var currLength = parseInt($(inputObj).val().length);
		var parentContainer = $(inputObj).parent();
		if(currLength>maxLength){
			$(inputObj).val($(inputObj).val().slice(0,-1));
		}
		if(currLength==maxLength){
			$("small",parentContainer).addClass("text-danger");
		}
		else{
			$("small",parentContainer).removeClass("text-danger");
		}
		$(".currLength",parentContainer).text(currLength);
	}
</script>

@endpush()










