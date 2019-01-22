@extends('layouts-master.master')

@section('tittle', 'Pending Approval List')

@section('cascanding')
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
	<h3><strong>Improvement Approval List</strong></h3>
	<div class="row">
		<div class="box box-success">
			<div class="box-header">
				<form action="{{url('approval/tracking')}}" method="get">
					{!! csrf_field() !!}
					<div class="panel panel-default">
						<div class="panel-body">
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Request Number</label>
								<div class="col-sm-8">
									<input class="filter-text form-control" type="text" id="rn" name="rn" placeholder="Filter Request Number">
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">PT</label>
								<div class="col-sm-8">
									<select class="filter-select form-control" name="pt">
										<option value="">---	PT	----</option>
										@if(isset($data_pt_ss))
											@foreach ( $data_pt_ss as $pt_ss)
												<option value="{{ $pt_ss->code }}">{{ $pt_ss->name }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">NIK</label>
								<div class="col-sm-8">
									<input class="filter-text form-control" type="text" id="nik" name="nik" placeholder="Filter NIK">
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Divisi</label>
								<div class="col-sm-8">
									<select class="filter-select form-control" name="divisi">
										<option value="">---	Divisi	----</option>
										@if(isset($data_div_ss))
											@foreach ( $data_div_ss as $div_ss)
												<option value="{{ $div_ss->code }}">{{ $div_ss->name }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Nama</label>
								<div class="col-sm-8">
									<input class="filter-text form-control" type="text" id="name" name="name" placeholder="Filter Nama Pengaju">
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Jenis SS</label>
								<div class="col-sm-8">
									<select class="filter-select form-control" name="ss_jenis">
										<option value="">-- Pilih Jenis SS --</option>
										@foreach ( $data_jenis_ss as $jenis_ss)
											<option value="{{ $jenis_ss->code }}">{{ $jenis_ss->name }}</option>
										@endforeach
									</select>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Jabatan</label>
								<div class="col-sm-8">
									<input class="filter-text form-control" type="text" id="position" name="position" placeholder="Filter Jabatan Pengaju">
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Lokasi</label>
								<div class="col-sm-8">
									<select class="filter-select form-control" name="location">
										<option value="">---	Lokasi	----</option>
										@if(isset($data_loc_ss))
											@foreach ( $data_loc_ss as $loc_ss)
												<option value="{{ $loc_ss->code }}">{{ $loc_ss->name }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label for="po_sap" class="col-sm-4 control-label">Judul</label>
								<div class="col-sm-8">
									<input class="filter-text form-control" type="text" id="title" name="title" placeholder="Filter Judul">
								</div>
							</div>
						</div>
						<div class="panel-footer text-center">
							<div class="btn-group" role="group">
								<button class="btn btn-success" id="execBtn">
									<i class="fa fa-filter" aria-hidden="true"></i>
									Execute
								</button>
								<button class="btn btn-warning" id="clearBtn">
									<i class="fa fa-eraser" aria-hidden="true"></i>
									Clear Filter
								</button>
								<button class="btn btn-primary" id="exportBtn" name="download" value="1">
									<i class="fa fa-table" aria-hidden="true"></i>
									Export Excel
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="box-body">
				{{ session('msg') or "" }}
				<div class="table-responsive" style="overflow-x:auto;">
					<table class="table stripe row-border order-column" id="grid">
						<thead>
							<tr>
								<th>Request Number</th>
								<th>Nik</th>
								<th>Nama</th>
								<th>Jabatan</th>
								<th>Lokasi</th>
								<th>Nama PT</th>
								<th>Divisi</th>
								<th>Jenis SS</th>
								<th>Judul SS</th>
								@for ($i = 1; $i <= $max_verificator; $i++)
									<th>Ver.{{$i}}</th>
									<th>Note</th>
									<th>Approval</th>
								@endfor
								<th>Approval By MDev</th>
								<th>Comment By MDev</th>
							</tr>
						</thead>
						<tbody>
							@foreach($data_improvement as $document)
								<tr class="{{$document->mdev_approval==1?'success':'danger'}}">
									<td>{{$document->request_number}}</td>
									<td>{{$document->requester_nik}}</td>
									<td>{{$document->requester_name}}</td>
									<td>{{$document->requester_position}}</td>
									<td>{{$document->location}}</td>
									<td>{{$document->company}}</td>
									<td>{{$document->division}}</td>
									<td>{{$document->type}}</td>
									<td>{{$document->title}}</td>
									@for ($i = 0; $i < $max_verificator; $i++)
										<td class="{{isset($document->approver[$i])?
													($document->approver[$i]->verificator_approval==1?'text-success':'text-danger'):''}}">
											{{isset($document->approver[$i])?$document->approver[$i]->name:''}}
										</td>
										<td class="{{isset($document->approver[$i])?
													($document->approver[$i]->verificator_approval==1?'text-success':'text-danger'):''}}">
											{{isset($document->approver[$i])?$document->approver[$i]->note:''}}
										</td>
										<td class="{{isset($document->approver[$i])?
													($document->approver[$i]->verificator_approval==1?'text-success':'text-danger'):''}}">
											{{isset($document->approver[$i])?
												($document->approver[$i]->verificator_approval==1?'Accept':
													($document->approver[$i]->verificator_approval==2?'Reject':'')):''}}
										</td>
									@endfor
									<td class="text-center {{$document->mdev_approval==1?'text-success':'text-danger'}}">
										{{$document->mdev_approval==1?'Accept':'Reject'}}
									</td>
									<td class="text-center {{$document->mdev_approval==1?'text-success':'text-danger'}}">
										{{$document->mdev_comment}}
									</td>
								</tr>
							@endforeach
						</tbody>
					<table>
				</div>
			</div>
		</div>
	</div>
@endsection()

@push('js')
<script type="text/javascript">
	$(document).ready(function(){
		var prevFilterData = JSON.parse('{!!json_encode($filter)!!}');
		var filter;
		for(filter in prevFilterData){
			$("[name='"+filter+"']").val(prevFilterData[filter]);
		}
		$("#execBtn").click(function(){
			$(this).closest("form").submit();
		});
		$("#clearBtn").click(function(){
			$(".filter-select,.filter-text").val("");
		});
		/*$("#exportBtn").click(function(){
			alert('a');
		});*/
	})
</script>
@endpush()
</div>
