@extends('layouts-master.email')

@section('tittle', 'Improvement')

@section('cascanding')

<link rel="stylesheet" type="text/css" href="{{ asset('css/ptk.css') }}">
<link rel="stylesheet" href="{{ asset('dist/Parsley.js-2.6.0/src/parsley.css') }}">
<link rel="stylesheet" href="{{ asset('dist/plugins/datepicker/datepicker3.css') }}">
<link rel="stylesheet" href="{{ asset('dist/selectize/dist/css/selectize.bootstrap3.css') }}">

{!! Html::style('vendor/dialog/dist/css/bootstrap-dialog.css') !!}
<style type="text/css">
	.selectize-control::before {
			-moz-transition: opacity 0.2s;
			-webkit-transition: opacity 0.2s;
			transition: opacity 0.2s;
			content: ' ';
			z-index: 2;
			position: absolute;
			display: block;
			top: 12px;
			right: 34px;
			width: 16px;
			height: 16px;
			background: url(images/spinner.gif);
			background-size: 16px 16px;
			opacity: 0;
		}
		.selectize-control.loading::before {
			opacity: 0.4;
		}
</style>

@endsection()

@section('content')
<p>
<b>EMAIL NOTIFIKASI SS REQUEST</b>
<br>
PT. TRIPUTRA AGRO PERSADA
</p>
<p>
Kepada Yth,
<b>
<br>
@if(isset($approval_status))
	{{$dept_improvement_full_name}}
@else
	{{$approver_full_name}}
@endif
<br>
PT. TRIPUTRA AGRO PERSADA
</b>
</p>
<br>
<p>Bersama dengan email ini, kami kirimkan informasi bahwa Karyawan yang bernama {{$applicant->fullname}} 
mengajukan SS Request dengan detail Sbb:</p>
<br>
<u>SS Request Number Detail :</u>
<br>
<p>REQUEST NUMBER : {{$request_num}}</p>
<table border="1" style="margin-bottom: 10px;">
	<thead>
		<tr>
			<th>Nik</th>
			<th>Nama</th>
			<th>Jabatan</th>
			<th>Lokasi</th>
			<th>Nama PT</th>
			<th>Divisi</th>
			<th>Jenis SS</th>
			<th>Judul SS</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{{$applicant->nik}}</td>
			<td>{{$applicant->fullname}}</td>
			<td>{{$applicant->position}}</td>
			<td>{{$location}}</td>
			<td>{{$company}}</td>
			<td>{{$division}}</td>
			<td>{{$type}}</td>
			<td>{{$title}}</td>
		</tr>
	</tbody>
</table>

@if(isset($approval_status))
	<p>
		Telah <b>{{($approval_status==1?'DISETUJUI':'DIREJECT')}}</b> oleh {{$approver_full_name}}
	</p>
@else
	<a href="{{$base_url.'/approval/detail/'.$request_num}}">
		<button style="border:1px solid black;padding:2px;margin:2px;background-color:rgb(111,220,69);cursor:pointer;color:white;">Lihat Detail</button>
	</a>
@endif

<p>Terima Kasih,</p>

<table class="MsoNormalTable" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; border-collapse: collapse;">
<tbody style="">
<tr style="">
<td style="border-right: none; border-bottom: none; border-left: none; border-image: initial; border-top: 1.5pt solid windowtext; background: rgb(214, 255, 197); padding: 0.75pt;">
<table class="MsoNormalTable" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
<tbody style="">
<tr style="">
<td colspan="2" style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">Apabila ada pertanyaan mengenai email ini dapat menghubungi</span></p>
</td>
</tr>
<tr style="">
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">Email</span></p>
</td>
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">: <span class="Object" role="link" id="OBJ_PREFIX_DWT117_ZmEmailObjectHandler"><a href="mailto:TAP.callcenter.helpdesk@tap-agri.com" target="_blank" style="">
TAP.callcenter.helpdesk@tap-agri.com</a></span></span></p>
</td>
</tr>
<tr style="">
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">Ext</span></p>
</td>
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">: 794/502</span></p>
</td>
</tr>
<tr style="">
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">HP</span></p>
</td>
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">: <span class="Object" role="link" id="OBJ_PREFIX_DWT118_com_zimbra_phone"><a href="callto:0821 1401 3315" onclick="window.top.Com_Zimbra_Phone.unsetOnbeforeunload()">0821 1401 3315</a></span></span></p>
</td>
</tr>
<tr style="">
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">Website</span></p>
</td>
<td style="padding: 0.75pt;">
<p class="MsoNormal" style="margin-right: 0in; margin-bottom: 7.5pt; margin-left: 0in;">
<span style="font-size: 9pt;">: <span class="Object" role="link" id="OBJ_PREFIX_DWT119_com_zimbra_url"><a href="http://helpdesk.tap-agri.com" target="_blank" style="">http://helpdesk.tap-agri.com</a></span></span></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
@endsection()