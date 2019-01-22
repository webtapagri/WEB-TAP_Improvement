var validate = false;
setFieldRule('create');

//setFieldRule('{{ $form_type }}')
//$("[data-mask]").inputmask();
//$(".cmbCurrency").inputmask({ alias : "currency", prefix: '', unmaskAsNumber: 'true' });
//$('#reservation').daterangepicker();

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
var getdate     = $("#getdate").val();
var dates       = new Date(getdate);
//var firstDays   = moment(dates).add(1, 'months').startOf('months');
var ms_berlaku   = moment(dates).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

var dest        = moment(dates).format('YYYY-MM-DD HH:mm:ss');
var tgl_surat   = '';
console.log(dest);
$('.datepicker2').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: dest,
});
$('.datepicker_all').datetimepicker({
    format: 'DD-MMM-YYYY',
    //minDate: dest,
});
$('.dp_tgl_surat').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: dest,
});

$('.dp_tgl_surat').on('dp.change', function(e){
  tgl_surat = moment($('.dp_tgl_surat').data("DateTimePicker").date()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
});

$('.dp_masa_berlaku').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate: ms_berlaku,
});

  
//nik nasional
$("#iNikNasional").select2().on('change', function () {
  ajaxstart = true;
  $('.overlay').show();
  getDataEmp('nas'); 
  setFieldRule('nik-nas');
  showLog('nik-nas');

  var val = $(this).val();
  $('#iNikNasional').find('option').remove();
  //$("#iNikNasional option:selected").removeAttr("selected");
  $('#iNikNasional').append($('<option>', {value:val, text:val}));
  $("#iNikNasional option[value='"+val+"']").attr("selected","selected");

  $("#iJenisPerubahan").val('').change();
 });

$("#iNikNasional").select2({
   ajax: {
     url: $("#web_url").val() + 'api/getEmpAutoComplete/all',
     dataType: 'json',
     delay: 250,
     data: function (params) {
       return {
         nik: params.term,
         code: 'N'
       };
     },
     processResults: function (data, params) {
       return {
         results: data
       };
     },
     cache: true
   },
/*
@if (isset($dHeader['nik_national']))
     initSelection: function (element, callback) {
       var data = {id: '{{$dHeader['nik_national']}}', text: '{{$dHeader['nik_national']}}'};
       callback(data);
     }
@endif 
*/
});

//set all option nik sap
$("#iNikSap").select2().on('change', function () {
  ajaxstart = true;
  $('.overlay').show();
  getDataEmp('sap');
  //setFieldRule('nik-sap');
  setFieldRule($("#form_type").val());
  showLog('nik-sap');
  
  // rule nya kalo nik_nas dipilih,..set nik_sap jg ---> done
  // kalo nik_sap berubah, cek nik_nasional ada ato tdk,...kalo ada diganti kalo ga, blank

  /*$('#iNikNasional').append($('<option>', {value:$("#iNikSap").val(), text:$("#iNikSap").val()}));
  $("#iNikNasional").val($("#iNikSap").val()).change();*/

  $("#iJenisPerubahan").val('').change();
 });

$("#iNikSap").select2({
   ajax: {
     url: $("#web_url").val() + 'api/getEmpAutoComplete/all',
     dataType: 'json',
     delay: 250,
     data: function (params) {
       return {
         nik: params.term,
         code: 'S'
       };
     },
     processResults: function (data, params) {
       return {
         results: data
       };
     },
     cache: true
   },
/*
  @if (isset($dHeader['nik_sap']))
       initSelection: function (element, callback) {
         var data = {id: '{{$dHeader['nik_sap']}}', text: '{{$dHeader['nik_sap']}}'};
         callback(data);
       }
  @endif 
 */
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

  select2_failed('#bloodhound');

  if ($('#formPss').parsley().isValid("first")) {
    $('#formPss').parsley().destroy();
    $('#cSubmitNikSap').text($('#iNikSap').val());
    $('#cSubmitDocType').text($('#iNoSurat').val());
    $('#cSubmitNama').text($('#iNama').val());
    $('#cSubmitName').val($('#iNama').val());
    $('#cSubmitJabatan').text($('#iJabatan').val());
    $('#cSubmitKeterangan').text($("#lJudulSurat").text()+' Nama: ' + $('#iNama').val());
    console.log('valid');
    $('#modal-confirmation').modal({backdrop: 'static', keyboard: false});
    $('.btn-close').prop('disabled', false);
  } else {
    console.log('not valid');

  }
});

$('#replicate').click(function() {
	console.log('replicate');
	
	var j = parseInt($('#sanction-loop').val());
	j++;
	$('#sanction-loop').val(j);

	$('#offense').append(
    				'<div class="form-group clearfix" id="clones_'+j+'">'+
    				'<div class="col-xs-4 col-sm-3">'+
    				'	<select name="HC_TYPE_OF_SANCTION[]" id="HC_TYPE_OF_SANCTION" class="form-control select2" style="width: 100%;" data-parsley-group="first" required="">'+
    				'		<option></option>'+
    				'		<option>Tindakan Indisipliner</option>'+
    				'		<option>Norma Kerja</option>'+
    				'		<option>Etika Perilaku</option>'+
    				'	</select>'+
    				'</div>'+
    				'<div class="col-xs-6 col-sm-8">'+
    				'	<input type="text" class="form-control input" name="HC_DESC_OF_SANCTION[]" id="HC_DESC_OF_SANCTION" data-parsley-group="first" required="">'+
    				'</div>'+
    				'<div class="col-xs-2 col-sm-1">'+
    				'	<a class="btn btn-danger btn-remove" onClick="deleteRow('+j+')"><i class="fa fa-minus-circle"></i></a>'+
    				'</div>'+
    				'</div>'
				);
  var findA = $('#clones_1').find('a');
  findA.attr('disabled', true);
});

