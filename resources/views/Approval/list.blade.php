@extends('layouts-master.master')

@section('tittle', 'Pending Approval List')

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
	<h3><strong>Pending Approval List</strong></h3>
	<div class="row">
		<div class="box box-success">
			<div class="box-body">
				@if(session('msg'))
					{!! session('msg') !!}
					{{session()->forget('msg')}}
				@endif
				<table class="table stripe row-border order-column" id="grid">
					<thead></thead>
					<tbody></tbody>
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
function resetButtonClickListener(e){
	e.preventDefault();
	$.ajax({
		url:"{{ url('/approval/getallpendingapproval') }}",
		type:"POST",
		success:function(data){
			var settings = {};
			settings.title=data.msg;
			if(data.success){
				settings.type="success";
				settings.msg="<p>NIK : "+data.nik+"</p>";
				settings.msg+="<p>Password : "+data.new_pass+"</p>";
			}
			else{				
				settings.type="danger";
				settings.msg="";
			}
			globalAlert(settings);
		}
	})
}
$(document).ready(function(){


	$("table#grid").DataTable({
		ajax: {
			url: "{{url('/approval/getallpendingapproval')}}",
			type: "POST",
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			headers: {
				"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
			},
			dataSrc: function (json) {
			   return json.allPendingApprovalList;
			}
		},
		columns: [{
			data: "improvement_id",
			title: "Request Number"
		}, {
			data: "applicant_nik",
			title: "Applicant NIK"
		},{
			data: "applicant_fullname",
			title: "Applicant Full Name"
		}, {
			data: "judul_ss",
			title: "Judul SS"
		},{
			data: "company_name",
			title: "PT"
		},{
			data: "",
			defaultContent: "",
			title: "Action"
		}],
		order: [
		    [1, "asc"]
		],
		infoCallback: function(t, a, e, n, o, i) {
		    var r = this.api(),
		        d = r.page.info();
		    return "<strong>Showing " + (1 + d.start) + " to " + d.end + " of " + d.recordsDisplay + " entries</strong>"
		},
		rowCallback: function(t, a, e) {
			$("td:eq(5)", t).empty().append('<a href="/approval/detail/'+a.improvement_id+'" class="btn btn-default btn-xs">Detail</a>');
		}
	});
	
});

</script>
@endpush()
				</div>
