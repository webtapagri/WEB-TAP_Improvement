var ajaxstart = true;
var initscript = true;
var debug = true;

var getdate     = $("#getdate").val();
var dates       = new Date(getdate);
var ms_berlaku  = moment(dates).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
var dest        = moment(dates).format('YYYY-MM-DD HH:mm:ss');


$( document ).ajaxStart(function() {
	if(ajaxstart) $('.overlay').show();
	console.log('ajaxstart:' + ajaxstart);
});
//set field rule
var vInitFieldRuleCount = 0;
$(document).ajaxStop(function() {
	if(vInitFieldRuleCount < 1) {
		var form_type = $("#form_type").val();
		setFieldRule(form_type);
		console.log(form_type);
    }
    
    var none = $("#none").val();
    if(none) $('#iCatatan').attr('disabled', true);

	vInitFieldRuleCount++;
	$('.overlay').hide();
	ajaxstart = false;
});

if($("#form_type").val() == 'create') {
	$.get($("#web_url").val() + 'api/getOptTrasType', { trans_code: 'PSSSP-01' })
	.done(function(data){
		$("#iJenisSuratSanksi").select2({
			placeholder: 'Pilih Jenis Surat Sanksi',
			allowClear: true,
			data: data
		});

		$("#iJenisSuratSanksi").val('').change();
		$('#iJenisSuratSanksi').select2().on('change', function() {
			ajaxstart = true;
			var value = $(this).select2('data')[0];
			if(value) {
				$.get($("#web_url").val() + 'pss/fpss/' + value.id, function (content) {
					$("#content-form").html(content);
					$("#lJudulSurat").text('* '+value.text);
					$("#trans_type_id").val(value.id);
				
					changeMasaBerlaku(value.id);    
					setLinkSP();
                
					var ownDate = $(".datepicker2").data("DateTimePicker");
                	if(ownDate)  $(".daypicker").val(moment(ownDate.date()).format('dddd'));

			if(value.id == 7 || value.id == 8 || value.id == 9 || value.id == 10 ){
			  var thisA = $('#clones_1').find('a.btn-remove');
			  thisA.attr('disabled', true);
			}
				});
			}
		}).trigger('change');
	});


	$('.dp_tgl_surat').datetimepicker({
		format: 'DD-MMM-YYYY',
		minDate: dest,
		defaultDate: dest,
	});

	$('.dp_tgl_pengajuan').datetimepicker({
		format: 'DD-MMM-YYYY',
		minDate: dest,
		defaultDate: dest,
	});

	$('.dp_tgl_pengajuan').on('dp.change', function(e){
		tgl_surat = moment($('.dp_tgl_surat').data("DateTimePicker").date()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
	});

	$('#HC_DATE_OF_LETTER').on('dp.change', function(e){
		changeMasaBerlaku($("#trans_type_id").val());
	});

	$('#SPAN_HC_DATE_OF_LETTER').click(function() {
		$('#HC_DATE_OF_LETTER').data("DateTimePicker").show();
	});

	function changeMasaBerlaku(id) {
		var mb;
		var ts_d = moment($("#HC_DATE_OF_LETTER").data("DateTimePicker").date()).format('D');
		if(id <= 10) {
			if(id == 7) mb = moment($('#HC_DATE_OF_LETTER').data("DateTimePicker").date()).add(1, 'months');
			else mb = moment($('#HC_DATE_OF_LETTER').data("DateTimePicker").date()).add(6, 'months');
			
			var mb_d = mb.format('D');
			
			if(ts_d == mb_d) mb = mb.subtract(1,'days').format('DD-MMM-YYYY');
			else mb = mb.format('DD-MMM-YYYY');
		
			$('#HC_END_OF_LETTER').val(mb);
		}
	}
}
function initField() {
	var fieldID = { 
					"1": { "name": "iNoSurat", "format": "input" },
					"2": { "name": "iNikNasional", "format": "select2" },
					"3": { "name": "iNikSap", "format": "select2" },
					"4": { "name": "iNama", "format": "input" },
					"5": { "name": "HC_SEX", "format": "input" },
					"6": { "name": "iJabatan", "format": "input" },
					"7": { "name": "iGolongan", "format": "input" },
					"8": { "name": "iStatus", "format": "input" },
					"9": { "name": "iPerusahaan", "format": "input" },
					"10": { "name": "iBisnisArea", "format": "input" },
					"11": { "name": "iAfdeling", "format": "input" },
					"12": { "name": "HC_DATE_OF_LETTER", "format": "input" },
					"13": { "name": "HC_END_OF_LETTER", "format": "input" },
					"14": { "name": "HC_TYPE_OF_SANCTION", "format": "select" },
					"15": { "name": "HC_DESC_OF_SANCTION", "format": "input" },
					"16": { "name": "HC_NOTES", "format": "texarea" },
					"17": { "name": "HC_COMMENT", "format": "texarea" },
					"18": { "name": "iCatatanOld", "format": "texarea" },
					"19": { "name": "iCatatan", "format": "texarea" },
                    "20": { "name": "HC_TEMBUSAN_TO", "format": "input" },
                    "21": { "name": "HC_TEMBUSAN_REGION", "format": "input" },
                    "22": { "name": "HC_LETTER_FROM", "format": "input" },
                    "23": { "name": "HC_DATE_OF_LETTER_2", "format": "input" },
                    "24": { "name": "HC_NMR_LETTER", "format": "input" },
                    "25": { "name": "HC_LETTER_PERIHAL", "format": "input" },
                    "26": { "name": "HC_SP1_NOMOR", "format": "input" },
                    "27": { "name": "HC_SP1_DATE", "format": "input" },
                    "28": { "name": "HC_SP2_NOMOR", "format": "input" },
                    "29": { "name": "HC_SP2_DATE", "format": "input" },
                    "30": { "name": "HC_PASAL", "format": "input" },
                    "31": { "name": "HC_COMPANY", "format": "input" },
                    "32": { "name": "HC_DAY_OF_RESIGN", "format": "input" },
                    "33": { "name": "HC_DATE_OF_RESIGN", "format": "input" },
                    "34": { "name": "HC_DATE_ABSEN", "format": "input" },
                    "35": { "name": "HC_DAY_BACK", "format": "input" },
                    "36": { "name": "HC_DATE_BACK", "format": "input" },
                    "37": { "name": "HC_PLACE_BACK", "format": "input" },
                    "38": { "name": "HC_TIME_BACK", "format": "input" },
                    "39": { "name": "HC_NAME_KTU", "format": "input" },
                    "40": { "name": "HC_CONTACT_KTU", "format": "input" },
                    "41": { "name": "HC_CRONOLGY", "format": "input" },
                    "42": { "name": "HC_CRONOLGY_NAME", "format": "input" },
                    "43": { "name": "HC_DATE_OF_CRONOLGY", "format": "input" },
                    "44": { "name": "HC_DATE_OF_STOP", "format": "input" },
                    "45": { "name": "HC_PLACE_CREATE", "format": "input" },
                    "46": { "name": "HC_DATE_CREATE", "format": "input" },
                    "47": { "name": "HC_ENTRY_DATE", "format": "input" },
                    "48": { "name": "iJenisSuratSanksi", "format": "select2" },
                    "49": { "name": "HC_NO_CRONOLGY", "format": "input" },
                    "50": { "name": "HC_NMR_LETTER_PSS", "format": "input" },
                    "51": { "name": "HC_DATE_ABSEN2", "format": "input" },
    
				}
	return fieldID;
}

function initFieldRules() {
	//1:enabled, 2:disabled
	var rules = { 
					"create": { 
							"1":"2", "2":"1", "3":"1", "4":"2", "5":"2", "6":"2", "7":"2", "8":"2", "9":"2", "10":"2", 
							"11":"2", "12":"1", "13":"2", "14":"1", "15":"1", "16":"1", "17":"1", "18":"2", "19":"2", "20":"2",
							"21":"2", "22":"2", "23":"2", "24":"2", "25":"2", "26":"2", "27":"2", "28":"2", "29":"2", "30":"1",
							"31":"2", "32":"2", "33":"1", "34":"1", "35":"1", "36":"1", "37":"1", "38":"1", "39":"1", "40":"1",
							"41":"1", "42":"2", "43":"1", "44":"1", "45":"1", "46":"2", "47":"2", "48":"1", "49":"1", "50":"2",
              "51":"1", 
					},
					"approve": { 
							"1":"2", "2":"2", "3":"2", "4":"2", "5":"2", "6":"2", "7":"2", "8":"2", "9":"2", "10":"2", 
							"11":"2", "12":"2", "13":"2", "14":"2", "15":"2", "16":"2", "17":"2", "18":"2", "19":"1", "20":"2",
							"21":"2", "22":"2", "23":"2", "24":"2", "25":"2", "26":"2", "27":"2", "28":"2", "29":"2", "30":"2",
							"31":"2", "32":"2", "33":"2", "34":"2", "35":"2", "36":"2", "37":"2", "38":"2", "39":"2", "40":"2",
							"41":"2", "42":"2", "43":"2", "44":"2", "45":"2", "46":"2", "47":"2", "48":"2", "49":"2", "50":"2", 
              "51":"2",
					},
					"approve-finish": { 
							"1":"2", "2":"2", "3":"2", "4":"2", "5":"2", "6":"2", "7":"2", "8":"2", "9":"2", "10":"2", 
							"11":"2", "12":"2", "13":"2", "14":"2", "15":"2", "16":"2", "17":"2", "18":"2", "19":"1", "20":"2",
							"21":"2", "22":"2", "23":"2", "24":"2", "25":"2", "26":"2", "27":"2", "28":"2", "29":"2", "30":"2",
							"31":"2", "32":"2", "33":"2", "34":"2", "35":"2", "36":"2", "37":"2", "38":"2", "39":"2", "40":"2",
							"41":"2", "42":"2", "43":"2", "44":"2", "45":"2", "46":"2", "47":"2", "48":"2", "49":"2", "50":"2", 
              "51":"2",
					}
    		}
	return rules;
}

function setFieldProp(id,format, prop) {
	var value = (prop == 2) ? true : false;
	var idText = '#'+id;
    var classText = '.'+id;
	//if(format == 'select2') {
    //	value = (prop == 2) ? false : true;
    //	$(idText).select2("enable", value);
    //	$(classText).select2("enable", value);
    //} else {
    //}
		$(idText).prop("disabled", value );
    	$(classText).prop("disabled", value );
}

function setFieldRule(rule) {
	var field = initField();
	var rules = initFieldRules();
	for(var key in rules) {
		if (rules.hasOwnProperty(key)) {
        	if(key == rule) {
            	for(var row in rules[key]) {
                	setFieldProp(field[row]['name'],field[row]['format'],rules[key][row]);
                }
            }
		}
	}
}

function showLog(message) {
	if(message && debug) {
    	console.log(message);
    }
}

/*$('textarea').alphanum({
    allow              : 'àâäæ !@#$%^&*()_+-=,.?/:;"<>',
    disallow           : '',
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
  });*/

//autoresize input
$.fn.textWidth = function(_text, _font){//get width of text with font.  usage: $("div").textWidth();
        var fakeEl = $('<span>').hide().appendTo(document.body).text(_text || this.val() || this.text()).css({font: _font || this.css('font'), whiteSpace: "pre"}),
            width = fakeEl.width();
        fakeEl.remove();
        return width;
    };

$.fn.autoresize = function(options){//resizes elements based on content size.  usage: $('input').autoresize({padding:10,minWidth:0,maxWidth:100});
  options = $.extend({padding:10,minWidth:0,maxWidth:10000}, options||{});
  $(this).on('input', function() {
    $(this).css('width', Math.min(options.maxWidth,Math.max(options.minWidth,$(this).textWidth() + options.padding)));
  }).trigger('input');
  return this;
}

$(".autoresize").autoresize({padding: 20, minWidth: 100, maxWidth: 300});



  
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

function bulan(value) {
	var mon;
	var arr = value.split('-');
	switch(arr[1]) {
		case 'May':
				mon = 'Mei';
			break;
		case 'Aug':
				mon = 'Ags';
			break;
		case 'Oct':
				mon = 'Okt';
			break;
		case 'Dec':
				mon = 'Des';
			break;
		default:
				mon = arr[1];
	}
	var output = arr[0] + '-' + mon + '-' + arr[2];

	return output;
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
            var joindate = bulan(json.join_date);
            $('#iNama').val(json.employee_name);
            $('.HC_CRONOLGY_NAME').val(json.employee_name);
            $('.iNamaKaryawan').text(json.employee_name);
            $('#HC_SEX').val(json.sex);
            $('#iPerusahaan').val(json.comp_name);
            $('#HC_LETTER_FROM').val(json.comp_name);
            $('#HC_COMPANY').val(json.comp_name);
            $('#HC_COMP_CODE').val(json.comp_code);
            $('#iBisnisArea').val(json.est_name);
            $('#HC_EST_CODE').val(json.est_code);
            $('#HC_AREA_CODE').val(json.werks);
            $('#iAfdeling').val(json.afd_name);
            $('#HC_AFD_CODE').val(json.afd_code);
            $("#HC_LETTER_PERIHAL").val($("#lJudulSurat").text());
            //$('#HC_ENTRY_DATE').val(json.join_date);
            $('#HC_ENTRY_DATE').val(joindate);
          
            if(source == 'sap' ) {
              $('#iNikNasional').find('option').remove();
              $('#iNikNasional').append($('<option>', {value:json.nik_nasional, text:json.nik_nasional}));
              $("#iNikNasional option[value='"+json.nik_nasional+"']").attr("selected","selected");
            }
            if(source == 'nas' ) {
              $('#iNikSap').find('option').remove();
              $('#iNikSap').append($('<option>', {value:json.nik, text:json.nik}));
              $("#iNikSap option[value='"+json.nik+"']").attr("selected","selected");
            }
          
            $('#HC_JOB_CODE').val(json.job_code);
      			$.get($("#web_url").val() + 'api/getOptJobCode', { job_code: json.job_code })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json.job_code; });
                  	if(arr != 0) $('#iJabatan').val(arr[0].text);
                  	else $('#iJabatan').val(json.job_code);
      			});

            $('#HC_GRADE_CODE').val(json.golongan);
      			$.get($("#web_url").val() + 'api/getOptEmpGradeGol', { job_type: json.golongan })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json.golongan; });
                  	if(arr != 0) $('#iGolongan').val(arr[0].text);
                      else $('#iGolongan').val(json.golongan);
      			});

            $('#HC_EMP_STATUS_CODE').val(json.status);
      			$.get($("#web_url").val() + 'api/getOptEmpWorkStatus', { status: json.status })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json.status; });
                  	if(arr != 0) $('#iStatus').val(arr[0].text);
      			});
          
      			$.get($("#web_url").val() + 'api/getOptCompany', { comp_code: json.comp_code })
      			.done(function(data){
                  	var arr = jQuery.grep(data, function( a ) { return a.id === json.comp_code; });
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
      getSuratPanggilan(source);
      /*$.ajax({
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
          	sessionStorage.setItem('HC_SP1_DOCCODE', '');
          	sessionStorage.setItem('HC_SP1_TRTYPE', '');
          	sessionStorage.setItem('HC_SP1_NOMOR', '');
          	sessionStorage.setItem('HC_SP1_DATE', '');
          	sessionStorage.setItem('HC_SP2_DOCCODE', '');
          	sessionStorage.setItem('HC_SP2_TRTYPE', '');
          	sessionStorage.setItem('HC_SP2_NOMOR', '');
          	sessionStorage.setItem('HC_SP2_DATE', '');
          } else {
            console.log(json);
          	sessionStorage.setItem('HC_SP1_DOCCODE', (json.doc_code ? json.doc_code : ''));
          	sessionStorage.setItem('HC_SP1_TRTYPE', (json.trans_type_id ? json.trans_type_id : ''));
          	sessionStorage.setItem('HC_SP1_NOMOR', (json.no_surat ? json.no_surat : ''));
          	sessionStorage.setItem('HC_SP1_DATE', (json.effective_date ? moment(json.effective_date).format('DD-MMM-YYYY'): '' ));
            if(typeof json[1] === 'undefined') {
            	sessionStorage.setItem('HC_SP2_DOCCODE', '');
            	sessionStorage.setItem('HC_SP2_TRTYPE', '');
            	sessionStorage.setItem('HC_SP2_NOMOR', '');
            	sessionStorage.setItem('HC_SP2_DATE', '');
            } else {
            	sessionStorage.setItem('HC_SP2_DOCCODE', (json[1].doc_code ? json[1].doc_code : ''));
            	sessionStorage.setItem('HC_SP2_TRTYPE', (json[1].trans_type_id ? json[1].trans_type_id : ''));
            	sessionStorage.setItem('HC_SP2_NOMOR', (json[1].no_surat ? json[1].no_surat : ''));
            	sessionStorage.setItem('HC_SP2_DATE', (json[1].effective_date ? moment(json[1].effective_date).format('DD-MMM-YYYY'): '' ));
            }
          }
          setLinkSP();
        	
        }
      });*/
    }
}

