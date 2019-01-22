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

	<div class="row">
	<h3 class="pull-left"><strong>Improvement</strong></h3>
	<h3 class="pull-right"><strong>{{ $data_improvement->improvement_id }}</strong></h3>
	</div>
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
				<input type="hidden" name="deskripsi" id="deskripsi">
				<div class="box-body">
					@if(session('msg'))
						{!! session('msg') !!}
						{{session()->forget('msg')}}
					@endif
					<div class="panel panel-default">
						<div class="panel-body">
							<div class="form-group col-sm-12">
								<label for="po_sap" class="col-sm-4 control-label">NIK</label>
								<div class="col-sm-8">{{ $data_employee->nik }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Nama</label>
								<div class="col-sm-8">{{ $data_employee->fullname }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Jabatan</label>
								<div class="col-sm-8">{{ $data_employee->position }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Lokasi</label>
								<div class="col-sm-8">{{ $data_improvement->location_name }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Nama PT</label>
								<div class="col-sm-8">{{ $data_improvement->company_name }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Divisi</label>
								<div class="col-sm-8">{{ $data_improvement->division_name }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Jenis SS</label>
								<div class="col-sm-8">{{ $data_improvement->type_name }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Judul SS</label>
								<div class="col-sm-8">{{ $data_improvement->judul_ss }}</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">SS Ke</label>
								<div class="col-sm-8">{{ $data_improvement->ss_ke }}</div>
							</div>
							
							@if(isset($data_improvement->upload_file))
								<div class="form-group col-sm-12">
									<label for="po_sap" class="col-sm-2 control-label">Form SS</label>
									<iframe id="file_upload_review" frameborder="0" scrolling="no" height="600" class="col-sm-8" 
										src="{{'//'.explode('://',$upload_path)[1].$data_improvement->upload_file}}"></iframe>
								</div>
							@endif
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
												Sebelum: {{ $data_improvement->kualitas_sebelum_perbaikan }}
											</td>
											<td>
												Sesudah: {{ $data_improvement->kualitas_sesudah_perbaikan }}
											</td>
										</tr>
										<tr>
											<td><br />Cost</td>
											<td>
												Sebelum: {{ $data_improvement->biaya_sebelum_perbaikan }}
											</td>
											<td>
												Sesudah: {{ $data_improvement->biaya_sesudah_perbaikan }}
											</td>
										</tr>
										<tr>
											<td><br />Delivery</td>
											<td>
												Sebelum: {{ $data_improvement->pengiriman_sebelum_perbaikan }}
											</td>
											<td>
												Sesudah: {{ $data_improvement->pengiriman_sesudah_perbaikan }}
											</td>
										</tr>
										<tr>
											<td><br />Moral</td>
											<td>
												Sebelum: {{ $data_improvement->moral_sebelum_perbaikan }}
											</td>
											<td>
												Sesudah: {{ $data_improvement->moral_sesudah_perbaikan }}
											</td>
										</tr>
										<tr>
											<td><br />Environment</td>
											<td>
												Sebelum: {{ $data_improvement->lingkungan_sebelum_perbaikan }}
											</td>
											<td>
												Sesudah: {{ $data_improvement->lingkungan_sesudah_perbaikan }}
											</td>
										</tr>
										<tr>
											<td><br />Productivity</td>
											<td>
												Sebelum: {{ $data_improvement->produktiv_sebelum_perbaikan }}
											</td>
											<td>
												Sesudah: {{ $data_improvement->produktiv_sesudah_perbaikan }}
											</td>
										</tr>
									</table>
								</div>
							</div>
							<br /><hr />
							<form class="form-horizontal" method="POST" action="{{url('/approval/submitapproval')}}" id="approval_form">
								{{ csrf_field() }}
								<input class="form-control" type="hidden" name="improvement_id" value="{{ $data_improvement->improvement_id }}" readonly>
								<input class="form-control" type="hidden" name="title" value="{{ $data_improvement->judul_ss }}" readonly>
								<input class="form-control" type="hidden" name="applicant_nik" value="{{ $data_employee->nik }}" readonly>
								<input class="form-control" type="hidden" name="applicant_fullname" value="{{ $data_employee->fullname }}" readonly>
								<input class="form-control" type="hidden" name="applicant_position" value="{{ $data_employee->position }}" readonly>
								<input class="form-control" type="hidden" name="location" value="{{ $data_improvement->location_name }}" readonly>
								<input class="form-control" type="hidden" name="company" value="{{ $data_improvement->company_name }}" readonly>
								<input class="form-control" type="hidden" name="division" value="{{ $data_improvement->division_name }}" readonly>
								<input class="form-control" type="hidden" name="type" value="{{ $data_improvement->type_name }}" readonly>
								<div class="row">
									<div class="col-md-8">
										Komentar: <textarea class="form-control" name="approver_comment"></textarea>
									</div>
									<div class="col-md-8">&nbsp
									</div>
									<div class="col-md-6 pull-right">
										<button name="submit" id="submit" value="approve" class="approval_button btn btn-success">
											Approve
										</button>
										<button name="submit" id="submit" value="reject" class="approval_button btn btn-danger">
											Reject
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
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
		$(".approval_button").click(function(){
			$("#loadingSpinner").modal("show")
		})
	});
</script>

@endpush()










