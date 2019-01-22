<div class="box box-success">
	<div class="box-header with-border">
		<h5 class="box-title">
			<span id="box-notifier">CHOOSE EMPLOYEE</span>
		</h5>
	</div>
	<div class="box-body">
		<table class="table stripe row-border order-column" id="grid">
			<thead></thead>
			<tbody></tbody>
		<table>
	</div>
</div>

@push('js')
<script type="text/javascript">
$(document).ready(function(){
	$("table#grid").DataTable({
		ajax: {
			url: "{{url('/user/getallemployee/')}}",
			type: "POST",
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			headers: {
				"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
			},
			dataSrc: function (json) {
			   return json.allEmployeeList;
			}
		},
		columns: [{
			data: "nik",
			title: "NIK"
		}, {
			data: "fullname",
			title: "Full Name"
		}, {
			data: "position",
			title: "Position"
		}, {
			data: "",
			defaultContent: "",
			title: "Action"
		}],
		order: [
		    [1, "asc"]
		],
		rowCallback: function(t, a, e) {
			$("td:eq(3)", t).html('<a href="/user/chooseemployee/'+a.nik+'" class="btn btn-default btn-xs">Pilih</a>');
		}
	});
});
</script>
@endpush()