function getSuratPanggilan(source) {
  if(source == 'nas') var nik = $.trim($('#iNikNasional').val());
  else var nik = $.trim($('#iNikSap').val());

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
        sessionStorage.setItem('HC_SP1_DOCCODE', '');
        sessionStorage.setItem('HC_SP1_TRTYPE', '');
        sessionStorage.setItem('HC_SP1_NOMOR', '');
        sessionStorage.setItem('HC_SP1_DATE', '');
        sessionStorage.setItem('HC_SP2_DOCCODE', '');
        sessionStorage.setItem('HC_SP2_TRTYPE', '');
        sessionStorage.setItem('HC_SP2_NOMOR', '');
        sessionStorage.setItem('HC_SP2_DATE', '');
      if(json == 0) {
        //console.log(0);
      } else {
      	if(typeof json[1] === 'undefined') {
      		if(json[0].trans_type_id == '12') {
        		sessionStorage.setItem('HC_SP1_DOCCODE', (json[0].doc_code ? json[0].doc_code : ''));
        		sessionStorage.setItem('HC_SP1_TRTYPE', (json[0].trans_type_id ? json[0].trans_type_id : ''));
        		sessionStorage.setItem('HC_SP1_NOMOR', (json[0].no_surat ? json[0].no_surat : ''));
        		sessionStorage.setItem('HC_SP1_DATE', (json[0].tgl1 ? json[0].tgl1 : '')); //moment(json.tgl1).format('DD-MMM-YYYY'): '' ));
       		} else {
          		sessionStorage.setItem('HC_SP2_DOCCODE', (json[0].doc_code ? json[0].doc_code : ''));
          		sessionStorage.setItem('HC_SP2_TRTYPE', (json[0].trans_type_id ? json[0].trans_type_id : ''));
          		sessionStorage.setItem('HC_SP2_NOMOR', (json[0].no_surat ? json[0].no_surat : ''));
          		sessionStorage.setItem('HC_SP2_DATE', (json[0].tgl2 ? json[0].tgl2 : '')); //moment(json[1].tgl2).format('DD-MMM-YYYY'): '' ));
       		}
        } else {
      		if(json[0].trans_type_id == '12') {
        		sessionStorage.setItem('HC_SP1_DOCCODE', (json[0].doc_code ? json[0].doc_code : ''));
        		sessionStorage.setItem('HC_SP1_TRTYPE', (json[0].trans_type_id ? json[0].trans_type_id : ''));
        		sessionStorage.setItem('HC_SP1_NOMOR', (json[0].no_surat ? json[0].no_surat : ''));
        		sessionStorage.setItem('HC_SP1_DATE', (json[0].tgl1 ? json[0].tgl1 : '')); //moment(json.tgl1).format('DD-MMM-YYYY'): '' ));
       		} else {
          		sessionStorage.setItem('HC_SP2_DOCCODE', (json[0].doc_code ? json[0].doc_code : ''));
          		sessionStorage.setItem('HC_SP2_TRTYPE', (json[0].trans_type_id ? json[0].trans_type_id : ''));
          		sessionStorage.setItem('HC_SP2_NOMOR', (json[0].no_surat ? json[0].no_surat : ''));
          		sessionStorage.setItem('HC_SP2_DATE', (json[0].tgl2 ? json[0].tgl2 : '')); //moment(json[1].tgl2).format('DD-MMM-YYYY'): '' ));
       		}
      		if(json[1].trans_type_id == '12') {
        		sessionStorage.setItem('HC_SP1_DOCCODE', (json[1].doc_code ? json[1].doc_code : ''));
        		sessionStorage.setItem('HC_SP1_TRTYPE', (json[1].trans_type_id ? json[1].trans_type_id : ''));
        		sessionStorage.setItem('HC_SP1_NOMOR', (json[1].no_surat ? json[1].no_surat : ''));
        		sessionStorage.setItem('HC_SP1_DATE', (json[1].tgl1 ? json[1].tgl1 : '')); //moment(json.tgl1).format('DD-MMM-YYYY'): '' ));
       		} else {
          		sessionStorage.setItem('HC_SP2_DOCCODE', (json[1].doc_code ? json[1].doc_code : ''));
          		sessionStorage.setItem('HC_SP2_TRTYPE', (json[1].trans_type_id ? json[1].trans_type_id : ''));
          		sessionStorage.setItem('HC_SP2_NOMOR', (json[1].no_surat ? json[1].no_surat : ''));
          		sessionStorage.setItem('HC_SP2_DATE', (json[1].tgl2 ? json[1].tgl2 : '')); //moment(json[1].tgl2).format('DD-MMM-YYYY'): '' ));
       		}
        }
      }
      setLinkSP();
      
    }
  });
}

