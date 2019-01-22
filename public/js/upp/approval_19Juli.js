var divideCuti = 25;
var _tempNumber = 0;

function prepareModal(status, modal) {
    if($('#notes').val() == "" && status != 'A' && status != 'F'){
          $('#error').show();
          return false;
    } else{
          $('#error').hide();
          $('#status').val(status);
          $(modal).modal('show');
          $('.total-tap').html($('#total_dibayarkan_tap').val());
          $('.alasan').html($('#notes').val()); 
    }
}

function calculateUpp() {
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

    if (totalBruto > 50000000 && totalBruto <= 100000000) {
          pph1 = totalBruto * 0.05;
    } else if (totalBruto > 100000000 && totalBruto <= 500000000) {
          pph1 = 100000000 * 0.05;
          pph2 = (totalBruto - 100000000) * 0.15;
    } else if (totalBruto > 500000000) {
          pph1 = 100000000 * 0.05;
          pph2 = 400000000 * 0.15;
          pph3 = (totalBruto - 500000000) * 0.25;
    }

    var pph = (pph1 * 1) + (pph2 * 1) + (pph3 * 1)
    // console.log((pph1 * 1) + '+' + (pph2 * 1) + '+' + (pph3 * 1));
    setNumberFormat($('#pph'), pph);
    
    var total_netto = totalBruto - pph;
    setNumberFormat($('#total_netto'), total_netto);

    var total_tap = total_netto - potongan;
    setNumberFormat($('#total_dibayarkan_tap'), total_tap);
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
        prepareModal('T', '#myModalTanyaUser');
    });

    $('#btnConfirm').click(function() {
        $('#user').val($('#optUser').val());
        $('#myModalTanyaUser').modal('hide');
        prepareModal('T', '#myModalTanya');
    });
    
    $('#acceptApproveUpp').click(function() {
        prepareModal('A','#myModalSetuju');
    });

    $('#rejectApproveUpp').click(function() {
        prepareModal('R','#myModalTolak');
    });

    $('#sendApproveUpp').click(function() {
        prepareModal('J','#myModalJawab');
    });

    $('#btn-selesai').click(function() {
        prepareModal('F','#myModalKirim');
    });

    $('#btn-batal').click(function() {
        prepareModal('C','#myModalKirim');
    });
});