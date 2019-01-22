@extends('layouts-master.master')

@section('tittle', 'User List')

@section('cascanding')
<link rel="stylesheet" href="{{ asset('dist/Parsley.js-2.6.0/src/parsley.css') }}">
<link rel="stylesheet" href="{{ asset('dist/plugins/datatables/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ asset('dist/plugins/datatables/extensions/Buttons/css/buttons.dataTables.css') }}">
<link rel="stylesheet" href="{{ asset('dist/plugins/datatables/extensions/FixedColumns/css/dataTables.fixedColumns.min.css') }}">
<link rel="stylesheet" href="{{ asset('dist/plugins/datatables/jquery.dataTables.min.css') }}">
<style type="text/css">
	tfoot input {
		width: 100%;
		padding: 3px;
		box-sizing: border-box;
	}

	div.DTFC_LeftBodyLiner{
		height: 100% !important;
	}

	.table tr td, .table tr th {
		white-space: nowrap
	}

	th, td { white-space: nowrap; }
	div.dataTables_wrapper {
		margin: 0 auto;
	}
	td.dataTables_empty { text-align:left !important; padding-left: 100px !important; }
</style>
@endsection()

@section('content')
	<h3><strong>User Detail</strong></h3>
	<div class="box box-success">
		<div class="box-header with-border">
			<h5 class="box-title">
				<span id="box-notifier">EMPLOYEE DATA</span>
			</h5>
		</div>
		<div class="box-body">
			<table class="table stripe row-border order-column" id="grid">
				<thead>
					<tr>
						<th>NIK</th>
						<th>Full Name</th>
						<th>Position</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ $EmployeeData->nik }}</td>
						<td>{{ $EmployeeData->fullname }}</td>
						<td>{{ $EmployeeData->position }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="box box-success">
		<div class="box-header with-border">
			<h5 class="box-title">
				<span id="box-notifier">LOGIN DATA</span>
			</h5>
		</div>
		<form action="{{ url('/user/edit/submit') }}" method="post">
			{!! csrf_field() !!}
			<input type="hidden" value="{{ $EmployeeData->nik }}" name="nik" />
			<div class="box-body">
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="form-group col-sm-6">
							<label class="col-sm-4 control-label">Username</label>
							<div class="col-sm-8">{{$UserData->user_name}}</div>
						</div>
						<div class="form-group col-sm-6">
							<label for="po_sap" class="col-sm-4 control-label">Email</label>
							<div class="col-sm-8">
								<input class="form-control" type="text" id="email" name="email" placeholder="Email User"
									value="{{$UserData->user_email}}">
							</div>
						</div>
						<div class="form-group col-sm-6">
							<label for="po_sap" class="col-sm-4 control-label">User Level</label>
							<div class="col-sm-8">
								<select class="form-control" id="user_level" name="user_level">
									<option>-- Pilih level user --</option>
									@foreach ($UserLevels as $UserLevel)
										<option value="{{ $UserLevel->code }}" 
											{{($UserLevel->code==$UserData->user_level?'selected':'')}} >
											{{ $UserLevel->name }}
										</option>
									@endforeach
								</select>
							</div>
						</div>
						<div id="typeContainer" class="form-group {{($UserData->user_level==3?'':'fade')}} col-sm-6">
							<label for="po_sap" class="col-sm-4 control-label">Improvement Type</label>
							<div class="col-sm-8">
								<select class="form-control" id="type_improvement" name="type_improvement">
									<option value="">-- Pilih tipe perbaikan --</option>
									@foreach ($TypeList as $type)
										<option value="{{ $type->code }}" {{($type->code==$UserData->doc_type_id?'selected':'')}} >
											{{ $type->name }}
										</option>
									@endforeach
								</select>
							</div>
						</div>
					</div>
					<div class="panel-footer">
						<input class="form-control" type="submit" id="submit_new_user" name="submit_new_user" value="Save">
					</div>
				</div>
			</div>
		</form>
	</div>

@endsection()

@push('js')
<!-- datatables -->
<script src="{{ asset('dist/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/jszip.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ asset('dist/plugins/datatables/extensions/FixedColumns/js/dataTables.fixedColumns.min.js') }}"></script>
<script src="{{ asset('dist/plugins/datatables/dataTables.fixedColumns.min.js') }}"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#user_level").change(function(e){
		if($(this).val()==3){
			$("#typeContainer").removeClass("fade");
		}
		else{
			$("#type_improvement").val("");
			$("#typeContainer").addClass("fade");
		}
	})
});

</script>
@endpush()
</div>
