var validate = false;

//tgl efektif berlaku
var getdate = $("#getdate").val();
//var getdate = '01-Mar-2017';
var dates = new Date(getdate);
var gMonth = dates.getMonth();

for (i = 1; i < 13; i++) {  
  var iplus = parseInt(i || 0)+ 1;
	var firstDay = new Date(dates.getFullYear(), dates.getMonth()+i, 1);
	var formatedDate = '0' + firstDay.getDate() + '-' +  (firstDay.toLocaleString("en-us", { month: "short" })) + '-' + firstDay.getFullYear();
    $('#iTanggalEfektifBerlaku').append($('<option>', { value : formatedDate }).text(formatedDate));
}
$("#iTanggalEfektifBerlaku").val(getFormatedDate(1)).change();

//nik nasional
$("#iNikNasional").select2().on('change', function () {
  ajaxstart = true;
  $('.overlay').show();
  getDataEmp('nas'); 
  showLog('nik-nas');

  var val = $(this).val();
  $('#iNikNasional').find('option').remove();
  $('#iNikNasional').append($('<option>', {value:val, text:val}));
  $("#iNikNasional option[value='"+val+"']").attr("selected","selected");
 });
	
$("#iNikNasional").select2({
   ajax: {
     url: $("#urlempauto").val(),
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
   }
});

//set all option nik sap
$("#iNikSap").select2().on('change', function () {
  ajaxstart = true;
  $('.overlay').show();
  resetDataProfucktivity();
  getDataEmp('sap');
  getCopyNik($(this).val());
  showLog('nik-sap');
  
  $('.jnsprbhn').attr('id', 'box-jnsprbhn');
 });

$("#iNikSap").select2({
   ajax: {
     url: $("#urlempauto").val(),
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
   }
});

$.get($("#web_url").val() + 'api/getOptEmpChangeType')
.done(function(data){
  $("#iJenisPerubahan").select2({
    placeholder: '',
    data: data
  });

  $('#iJenisPerubahan').select2().on('change', function() {
  	if(initscript === false) {
    ajaxstart = true;
    $("#iNomorPtk").val(null).trigger('change.select2');
    resetToOldStatus();
    $('#jns_perubahan').val($(this).text());
    if($(this).val() == 'CT01') { //perpanjangan kontrak
        //set tgleffektifberlaku to akhirkontrak
        var akhplus   = moment($('#akhkont').val()).add(1, 'days').format('DD-MMM-YYYY');
        $('#iTanggalEfektifBerlaku').empty();
        $('#iTanggalEfektifBerlaku').append($('<option>', { value : akhplus }).text(akhplus));
        $('#iTanggalEfektifBerlaku').prop("disabled",true);
        showLog('jp-ct01');
    } else if($(this).val() == 'CT02') { //PCN
        //populate tanggaleffectifberlaku
        $('#iTanggalEfektifBerlaku').empty();
        var getdate = $("#getdate").val();
        var dates = new Date(getdate);
        var gMonth = dates.getMonth();
        for (i = 1; i < 13; i++) { 
          var iplus = parseInt(i || 0)+ 1;
          var firstDay = new Date(dates.getFullYear(), dates.getMonth()+i, 1);
          var formatedDate = '0' + firstDay.getDate() + '-' +  (firstDay.toLocaleString("en-us", { month: "short" })) + '-' + firstDay.getFullYear();
          $('#iTanggalEfektifBerlaku').append($('<option>', { value : formatedDate }).text(formatedDate)); 
        }
        $("#iTanggalEfektifBerlaku").val(getFormatedDate(1)).change();
        $('#iTanggalEfektifBerlaku').prop("disabled",false);
        showLog('jp-ct02');
    }
    setFieldRule('iJenisPerubahan');
    }
  }).trigger('change');
});


