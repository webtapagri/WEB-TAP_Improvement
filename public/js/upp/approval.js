var divideCuti = GlobalAppUpp.getCookie('divide');
var _tempNumber = 0;

function prepareModal(status, modal) {
    /*if (!/\S/.test($('#notes').val()) ) {
        
    } */
    if ($('#notes').val() == "" && status != 'A' && status != 'F'){
    	$('#notes').css('background-color', '#f2dede');
    	$('.message-note').html('Tidak Boleh Kosong');
        $('#error').show();
          return false;
    } else if (!/\S/.test($('#notes').val()) && status != 'A' && status != 'F') {
    	$('#notes').css('background-color', '#f2dede');
    	$('.message-note').html('Tidak Boleh Kosong');
        $('#error').show();
        return false;
    }else{
          $('#error').hide();
          $('#status').val(status);
          if (status != 'A') {
        	  $('#notes').css('background-color', '#dff0d8');
        	  $('#hf_keterangan').val('');
          }
          $(modal).modal('show');
          var totalPay = 'Rp '+$('#total_dibayarkan_tap').val();
          $('.total-tap').html(totalPay);
          $('.alasan').text($('#notes').val()); 
    }
}

function calculateUppOld() {
    var uangSisaCuti = numberClean($('#sisa_cuti_tahunan').val()) * 1;
    var uangPisahPesangon = numberClean($('#uang_pp').val()) * 1;
    var uangPenghargaan = numberClean($('#uang_penghargaan').val()) * 1;
    var uangPenggantianHak = numberClean($('#uang_penggantian_hak').val()) * 1;
    var lainLain = numberClean($('#lain_lain_adj').val()) * 1;
    var potongan = numberClean($('#potongan_adj').val()) * 1;

    var totalBruto = uangPisahPesangon + uangPenghargaan + uangPenggantianHak + uangSisaCuti + lainLain;
    // console.log(uangPisahPesangon + ' + ' + uangPenghargaan + ' + ' + uangPenggantianHak + ' + ' + uangSisaCuti + ' + ' + lainLain + ' = ' + totalBruto);
    setNumberFormat($('#total_bruto'), totalBruto);

    var pph1 = 0;
    var pph2 = 0;
    var pph3 = 0;
   
    if (totalBruto > 500000000) { //500.000.000
    	var multiplier1 = 50000000;
        var totalBrutoTemp = totalBruto - multiplier1;
        if (totalBrutoTemp >= multiplier1) {
            pph1 = multiplier1*0.05;
        } else {
            pph1 = totalBrutoTemp * 0.05;
        }
        
        if (totalBrutoTemp <= 500000000) { //500.000.000
            var multiplier2 = totalBruto - 100000000;
            pph2 = multiplier2*0.15;
            totalBrutoTemp = totalBrutoTemp - multiplier1;
        } else if (totalBrutoTemp > 500000000) { //500.000.000 
            var multiplier2 = 500000000;
            pph2 = multiplier2*0.15;
            totalBrutoTemp = totalBrutoTemp - multiplier1;
        }
        
        if (totalBrutoTemp > 500000000) { //500.000.000
            var multiplier3 = totalBrutoTemp - 500000000;
            pph3 = multiplier3*0.25;
        }
        
    } else if (totalBruto > 100000000 && totalBruto <= 500000000) { //100.000.000 && 500.000.000
        var multiplier1 = 50000000;
        var totalBrutoTemp = totalBruto - multiplier1;
        if (totalBrutoTemp >= multiplier1) {
            pph1 = multiplier1*0.05;
        } else {
            pph1 = totalBrutoTemp * 0.05;
        }
            

        if (totalBrutoTemp > 50000000 && totalBrutoTemp <= 100000000) {
            if (totalBrutoTemp >= multiplier1) {
                var multiplier2 = totalBrutoTemp - multiplier1;
            } else {
                var multiplier2 = totalBrutoTemp;
            }
            //console.log('sini donkk' + pph2);
            //console.log(multiplier2);
            pph2 = multiplier2*0.15
            //console.log('ini pph2 ' + pph2);
        } else if (totalBrutoTemp > 100000000) {
        	var multiplier2 = totalBruto - 100000000;
            pph2 = multiplier2*0.15;
        }
    } else if (totalBruto > 50000000 && totalBruto <= 100000000) { //50.000.000 && 100.000.000
        //console.log('sini');
        var multiplier1 = totalBruto - 50000000;
        pph1 = multiplier1*0.05;
    }
        
    var pph = (pph1 * 1) + (pph2 * 1) + (pph3 * 1)
    // console.log((pph1 * 1) + '+' + (pph2 * 1) + '+' + (pph3 * 1));
    setNumberFormat($('#pph'), pph);
    
    var total_netto = totalBruto - pph;
    setNumberFormat($('#total_netto'), total_netto);

    var total_tap = total_netto - potongan;
    setNumberFormat($('#total_dibayarkan_tap'), total_tap);
    
    //buildNotes();
}

