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
	<h3><strong>Type List</strong></h3>
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
							<th>Type Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<form method="post" action="{{url('type/insert')}}">
								{{ csrf_field() }}
								<td>
									<input name="newTypeName" type="text" class="form-control" placeholder="input new type name">
								</td>
								<td>
									<input type="submit" class="btn btn-success" name="addNewType" value="+"/>
								</td>
							</form>
						</tr>
						@foreach($TypeList as $type)
							<tr data-type-id="{{$type->code}}">
								<td><input class="typeName form-control" type="text" value="{{$type->name}}"></td>
								<td>
									<a class="removeType btn btn-danger" title="remove type" 
										href="{{url('type/delete/'.$type->code)}}">
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
	function addNewTypeClickListener(e){
		var newTypeName = $("#newTypeName").val();
		addNewType(newTypeName);
	}
	function editFlag(e){
		$(this).closest("tr").addClass("editedType");
	}
	function submitChangeListener(e){
		var thisRow = $(this).closest("tr");
		$.ajax({
			url: "{{ url('/type/change') }}",
			row: thisRow,
			method: 'post',
			data: {
				"_token": $('meta[name="_token"]').attr('content'),
				"typeId":$(thisRow).data("type-id"),
				"newName":$(this).val()
			},
			success: function(result){
				if(result.success){
					$(this.row).removeClass("editedType");
				}
			}
		});
	}
	$(document).ready(function(){
		$("#addNewType").click(addNewTypeClickListener);
		$(".typeName").keyup(editFlag);
		$(".typeName").change(submitChangeListener);
	})
</script>
@endpush()
				</div>
