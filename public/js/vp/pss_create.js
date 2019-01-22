  var validate = false;
setFieldRule('create');

//setFieldRule('{{ $form_type }}')
//$("[data-mask]").inputmask();
//$(".cmbCurrency").inputmask({ alias : "currency", prefix: '', unmaskAsNumber: 'true' });
//$('#reservation').daterangepicker();

//number only pattern
$(".number-only").numeric();

//resize text 
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}
$('#HC_PSL_PELANGGARAN').keypress(resizeInput).each(resizeInput);

/*$('.datepicker2').datepicker({
	  autoclose: true,
  	minDate: 0,
  	startDate: new Date(),
});
$('.datepicker_all').datepicker({
	  autoclose: true,
  	minDate: 0,
});*/
//Tanggal - tanggal

var tgl_surat   = '';
console.log(dest);
$('.datepicker2').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: dest,
    defaultDate: dest,
});
$('.datepicker_all').datetimepicker({
    format: 'DD-MMM-YYYY',
    //minDate: dest,
});
$('.datepicker_back').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate: dest,
    defaultDate: dest,
});
$('.datepicker_null').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: dest,
});
$('.dp_masa_berlaku').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: ms_berlaku,
    defaultDate: ms_berlaku,
});

$('.dp_tgl_panggilan').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: dest,
});
//select2 custom error message
var message = '<ul class="parsley-errors-list filled"><li class="parsley-required">Tidak boleh kosong</li></ul>';
function select2_failed(id_div)
{
  var elementSelect = $(id_div + ' > select');
  var elementbox = $(id_div+' > span > span > span');
  if(elementSelect.val() == null){
    var messages = $(id_div).find('ul');
    messages.addClass('hide');
    messages.remove();
    $(id_div).append(message);
    elementbox.css('background-color', '#f2dede');
  } else {
    elementbox.css('background-color', '#dff0d8');
  }
}
function select2_failed3(id_div)
  {
    var elmentSelect = $('#box-status > select');
    var elementbox = $('#box-status > span > span > span');

    if (elmentSelect.val() == null || elmentSelect.val() == "") {

      var pesan = $('#box-status').find('ul');
      pesan.remove();
      $('#box-status').append(message);
      elementbox.css('background-color', '#f2dede');
    } else {
      var pesan = $('#box-status').find('ul');
      pesan.remove();
      elementbox.css('background-color', '#dff0d8');
    }
  }

function select2_failed2(div_id){
    var elmentSelect = $('#box-status > select');
    var elmentBox = $('#box-status > span > span > span');
    if (elmentSelect.val() == null || elmentSelect.val() == "") {
      var pesan = $('#box-status').find('ul');
      pesan.remove();
      $('#box-status').append(message);
      elmentBox.css('background-color', '#f2dede');
    } else {
      elmentBox.css('background-color', '#dff0d8');
    }
  }

function select2_failed4(id_div)
  {
    var elmentSelect = $('#box-golongan > select');
    var elementbox = $('#box-golongan > span > span > span');

    if (elmentSelect.val() == null || elmentSelect.val() == "") {
      var pesan = $('#box-golongan').find('ul');
      pesan.remove();
      $('#box-golongan').append(message);
      elementbox.css('background-color', '#f2dede');
    } else {
      var pesan = $('#box-golongan').find('ul');
      pesan.remove();
      elementbox.css('background-color', '#dff0d8');
    }
  }

  function select2_failed5(id_div)
  {
    var elmentSelect = $(id_div+' > select');
    var elementbox = $(id_div+' > span > span > span');

    if (elmentSelect.val() == null || elmentSelect.val() == "" || elmentSelect.val() == " ") {

      var pesan = $(id_div).find('ul');
      pesan.remove();
      $(id_div).append(message);
      elementbox.css('background-color', '#f2dede');
    } else {
      var pesan = $(id_div).find('ul');
      pesan.remove();
      elementbox.css('background-color', '#dff0d8');
    }
  }

$('.select2_changes').select2().on('change', function(){
    if(validate){
      var elmentbox = $(this).parent().find('span').find('.select2-selection');
      var val = $(this).val()

      if ($(this).val() != null || $(this).val() != "" || $(this).val() != " ") {
        elmentbox.css('background-color', '#dff0d8');
        var messages = $(this).parent().find('ul');
        messages.remove();
      }
      if ($(this).val() == null || $(this).val() == "" || $(this).val() == " ") {
        $(this).parent().append(message);
        elmentbox.css('background-color', '#f2dede');
      }

    }
});

$('.select2_change').change(function(){
    if(validate){
      var elementbox = $(this).parent().find('span').find('.select2-selection');

      if($(this).val() == null || $(this).val() == "" || $(this).val() == " "){
        var messages = $(this).parent().find('ul');
        messages.addClass('hide');
        messages.remove();
        $(this).parent().append(message);
        elementbox.css('background-color', '#f2dede');
      } else {
        var messages = $(this).parent().find('ul');
        messages.remove();
        elementbox.css('background-color', '#dff0d8');
      }
    }
});
$('.select2_changer').change(function(){
    if(validate){
      var elementbox = $(this).parent().find('span').find('.select2-selection');

      if($(this).val() == null || $(this).val() == "" || $(this).val() == " "){
        var messages = $(this).parent().find('ul');
        messages.addClass('hide');
        messages.remove();
        $(this).parent().append(message);
        elementbox.css('background-color', '#f2dede');
      } else {
        var messages = $(this).parent().find('ul');
        messages.remove();
        elementbox.css('background-color', '#dff0d8');
      }
    }
});