function deleteRow(i) {
	$('#clones_'+i).remove();
}
 
function getDataEmp(source) {
    if(source == 'nas') var nik = $.trim($('#iNikNasional').val());
    else var nik = $.trim($('#iNikSap').val());

    showLog('nik: '+nik);
    if(nik!='') {
      $.ajax({
        url : $("#web_url").val() + 'api/getEmployee',
        type : 'GET',
        async: true,
        data : {
          'nik': nik,
          'source': source,
        },
        dataType : 'json',
        success : function(json) {
          if(json == 0) {
            //console.log(0);
          } else {
            console.log(json);
            $('#iNama').val(json[0].employee_name);
            $('.HC_CRONOLGY_NAME').val(json[0].employee_name);
            $('.iNamaKaryawan').text(json[0].employee_name);
            $('#HC_SEX').val(json[0].sex);
            $('#iPerusahaan').val(json[0].comp_name);
            $('#HC_LETTER_FROM').val(json[0].comp_name);
            $('#HC_COMPANY').val(json[0].comp_name);
            $('#HC_COMP_CODE').val(json[0].comp_code);
            $('#iBisnisArea').val(json[0].est_name);
            $('#HC_EST_CODE').val(json[0].est_code);
            $('#HC_AREA_CODE').val(json[0].werks);
            $('#iAfdeling').val(json[0].afd_name);
            $('#HC_AFD_CODE').val(json[0].afd_code);
            $("#HC_LETTER_PERIHAL").val($("#lJudulSurat").text());
          
            if(source == 'sap' ) {
              $('#iNikNasional').find('option').remove();
              $('#iNikNasional').append($('<option>', {value:json[0].nik_nasional, text:json[0].nik_nasional}));
              $("#iNikNasional option[value='"+json[0].nik_nasional+"']").attr("selected","selected");
            }
            if(source == 'nas' ) {
              $('#iNikSap').find('option').remove();
              $('#iNikSap').append($('<option>', {value:json[0].nik, text:json[0].nik}));
              $("#iNikSap option[value='"+json[0].nik+"']").attr("selected","selected");
            }
          
            $('#HC_JOB_CODE').val(json[0].job_code);
      			$.get($("#web_url").val() + 'api/getOptJobCode', { job_code: json[0].job_code })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json[0].job_code; });
                  	if(arr != 0) $('#iJabatan').val(arr[0].text);
                  	else $('#iJabatan').val(json[0].job_code);
      			});

            $('#HC_GRADE_CODE').val(json[0].golongan);
      			$.get($("#web_url").val() + 'api/getOptEmpGradeGol', { job_type: json[0].golongan })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json[0].golongan; });
                  	if(arr != 0) $('#iGolongan').val(arr[0].text);
                      else $('#iGolongan').val(json[0].golongan);
      			});

            $('#HC_EMP_STATUS_CODE').val(json[0].status);
      			$.get($("#web_url").val() + 'api/getOptEmpWorkStatus', { status: json[0].status })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json[0].status; });
                  	if(arr != 0) $('#iStatus').val(arr[0].text);
      			});
          
      			$.get($("#web_url").val() + 'api/getOptCompany', { comp_code: json[0].comp_code })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json[0].comp_code; });
                  	if(arr != 0) {
      					$.get($("#web_url").val() + 'api/getOptRegion', { region_code: arr[0].region_code })
      					.done(function(data){
      						var arr1 = jQuery.grep(data, function( a ) { return a.id === arr[0].region_code; });
      						if(arr1 != 0) $('#HC_TEMBUSAN_REGION').val(arr1[0].text);
      					});
                      }
      			});
          
      			$.get($("#web_url").val() + 'api/getRegionalHC')
      			.done(function(data){
                  	$('#HC_TEMBUSAN_TO').val(data);
      			});
          
          	$(".autoresize").autoresize({padding: 20, minWidth: 100, maxWidth: 300});

          }
        }
      });

      $.ajax({
        url : $("#web_url").val() + 'api/getSuratPanggilan',
        type : 'GET',
        async: true,
        data : {
          'nik': nik,
          'source': source,
        },
        dataType : 'json',
        success : function(json) {
          if(json == 0) {
            //console.log(0);
          } else {
            console.log(json);
            $('#HC_SP1_NOMOR').val(json[0].no_surat ? json[0].no_surat : '');
            $('#HC_SP1_DATE').val(json[0].effective_date ? moment(json[0].effective_date).format('DD-MMM-YYYY'): '' );
            $('#HC_SP2_NOMOR').val(json[1].no_surat ? json[1].no_surat : '');
            $('#HC_SP2_DATE').val(json[1].effective_date ? moment(json[1].effective_date).format('DD-MMM-YYYY') : '');
          }
        }
      });
    }
}



function validateForm(i = 1) {
  if(i == 1) {
    console.log('validation ok');
    return true;
  } else {
    console.log('validation failed');
    return false;
    }
}

//create form
$('#submit').click(function() {
	$('.select2').prop('disabled', false);
	$('.input').prop('disabled', false);
	$('.textarea').prop('disabled', false);
	$(".select2 option").removeAttr('disabled');
	var validate = validateForm();
	if(validate == true) {
    	$('#formPss').submit();
    	$('#submit').prop('disabled', true);
    	$('.btn-close').prop('disabled', true);
    } else {
    	$('#modal-confirmation').modal('hide');
    }
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