function setLinkSP() {
	var sp1c = sessionStorage.getItem('HC_SP1_DOCCODE');
	var sp1t = sessionStorage.getItem('HC_SP1_TRTYPE');
	var sp1n = sessionStorage.getItem('HC_SP1_NOMOR');
	var sp1d = sessionStorage.getItem('HC_SP1_DATE');
	var sp2c = sessionStorage.getItem('HC_SP2_DOCCODE');
	var sp2t = sessionStorage.getItem('HC_SP2_TRTYPE');
	var sp2n = sessionStorage.getItem('HC_SP2_NOMOR');
	var sp2d = sessionStorage.getItem('HC_SP2_DATE');
	var link_sp1 = sp1n ? $("#web_url").val() + 'approve-pss/hs/' + btoa(sp1c) : '';
	var link_sp2 = sp2n ? $("#web_url").val() + 'approve-pss/hs/' + btoa(sp2c) : '';

	$('#HC_SP1_NOMOR').val('');
	$('#HC_SP1_DATE').val('');
	$('#HC_SP2_NOMOR').val('');
	$('#HC_SP2_DATE').val('');
	$('#link_sp1').attr('href', '').hide();
	$('#link_sp2').attr('href', '').hide();

	if(sp1t == '12') {
		$('#HC_SP1_NOMOR').val(sp1n);
		$('#HC_SP1_DATE').val(sp1d);
		$('#link_sp1').attr('href', link_sp1).show();
  } else if(sp1t == '13') {
		$('#HC_SP2_NOMOR').val(sp1n);
		$('#HC_SP2_DATE').val(sp1d);
		$('#link_sp2').attr('href', link_sp1).show();
  } 

	if(sp2t == '12') {
		$('#HC_SP1_NOMOR').val(sp2n);
		$('#HC_SP1_DATE').val(sp2d);
		$('#link_sp1').attr('href', link_sp2).show();
  } else if(sp2t == '13') {
		$('#HC_SP2_NOMOR').val(sp2n);
		$('#HC_SP2_DATE').val(sp2d);
		$('#link_sp2').attr('href', link_sp2).show();
  }
}

$(".modal").on('shown.bs.modal', function () {
	$(".btn-focus").focus();
});