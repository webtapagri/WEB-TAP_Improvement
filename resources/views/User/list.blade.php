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
	<h3><strong>User List</strong></h3>
	<div class="row">
		<div class="box box-success">
			<div class="box-body">
				@if(session('msg'))
					{!! session('msg') !!}
					{{session()->forget('msg')}}
				@endif
				<div class="row">
					<div class="col-md-12">
						<a href="{{ url('user/create') }}" class="btn btn-default" id="any_button">
							<span class="fa fa-plus"></span> Tambah User
						</a>
					</div><br><br>
				</div>
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
		url:"{{ url('/user/resetpass') }}",
		data:{
			nik:$(this).data('nik'),
			_token:'{{csrf_token()}}'
		},
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
			url: "{{url('/user/getalluser/')}}",
			type: "POST",
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			headers: {
				"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
			},
			dataSrc: function (json) {
			   return json.allUserList;
			}
		},
		columns: [{
			data: "nik",
			title: "NIK"
		}, {
			data: "user_name",
			title: "Username"
		}, {
			data: "user_level_name",
			title: "User Level"
		},{
			data: "type_name",
			title: "Improvement Type"
		}, {
			data: "",
			defaultContent: "",
			title: "Status"
		},{
			data: "",
			defaultContent: "",
			title: "Action"
		}],
		order: [
		    [0, "desc"]
		],
		infoCallback: function(t, a, e, n, o, i) {
		    var r = this.api(),
		        d = r.page.info();
		    return "<strong>Showing " + (1 + d.start) + " to " + d.end + " of " + d.recordsDisplay + " entries</strong>"
		},
		rowCallback: function(t, a, e) {
			var buttonText = "";
			if(a.user_active==1){
				$(t).addClass("success");
				$("td:eq(4)", t).addClass("text-center").addClass("text-success").text("ACTIVE");
				buttonText = "Deactivate";
			}
			else{
				$(t).addClass("danger");
				$("td:eq(4)", t).addClass("text-center").addClass("text-danger").text("INACTIVE");
				buttonText = "Activate";
			}
			$("td:eq(5)", t).addClass("text-right");
			$("td:eq(5)", t).empty();
			$("td:eq(5)", t).append('<a href="/user/changestatus/'+a.user_active+'/'+a.nik+'" class="btn btn-default btn-xs">'+buttonText+'</a>');
			if(a.user_active==1){
				var resetButton = $('<a href="#" class="btn btn-default btn-xs" data-nik="'+a.nik+'">Reset Password</a>');
				resetButton.click(resetButtonClickListener);
				$("td:eq(5)", t).append(resetButton);
				$("td:eq(5)", t).append('<a href="/user/detail/'+a.nik+'" class="btn btn-default btn-xs">Detail</a>');
			}
		}
	});
	
});

</script>
@endpush()
				</div>
