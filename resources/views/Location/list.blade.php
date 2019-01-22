@extends('layouts-master.master')

@section('tittle', 'Location List')

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
	<h3><strong>Location List</strong></h3>
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
							<th>Location Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<form method="post" action="{{url('location/insert')}}">
								{{ csrf_field() }}
								<td>
									<input name="newLocationName" type="text" class="form-control" placeholder="input new location name">
								</td>
								<td>
									<input type="submit" class="btn btn-success" name="addNewLocation" value="+"/>
								</td>
							</form>
						</tr>
						@foreach($LocationList as $location)
							<tr data-location-id="{{$location->code}}">
								<td><input class="locationName form-control" type="text" value="{{$location->name}}"></td>
								<td>
									<a class="removelocation btn btn-danger" title="remove location" 
										href="{{url('location/delete/'.$location->code)}}">
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
	function editFlag(e){
		$(this).closest("tr").addClass("editedlocation");
	}
	function submitChangeListener(e){
		var thisRow = $(this).closest("tr");
		$.ajax({
			url: "{{ url('/location/change') }}",
			row: thisRow,
			method: 'post',
			data: {
				"_token": $('meta[name="_token"]').attr('content'),
				"locId":$(thisRow).data("location-id"),
				"newName":$(this).val()
			},
			success: function(result){
				if(result.success){
					$(this.row).removeClass("editedlocation");
				}
			}
		});
	}
	$(document).ready(function(){
		$(".locationName").keyup(editFlag);
		$(".locationName").change(submitChangeListener);
	})
</script>
@endpush()
</div>