/*$('.datepicker2').change(function(){
    if(validate){
      var elementbox = $(this).attr('id');
      console.log(elementbox);
    }
});*/

$('.datepicker2, .datepicker_all, .dp_tgl_surat, .dp_masa_berlaku ').on('dp.change', function(e){
  if(validate){
      var thisId    = $(this).attr('id');
      var messages  = $(this).parent().parent().find('div#'+thisId+'_ERROR');
      console.log(messages);
      messages.remove();
      $(this).css({
        'background-color' : '#dff0d8',
        'color' : '#468847',
        'border': '1px solid #D6E9C6'
      });
    }
});


$('#submitBtn').click(function() {
   console.log('valid');
  $('#formPss').parsley().validate("first");
  validate = true;

  select2_failed('.bloodhound');

  if ($('#formPss').parsley().isValid("first")) {
    $('#formPss').parsley().destroy();
    $('#cSubmitNikSap').text($('#iNikSap').val());
    $('#cSubmitNikNas').text($('#iNikNasional').val());
    $('#cSubmitDocType').text($('#iNoSurat').val());
    $('#cSubmitNama').text($('#iNama').val());
    $('#cSubmitName').val($('#iNama').val());
    $('#cSubmitJabatan').text($('#iJabatan').val());
    $('#cSubmitKeterangan').text($("#iJenisSuratSanksi option:selected").text()+' Nama: ' + $('#iNama').val());
    console.log('valid');
    $('#modal-confirmation').modal({backdrop: 'static', keyboard: false});
    $('.btn-close').prop('disabled', false);
  } else {
    console.log('not valid');

  }
});

$('#table-sanction').on('click', '.replicate', function() {
//$('.replicate').click(function() {
	console.log('replicate');
	
	var j = parseInt($('#sanction-loop').val());
	j++;
	$('#sanction-loop').val(j);

	$('#table-sanction > tbody').append(
    				'<tr id="clones_'+j+'">'+
    				'	<td>'+
    				'		<button type="button" id="replicate" class="replicate btn btn-default"><i class="fa fa-plus-circle"></i></button>'+
    				'		<a class="btn btn-danger btn-remove" onClick="deleteRow('+j+')"><i class="fa fa-minus-circle"></i></a>'+
    				'	</td>'+
    				'	<td>'+
    				'		<select name="HC_TYPE_OF_SANCTION[]" id="HC_TYPE_OF_SANCTION" class="form-control select2" style="width: 100%;" data-parsley-group="first"  required="">'+
    				'			<option></option>'+
    				'			<option>Tindakan Indisipliner</option>'+
    				'			<option>Norma Kerja</option>'+
    				'			<option>Etika Perilaku</option>'+
    				'		</select>'+
    				'	</td>'+
    				'	<td>'+
    				'		<input type="text" class="form-control input" name="HC_DESC_OF_SANCTION[]" id="HC_DESC_OF_SANCTION" data-parsley-maxlength="1000" data-parsley-group="first" required="">'+
    				'	</td>'+
    				'</tr>'
				);
  var findA = $('#clones_1').find('a');
  findA.attr('disabled', true);
});

function deleteRow(i) {
	$('#clones_'+i).remove();
}
 

//create form
$('#submit').click(function() {
	$('.select2').prop('disabled', false);
	$('.input').prop('disabled', false);
	$('.textarea').prop('disabled', false);
	$(".select2 option").removeAttr('disabled');
    $('#formPss').submit();
    $('#submit').prop('disabled', true);
    $('.btn-close').prop('disabled', true);
});
jQuery(document).ready(function($) {
  moment.locale('id')

  console.log(moment.locale());

  $('#HC_DATE_OF_RESIGN').on('dp.change', function(e){
    var ownDate = $("#HC_DATE_OF_RESIGN").data("DateTimePicker").date()
    $("#HC_DAY_OF_RESIGN").val(moment(ownDate).format('dddd'));
  });
  $('#HC_DATE_BACK').on('dp.change', function(e){
    var ownDate = $("#HC_DATE_BACK").data("DateTimePicker").date()
    $("#HC_DAY_BACK").val(moment(ownDate).format('dddd'));
  });
});

$('#SPAN_HC_DATE_BACK').click(function() {
	$('#HC_DATE_BACK').data("DateTimePicker").show();
});

$('#SPAN_HC_DAY_OF_RESIGN').click(function() {
	$('#HC_DATE_OF_RESIGN').data("DateTimePicker").show();
});

/*
$("#HC_DATE_OF_RESIGN").datetimepicker({
    autoclose: true,
    minDate: 0,
    startDate: new Date()
})
 .on('changeDate', function(e) {
        $("#HC_DAY_OF_RESIGN").val(getDayBahasa(e.date.getDay()));
});

$("#HC_DATE_BACK").datetimepicker({
    autoclose: true,
    minDate: 0,
    startDate: new Date()
})
 .on('changeDate', function(e) {
        $("#HC_DAY_BACK").val(getDayBahasa(e.date.getDay()));
});
*/
function getDayBahasa($day) {
	switch ($day) {
		case 0:
			day = "Minggu";
			break;
		case 1:
			day = "Senin";
			break;
		case 2:
			day = "Selasa";
			break;
		case 3:
			day = "Rabu";
			break;
		case 4:
			day = "Kamis";
			break;
		case 5:
			day = "Jumat";
			break;
		case 6:
			day = "Sabtu";
	}
	return day;
}

$(".autoresize").autoresize({padding: 20, minWidth: 100, maxWidth: 300});