function calculateUpp () {
    var uangSisaCuti = numberClean($('#sisa_cuti_tahunan').val()) * 1;
    var uangPisahPesangon = numberClean($('#uang_pp').val()) * 1;
    var uangPenghargaan = numberClean($('#uang_penghargaan').val()) * 1;
    var uangPenggantianHak = numberClean($('#uang_penggantian_hak').val()) * 1;
    var lainLain = numberClean($('#lain_lain_adj').val()) * 1;
    var potongan = numberClean($('#potongan_adj').val()) * 1;

    var totalBruto = uangPisahPesangon + uangPenghargaan + uangPenggantianHak + uangSisaCuti + lainLain;
    
    setNumberFormat( $('#total_bruto'), totalBruto);
    var pph = 0;
    var lastValue = 0;
    var totalBrutoTemp = totalBruto;
    var rulePph = JSON.parse(GlobalAppUpp.getCookie('rulePph'));
    
    for (var obj in rulePph) {
    	var pphObj = rulePph[obj];
    	if (totalBrutoTemp > pphObj.param_value1 && totalBrutoTemp < pphObj.param_value2) {
            var multiplierPercent = 0;
            if (obj.param_salary != 0) {
                multiplierPercent = ((pphObj.param_salary *1) / 100);
            }
    		
            if (totalBrutoTemp > pphObj.fix_value) {
                totalBrutoTemp = totalBrutoTemp - pphObj.fix_value;

                if (totalBrutoTemp <= pphObj.fix_value) {
                    pph += totalBrutoTemp * multiplierPercent;
                }
            } else {
                multiplierPercentPrev = 0;
                var decreaseVar = 0;
                if (rulePph.hasOwnProperty((obj - 1))) {
                    if (totalBrutoTemp > rulePph[(obj - 1)].fix_value) {
                        if (rulePph.hasOwnProperty((obj - 3))) {
                            decreaseVar += (rulePph[(obj - 3)].fix_value)*1;
                        }

                        if (rulePph.hasOwnProperty((obj - 2))) {
                            multiplierPercentPrev = ((rulePph[(obj - 2)].param_salary *1) / 100);
                            pph += rulePph[(obj - 2)].fix_value * multiplierPercentPrev;
                            decreaseVar += (rulePph[(obj - 2)].fix_value)*1;
                        }

                        multiplierPercentPrev = ((rulePph[(obj - 1)].param_salary *1) / 100);
                        console.log('multiplierPercentPrev: '+ multiplierPercentPrev);
                        console.log('pengurangan: '+ (totalBrutoTemp - decreaseVar));
                        console.log('fx: '+ (rulePph[(obj - 1)].fix_value *1));
                        if (totalBrutoTemp < (decreaseVar + (rulePph[(obj - 1)].fix_value)*1)) {
                            if (totalBrutoTemp > (rulePph[(obj - 1)].fix_value)*1) {
                                lastValue = (totalBrutoTemp - rulePph[(obj - 1)].fix_value);
                                pph += ((rulePph[(obj - 1)].fix_value *1) - decreaseVar) * multiplierPercentPrev;
                            } else {
                                pph += (totalBrutoTemp - decreaseVar) * multiplierPercentPrev;
                            }
                        } else {
                            console.log(totalBrutoTemp - rulePph[(obj - 1)].fix_value);
                            
                            if (rulePph.hasOwnProperty((obj - 3))) {
                                lastValue = (totalBrutoTemp - rulePph[(obj - 1)].fix_value);
                                pph += ((rulePph[(obj - 1)].fix_value *1) - decreaseVar) * multiplierPercentPrev;
                            } else {
                                if ((totalBrutoTemp - rulePph[(obj - 1)].fix_value) < rulePph[(obj - 1)].fix_value * 1) {
                                    lastValue = (totalBrutoTemp - rulePph[(obj - 1)].fix_value);
                                    pph += ((rulePph[(obj - 1)].fix_value *1) - decreaseVar) * multiplierPercentPrev;
                                } else {
                                    pph += rulePph[(obj - 1)].fix_value * multiplierPercentPrev;
                                }
                            }
                            
                            
                            //pph += rulePph[(obj - 1)].fix_value * multiplierPercentPrev;
                        }
                        decreaseVar += (rulePph[(obj - 1)].fix_value)*1;
                    }

                    console.log('pphBefore : '+ pph);
                    console.log('totalBrutoTemp: '+ totalBrutoTemp);
                    console.log('multiplierPercent: '+ multiplierPercent);
                    console.log('decreaseVar: '+ decreaseVar);
                    console.log('lastValue: ' + lastValue);
                    
                    if (lastValue != 0) {
                        pph += lastValue * multiplierPercent;
                    } else {
                        pph += (totalBrutoTemp - decreaseVar) * multiplierPercent;
                    }
                }
                    console.log('pphAfter : '+ pph);
            }
            break;
    	}
    }
    
    setNumberFormat($('#pph'), pph);
    
    var total_netto = totalBruto - pph;
    setNumberFormat($('#total_netto'), total_netto);

    var total_tap = total_netto - potongan;
    setNumberFormat($('#total_dibayarkan_tap'), roundupTens(total_tap));
    
    //buildNotes();
}

