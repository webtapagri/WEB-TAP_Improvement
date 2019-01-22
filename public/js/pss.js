var ajaxstart = true;
var initscript = true;
var debug = true;

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
				$("#lJudulSurat").text(value.text);
				$("#trans_type_id").val(value.id);
			});
		}
	}).trigger('change');
    
    
});
}

function initField() {
	var fieldID = { 
					"1": { "name": "iNoSurat", "format": "input" },
					"2": { "name": "iNikNasional", "format": "select" },
					"3": { "name": "iNikSap", "format": "select" },
					"4": { "name": "iNama", "format": "input" },
					"5": { "name": "HC_SEX", "format": "select" },
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
				}
	return fieldID;
}

function initFieldRules() {
	//1:enabled, 2:disabled
	var rules = { 
					"create": { 
							"1":"2", "2":"1", "3":"1", "4":"2", "5":"2", "6":"2", "7":"2", "8":"2", "9":"2", "10":"2", 
							"11":"2", "12":"1", "13":"1", "14":"1", "15":"1", "16":"1", "17":"1", "18":"2", "19":"2", "20":"2",
							"21":"2", "22":"2", "23":"2", "24":"2", "25":"2", "26":"2", "27":"2", "28":"2", "29":"2", "30":"1",
							"31":"2", "32":"2", "33":"1", "34":"1", "35":"2", "36":"1", "37":"1", "38":"1", "39":"1", "40":"1",
							"41":"1", "42":"2", "43":"1", "44":"1", "45":"1", "46":"1", 
					},
					"approve": { 
							"1":"2", "2":"2", "3":"2", "4":"2", "5":"2", "6":"2", "7":"2", "8":"2", "9":"2", "10":"2", 
							"11":"2", "12":"2", "13":"2", "14":"2", "15":"2", "16":"2", "17":"2", "18":"2", "19":"1", "20":"2",
							"21":"2", "22":"2", "23":"2", "24":"2", "25":"2", "26":"2", "27":"2", "28":"2", "29":"2", "30":"2",
							"31":"2", "32":"2", "33":"2", "34":"2", "35":"2", "36":"2", "37":"2", "38":"2", "39":"2", "40":"2",
							"41":"2", "42":"2", "43":"2", "44":"2", "45":"2", "46":"2", 
					}
    		}
	return rules;
}

function setFieldProp(id,prop) {
	var value = (prop == 2) ? true : false;
	var idText = '#'+id;
    var classText = '.'+id;
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
                	setFieldProp(field[row]['name'],rules[key][row]);
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