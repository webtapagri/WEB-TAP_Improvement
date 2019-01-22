var ajaxstart = true;
var initscript = true;
var debug = true;

$( document ).ajaxStart(function() {
  if(ajaxstart) $('.overlay').show();
	showLog('ajaxstart:' + ajaxstart);
});
//set field rule
var vInitFieldRuleCount = 0;
var fl_tanya = $("#fl_tanya").val();

$(document).ajaxStop(function() {
  if(vInitFieldRuleCount < 1) {
  	var form_type = $("#form_type").val();
  
  	if(form_type == 'create') $("#iJenisPerubahan").val(null).trigger('change.select2');
    setFieldRule(form_type);
  	showLog(form_type);

    var none = $("#none").val();
    if(none) $('#iCatatan').attr('disabled', true);

    if(!fl_tanya) {
      $('#sendBtn').attr('disabled','disabled');
    }
    //show approve modal
    var confirm = $("#confirm").val();
    if(confirm == 'ask') $('#askBtn').click();
    if(confirm == 'agree') $('#agreeBtn').click();
    if(confirm == 'reject') $('#rejectBtn').click();

    //disable iCatatan if hs
    var ftype = $('#ftype').val();
    var isCreator = $('#isCreator').val();
    if(ftype == 'hs'){
      if(isCreator == 2){
        $('#iCatatan').attr('disabled', true);
      }
    }
  
  	//ini
    //$("#iJenisPerubahan").val('').change();
    }
  vInitFieldRuleCount++;
  $('.overlay').hide();
  ajaxstart = false;
  initscript = false;
  showLog('ajaxstop');
});

$(".select2").select2({placeholder: ''});
$('.reservation').daterangepicker();
$('.datepicker').datepicker({
    autoclose: true,
    format: 'dd-M-yyyy',
});

$('.tglberlaku').datetimepicker({
    minDate: moment().add(1, 'months').date(1),
    format: 'DD-MMM-YYYY',
});

$("#iSuratTeguran").filter('[value="21"]').prop("checked", true);
$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass: 'iradio_flat-green'
});
$('input[name="iSuratTeguran"]').iCheck('disable'); 

function setFieldProp(data) {
	if(data.type_rule == 'COL') {
		var values = (data.value == 2) ? true : false;
        var states = (data.opt_code == 1) ? 'readonly' : 'disabled';
		var idText = '#'+data.param_code;
		$(idText).prop("disabled", values);
    } else if(data.type_rule == 'OPT') {
    	//eval("reset" + data.param_code + "()");
		var idText = '#'+data.param_code;
		$(idText).select2();
		$(idText).val(null).trigger('change.select2');
		var idTextOpt = idText+' option[value='+data.opt_code+']';
    	if(data.value == 1) { 
        	$(idTextOpt).removeAttr('disabled');
        } else {
        	$(idTextOpt).attr('disabled','disabled');
        }
    	//showLog(idTextOpt+'='+data.value);
    } else if(data.type_rule == 'VAL') {
		var idText = '#'+data.param_code;
    	if( $(idText).is('input:text') ) {
    		$(idText).val(data.value);
        } else {
    		$(idText).val(data.value).trigger('change.select2');
        }
    }
    //showLog(idText+'='+data.value);
}

function setFieldRule(messages) {
	showLog('setFieldRule:'+messages);
	showLog('code_1:'+$("#form_type").val());
	showLog('code_2:'+$('#iJenisPerubahan').val());
	showLog('code_3:'+$('#iNomorPtk').val());
	showLog('code_4:'+$('#emp_status_old').val());
	showLog('code_5:'+$('#stat_new').val());
	showLog('code_6:'+$('#sisaKontrak').val());
	showLog('code_7:'+$('#iNextKontrak').val());
	showLog('code_8:'+$('#ba_code_old').val());
	showLog('code_9:'+$('#ba_code').val());

	$.ajax({
        url : $("#web_url").val() + 'pdm/rules',
        type : 'GET',
        async: true,
        data : {
        	code_1: $("#form_type").val().toUpperCase(), //formtype
        	code_2: $('#iJenisPerubahan').val(),
        	code_3: $('#iNomorPtk').val(),
        	code_4: $('#emp_status_old').val(),
        	code_5: $('#stat_new').val(),
        	code_6: parseInt($('#sisaKontrak').val() || 0), 
        	code_7: $('#iNextKontrak').val(), 
        	code_8: $('#ba_code_old').val(),
        	code_9: $('#ba_code').val(), 
        },
        dataType : 'json',
        success : function(json) {
        	var rule_code;
        	var func_before;
        	var func_after;
        
        	$.each(json, function(i, val) {
        		if(i == 0) {
                	rule_code =  val.rule_code;
                	func_before =  val.func_before;
                	func_after =  val.func_after;
                }
        	});
        
        	if(func_before) eval("funcRule_" + func_before + "()");
        
        	$.each(json, function(i, val) {
        		setFieldProp(val); //val.type_rule,val.param_code,val.opt_code,val.value
        	});
        
        	if(func_after) eval("funcRule_" + func_after + "()");
        
        	showLog('setFieldRule ('+rule_code+') done');
        }
	});
}

function funcRule_SampleFunc() {
    
}

function showLog(message) {
	if(message && debug) {
    	console.log(message);
    }
}

function tutupAlertKontrak(){
  var tutup = $('#hddnTutup').val();
  if(tutup == '1') {
    location.reload();
  }
}

$('textarea').alphanum({
    allow              : 'àâäæ !@#$%^&*()_+-=,.?/:;"',
    disallow           : '<>',
    allowSpace         : true,
    allowNumeric       : true,
    allowUpper         : true,
    allowLower         : true,
    allowCaseless      : true,
    allowLatin         : true,
    allowOtherCharSets : true,
    forceUpper         : false,
    forceLower         : false,
    maxLength          : NaN
  });

function showModal(){
  setTimeout(function(){
       $('#kontrakModal').modal({backdrop: 'static', keyboard: false});
   }, 2000);
}