/*
function funcRule_CT01EffDate() {
  var akhplus   = moment($('#akhkont').val()).add(1, 'days').format('DD-MMM-YYYY');
  console.log(akhplus);
  $('#iTanggalEfektifBerlaku').empty();
  $('#iTanggalEfektifBerlaku').append($('<option>', { value : akhplus }).text(akhplus));
}

function funcRule_CT02EffDate() {
  var getdate = $("#getdate").val();
  var dates = new Date(getdate);
  var gMonth = dates.getMonth();

  //populate tanggaleffectifberlaku
  $('#iTanggalEfektifBerlaku').empty();
  
  for (i = 1; i < 13; i++) { 
    var iplus = parseInt(i || 0)+ 1;
    var firstDay = new Date(dates.getFullYear(), dates.getMonth()+i, 1);
    var formatedDate = '0' + firstDay.getDate() + '-' +  (firstDay.toLocaleString("en-us", { month: "short" })) + '-' + firstDay.getFullYear();
    $('#iTanggalEfektifBerlaku').append($('<option>', { value : formatedDate }).text(formatedDate)); 
  }
  $("#iTanggalEfektifBerlaku").val(getFormatedDate(1)).change();
  $('#iTanggalEfektifBerlaku').prop("disabled",false);
}
*/

function runLovPtK() {
$.get($("#web_url").val() + 'api/getOptPtkNo', { werks: $('#ba_code').val(), job_code: $('#job_code_old').val() })
.done(function(data){
  $("#iNomorPtk").select2({
    placeholder: 'Pilih Nomor PTK',
    allowClear: true,
    data : data
  });

  $('#iNomorPtk').select2().on('change', function() {
  	  if(initscript === false) {
      ajaxstart = true;
      resetToOldStatus();
      var val = $(this).val();
      showLog('ptk: '+ val);
      if(val) {
          var filtered = $(data).filter(function(index){
            return this.id == val;
        });
        if(filtered.length > 0){
            $('#iPerusahaanNew').select2().val(filtered[0].comp_code).trigger("change");
            $('#ba_code').val(filtered[0].ba_code);
            $('#iJabatanNew').select2().val(filtered[0].job_code).trigger("change");
            sessionStorage.setItem("ptk_comp", filtered[0].comp_code);
            sessionStorage.setItem("ptk_werks", filtered[0].ba_code);
        	showLog('ptk-val');
          }
      } else {
          showLog('ptk-noval');
      }
      setFieldRule('iNomorPtk');
      }
    }).trigger('change');
});
}



$.get($("#web_url").val() + 'api/getOptCompany')
.done(function(data){
  $("#iPerusahaanNew").select2({
    placeholder : 'Pilih Perusahaan',
    cache: true,
    data : data
  });

  $('#iPerusahaanNew').select2().on('change', function() {
  	  if(initscript === false) {
      ajaxstart = true;
      $('#iBisnisAreaNew').html('').select2({data: {id:null, text: null}});
      var val = $(this).val();
      if(val) {
          var filtered = $(data).filter(function(index){
            return this.id == val;
        });
        if(filtered.length > 0){
              if(filtered[0]['region_code'] && filtered[0]['id']) {
              	$.get($("#web_url").val() + 'api/getOptBusinessArea', { region_code: filtered[0]['region_code'], comp_code: filtered[0]['id'] } )
              	.done(function(data){
              		$("#iBisnisAreaNew").select2({
                    	placeholder : 'Pilih Bisnis Area/Divisi',
                    	data : data
              		});
                	$("#iBisnisAreaNew").val(null).trigger('change.select2');
              		if($("#iBisnisAreaNew").val()) {
              			$("#ba_code").val($("#iBisnisAreaNew").val()).change();
              		} else {
              			if($("#ba_code").val()) {
              				$('#iBisnisAreaNew').select2().val($("#ba_code").val()).trigger("change");
              			}
              		}
              	});
              }
        }
      }
  	  }
    }).trigger('change');
});

$.get($("#web_url").val() + 'api/getOptJobCode')
.done(function(data){
  $("#iJabatanNew").select2({
    placeholder: '',
    allowClear: true,
    cache: true,
    data: data
  });
});

