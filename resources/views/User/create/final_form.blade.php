<div class="box box-success">
	<div class="box-header with-border">
		<h5 class="box-title">
			<span id="box-notifier">CHOOSEN EMPLOYEE</span>
		</h5>
		<div class="box-tools pull-right">
			<a class="btn btn-box-tool" href="{{ url('user/create/changeemployee') }}" title="Change choosen employee"><i class="fa fa-remove"></i></a>
		</div>
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
					<td>{{ $ChoosenEmployeeData->nik }}</td>
					<td>{{ $ChoosenEmployeeData->fullname }}</td>
					<td>{{ $ChoosenEmployeeData->position }}</td>
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
	<form action="{{ url('user/create/submit') }}" method="post">
		{!! csrf_field() !!}
		<input type="hidden" value="{{ $ChoosenEmployeeData->nik }}" name="nik" />
		<input type="hidden" value="{{ $ChoosenEmployeeData->fullname }}" name="fullname" />
		<div class="box-body">
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="form-group col-sm-6">
						<label for="po_sap" class="col-sm-4 control-label">Username</label>
						<div class="col-sm-8">
							<input class="form-control" type="text" id="username" name="username" placeholder="Username baru">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label for="po_sap" class="col-sm-4 control-label">Email</label>
						<div class="col-sm-8">
							<input class="form-control" type="text" id="email" name="email" placeholder="Email User">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label for="po_sap" class="col-sm-4 control-label">Password</label>
						<div class="col-sm-8">
							<input class="form-control" type="password" id="password" name="password" placeholder="Password">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label for="po_sap" class="col-sm-4 control-label">Confirm Password</label>
						<div class="col-sm-8">
							<input class="form-control" type="password" id="confirm_password" 
								name="confirm_password" placeholder="Konfirmasi Password">
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label for="po_sap" class="col-sm-4 control-label">User Level</label>
						<div class="col-sm-8">
							<select class="form-control" id="user_level" name="user_level">
								<option>-- Pilih level user --</option>
								@foreach ($UserLevels as $UserLevel)
									<option value="{{ $UserLevel->code }}">{{ $UserLevel->name }}</option>
								@endforeach
							</select>
						</div>
					</div>
					<div id="typeContainer" class="form-group fade col-sm-6">
						<label for="po_sap" class="col-sm-4 control-label">Improvement Type</label>
						<div class="col-sm-8">
							<select class="form-control" id="type_improvement" name="type_improvement">
								<option value="">-- Pilih tipe perbaikan --</option>
								@foreach ($TypeList as $type)
									<option value="{{ $type->code }}">{{ $type->name }}</option>
								@endforeach
							</select>
						</div>
					</div>
				</div>
				<div class="panel-footer">
					<input class="form-control" type="submit" id="submit_new_user" name="submit_new_user" value="Create New User">
				</div>
			</div>
		</div>
	</form>
</div>


@push('js')
<script type="text/javascript">
$(document).ready(function(){
	$("#user_level").change(function(){
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