$(document).on('ready', function() {
    $('#sisa_cuti_tahunan_adj').on('keydown', function(e) {
          return numberOnly(e);
    });

    $('#sisa_cuti_tahunan_adj').on('keyup', function(e) {
          var sisaCutiAdj = numberClean($(this).val());
          var gajiPokok = numberClean($('#gaji_pokok').val());
          var sisaCuti = sisaCutiAdj * (gajiPokok / divideCuti);

          setNumberFormat($('#sisa_cuti_tahunan'), sisaCuti);
          calculateUpp();
    });

    $('#potongan_adj').on('keydown', function(e) {
          return numberOnly(e);
    });

    $('#potongan_adj').on('keyup', function(e) {
          calculateUpp();
    });

    $('#potongan_adj').on('blur', function(e) {
          var potongan_adj_val = numberClean($(this).val());
          setNumberFormat($(this), potongan_adj_val);
    });

    $('#lain_lain_adj').on('keydown', function(e) {
          return numberOnly(e);
    });

    $('#lain_lain_adj').on('keyup', function(e) {
          calculateUpp();
    });

    $('#lain_lain_adj').on('blur', function(e) {
          var lain_lain_adj_val = numberClean($(this).val());
          setNumberFormat($(this), lain_lain_adj_val);
    });

    $(".js-example-placeholder-single").select2({
        placeholder: "-- Pilih User --"
    });

    $('#askApproveUpp').click(function() {
    	$('#formApproveUpp').parsley().validate("first");
    	if ($('#formApproveUpp').parsley().isValid("first")) {
	        var cekSpace = checkSpace($('#notes').val());
	        if (cekSpace == false) {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
    	}
        prepareModal('T', '#myModalTanyaUser');
		
    });

    $('#btnConfirm').click(function() {
    	$('#formApproveUpp').parsley().validate("first");
    	if ($('#formApproveUpp').parsley().isValid("first")) {
	        var cekSpace = checkSpace($('#notes').val());
	        if (cekSpace == false) {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
    	}
        $('#user').val($('#optUser').val());
        $('#myModalTanyaUser').modal('hide');
        prepareModal('T', '#myModalTanya');
    });
    
    $('#acceptApproveUpp').click(function() {
    	if (GlobalAppUpp.getCookie('totalTapPay') != (numberClean($('#total_dibayarkan_tap').val())*1) ) {
    		$('#formApproveUpp').parsley().validate("first");
        	if ($('#formApproveUpp').parsley().isValid("first")) {
    	        var cekSpace = checkSpace($('#notes').val());
    	        if (cekSpace == false) {
    	        	$('#notes').css('background-color', '#f2dede');
    	        	$('.message-note').html('Tidak Boleh Kosong');
                    $('#error').show();
    	            return false;
    	        }
    	        
    	        if ($('#notes').val() == "") {
    	        	$('#notes').css('background-color', '#f2dede');
    	        	$('.message-note').html('Tidak Boleh Kosong');
                    $('#error').show();
    	            return false;
    	        }
        	}
    	}
    	buildNotes();
        prepareModal('A','#myModalSetuju');
    });

    $('#rejectApproveUpp').click(function() {
    	$('#formApproveUpp').parsley().validate("first");
    	if ($('#formApproveUpp').parsley().isValid("first")) {
	        var cekSpace = checkSpace($('#notes').val());
	        if (cekSpace == false) {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
    	}
        prepareModal('R','#myModalTolak');
    });

    $('#sendApproveUpp').click(function() {
    	$('#formApproveUpp').parsley().validate("first");
    	if ($('#formApproveUpp').parsley().isValid("first")) {
	        var cekSpace = checkSpace($('#notes').val());
	        if (cekSpace == false) {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
    	}
        prepareModal('J','#myModalJawab');
    });

    $('#btn-selesai').click(function() {
        prepareModal('F','#myModalKirim');
        $('.confirm-acceptance').val("Konfirmasi Penyelesaian");
    });

    $('#btn-batal').click(function() {
    	$('#formApproveUpp').parsley().validate("first");
    	if ($('#formApproveUpp').parsley().isValid("first")) {
	        var cekSpace = checkSpace($('#notes').val());
	        if (cekSpace == false) {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
    	}
        prepareModal('C','#myModalKirim');
        $('.confirm-acceptance').val("Konfirmasi Pembatalan");
    });
    
    $('.close-acceptance').on('click', function(){
    	$('#notes').val(GlobalAppUpp.getCookie('noteUI'));
    	if (GlobalAppUpp.getCookie('totalTapPay') != (numberClean($('#total_dibayarkan_tap').val())*1) ) {
    		$('#notes').css('background-color', '#dff0d8');
    	} else {
    		$('#notes').css('background-color', '#ffffff');
    	}
    });
});

function buildNotes() {
	var strNote = 'Perubahan '+GlobalAppUpp.getCookie('typeUpp')+' Menjadi Rp '+$('#total_dibayarkan_tap').val()+'\nKeterangan : ';
	//var strNoteModal = 'Perubahan '+GlobalAppUpp.getCookie('typeUpp')+' Menjadi Rp '+$('#total_dibayarkan_tap').val()+'<br /> Keterangan : '
	if (GlobalAppUpp.getCookie('totalTapPay') != (numberClean($('#total_dibayarkan_tap').val())*1) ) {
		/*if (GlobalAppUpp.getCookie('anualLeaveAdj') != (numberClean($('#sisa_cuti_tahunan_adj').val())*1) ) {
			strNote += 'Adjustment Sisa Cuti Tahunan \n';
		}
		
		if (GlobalAppUpp.getCookie('others') != (numberClean($('#lain_lain_adj').val())*1) ) {
			strNote += 'Pendapatan Lain-lain \n';
		} 
		
		if (GlobalAppUpp.getCookie('facePieces') != (numberClean($('#potongan_adj').val())*1) ) {
			strNote += 'Potongan Lain-lain \n';
		}*/
    	
		/*$('#formApproveUpp').parsley().validate("first");
    	if ($('#formApproveUpp').parsley().isValid("first")) {
	        var cekSpace = checkSpace($('#notes').val());
	        if (cekSpace == false && $('#notes').val() == "") {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
	        
	        if ($('#notes').val() == "") {
	        	$('#notes').css('background-color', '#f2dede');
	        	$('.message-note').html('Tidak Boleh Kosong');
                $('#error').show();
	            return false;
	        }
    	}*/
		
		var ket = GlobalAppUpp.getCookie('typeUpp') +' : '+ $('#nik_sap').val() + ' - ' +$('#nama_lengkap').val()+' - '+ $('#jabatan').val() +' - '+$('#status_karyawan').val() + '. Total Yang Diberikan Rp ' +numberFormat(GlobalAppUpp.getCookie('totalTapPayFirst'), 2) + ' (Koreksi menjadi Rp '+ $('#total_dibayarkan_tap').val() + ')';

        $('#hf_keterangan').val(ket);
        
		strNote += $('#notes').val();
		
	} else {
		strNote = $('#notes').val();
		$('#hf_keterangan').val('');
	}
	GlobalAppUpp.setCookie('noteUI', $('#notes').val());
	$('#notes').val(strNote);
	$('#reason-accaptance').text(strNote);
}
function checkSpace (notes) {
    return /\S/.test(notes);
}