$.get($("#web_url").val() + 'api/getOptEmpGradeGol')
.done(function(data){
  $("#iGolonganNew").select2({
    placeholder: '',
    allowClear: true,
    data: data
  });
});

$.get($("#web_url").val() + 'api/getOptEmpWorkStatus')
.done(function(data){
  $("#iStatusKaryawanNew").select2({
    placeholder: '',
    allowClear: true,
    data: data
  });

  $('#iStatusKaryawanNew').select2().on('change', function() {
  	 if(initscript === false) {
      var status = $(this).val();
  	  if(status) {
      	$('#stat_new').val(status);
      	setFieldRule('stat-' + status);
        showLog('stat-' + status);
      }
      showLog('iStatusKaryawanNew');
     }
  }).trigger('change');
});

$.get($("#web_url").val() + 'api/getOptEmpMoProb')
.done(function(data){
  $("#iNextKontrak").select2({
    placeholder: '',
    allowClear: true,
    data: data
  });

  $('#iNextKontrak').select2().on('change', function() {
  	if(initscript === false) {
      $('#iAkhirKontrak').val('');
      $('#iKontrakKe').val('');
      $('#iPrevKontrak').val('');
      setKontrakRules();
      //setFieldRule('setKontrakRules');
      cekTanggalLahir(2);
      showLog('nextkontrak add');
    }
  }).trigger('change');
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

function select2_failed6(id_div)
{
  var elementSelect = $(id_div + ' > select');
  var elementbox = $(id_div+' > span > span > span');
  if(elementSelect.val() == null){
    var messages = $(id_div).find('ul');
    messages.addClass('hide');
    messages.remove();
    $(id_div).after(message);
    elementbox.css('background-color', '#f2dede');
  } else {
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
        var messages = $(this).parent().parent().find('ul');
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

//button
$('#submitBtn').click(function() {
    $('#formPdm').parsley().validate("first");
    validate = true;

    select2_failed6('#bloodhound');
    select2_failed5('#box-status');
    select2_failed5('#box-nextkon');
    select2_failed('#box-jnsprbhn');
    select2_failed4('#box-golongan');
    select2_failed('#iNextKontrak');

    if ($('#formPdm').parsley().isValid("first")) {
      $('#formPdm').parsley().destroy();
      $('#cSubmitNikSap').text($('#iNikSap').val());
      $('#cSubmitDocType').text($('#iDocType').val());
      $('#cSubmitNama').text($('#iNama').val());
      $('#cSubmitName').val($('#iNama').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cSubmitKeterangan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cSubmitKeterangan').text('PCN Nama: ' + $('#iNama').val());
      //$('#text_keterangan').text($('#cSubmitKeterangan').val());
      showLog('valid');
      $('#modal-confirmation').modal({backdrop: 'static', keyboard: false});
    } else {
      showLog('not valid');
    }
});
//create form
$('#submit').click(function() {
  $('.select2').prop('disabled', false);
  $('.select2_change').prop('disabled', false);
  $('.input').prop('disabled', false);
  $('.textarea').prop('disabled', false);
  $(".select2 option").removeAttr('disabled');
  $(this).prop('disabled', true);
  $('#closebtn').prop('disabled', true);
  $('#formPdm').submit();
});


var dob = '';
function getDataEmp(source) {
    if(source == 'nas') var nik = $.trim($('#iNikNasional').val());
    else var nik = $.trim($('#iNikSap').val());
	
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
          	showLog(0);
          } else {
            showLog(json);
            $('#iNama').val(json[0].employee_name);
            $('#iTanggalMasukKerja').val(json[0].join_date);
            $('#iTanggalLahir').val(json[0].dob);
            $('#yob').val(json[0].age_year);
            $('#mob').val(json[0].age_month);
            $('#dob').val(json[0].age_day); //iTanggalLahir,
            $('#iUmur').val(json[0].age);

            switch (json[0].pss) {
              case '7':
                $('input[name=iSuratTeguran]').filter('[value="7"]').iCheck('check');
              break;
              case '8':
                $('input[name=iSuratTeguran]').filter('[value="8"]').iCheck('check');
              break;
              case '9':
                $('input[name=iSuratTeguran]').filter('[value="9"]').iCheck('check');
              break;
              case '10':
                $('input[name=iSuratTeguran]').filter('[value="10"]').iCheck('check');
              break;
              default:
                $('input[name=iSuratTeguran]').filter('[value=""]').iCheck('check');
            }

            if (json[0].pss > "") $("#iMasaBerlaku").val(moment(json[0].eff_date_pss).format('DD-MMM-YYYY'));
           
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
          
            $('#ba_code').val(json[0].werks);
            //$('#iStatusKaryawanNew').select2().val(json[0].STATUS).trigger("change");
            $('#iAkhirKontrak').val(json[0].expire_date_contract);
            $('#akhkont').val(json[0].expire_date_contract);
            $('#iKontrakKe').val(json[0].contract_to);
            $('#kontrakke').val(json[0].contract_to);
            $('#iPrevKontrak').val(json[0].period_probation);
            $('#prevkon').val(json[0].period_probation);
            $('#spk_sk_old').val(json[0].spk_sk);
            $("#comp_code_old").val(json[0].comp_code);
          
            $('#iPerusahaanOld').val(json[0].comp_name);
            $('#iBisnisAreaOld').val(json[0].werks_name);
            $('#iJabatanOld').val(json[0].job_name);
            $('#iGolonganOld').val(json[0].gol_name);
            $('#iStatusKaryawanOld').val(json[0].status_name);
          
            //$('#iPerusahaanNew').select2().val(json[0].comp_code).trigger("change");
            //$('#iJabatanNew').select2().val(json[0].job_code).trigger("change");
            //if (json[0].golongan) $('#iGolonganNew').select2().val(json[0].golongan).trigger("change");
          
            //cek mandatory data
            sessionStorage.setItem("dob", json[0].dob);
            sessionStorage.setItem("no_ktp", json[0].no_ktp);
            sessionStorage.setItem("no_kk", json[0].no_kk);
            sessionStorage.setItem("spk_sk", json[0].spk_sk);
            sessionStorage.setItem("entry_date", json[0].entry_date);
            sessionStorage.setItem("bpjs_ketenagakerjaan", json[0].bpjs_ketenagakerjaan);
            sessionStorage.setItem("bpjs_kesehatan", json[0].bpjs_kesehatan);


            sessionStorage.setItem("prevkon", $('#iPrevKontrak').val());
            sessionStorage.setItem("akhkont", $('#iAkhirKontrak').val());
            sessionStorage.setItem("kontrke", $('#iKontrakKe').val());
            sessionStorage.setItem("nextkon", $('#iNextKontrak').val());


            $('#ba_code_old').val(json[0].werks);
            $('#job_code_old').val(json[0].job_code);
            $('#job_type_old').val(json[0].golongan);
            $('#emp_status_old').val(json[0].status);
          
            runLovPtK();
          
          	$("#iNomorPtk").val(null).trigger('change.select2');
          	$("#iJenisPerubahan").val(null).trigger('change.select2');
          
          	//resetToOldStatus();

            $('#sisaKontrak').val(sisaKontrak());
            console.log(sisaKontrak());
            //call all function
          	setFieldRule('getDataEmp');
          }
        }
      });

      $.ajax({
        url : $("#web_url").val() + 'api/getEmpProductivity',
        type : 'GET',
        async: true,
        cache: true,
        delay: 250,
        data : {
          'nik': nik,
        },
        dataType : 'JSON',
        success : function(json) {
          if(json !== 0) {
            //showLog(json);
            var json_sorted = sortJSON(json,'BULAN',true);
            for (i=0; i < json_sorted.length; i++) {
              $('.tty'+[i]).val(Math.round(json_sorted[i].KEHADIRAN * 100) / 100);
              $('.ttp'+[i]).val(Math.round(json_sorted[i].PRODUCTIVITY * 100) / 100);
            }
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // alert(xhr.statusText);
            // alert(xhr.responseText);
            // alert(xhr.status);
            // alert(thrownError);
            if(xhr.status == 401){
              console.log('error'+xhr.status);
            }
        }

      });
    }

	showLog('getDataEmp');
}

function getCopyNik(nik){
  var inputhidden = $('#cpNIk').val(nik);
  
  $(document).ready(function () {
      new Clipboard('#btnCopy', {
          text: function (trigger) {
                return inputhidden.val();
           }
      });
  });

}

function getFormatedDate(i) {
  var firstDay = new Date(dates.getFullYear(), dates.getMonth()+i, 1);
  var formatedDate = '0' + firstDay.getDate() + '-' +  (firstDay.toLocaleString("en-us", { month: "short" })) + '-' + firstDay.getFullYear();
  return formatedDate;
}

function resetDataProfucktivity() {
  $('.tty0').val(0);
  $('.tty1').val(0);
  $('.tty2').val(0);
  $('.ttp1').val(0);
  $('.ttp2').val(0);
  $('.ttp3').val(0);

  console.log('reset data pendukung')
}

function resetToOldStatus() {
  $('#ba_code').val($("#ba_code_old").val());
  $('#iPerusahaanNew').select2().val($("#comp_code_old").val()).trigger("change");
  $('#iJabatanNew').select2().val($("#job_code_old").val()).trigger("change");
  if($("#job_type_old").val()) $('#iGolonganNew').select2().val($("#job_type_old").val()).trigger("change");
  $("#iStatusKaryawanNew").val(null).trigger('change.select2');
  $("#stat_new").val(null);
  $('#formPdm').parsley().reset();
  showLog('reset-to-old-status');     	
}

function sortJSON(data, key, asc) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (asc === true ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        else { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function setKontrakRules() {
	var jenispe    = $("#iJenisPerubahan").val();
	var statold	   = $("#emp_status_old").val();
	var statnew	   = $("#iStatusKaryawanNew").val();
	var akhkont    = $('#iAkhirKontrak').val();
	var prevkon	   = $("#iPrevKontrak").val();
	var kontrke	   = $("#iKontrakKe").val();
	var nextkon    = $('#iNextKontrak').val();
	var tgleff     = $('#iTanggalEfektifBerlaku').val();
	var adaptk     = $("#iNomorPtk").val();
	var sisa       = sisaKontrak();
	var result     = false;
	//cek lintas baOld <> baNew
	var sto_prevkon = sessionStorage.getItem("prevkon");
	var sto_akhkont = sessionStorage.getItem("akhkont");
	var sto_kontrke = sessionStorage.getItem("kontrke");
	var werks_old   = $('#ba_code_old').val();
	var ptk_werks   = sessionStorage.getItem('ptk_werks');

  		if(nextkon && tgleff) {
  			if(sto_akhkont) var setdate = sto_akhkont; 
  			else var setdate = tgleff;

  			//var parsedate = new Date(Date.parse(setdate.substr(3,3)+" "+setdate.substr(0,2)+"," +setdate.substr(7,4)));
  			//var firstday = new Date(parsedate.getFullYear(), parsedate.getMonth()+parseInt(nextkon), 1);
  			//var formateddate = firstday.getDate() + '-' +  (firstday.toLocaleString("en-us", { month: "short" })) + '-' + firstday.getFullYear();

        if(statold == 'KK' && statnew == 'KP') {
          sto_kontrke = 1;
          sto_prevkon = nextkon;
          if(jenispe == 'CT02') setdate = tgleff;
        } else if(statold == 'KL' && statnew == 'KK') {
          sto_kontrke = 1;
          sto_prevkon = nextkon;
        } else if(statold == 'KL' && statnew == 'KP') {
          sto_kontrke = 1;
          sto_prevkon = nextkon;
        } else if((statold == 'KK' && statnew == 'KK') || (statold == 'KP' && statnew == 'KP')) {
          if(adaptk) {
            sto_kontrke = 1;
            sto_prevkon = nextkon;
          } else {
            sto_kontrke = parseInt(sto_kontrke || 0) + 1;
            sto_prevkon = parseInt(sto_prevkon || 0) + parseInt(nextkon || 0);
          }
          if(jenispe == 'CT02') setdate = tgleff;
        } else {
          sto_kontrke = parseInt(sto_kontrke || 0) + 1;
        }

        var formDate      = new Date(Date.parse(setdate.substr(3,3)+" "+setdate.substr(0,2)+"," +setdate.substr(7,4)));
        
  			//spit all outs
        if(jenispe == 'CT02') var d1 = moment(formDate).add(nextkon, 'months').subtract(1, 'days').format('DD-MMM-YYYY');
        if(jenispe == 'CT01') var d1 = moment(formDate).add(nextkon, 'months').format('DD-MMM-YYYY');

        $('#iAkhirKontrak').val(d1);

  			$('#iKontrakKe').val(sto_kontrke);
  			$('#iPrevKontrak').val(sto_prevkon);
  		}
  		showLog('setKontrakRules');
}

function funcRule_removeNkMandatory(){
  $('#iNextKontrak').prop('required',false);
  $('#iNextKontrak').parent().removeAttr('id');

  //remove ul
  var elementbox = $('#iNextKontrak').parent().find('span').find('.select2-selection');
  var messages = $('#iNextKontrak').parent().find('ul');
  messages.remove();
  elementbox.css('background-color', '#eee');

  console.log('remove mandatory')
}

function funcRule_setNkMandatory(){
  $('#iNextKontrak').prop('required',true);
  $('#iNextKontrak').parent().attr('id', 'box-nextkon');
  
}

function funcRule_resetProbationInfo() {
	$('#iAkhirKontrak').val(sessionStorage.getItem("akhkont"));
	$("#iPrevKontrak").val(sessionStorage.getItem("prevkon"));
	$("#iKontrakKe").val(sessionStorage.getItem("kontrke"));
	$("#iNextKontrak").val(sessionStorage.getItem("prevkon")).trigger('change.select2');
}

function funcRule_resetProbationInfoStatus() {
	$('#iAkhirKontrak').val(sessionStorage.getItem("akhkont"));
	$("#iPrevKontrak").val(sessionStorage.getItem("prevkon"));
	$("#iKontrakKe").val(sessionStorage.getItem("kontrke"));
	$("#iNextKontrak").val(null).trigger('change.select2');

  //cekTanggalLahir(1);
  funcRule_setNkMandatory();
}

function funcRule_resetProbation() {
  $('#iAkhirKontrak').val('');
  $('#iKontrakKe').val('');
  $('#iPrevKontrak').val('');
  $('#iNextKontrak').val(null).trigger('change.select2');
  showLog('reset probation');

  //cekTanggalLahir(1);
  funcRule_removeNkMandatory();
}

function funcRule_cekAkhPrev() {
  var kontrke = $("#iKontrakKe").val();
  var prevkon = $("#iPrevKontrak").val();

  if(kontrke == 1) {
       if(prevkon >= 18) {
          $("#iNextKontrak option").attr('disabled','disabled');
          $("#iNextKontrak option[value=1]").removeAttr('disabled');
          $("#iNextKontrak option[value=2]").removeAttr('disabled');
          $("#iNextKontrak option[value=3]").removeAttr('disabled');
          $("#iNextKontrak option[value=4]").removeAttr('disabled');
          $("#iNextKontrak option[value=5]").removeAttr('disabled');
          $("#iNextKontrak option[value=6]").removeAttr('disabled');
          $("#iNextKontrak option[value=12]").removeAttr('disabled');
        } else if(prevkon <= 12){
          $("#iNextKontrak option").removeAttr('disabled');
          $("#iNextKontrak option[value=18]").attr('disabled','disabled');
          $("#iNextKontrak option[value=24]").attr('disabled','disabled');
        } else {
          $("#iNextKontrak option").removeAttr('disabled');
         }
        $('#iNextKontrak').prop('required',true);
        $('.nextkongroup').attr('id', 'box-nextkon');
    } else if(kontrke == 2) {
       $("#iNextKontrak option").attr('disabled','disabled');
       $("#iNextKontrak option[value=3]").removeAttr('disabled');
       $("#iNextKontrak option[value=6]").removeAttr('disabled');
       $("#iNextKontrak option[value=12]").removeAttr('disabled');
       $('#iNextKontrak').prop('required',true);
       $('.nextkongroup').attr('id', 'box-nextkon');
    } else if(kontrke > 3 || prevkon == 24) {
       $("#iNextKontrak option").attr('disabled', true);
       $('#iNextKontrak').prop('required',false);
       $('.nextkongroup').removeAttr('id');
    } else if(!kontrke && !prevkon) {
       $("#iNextKontrak option").attr('disabled','disabled');
       $('#kontrakModalMsg').html('Nilai "Periode Kontrak (Bulan)" dan "Kontrak Ke" kosong. Pastikan nilai tersebut terisi dengan benar.');
       showModal();
       $('#hddnTutup').val('2');
    }
}

function funcRule_AfterSetnik() {
  //if(cekDataSap() != 1) {
    //cekTanggalLahir(1);
    cekExpiredDate(1);
    sisaKontrak();
    funcRule_resetProbationInfo();
    cekkontrakke(1);
    $('#iJenisPerubahan').prop('required', true);
    $('#iGolonganNew').parent().attr('id', 'box-golongan');
    $('#iStatusKaryawanNew').parent().attr('id', 'box-status');
  //}
}

function funcRule_ResetKP() {
  funcRule_setKontrak1();
  funcRule_resetProbationInfo();
}

function funcRule_ResetKL() {
  funcRule_resetProbationInfo();
  //funcRule_setKontrak4();
}

function cekDataSap(){
  var dob = sessionStorage.getItem("dob");
  var no_ktp = sessionStorage.getItem("no_ktp");
  var no_kk = sessionStorage.getItem("no_kk");
  var formDate = new Date(Date.parse(dob.substr(3,3)+" "+dob.substr(0,2)+"," +dob.substr(7,4)));
  var xxx = moment(formDate).format('DD-MMM-YYYY');

  var msgDob = (dob == '01-Jan-1900') ? 'Tanggal Lahir : '+xxx+'<br>' : '';
  var msgKtp = (no_ktp == '9999999999999999') ? 'No KTP : '+no_ktp+'<br>' : '';
  var msgKk = (no_kk == '9999999999999999') ? 'No KK : '+no_kk+'<br>' : '';

  var a = 2;
  if(dob == '01-Jan-00' || no_ktp == '9999999999999999' || no_kk == '9999999999999999' ) {
    $('#kontrakModalMsg').html('Data karyawan tidak valid. Mohon dilakukan perubahan data karyawan berikut:<div style="text-align:left;">'+msgDob+msgKtp+msgKk+'</div>');
    $('#hddnTutup').val('1');
    showModal();
    a = 1;
  } 
  showLog('cek data sap');
  return a;

}

function sisaKontrak(){
  var getdate     = $("#getdate").val();
  var formDate    = new Date(getdate);
  var akhkont     = sessionStorage.getItem("akhkont");
  if(akhkont) var akhkontDate    = new Date(Date.parse(akhkont.substr(3,3)+" "+akhkont.substr(0,2)+"," +akhkont.substr(7,4)));

  if(akhkont) {
  	var akhkontmt   = moment(akhkontDate);
  	var todayDate   = moment(formDate);
    var sisaKontrak = (akhkontmt ? akhkontmt.diff(todayDate, 'months') : '');
  } else {
  	var sisaKontrak = null;	
  }
  
  $('#sisaKontrak').val(sisaKontrak);
  
  return sisaKontrak;
}

function cekkontrakke(i) {
  var kontrakke = parseInt($('#iKontrakKe').val());
  var prevkont = parseInt($('#iPrevKontrak').val());
  var nextkont = parseInt($('#iNextKontrak').val());

  if(i == 1) {
    if(kontrakke >= 2 ) {//|| (kontrakke == 1 && prevkont == 24) ) {
      $('#kontrakModalMsg').html('Karyawan berikut sudah menjalani '+kontrakke+' kali ('+prevkont+' bulan) masa kontrak, segera lakukan perubahan PCN.');
      //$('#kontrakModal').modal("show");
      showModal();
      $('#hddnTutup').val('2');
      $("#iJenisPerubahan option").prop('disabled' , true);
      $("#iJenisPerubahan option[value=CT02]").prop('disabled' , false);
      showLog('kontrakke');
    }
  }
}

function cekExpiredDate(i) {
  var getdate     = $("#getdate").val();
  var mths        = 12;
  var today_month = moment(getdate).format('DD-MMM-YYYY');
  var sto_akhkont = moment(sessionStorage.getItem("akhkont")).format('DD-MMM-YYYY');
  var plusMonth   = moment(getdate).subtract(mths, 'months').format('DD-MMM-YYYY');
  var textMsg     = '';

  if(moment(sto_akhkont).isBefore(plusMonth)) {
    textMsg = $('#kontrakModalMsg').html('Masa kontrak karyawan berikut telah lewat sejak tanggal: '+sto_akhkont);
    $('#hddnTutup').val('1');
    showModal();
  }
  if(moment(sto_akhkont).isSame(plusMonth)) {
    textMsg = $('#kontrakModalMsg').html('Masa kontrak karyawan berikut telah lewat '+mths+' bulan dari tanggal: '+sto_akhkont);
    $('#hddnTutup').val('2');
    showModal();
  }
}

function cekTanggalLahir(i) {
  var dtYob           = parseInt($('#yob').val());
  var dtMob           = parseInt($('#mob').val());
  var dtDob           = parseInt($('#dob').val());
  var nkMonth         = parseInt($('#iNextKontrak').val());
  var allowedKontrak  = 12-dtMob;
  var statnew         = $("#iStatusKaryawanNew").val();

  if (i == 1) { //validasi umur pengajuan PDM
    if(statnew == 'KP' || statnew == 'KT') {
      if(dtYob > 45 && dtDob > 0) {
        $('#kontrakModalMsg').html('Karyawan berikut berusia '+dtYob+' tahun. Batas umur maksimal untuk proses PDM adalah 45 tahun');
        $('#hddnTutup').val('2');
        showModal();
      }
    }
  } else if(i == 2) { //validasi umur perpanjangan kontrak
    if(dtYob === 44) {
      if(dtMob > 6 && dtMob + nkMonth > 12) {
        $('#kontrakModalMsg').html('Karyawan berikut berusia '+dtYob+' tahun '+dtMob+' bulan. Kontrak selanjutnya harus '+allowedKontrak+' bulan.');
        $('#hddnTutup').val('2');
        showModal();
      }
    }
  }
  showLog('cek tanggal lahir');
}

function funcRule_BirthCheck() { //divalidasi
  var dtYob           = parseInt($('#yob').val());
  var dtDob           = parseInt($('#dob').val());
  if(dtYob > 45 && dtDob > 0) {
        $('#kontrakModalMsg').html('Karyawan berikut berusia '+dtYob+' tahun. Batas umur maksimal untuk proses PDM adalah 45 tahun');
        $('#hddnTutup').val('1');
        showModal();
  }
}

function funcRule_Testinggg() {
  alert('test tertriger');
}



