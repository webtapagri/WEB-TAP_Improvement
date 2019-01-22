@extends('layouts-master.master')

@section('tittle', 'Create New User')

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
	<h3><strong>New User</strong></h3>
	<div class="row">
		@if(session('msg'))
			{!! session('msg') !!}
			{{session()->forget('msg')}}
        @endif
		@if (session()->has("ChoosenEmployeeForNewUser"))
			@include('User.create.final_form')
		@else
			@include('User.create.choose_employee')
		@endif
	</div>
@endsection()

@push('js')
<!-- datatables -->
<script src="{{ asset('dist/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/jszip.js')}}"></script>
<script src="{{ asset('dist/plugins/datatables/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ asset('dist/plugins/datatables/extensions/FixedColumns/js/dataTables.fixedColumns.min.js') }}"></script>
<script src="{{ asset('dist/plugins/datatables/dataTables.fixedColumns.min.js') }}"></script>
@endpush()
				</div>
