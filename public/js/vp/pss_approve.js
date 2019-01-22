//get surat panggilan
getSuratPanggilan('sap');

$.get($("#web_url").val() + 'api/getOptTrasType', { trans_code: 'PSSSP-01' })
.done(function(data){
	$("#iJenisSuratSanksi").select2({
		placeholder: 'Pilih Jenis Surat Sanksi',
		allowClear: true,
		data: data
	});
	$("#iJenisSuratSanksi").val($("#trans_type_id").val()).change();
	$("#lJudulSurat").text($("#trans_type_name").val());
});

//get history table
$("#history-table").DataTable({
  "scrollX"   : true,
  processing  : true,
  lengthMenu: [25, 50, 100, 'ALL'],
  serverSide  : true,
  "deferRender": true,
  "bSort": false,
  "aaSorting": [],
  ajax        : {
    url : $("#urlhisdoc").val(),
    data: {"doc_code" : btoa($("#iNoSurat").val())} 
  },
  columns     : [
    { data: 'num' },
    { data: 'nama' },
    { data: 'status_doc' },
    //{ data: 'nama' },
    { data: 'update_date' },
    { data: 'notes' },
    { data: 'seq' }
  ],
  "columnDefs": [
        {
            sClass   : "hide_column",
            "targets"   : [ 5 ],
            "visible": false,
            "searchable": false
        },
        {
            sClass   : "hide_column",
            "targets"   : [ 3 ],
            "searchable": false
        },
        {
            "targets"   : [ 4 ],
  			"render": function ( data, type, row ) {
            	if (data == null) {
            		return data;
            	} else {
  					var map = {
    					'&': '&amp;',
    					'<': '&lt;',
    					'>': '&gt;',
    					'"': '&quot;',
    					"'": '&#039;'
  					};
  					return  data.replace(/[&<>"']/g, function(m) { return map[m]; });
            	}
  			},
        },
  ]
});


//button kehed
$('#sendBtn').click(function() {
     $('#cSendNikSap').text($('#iNikSap').val());
     $('#cSendNikNas').text($('#iNikNasional').val());
     $('#cSendDocType').text($('#iNoSurat').val());
     $('#cSendAreaCode').val($('#ba_code_old').val());
     $('#cSendNama').text($('#iNama').val());
     $('#cSendName').val($('#iNama').val());
     $('#cSendJabatan').text($('#iJabatan').val());
     $('#iSendCatatan').val($('#iCatatan').val());
     $('.btn-close').prop('disabled', false);
});

$('#cSendSubmit').click(function(){
     $('#formPssApproveSend').submit();
     $('#cSendSubmit').prop('disabled', true);
     $('.btn-close').prop('disabled', true);
});

$('#askBtn').click(function() {
     $('#cAskDocType').text($('#iNoSurat').val());
     $('#cAskNikNas').text($('#iNikNasional').val());
     $('#cAskNikSap').text($('#iNikSap').val());
     $('#cAskAreaCode').val($('#ba_code_old').val());
     $('#cAskNama').text($('#iNama').val());
     $('#cAskName').val($('#iNama').val());
     $('#cAskJabatan').text($('#iJabatan').val());
     $('#iAskCatatan').val($('#iCatatan').val());
     $('.btn-close').prop('disabled', false);

	$.get($("#web_url").val() + 'api/getAskPic', { bpm_code: $("#bpm_code").val() } )
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
  $('#formPssApproveAsk').parsley().validate("first");
    if ($('#formPssApproveAsk').parsley().isValid("first")) {
      $('#formPssApproveAsk').parsley().destroy();
      console.log('valid');
      $('#formPssApproveAsk').submit();
      $('#cAskSubmit').prop('disabled', true);
      $('.btn-close').prop('disabled', true);
    } else {
      console.log('not valid');
    }
});
/*
$(document).ready(function(){
  //e.preventDefault();
  $('#agreeBtn').mousedown(function(){
    $('#iCatatan').attr('required', true);
  });

  $('#agreeBtn').click(function() {
    $('#formPss').parsley().validate("first");
      validate = true;

      if ($('#formPss').parsley().isValid("first")) {
      
      $('#cAgreeDocType').text($('#iNoSurat').val());
       $('#cAgreeNikSap').text($('#iNikSap').val());
       $('#cAgreeNikNas').text($('#iNikNasional').val());
       $('#cAgreeAreaCode').val($('#HC_AREA_CODE').val());
       $('#cAgreeNama').text($('#iNama').val());
       $('#cAgreeName').val($('#iNama').val());
       $('#cAgreeJabatan').text($('#iJabatan').val());
       $('#iAgreeCatatan').val($('#iCatatan').val());
       $('.btn-close').prop('disabled', false);
        showLog('valid');
        $('#modal-agree').modal({backdrop: 'static', keyboard: false});
      } else {
        showLog('not valid');
      }
  });
});*/

$('#agreeBtn').click(function() {
     $('#cAgreeDocType').text($('#iNoSurat').val());
     $('#cAgreeNikSap').text($('#iNikSap').val());
     $('#cAgreeNikNas').text($('#iNikNasional').val());
     $('#cAgreeAreaCode').val($('#HC_AREA_CODE').val());
     $('#cAgreeNama').text($('#iNama').val());
     $('#cAgreeName').val($('#iNama').val());
     $('#cAgreeJabatan').text($('#iJabatan').val());
     $('#iAgreeCatatan').val($('#iCatatan').val());
     $('.btn-close').prop('disabled', false);

});

$('#cAgreeSubmit').click(function(){
    $('#formPssApproveAgree').submit();
    $('#cAgreeSubmit').prop('disabled', true);
    $('.btn-close').prop('disabled', true);
});

$(document).ready(function(){
  //e.preventDefault();
  $('#rejectBtn').mousedown(function(){
    $('#iCatatan').attr('required', true);
  });

  $('#rejectBtn').click(function() {
    $('#formPss').parsley().validate("first");
      validate = true;

      if ($('#formPss').parsley().isValid("first")) {
      
        $('#cRejectDocType').text($('#iNoSurat').val());
        $('#cRejectNikSap').text($('#iNikSap').val());
        $('#cRejectNikNas').text($('#iNikNasional').val());
        //$('#cRejectAreaCode').val($('#ba_code_old').val());
        $('#cRejectAreaCode').val($('#area_code_outstanding').val());
        $('#cRejectNama').text($('#iNama').val());
        $('#cRejectName').val($('#iNama').val());
        $('#cRejectJabatan').text($('#iJabatan').val());
        $('#cRejectCatatan').text($('#iCatatan').val());
        $('#iRejectCatatan').val($('#iCatatan').val());
        showLog('valid');
        $('#modal-rejection').modal({backdrop: 'static', keyboard: false});
      } else {
        showLog('not valid');
      }
  });
});

// $('#rejectBtn').mousedown(function(){
//     $('#iCatatan').attr('required', true);
// });

// $('#rejectBtn').click(function() {
//      $('#cRejectDocType').text($('#iNoSurat').val());
//      $('#cRejectNikSap').text($('#iNikSap').val());
//      //$('#cRejectAreaCode').val($('#ba_code_old').val());
//      $('#cRejectAreaCode').val($('#area_code_outstanding').val());
//      $('#cRejectNama').text($('#iNama').val());
//      $('#cRejectName').val($('#iNama').val());
//      $('#cRejectJabatan').text($('#iJabatan').val());
//      $('#cRejectCatatan').text($('#iCatatan').val());
//      $('.btn-close').prop('disabled', false);
// });

$('#cRejectSubmit').click(function(){
  $('#formPssApproveReject').parsley().validate("first");
    if($('#formPssApproveReject').parsley().isValid("first")) {
      $('#formPssApproveReject').parsley().destroy();
      console.log('valid');
      $('#formPssApproveReject').submit();
      $('#cRejectSubmit').prop('disabled', true);
      $('.btn-close').prop('disabled', true);
    } else {
      console.log('not valid');
    }
});

$('#answerBtn').click(function(){
     $('#iCreatorProcCode').val('SDP');
     $('#iCreatorWsdlStatus').val('J');
     $('#iCreatorWerks').val($('#ba_code').val());
     $('#cCreatorDocType').text($('#iNoSurat').val());
     $('#cCreatorNikNas').text($('#iNikNasional').val());
     $('#cCreatorNikSap').text($('#iNikSap').val());
     $('#cCreatorAreaCode').val($('#ba_code_old').val());
     $('#cCreatorNama').text($('#iNama').val());
     $('#cCreatorName').val($('#iNama').val());
     $('#cCreatorJabatan').text($('#iJabatan').val());
     $('#iCreatorCatatan').val($('#iCatatan').val());
     $('.btn-close').prop('disabled', false);
});

$('#cancelBtn').click(function(){
    $('#formPss').parsley().validate("first");
    validate = true;

  if ($('#formPss').parsley().isValid("first")) {
    $('#iCreatorProcCode').val('SDP');
     $('#iCreatorWsdlStatus').val('C');
     $('#iCreatorWerks').val($('#ba_code').val());
     $('#cCreatorDocType').text($('#iNoSurat').val());
     $('#cCreatorNikNas').text($('#iNikNasional').val());
     $('#cCreatorNikSap').text($('#iNikSap').val());
     $('#cCreatorAreaCode').val($('#ba_code_old').val());
     $('#cCreatorNama').text($('#iNama').val());
     $('#cCreatorName').val($('#iNama').val());
     $('#cCreatorJabatan').text($('#iJabatan').val());
     $('#iCreatorCatatan').val($('#iCatatan').val());
    showLog('valid');
    $('#modal-confirm-creator').modal({backdrop: 'static', keyboard: false});
  } else {
    showLog('not valid');
  }
});

// $('#cancelBtn').click(function(){
//      $('#iCreatorProcCode').val('SDP');
//      $('#iCreatorWsdlStatus').val('C');
//      $('#iCreatorWerks').val($('#ba_code').val());
//      $('#cCreatorDocType').text($('#iNoSurat').val());
//      $('#cCreatorNikSap').text($('#iNikSap').val());
//      $('#cCreatorAreaCode').val($('#ba_code_old').val());
//      $('#cCreatorNama').text($('#iNama').val());
//      $('#cCreatorName').val($('#iNama').val());
//      $('#cCreatorJabatan').text($('#iJabatan').val());
//      $('#iCreatorCatatan').val($('#iCatatan').val());
//      $('.btn-close').prop('disabled', false);
// });
    
//finish
/*    
$('#finishBtn').click(function(){
     $('#iCreatorProcCode').val('PSL');
     $('#iCreatorWsdlStatus').val('');
     $('#cCreatorDocType').text($('#iNoSurat').val());
     $('#cCreatorNikNas').text($('#iNikNasional').val());
     $('#cCreatorNikSap').text($('#iNikSap').val());
     $('#cCreatorAreaCode').val($('#ba_code_old').val());
     $('#cCreatorNama').text($('#iNama').val());
     $('#cCreatorName').val($('#iNama').val());
     $('#cCreatorJabatan').text($('#iJabatan').val());
     $('#iCreatorCatatan').val($('#iCatatan').val());
     $('.btn-close').prop('disabled', false);
});
*/
$(document).ready(function(){    
  /*$('#finishBtn').mousedown(function(){
      $('#iCatatan').attr('required', true);
    });*/
  $('#finishBtn').click(function(){
    $('#formPss').parsley().validate("first");
    validate = true;

    if ($('#formPss').parsley().isValid("first")) {
      $('#iCreatorProcCode').val('PSL');
	     $('#iCreatorWsdlStatus').val('');
	     $('#cCreatorDocType').text($('#iNoSurat').val());
	     $('#cCreatorNikNas').text($('#iNikNasional').val());
	     $('#cCreatorNikSap').text($('#iNikSap').val());
	     $('#cCreatorAreaCode').val($('#ba_code_old').val());
	     $('#cCreatorNama').text($('#iNama').val());
	     $('#cCreatorName').val($('#iNama').val());
	     $('#cCreatorJabatan').text($('#iJabatan').val());
	     $('#iCreatorCatatan').val($('#iCatatan').val());

      showLog('valid');
      $('#modal-confirm-creator').modal({backdrop: 'static', keyboard: false});
    } else {
      showLog('not valid');
    }
  });
});

$('#cCreatorSubmit').click(function(){
    $('#formPssConfirmCreator').submit();
	$('#cCreatorSubmit').prop('disabled', true);
	$('.btn-close').prop('disabled', true);
});

$('#downloadPDF').click(function() {
	//$('#downloadPDF').attr("disabled","disabled"); -- dihide isu 3496
	$('#uploadBtn').prop('disabled', false);
	$.get($("#web_url").val() + 'pss/updateStatusDownloadUploadButton', { doc_code: $('#iNoSurat').val(), status: '1' })
	.done(function(data){
		console.log('btn-download: '+data);
	});
});

$('#uploadBtn').click(function() {
	$("#file").click();
});

$('#file').change(function() {
	$('.overlay').show();
	$('#UploadForm').submit();
});

$('#UploadForm').submit(function(evt) {
	evt.preventDefault();
    var formData = new FormData($(this)[0]);
 	$.ajaxSetup({
 	headers: {
 		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
 	}
 	});
    $.ajax({
        url: '/pss/attachments/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        error : function(xhr, status){
        	//console.log("status="+status);
        	$('#NotificationText').text('PROSES UPLOAD GAGAL.<br>MOHON DIULANGI KEMBALI');
        	$('#modal-notification-only').modal('show');
        	$('.overlay').hide();
        },
        success : function(status){
        	//console.log("status="+status);
        	$('#NotificationText').text('PROSES UPLOAD BERHASIL.');
        	$('#modal-notification-only').modal('show');
        	$('#uploadBtn').prop('disabled', true);
        	$('#finishBtn').prop('disabled', false);
        	$.get($("#web_url").val() + 'pss/updateStatusDownloadUploadButton', { doc_code: $('#iNoSurat').val(), status: '2' })
        	.done(function(data){
        		console.log('btn-upload: '+data);
        	});
        	$('.overlay').hide();
        },
    });
});