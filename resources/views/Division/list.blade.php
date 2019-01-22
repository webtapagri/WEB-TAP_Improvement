@extends('layouts-master.master')

@section('tittle', 'Division List')

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
	<h3><strong>Division List</strong></h3>
	<div class="row">
		<div class="box box-success">
			<div class="box-body">
				@if(session('msg'))
					{!! session('msg') !!}
					{{session()->forget('msg')}}
				@endif
				<table class="table stripe row-border order-column" id="grid">
					<thead>
						<tr>
							<th>Division Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<form method="post" action="{{url('division/insert')}}">
								{{ csrf_field() }}
								<td>
									<input name="newDivisionName" type="text" class="form-control" placeholder="input new division name">
								</td>
								<td>
									<input type="submit" class="btn btn-success" name="addNewDivision" value="+"/>
								</td>
							</form>
						</tr>
						@foreach($DivisionList as $division)
							<tr data-division-id="{{$division->code}}">
								<td><input class="divisionName form-control" type="text" value="{{$division->name}}"></td>
								<td>
									<a class="removeDivision btn btn-danger" title="remove division" 
										href="{{url('division/delete/'.$division->code)}}">
										<i class="fa fa-times"></i>
									</a>
								</td>
							</tr>
						@endforeach
					</tbody>
				<table>
			</div>
		</div>
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
	function addNewDivisionClickListener(e){
		var newDivisionName = $("#newDivisionName").val();
		addNewDivision(newDivisionName);
	}
	function editFlag(e){
		$(this).closest("tr").addClass("editedDivision");
	}
	function submitChangeListener(e){
		var thisRow = $(this).closest("tr");
		$.ajax({
			url: "{{ url('/division/change') }}",
			row: thisRow,
			method: 'post',
			data: {
				"_token": $('meta[name="_token"]').attr('content'),
				"divId":$(thisRow).data("division-id"),
				"newName":$(this).val()
			},
			success: function(result){
				if(result.success){
					$(this.row).removeClass("editedDivision");
				}
			}
		});
	}
	$(document).ready(function(){
		$("#addNewDivision").click(addNewDivisionClickListener);
		$(".divisionName").keyup(editFlag);
		$(".divisionName").change(submitChangeListener);
	})
</script>
@endpush()
				</div>
