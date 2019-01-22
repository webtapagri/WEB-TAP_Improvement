@extends('layouts-master.master')

@section('tittle', 'Homepage')

@section('content')
	<div class="row">
		<img class="img-thumbnail col-sm-6 col-sm-offset-3" src="{{ asset('/assets/img/pages/Homepage.png') }}" style="border-radius:50%" />
	</div>
@endsection()