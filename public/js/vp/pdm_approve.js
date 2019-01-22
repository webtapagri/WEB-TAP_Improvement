var val = $("#iNomorPtk").val();
var text = 'Tidak Ada PTK';
$('#iNomorPtk').find('option').remove();
if(val != '') $('#iNomorPtk').append($('<option>', {value:val, text:val}));
else $('#iNomorPtk').append($('<option>', {value:val, text:text}));
$("#iNomorPtk option[value='"+val+"']").attr("selected","selected");
$("#iNomorPtk").select2().val(val).change();


/*

$.get($("#web_url").val() + 'api/getOptEmpChangeType')
.done(function(data){
  $("#iJenisPerubahan").select2({
    cache: true,
    data: data
  }); 

  $("#iJenisPerubahan").val($("#iJenisPerubahan").val()).change();
});

$.get($("#web_url").val() + 'api/getOptCompany')
.done(function(data){
  $("#iPerusahaanNew").select2({
    cache: true,
    data : data
  });

  $("#iPerusahaanNew").val($("#iPerusahaanNew").val()).change();

  $('#iPerusahaanNew').select2().on('change', function() {
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
                		data : data
            		});
            
            		$("#iBisnisAreaNew").val($("#iBisnisAreaNew").val()).change();
            		if($("#iBisnisAreaNew").val()) {
            			$("#ba_code").val($("#iBisnisAreaNew").val()).change();
            		} else {
            			if($("#ba_code").val()) {
            				$('#iBisnisAreaNew').select2().val($("#ba_code").val()).trigger("change");
            				//$("#ba_code").val('').change();
            			}	
            		}
            	});
            }
        }
      }
    }).trigger('change');
});

$.get($("#web_url").val() + 'api/getOptJobCode')
.done(function(data){
  $("#iJabatanNew").select2({
    cache: true,
    data: data
  });
  $("#iJabatanNew").val($("#iJabatanNew").val()).change();
});

$.get($("#web_url").val() + 'api/getOptEmpGradeGol')
.done(function(data){
  $("#iGolonganNew").select2({
    allowClear: true,
    data: data
  });
  $("#iGolonganNew").val($("#iGolonganNew").val()).change();
});


$.get($("#web_url").val() + 'api/getOptEmpWorkStatus')
.done(function(data){
  $("#iStatusKaryawanNew").select2({
    cache: true,
    data: data
  });
  $("#iStatusKaryawanNew").val($("#iStatusKaryawanNew").val()).change();
});

$.get($("#web_url").val() + 'api/getOptEmpMoProb')
.done(function(data){
  $("#iNextKontrak").select2({
    data: data
  });
  $("#iNextKontrak").val($("#iNextKontrak").val()).change();
});
*/
//button
$('#submitBtn').click(function() {
    $('#formPdm').parsley().validate("first");
    validate = true;

    if ($('#formPdm').parsley().isValid("first")) {
      $('#formPdm').parsley().destroy();
      $('#cSubmitNikSap').text($('#iNikSap').val());
      $('#cSubmitDocType').text($('#iDocType').val());
      $('#cSubmitNama').text($('#iNama').val());
      $('#cSubmitName').val($('#iNama').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cSubmitKeterangan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cSubmitKeterangan').text('PCN Nama: ' + $('#iNama').val());
      showLog('valid');
      $('#modal-confirmation').modal({backdrop: 'static', keyboard: false});
    } else {
      showLog('not valid');
    }
});

$('#sendBtn').click(function() {
  $('#cSendNikSap').text($('#iNikSap').val());
     $('#cSendDocType').text($('#iDocType').val());
     $('#cSendAreaCode').val($('#ba_code_old').val());
     $('#cSendNama').text($('#iNama').val());
     $('#cSendName').val($('#iNama').val());
     $('#iSendCatatan').val($('#iCatatan').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cSendCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cSendCatatan').text('PCN Nama: ' + $('#iNama').val());
});

$('#cSendSubmit').click(function(){
    $(this).prop('disabled', true);
    $('#closebtn').prop('disabled', true);
    $('#formPdmApproveSend').submit();
});
 
// $.get($("#web_url").val() + 'api/getAskPic', { bpm_code: $('#bpm_code').val() } )
//   .done(function(data){
//     $("#cAskTanyaKe").select2({
//       placeholder: '',
//       allowClear: true,
//       data: data
//     });
//     $("#cAskTanyaKe").val('').change();
//   });

$('#askBtn').click(function() {
     $('#cAskDocType').text($('#iDocType').val());
     $('#cAskNikNasional').text($('#iNikNasional').val());
     $('#cAskNikSap').text($('#iNikSap').val());
     $('#cAskAreaCode').val($('#ba_code_old').val());
     $('#cAskNama').text($('#iNama').val());
     $('#cAskName').val($('#iNama').val());
     $('#iAskCatatan').val($('#iCatatan').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cAskCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cAskCatatan').text('PCN Nama: ' + $('#iNama').val());

    $.get($("#web_url").val() + 'api/getAskPic', { bpm_code: $('#bpm_code').val() } )
    .done(function(data){
      $("#cAskTanyaKe").select2({
        placeholder: '',
        allowClear: true,
        data: data
      });
      $("#cAskTanyaKe").val('').change();
    });
});

$('#cAskSubmit').click(function(){
  $('#formPdmApproveAsk').parsley().validate("first");
    if ($('#formPdmApproveAsk').parsley().isValid("first")) {
      $('#formPdmApproveAsk').parsley().destroy();
      $(this).prop('disabled', true);
      $('#closebtn').prop('disabled', true);
      showLog('valid');
      $('#formPdmApproveAsk').submit();
    } else {
      showLog('not valid');
    }
});

$('#agreeBtn').click(function() {
     $('#cAgreeDocType').text($('#iDocType').val());
     $('#cAgreeNikSap').text($('#iNikSap').val());
     $('#cAgreeAreaCode').val($('#area_code_outstanding').val());
     $('#cAgreeNama').text($('#iNama').val());
     $('#cAgreeName').val($('#iNama').val());
     $('#iAgreeCatatan').val($('#iCatatan').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cAgreeCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cAgreeCatatan').text('PCN Nama: ' + $('#iNama').val());

});
$('#cAgreeSubmit').click(function(){
    $(this).prop('disabled', true);
    $('#closeAgree').prop('disabled', true);
    $('#formPdmApproveAgree').submit();
});

$(document).ready(function(){
  //e.preventDefault();
  $('#rejectBtn').mousedown(function(){
    $('#iCatatan').attr('required', true);
  });

  $('#rejectBtn').click(function() {
  	$('#formPdm').parsley().validate("first");
      validate = true;

      if ($('#formPdm').parsley().isValid("first")) {
      
  		$('#cRejectDocType').text($('#iDocType').val());
       	$('#cRejectNikSap').text($('#iNikSap').val());
       	//$('#cRejectAreaCode').val($('#ba_code_old').val());
       	$('#cRejectAreaCode').val($('#area_code_outstanding').val());
       	$('#cRejectNama').text($('#iNama').val());
       	$('#cRejectName').val($('#iNama').val());
       	$('#iRejectCatatan').val($('#iCatatan').val());
        $('#cRejectCatatan').text($('#iCatatan').val());
        	// if($('#iJenisPerubahan').val() == 'CT01')  $('#cRejectCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
        	// else  $('#cRejectCatatan').text('PCN Nama: ' + $('#iNama').val());
        showLog('valid');
        $('#modal-rejection').modal({backdrop: 'static', keyboard: false});
      } else {
      	showLog('not valid');
      }
  });
});

$('#cRejectSubmit').click(function(){
  $('#formPdmApproveReject').parsley().validate("first");
    if ($('#formPdmApproveReject').parsley().isValid("first")) {
      $('#formPdmApproveReject').parsley().destroy();
      showLog('valid');
      $(this).prop('disabled', true);
      $('#closeRjct').prop('disabled', true);
      $('#eRjctClose').prop('disabled', true);
      $('#formPdmApproveReject').submit();
    } else {
      showLog('not valid');
    }
});

$('#answerBtn').click(function(){
     $('#iCreatorProcCode').val('SDP');
     $('#iCreatorWsdlStatus').val('J');
     $('#iCreatorWerks').val($('#ba_code').val());
     $('#cCreatorDocType').text($('#iDocType').val());
     $('#cCreatorNikSap').text($('#iNikSap').val());
     $('#cCreatorAreaCode').val($('#ba_code_old').val());
     $('#cCreatorNama').text($('#iNama').val());
     $('#cCreatorName').val($('#iNama').val());
     $('#iCreatorCatatan').val($('#iCatatan').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cCreatorCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cCreatorCatatan').text('PCN Nama: ' + $('#iNama').val());
      

});

$(document).ready(function(){
  $('#cancelBtn').mousedown(function(){
      $('#iCatatan').attr('required', true);
    });
  $('#cancelBtn').click(function(){
  	$('#formPdm').parsley().validate("first");
    validate = true;

    if ($('#formPdm').parsley().isValid("first")) {
      $('#iCreatorProcCode').val('SDP');
      $('#iCreatorWsdlStatus').val('C');
      $('#iCreatorWerks').val($('#ba_code').val());
      $('#cCreatorDocType').text($('#iDocType').val());
      $('#cCreatorNikSap').text($('#iNikSap').val());
      $('#cCreatorAreaCode').val($('#ba_code_old').val());
      $('#cCreatorNama').text($('#iNama').val());
      $('#cCreatorName').val($('#iNama').val());
      $('#iCreatorCatatan').val($('#iCatatan').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cCreatorCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cCreatorCatatan').text('PCN Nama: ' + $('#iNama').val());
      showLog('valid');
      $('#modal-confirm-creator').modal({backdrop: 'static', keyboard: false});
    } else {
      showLog('not valid');
    }
  });
});
$(document).ready(function(){    
  /*$('#finishBtn').mousedown(function(){
      $('#iCatatan').attr('required', true);
    });*/
  $('#finishBtn').click(function(){
    $('#formPdm').parsley().validate("first");
    validate = true;

    if ($('#formPdm').parsley().isValid("first")) {
      $('#iCreatorProcCode').val('PSL');
      $('#iCreatorWsdlStatus').val('');
      $('#cCreatorDocType').text($('#iDocType').val());
      $('#cCreatorNikSap').text($('#iNikSap').val());
      $('#cCreatorAreaCode').val($('#ba_code_old').val());
      $('#cCreatorNama').text($('#iNama').val());
      $('#cCreatorName').val($('#iNama').val());
      $('#iCreatorCatatan').val($('#iCatatan').val());
      if($('#iJenisPerubahan').val() == 'CT01')  $('#cCreatorCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
      else  $('#cCreatorCatatan').text('PCN Nama: ' + $('#iNama').val());

      showLog('valid');
      $('#modal-confirm-creator').modal({backdrop: 'static', keyboard: false});
    } else {
      showLog('not valid');
    }
  });
});
$('#cCreatorSubmit').click(function(){
  $(this).prop('disabled', true);
  $('#closeCrSubmit').prop('disabled', true);
  $('#eCmplClose').prop('disabled', true);
  $('#eRsyClose').prop('disabled', true);
  $('#formPdmConfirmCreator').submit();
});

//re-sync
$('#resyncBtn').click(function(){
  $('#iCreatorProcCode').val('');
  $('#iCreatorWsdlStatus').val('');
  $('#cCreatorDocType').text($('#iDocType').val());
  $('#cCreatorNikSap').text($('#iNikSap').val());
  $('#cCreatorAreaCode').val($('#ba_code_old').val());
  $('#cCreatorNama').text($('#iNama').val());
  $('#cCreatorName').val($('#iNama').val());
  $('#iCreatorCatatan').val($('#iCatatan').val());
  if($('#iJenisPerubahan').val() == 'CT01')  $('#cCreatorCatatan').text('Perpanjangan Kontrak Karyawan Nama: ' + $('#iNama').val());
  else  $('#cCreatorCatatan').text('PCN Nama: ' + $('#iNama').val());
});
$('#cCreatorSubmit').click(function(){
  $(this).prop('disabled', true);
  $('#closeCrSubmit').prop('disabled', true);
  $('#formPdmConfirmCreator').submit();
});

/*$('#cCreatorSubmit').click(function(){
    var validate = validateForm();
    if(validate == true) {
        $('#formPdmConfirmCreator').submit();
      } else {
        $('#modal-confirm-creator').modal('hide');
      }
});
*/
//create form
$('#submit').click(function() {
  $('.select2').prop('disabled', false);
  $('.input').prop('disabled', false);
  $('.textarea').prop('disabled', false);
  $(".select2 option").removeAttr('disabled');
  var validate = validateForm();
  if(validate == true) {
      $(this).prop('disabled', true);
      $('#closebtn').prop('disabled', true);
      $('#formPdm').submit();
    } else {
      $('#modal-confirmation').modal('hide');
    }
});

function funcRule_enableCatatan() {
  var form_type = $("#form_type").val();
  var rulebtn = $("#rulebtn").val();
  var ftype = $("#ftype").val();
  var rsp = $("#rsp").val();
  var stj = $("#stj").val();
	
/*
  if(form_type == 'approve' && ftype == 'hs' && rulebtn == 'none') {
    if(rsp == 3) {
      $('#iCatatan').attr('disabled', 'disabled');
      $('#iCatatan').removeAttr('required');       
    }    
  } 
*/
  if(form_type == 'approve' && ftype == 'hs') {
     if(rulebtn == 'creator' && rsp == 1 && stj == '') {
     } else {
      	$('#iCatatan').attr('disabled', 'disabled');
      	$('#iCatatan').removeAttr('required');       
     }    
  } 

}

var key = btoa($("#iDocType").val());

$("#history-table").DataTable({
  "scrollX"   : true,
  processing  : true,
  lengthMenu: [25, 50, 100, 'ALL'],
  serverSide  : true,
  "aaSorting": [],
  ajax        : {
    url : $("#urlhisdoc").val(),
    data: {"doc_code" : key}
  },
  columns     : [
    { data: 'num' },
    { data: 'nama' },
    { data: 'status_doc' },
    { data: 'nama' },
    { data: 'update_date' },
    { data: 'notes' },
    { data: 'seq' }
  ],
  "columnDefs": [
        {
            sClass   : "hide_column",
            "targets"   : [ 6 ],
            "visible": false,
            "searchable": false
        },
        {
            sClass   : "hide_column",
            "targets"   : [ 3 ],
            "visible": false,
            "searchable": false
        }
  ]
});
//notes : disable in historical approval
//$('#iCatatan').prop("disabled",true);



$( document ).ready(function() {
    var stj = $("#stj").val();
    var rsp = $("#rsp").val();
    if(stj) {
      if(rsp == 1 || rsp == 2) {
        window.setTimeout(function(){ 
            //$('#kontrakModal').modal({backdrop: 'static', keyboard: false});
            showModal();
            $('#hddnTutup').val('2');
        }, 3000)
      } else {
        $('#kontrakModal').modal("hide");
      }
    }
});

$( document ).ready(function() {

});