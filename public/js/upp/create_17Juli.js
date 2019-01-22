    var atasan;
    var validate = false;
    var idFile = ['thisFile0'];
    console.log("USER ID:"+GlobalUpp.getCookie('myUserIdUpp'));
    console.log(localStorage);
    var idUsers = GlobalUpp.getCookie('myUserIdUpp');
    /*var level_jbt = $('#level_jbt'); 
    var jbt = $('#jbt');
    var company = $('#company');
    var ba_code = $('#ba_code');
    var number_of_needs = $('#number_of_needs');
    var request_date = $('#request_date'); 
    var needs_date = $('#needs_date'); 
    var head = $('#head'); 
    var emp_status = $('#emp_status');
    var start_contract = $('#start_contract'); */
    
    /*** For LocalStorage ***/
    function clearSessionUser(){
        var idUser = GlobalUpp.getCookie('myUserIdUpp');
        var searchThis = 'user' + idUser + '_';
        var asd = [];
        Object.keys(localStorage)
        .forEach(function(key){
            var value = key;
            var low = value.toLowerCase();
            var cek = low.match(searchThis);
            if (cek) {
                localStorage.removeItem(key);
            }
        });
        GlobalUpp.setCookie('showClick', false);
    }
    
    function getStorage(){
        if (localStorage.getItem('user' + idUsers + '_company') != 'null') {
            $('#company').val(localStorage.getItem('user' + idUsers + '_company'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_ba_code') != 'null') {
            $('#ba_code').val(localStorage.getItem('user' + idUsers + '_ba_code'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_jp_code') != 'null') {
            $('#jp_code').val(localStorage.getItem('user' + idUsers + '_jp_code'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_code_terminasi') != 'null') {
            $('#code_terminasi').val(localStorage.getItem('user' + idUsers + '_code_terminasi'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_nik_national') != 'null') {
            $('#nik_national').val(localStorage.getItem('user' + idUsers + '_nik_national'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_nik_sap') != 'null') {
            $('#nik_sap').val(localStorage.getItem('user' + idUsers + '_nik_sap'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_nama_karyawan') != 'null') {
            $('#nama_karyawan').val(localStorage.getItem('user' + idUsers + '_nama_karyawan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_nama_lengkap') != 'null') {
            $('#nama_lengkap').val(localStorage.getItem('user' + idUsers + '_nama_lengkap'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tempat_lahir') != 'null') {
            $('#tempat_lahir').val(localStorage.getItem('user' + idUsers + '_tempat_lahir'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tanggal_lahir') != 'null') {
            $('#tanggal_lahir').val(localStorage.getItem('user' + idUsers + '_tanggal_lahir'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tanggal_lahir_char') != 'null') {
            $('#tanggal_lahir_char').val(localStorage.getItem('user' + idUsers + '_tanggal_lahir_char'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_agama') != 'null') {
            $('#agama').val(localStorage.getItem('user' + idUsers + '_agama'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_ktp') != 'null') {
            $('#ktp').val(localStorage.getItem('user' + idUsers + '_ktp'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_npwp') != 'null') {
            $('#npwp').val(localStorage.getItem('user' + idUsers + '_npwp'));
        }
        if (localStorage.getItem('user' + idUsers + '_alamat') != 'null') {
            $('#alamat').val(localStorage.getItem('user' + idUsers + '_alamat'));
        }
        if (localStorage.getItem('user' + idUsers + '_telepon') != 'null') {
            $('#telepon').val(localStorage.getItem('user' + idUsers + '_telepon'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_handphone') != 'null') {
            $('#handphone').val(localStorage.getItem('user' + idUsers + '_handphone'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tanggal_masuk') != 'null') {
            $('#tanggal_masuk').val(localStorage.getItem('user' + idUsers + '_tanggal_masuk'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tanggal_keluar') != 'null') {
            $('#tanggal_keluar').val(localStorage.getItem('user' + idUsers + '_tanggal_keluar'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tanggal_masuk_char') != 'null') {
            $('#tanggal_masuk_char').val(localStorage.getItem('user' + idUsers + '_tanggal_masuk_char'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_tanggal_keluar_char') != 'null') {
            $('#tanggal_keluar_char').val(localStorage.getItem('user' + idUsers + '_tanggal_keluar_char'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_lama_bekerja') != 'null') {
            $('#lama_bekerja').val(localStorage.getItem('user' + idUsers + '_lama_bekerja'));
        }
            
        if (localStorage.getItem('user' + idUsers + '_jenis_terminasi') != 'null') {
            $('#jenis_terminasi').val(localStorage.getItem('user' + idUsers + '_jenis_terminasi'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_alasan') != 'null') {
            $('#alasan').val(localStorage.getItem('user' + idUsers + '_alasan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_jabatan') != 'null') {
            $('#jabatan').val(localStorage.getItem('user' + idUsers + '_jabatan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_status_karyawan') != 'null') {
            $('#status_karyawan').val(localStorage.getItem('user' + idUsers + '_status_karyawan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_status_karyawan_text') != 'null') {
            $('#status_karyawan_text').val(localStorage.getItem('user' + idUsers + '_status_karyawan_text'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_gaji_pokok') != 'null') {
            $('#gaji_pokok').val(localStorage.getItem('user' + idUsers + '_gaji_pokok'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan') != 'null') {
            $('#sisa_cuti_tahunan').val(localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_uang_pp') != 'null') {
            $('#uang_pp').val(localStorage.getItem('user' + idUsers + '_uang_pp'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_uang_penghargaan') != 'null') {
            $('#uang_penghargaan').val(localStorage.getItem('user' + idUsers + '_uang_penghargaan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_uang_penggantian_hak') != 'null') {
            $('#uang_penggantian_hak').val(localStorage.getItem('user' + idUsers + '_uang_penggantian_hak'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan_from_sap') != 'null') { 
            $('#sisa_cuti_tahunan_from_sap').val(localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan_from_sap'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan_kalkulasi') != 'null') {
            $('#sisa_cuti_tahunan_kalkulasi').val(localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan_kalkulasi'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan') != 'null') {
            $('#sisa_cuti_tahunan').val(localStorage.getItem('user' + idUsers + '_sisa_cuti_tahunan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_showClick')) {
            GlobalUpp.setCookie('showClick', localStorage.getItem('user' + idUsers + '_showClick'))
        }
        /*if (localStorage.getItem('user' + idUsers + '_divide_cuti') != 'null') {
            $('#divide_cuti').val(localStorage.getItem('user' + idUsers + '_divide_cuti'));
        }*/
        
        if (localStorage.getItem('user' + idUsers + '_lain_lain') != 'null') {
            $('#lain_lain').val(localStorage.getItem('user' + idUsers + '_lain_lain'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_total_bruto') != 'null') {
            $('#total_bruto').val(localStorage.getItem('user' + idUsers + '_total_bruto'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_pph') != 'null') {
            $('#pph').val(localStorage.getItem('user' + idUsers + '_pph'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_total_netto') != 'null') {
            $('#total_netto').val(localStorage.getItem('user' + idUsers + '_total_netto'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_potongan_note') != 'null') {
            $('#potongan_note').val(localStorage.getItem('user' + idUsers + '_potongan_note'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_potongan') != 'null') {
            $('#potongan').val(localStorage.getItem('user' + idUsers + '_potongan'));
        }
        
        if (localStorage.getItem('user' + idUsers + '_total_dibayarkan_tap') != 'null') {
            $('#total_dibayarkan_tap').val(localStorage.getItem('user' + idUsers + '_total_dibayarkan_tap'));
        }
    }
    
    function setStorage(){
      //On Change
        $('#company').change(function(){
            var companyVal = $(this).val();
            localStorage.setItem('user' + idUsers + '_company', companyVal);
        });

        $('#ba_code').change(function(){
            var baCodeVal = $(this).val();
            //console.log('sini');
            if (baCodeVal != "") {
                $('#ba_code').parsley().validate("first");
                select2_failed('#box-ba-code');
            }
            
            localStorage.setItem('user' + idUsers + '_ba_code', baCodeVal);
        });

        $('#jp_code').change(function(){
            var jpCodeVal = $(this).val();
            if (jpCodeVal != "") {
                $('#jp_code').parsley().validate("first");
                select2_failed('#box-jp-code');
            }
            
            localStorage.setItem('user' + idUsers + '_jp_code', jpCodeVal);
        });
       
        $('#potongan_note').keyup(function(){
            var potonganNoteVal = $(this).val();
            if (potonganNoteVal) {
                localStorage.setItem('user' + idUsers + '_potongan_note', potonganNoteVal);
            }
            
        });
        //localStorage.setItem('user' + idUsers + '_divide_cuti', $('#divide_cuti').val());
    }
    /*=== End Here ===*/
    
    /*** For Attachment File ***/
    function removeThis(z){
      $('#thisFile' + z).remove();
      removeA(idFile, 'thisFile' + z);
    }
  
    function removeA(arr) {
      var what, a = arguments, L = a.length, ax;
      while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax= arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1);
          }
      }
      return arr;
    }
    
    var success = []; 
    //BELUM SELESAI FILE NAME CHARACTER
    function cekFileName(){
        success = [];
        var fileInput = $('.lampiran');
        var msg = '<ul class="parsley-errors-list filled maxchar"><li class="parsley-required">Nama file melebihi 25 character.</li></ul>';
        fileInput.each(function(){
        var lamp = $(this).val().substr(0, $(this).val().lastIndexOf('.')).length;
        if (lamp > 25) {
            $(this).parent().find('.maxchar').remove();
            $(this).css('background-color' , '#f2dede');
            $(this).css('color' , '#b94a48');
            $(this).parent().append(msg);
            success.push('false');
        }
        else
        {
          $(this).parent().find('.maxchar').remove();
          if (!$(this).next()) {
              $(this).css('background-color' , '#f2dede');
              $(this).css('color' , '#b94a48');
          } else {
              $(this).css('background-color' , '#dff0d8');
              $(this).css('color' , '#468847');
          }
          //$(this).css('background-color' , '#dff0d8');

          success.push('true');
        }
      });
    }

    function maxChar(a){
      if (validate) {cekFileName();}
    }
    /*=== End Here ===*/
    
    /*** For Show List Terminasi ***/   
    function showData(num) {
       var nik_sap = $('#fill_nik_sap_'+num).val();
       var code_terminasi = $('#fill_doc_termination_code_'+num).val();
       var reason_resign = $('#fill_reason_'+num).val();
       var res_date = $('#fill_res_date_'+num).val();
       var jp_code = $('#jp_code').val();
       $.ajax({
            url   : 'upp/selectDataTeminasi',
            method  : 'post',
            data : {'nik_sap' : nik_sap, 'code_trm' : code_terminasi, 'jp_code' : jp_code},
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success : function(data) {
            console.log(data);
                if (data.result_count_api != '0') {
                    if (code_terminasi) {
                        $('#code_terminasi').val(code_terminasi);
                        localStorage.setItem('user' + idUsers + '_code_terminasi', code_terminasi);
                    }
                    
                    if (data.nik_nasional) {
                        $('#nik_national').val(data.nik_nasional);
                        localStorage.setItem('user' + idUsers + '_nik_national', data.nik_nasional);
                    }
                    
                    if (data.nik) {
                        $('#nik_sap').val(data.nik);
                        localStorage.setItem('user' + idUsers + '_nik_sap', data.nik);
                    }
                    
                    if (data.employee_name) {
                        $('#nama_karyawan').val(data.employee_name);
                        localStorage.setItem('user' + idUsers + '_nama_karyawan', data.employee_name);
                    }
                    
                    if (data.employee_name) {
                        $('#nama_lengkap').val(data.employee_name);
                        localStorage.setItem('user' + idUsers + '_nama_lengkap', data.employee_name);
                    }
                    
                    if (data.pob) {
                        $('#tempat_lahir').val(data.pob);
                        localStorage.setItem('user' + idUsers + '_tempat_lahir', data.pob);
                    }
                    
                    if (data.dob) {
                        $('#tanggal_lahir').val(data.dob);
                        localStorage.setItem('user' + idUsers + '_tanggal_lahir', data.dob);
                    }
                    
                    if (data.dob_char) {
                        $('#tanggal_lahir_char').val(data.dob_char);
                        localStorage.setItem('user' + idUsers + '_tanggal_lahir_char', data.dob_char);
                    }
                    
                    if (data.no_ktp) {
                        $('#ktp').val(data.no_ktp);
                        localStorage.setItem('user' + idUsers + '_ktp', data.no_ktp);
                    }
                    
                    if (data.religion) {
                        $('#agama').val(data.religion);
                        localStorage.setItem('user' + idUsers + '_agama', data.religion);
                    }
                    
                    if (data.npwp) {
                        $('#npwp').val(data.npwp);
                        localStorage.setItem('user' + idUsers + '_npwp', data.npwp);
                    }
                    
                    if (data.address) {
                        $('#alamat').val(data.address);
                        localStorage.setItem('user' + idUsers + '_alamat', data.address);
                    }
                    
                    if (data.phone) {
                        $('#telepon').val(data.phone);
                        localStorage.setItem('user' + idUsers + '_telepon', data.phone);
                    }
                    
                    if (data.mobile_phone) {
                        $('#handphone').val(data.mobile_phone);
                        localStorage.setItem('user' + idUsers + '_handphone', data.mobile_phone);
                    }
                    
                    if (data.join_date) {
                        $('#tanggal_masuk').val(data.join_date);
                        localStorage.setItem('user' + idUsers + '_tanggal_masuk', data.join_date);
                    }
                    
                    if (data.res_date) {
                        $('#tanggal_keluar').val(data.RES_DATE);
                        localStorage.setItem('user' + idUsers + '_tanggal_keluar', data.res_date);
                    }
                    
                    if (data.join_date_char) {
                        $('#tanggal_masuk_char').val(data.join_date_char);
                        localStorage.setItem('user' + idUsers + '_tanggal_masuk_char', data.join_date_char);
                    }
                    
                    if (data.res_date_char) {
                        $('#tanggal_keluar_char').val(data.res_date_char);
                        localStorage.setItem('user' + idUsers + '_tanggal_keluar_char', data.res_date_char);
                    }
                    
                    if (data.work_period) {
                        $('#lama_bekerja').val(data.work_period);
                        localStorage.setItem('user' + idUsers + '_lama_bekerja', data.work_period);
                    }
                    
                    if (data.type_termination) {
                        $('#jenis_terminasi').val(data.type_termination);
                        localStorage.setItem('user' + idUsers + '_jenis_terminasi', data.type_termination);
                    }
                    
                    if (reason_resign) {
                        $('#alasan').val(reason_resign);
                        localStorage.setItem('user' + idUsers + '_alasan', reason_resign);
                    }
                    
                    if (data.job_code) {
                        $('#jabatan').val(data.job_code);
                        localStorage.setItem('user' + idUsers + '_jabatan', data.job_code);
                    }
                    
                    if (data.status) {
                        $('#status_karyawan').val(data.status);
                        localStorage.setItem('user' + idUsers + '_status_karyawan', data.status);
                        
                        $('#status_karyawan_text').val(data.status_text);
                        localStorage.setItem('user' + idUsers + '_status_karyawan_text', data.status_text);
                    }
                    /*$('#gaji_pokok').val(data.SALARY);
                    $('#uang_pp').val(data.UPP);
                    $('#uang_penghargaan').val(data.REWARD);
                    $('#uang_penggantian_hak').val(data.COMPENSATION);*/
                    if (data.salary) {
                        setNumberFormat($('#gaji_pokok'), data.salary);
                        localStorage.setItem('user' + idUsers + '_gaji_pokok', $('#gaji_pokok').val());
                    }
                    
                    if (data.upp) {
                        setNumberFormat($('#uang_pp'), data.upp);
                        localStorage.setItem('user' + idUsers + '_uang_pp', $('#uang_pp').val());
                    }
                    
                    if (data.reward) {
                        setNumberFormat($('#uang_penghargaan'), data.reward);
                        localStorage.setItem('user' + idUsers + '_uang_penghargaan', $('#uang_penghargaan').val());
                    }
                    
                    if (data.compensation) {
                        setNumberFormat($('#uang_penggantian_hak'), data.compensation);
                        localStorage.setItem('user' + idUsers + '_uang_penggantian_hak', $('#uang_penggantian_hak').val());
                    }
                    
                    if (data.remain_cuti) {
                        $('#sisa_cuti_tahunan_from_sap').val(data.remain_cuti);
                        localStorage.setItem('user' + idUsers + '_sisa_cuti_tahunan_from_sap', data.remain_cuti);
                    }
                    
                    if (data.work_period_year) {
                        $('#work_period_year').val(data.work_period_year);
                        localStorage.setItem('user' + idUsers + '_work_period_year', data.work_period_year);
                    }
                    
                    GlobalUpp.setCookie('showClick',true);
                    localStorage.setItem('user' + idUsers + '_showClick', true);
                    $('#myModal').modal('hide');
                    $.ajax({
                        url   : 'upp/getPhotoByNik',
                        method  : 'post',
                        data : {'nik_sap' : nik_sap},
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        success : function(result) {
                            if (result.blob_content) {
                                var photoData = 'data:'+result.mime_type+';base64,'+result.blob_content;
                                $('#photo').attr('src',photoData);
                                $('#photo').removeClass('hide');
                                $('#foto').hide();
                            } else {
                                var photoData = '//:0';
                                $('#photo').attr('src',photoData);
                                $('#photo').addClass('hide');
                                $('#foto').show();
                            }
                            
                            
                        }
                    });
                    GlobalUpp.setCookie('showClick',true);
                    calculateUPP();
                  //$('#data-terminasi').html('').append(fill);
                } else {
                    GlobalUpp.setCookie('showClick',false);
                    swal("Oh No!", "Result api for NIK SAP "+ nik_sap+ " is empty data", "error");
                }
            },
            error   : function() {
                GlobalUpp.setCookie('showClick',false);
                $('#myModal').modal('hide');
            }
        });
    }
    /*=== End Here ===*/
    
    /*** For Validate Select2 ***/
    function select2_failed(id_div)
    { 
        var messages = '';
        var elementSelect = $(id_div + ' > select');
        var elementbox = $(id_div+' > span > span > span');
        if (elementSelect.val() == null || elementSelect.val().length == 0){
            messages = $(id_div).find('ul');
            //messages.addClass('hide');
            //messages.remove();
            $(id_div).append(messages);
            elementbox.css('background-color', '#f2dede');
        } else {
            elementbox.css('background-color', '#dff0d8');
        }
    }
    /*=== End Here ===*/
    
    $(document).ready(function(){
        /*** For Format Number ***/
        $('.numb').on('keydown', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
        /*=== End Here ===*/
        
        /*** For LocalStorage ***/
        if (localStorage) {
            getStorage();
            setStorage();
        } else {
            swal("Oh No!", "Your browser not Support", "error");
            //alert("not Support");
        }
        /*=== End Here ===*/
        
        /*** For Select2 ***/
        $("#company").select2({
            placeholder : "Perusahaan",
            allowClear:true,
        });
        $('#box-company > span > span > span').addClass('spinnerInput');
        $.get('api/getCompany/' + GlobalUpp.getCookie('myAreaCodeUpp'))
            .done(function(data){
                var cmd = 1;
                var datas = new Array();
                datas[0] = {id:"",text:null};
                for (var key in data) {
                    datas[cmd] = {id : data[key].id, text: data[key].text}
                    cmd++;
                }
                $("#company").select2({
                    placeholder : "Perusahaan",
                    allowClear:true,
                    data : datas
                }).on('select2:unselecting', function(){
                    $('#company').parsley().destroy();
                    $('#box-company > span > span > span').css('background-color', '#FFF');
                });
                
                $('#box-company > span > span > span').removeClass('spinnerInput');
                if (localStorage.getItem('user' + idUsers + '_company') !== null) {
                    $('#company').val(localStorage.getItem('user' + idUsers + '_company')).change();
                } else {
                    $("#company").val("");
                }
        });
        
        $("#ba_code").select2({
            placeholder : "Bisnis Area",
            allowClear:true,
        });
        
        $('#company').change(function(){
            var id = $(this).val();
            if (id) {
                $('#company').parsley().validate("first");
                select2_failed('#box-company');
                
                $('#box-ba-code > span > span > span').addClass('spinnerInput');
                $.get('api/getBisnisArea/'+id)
                    .done(function(data){
                        var cmd = 1;
                        var datas = new Array();
                        datas[0] = {id:"",text:null};
                        for (var key in data) {
                            datas[cmd] = {id : data[key].id, text: data[key].text}
                            cmd++;
                        }
                        $("#ba_code").select2({
                          placeholder : "Bisnis Area",
                          allowClear:true,
                          data : datas
                        }).on('select2:unselecting', function(){
                            $('#ba_code').parsley().destroy();
                            $('#box-ba-code > span > span > span').css('background-color', '#FFF');
                        });
                        
                        $('#box-ba-code > span > span > span').removeClass('spinnerInput');
                        if (localStorage.getItem('user' + idUsers + '_ba_code') !== null) {
                            $('#ba_code').val(localStorage.getItem('user' + idUsers + '_ba_code')).change();
                        } else {
                            $("#ba_code").val("");
                        }
                    // $("#ba_code").val(" ").change();
                });
            } else {
                $("#ba_code").html('');
                $("#ba_code").select2({
                    placeholder : "Bisnis Area",
                    allowClear:true,
                });
                
            }

        });
        
        $("#jp_code").select2({
            placeholder : "Jenis Pengajuan",
            allowClear:true,
        });
        $('#box-jp-code > span > span > span').addClass('spinnerInput');
        $.get('api/getDataJenisUPP').done(function(data){
            var cmd = 1;
            var datas = new Array();
            datas[0] = {id:"",text:null};
            for (var key in data) {
                datas[cmd] = {id : data[key].id, text: data[key].text}
                cmd++;
            }
            $("#jp_code").select2({
                placeholder : "Jenis Pengajuan",
                allowClear:true,
                data : datas
            }).on('select2:unselecting', function(){
                $('#jp_code').parsley().destroy();
                $('#box-jp-code > span > span > span').css('background-color', '#FFF');
            });
            // $("#company").val("").change();
            $('#box-jp-code > span > span > span').removeClass('spinnerInput');
            if (localStorage.getItem('user' + idUsers + '_jp_code') !== null) {
                $('#jp_code').val(localStorage.getItem('user' + idUsers + '_jp_code')).change();
            } else {
                $("#jp_code").val("");
            }
        });
        /*=== End Here ===*/
        
        /*** For Attachment File ***/
        window.Parsley.addValidator('maxFileSize', {
            validateString: function(_value, maxSize, parsleyInstance) {
                if (!window.FormData) {
                    swal("Oh No!", "You are making all developpers in the world cringe. Upgrade your browser!", "error");
                    return true;
                }
                var files = parsleyInstance.$element[0].files;
                return files.length != 1  || files[0].size <= maxSize * 1024;
            },
            requirementType: 'integer',
            messages: {
              id: 'File tidak boleh melebihi ukuran 5 MB'
            }
        });
        
        var z = 1;
        $('#add-another').click(function(){
            var cont = "<div class='col-sm-12' id='thisFile"+ z +"'><div class='row'><div class='col-sm-8 col-xs-10'><input type='file' name='lampiran"+ z +"' class='lampiran' id='file"+ z +"' onchange='maxChar(this)' style='margin-bottom: 3px; width:100%;' data-parsley-max-file-size='5000' data-parsley-group='first'></div><div class='col-sm-4 col-xs-2'><span class='btn btn-danger btn-xs' id='times"+ z +"' onclick='removeThis("+ z +")' style='margin-bottom: 5px;'><i class='fa fa-times'></i></span><i id='space"+ z +"'></div></div></div>"
            $('.push-it').append(cont);
            idFile.push('thisFile' + z);
            z++;
        });
        
        $('.lampiran').change(function(){
            if (validate) {cekFileName();}
        });
        
        /*=== End Here ===*/
        
        /*** For Show List Terminasi ***/    
        $('#show-list_terminasi').click(function(){
            var check = false;
            $('#company').parsley().validate("first");
            $('#ba_code').parsley().validate("first");
            $('#jp_code').parsley().validate("first");
            select2_failed('#box-company');
            select2_failed('#box-jp-code');
            select2_failed('#box-ba-code');
            if (!$('#company').val()) {
                check = true;
            }
            if (!$('#ba_code').val()) {
                check = true;
            }
            if (!$('#jp_code').val()) {
                check = true;
            }
            if (check === true) {
                return false;
            } else {
                $('#myModal').modal({backdrop: 'static', keyboard: false});
                $('#data-terminasi').html('');
                $('#formUpp').parsley().destroy();
                select2_failed('#box-company');
                select2_failed('#box-jp-code');
                select2_failed('#box-ba-code');
                
                $.ajax({
                    url   : 'upp/getListDataTerminasi',
                    method  : 'post',
                    data : {'comp_code' : $('#company').val(), 'ba_code' : $('#ba_code').val()},
                    headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success : function(data) {
                        if (data) {
                              fill = '';
                              for (var obj in data) {
                                  fill +=  '<tr>'+
                                              '<td>'+data[obj].effective_date_termination+'</td>'+
                                              '<td>'+data[obj].doc_termination_code+'</td>'+
                                              '<td>'+data[obj].nik_sap+'</td>'+
                                              '<td>'+data[obj].nik_nasional+'</td>'+
                                              '<td>'+data[obj].emp_name+'</td>'+
                                              '<td><button type="button" class="btn btn-success" onclick="showData('+obj+')">Pilih</button></td>'+
                                              '<input type="hidden" id="fill_doc_termination_code_'+obj+'" value="'+data[obj].doc_termination_code+'">'+
                                              '<input type="hidden" id="fill_res_date_'+obj+'" value="'+data[obj].effective_date_termination+'">'+
                                              '<input type="hidden" id="fill_nik_sap_'+obj+'" value="'+data[obj].nik_sap+'">'+
                                              '<input type="hidden" id="fill_reason_'+obj+'" value="'+data[obj].reason_resign+'">'+
                                          '</tr>';
                              }
                              $("#table-select-trm tfoot th").each(function(){
                                  var title = $(this).text();
                                  if (title != 'Action') {
                                      $(this).html('<input type="text" placeholder="'+title+'" />');
                                  }
                              });
                              $("#table-select-trm").DataTable().destroy();
                              $('#data-terminasi').html('').append(fill);
                              var tableData = $("#table-select-trm").DataTable({ 
                                  "order" :[[4, "desc"]], "scrollX"   : true
                              });

                              tableData.columns().every(function(){
                                  var that  = this;
                                  $('input', this.footer()).on('keyup change', function () {
                                      if (that.search() !== this.value) {
                                          that.search(this.value).draw();
                                      }
                                  });
                              });

                              $('#table-select-trm_filter').hide();
                          }
                    },
                    error   : function() {
                        //$('#myModal').modal('hide');
                    }
                  });
                /*  
                $.get('upp/getListDataTerminasi')
                    .done(function(data){
                        if (data) {
                            fill = '';
                            for (var obj in data) {
                                fill +=  '<tr>'+
                                            '<td>'+data[obj].effective_date_termination+'</td>'+
                                            '<td>'+data[obj].doc_termination_code+'</td>'+
                                            '<td>'+data[obj].nik_sap+'</td>'+
                                            '<td>'+data[obj].nik_nasional+'</td>'+
                                            '<td>'+data[obj].emp_name+'</td>'+
                                            '<td><button type="button" class="btn btn-success" onclick="showData('+obj+')">Pilih</button></td>'+
                                            '<input type="hidden" id="fill_doc_termination_code_'+obj+'" value="'+data[obj].doc_termination_code+'">'+
                                            '<input type="hidden" id="fill_res_date_'+obj+'" value="'+data[obj].effective_date_termination+'">'+
                                            '<input type="hidden" id="fill_nik_sap_'+obj+'" value="'+data[obj].nik_sap+'">'+
                                            '<input type="hidden" id="fill_reason_'+obj+'" value="'+data[obj].reason_resign+'">'+
                                        '</tr>';
                            }
                            $("#table-select-trm tfoot th").each(function(){
                                var title = $(this).text();
                                if (title != 'Action') {
                                    $(this).html('<input type="text" placeholder="'+title+'" />');
                                }
                            });
                            $("#table-select-trm").DataTable().destroy();
                            $('#data-terminasi').html('').append(fill);
                            var tableData = $("#table-select-trm").DataTable({ 
                                "order" :[[4, "desc"]], "scrollX"   : true
                            });

                            tableData.columns().every(function(){
                                var that  = this;
                                $('input', this.footer()).on('keyup change', function () {
                                    if (that.search() !== this.value) {
                                        that.search(this.value).draw();
                                    }
                                });
                            });
                            
                            $('#table-select-trm_filter').hide();
                        }
                });*/
            }
        });
        
        $(".btn-search").click(function(){
            $(this).button('loading').delay(2000).queue(function() {
                $(this).button('reset');
                $(this).dequeue();
            });        
        });
        
        $('#submit-search').click(function(){
            var search_by = $('#search_by').val();
            var param = $('#param_search').val();
            $.ajax({
              url   : 'upp/getListDataTerminasi',
              method  : 'post',
              data : {'search_by' : search_by, 'param' : param},
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
              success : function(data) {
                if (data) {
                    fill = '';
                    for (var obj in data) {
                        fill +=  '<tr>'+
                                    '<td>'+data[obj].effective_date_termination+'</td>'+
                                    '<td>'+data[obj].doc_termination_code+'</td>'+
                                    '<td>'+data[obj].nik_sap+'</td>'+
                                    '<td>'+data[obj].nik_nasional+'</td>'+
                                    '<td>'+data[obj].emp_name+'</td>'+
                                    '<td><button type="button" class="btn btn-success" onclick="showData('+obj+')">Pilih</button></td>'+
                                    '<input type="hidden" id="fill_doc_termination_code_'+obj+'" value="'+data[obj].doc_termination_code+'">'+
                                    '<input type="hidden" id="fill_res_date_'+obj+'" value="'+data[obj].effective_date_termination+'">'+
                                    '<input type="hidden" id="fill_nik_sap_'+obj+'" value="'+data[obj].nik_sap+'">'+
                                    '<input type="hidden" id="fill_reason_'+obj+'" value="'+data[obj].reason_resign+'">'+
                                '</tr>';
                    }
                    $("#table-select-trm tfoot th").each(function(){
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="'+title+'" />');
                    });
                    $("#table-select-trm").DataTable().destroy();
                    $('#data-terminasi').html('').append(fill);
                    var tableData = $("#table-select-trm").DataTable({ 
                        "order" :[[4, "desc"]], "scrollX"   : true
                    });

                    tableData.columns().every(function(){
                        var that  = this;
                        $('input', this.footer()).on('keyup change', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });

                    $('#table-select-trm_filter').hide();
                }
              },
              error   : function() {
                  //$('#myModal').modal('hide');
              }
            });
        });
        
        /*=== End Here ===*/
        
        /*** For Show Modal Ajukan ***/
        $('#btn-confirm').click(function(){
            $('#formUpp').parsley().validate("first");
            validate = true;
            select2_failed('#box-company');
            select2_failed('#box-jp-code');
            select2_failed('#box-ba-code');
            cekFileName();
            var cek = success.indexOf("false");
            //console.log('ini yg bner '+GlobalUpp.getCookie('showClick'));
            if ($('#formUpp').parsley().isValid("first") && cek < 0) {
                if (GlobalUpp.getCookie('showClick') != 'true') {
                    swal("Oh No!", "Please click button Show then select one from the list and fill fields marked red", "error");
                    return false;
                }
                $('#formUpp').parsley().destroy();
                $('#myModalKonfirmasi').modal({backdrop: 'static', keyboard: false});
                $('#tgl-pengajuan-konf').html(GlobalUpp.getCookie('dateNow'));
                $('#perusahaan-konf').html($('#company :selected').text());
                $('#area-bisnis-konf').html($('#ba_code :selected').text());
                $('#jns-pengajuan-konf').html($('#jp_code :selected').text());
                $('#jns-terminasi-konf').html($('#jenis_terminasi').val());
                $('#nama-karyawan-konf').html($('#nama_karyawan').val());
                $('#jabatan-konf').html($('#jabatan').val());
                $('#total-tap-konf').html($('#total_dibayarkan_tap').val());
                //clearSessionUser();

                var ba = $('#ba_code').text();
                var typeUpp = '';
                if ($('#jp_code').val() == 'JP01') {
                    typeUpp = 'Uang Pisah';
                } else if ($('#jp_code').val() == 'JP02') {
                    typeUpp = 'Uang Pesangon';
                }
                
                var ket = typeUpp +' '+$('#nama_karyawan').val()+' '+ $('#nik_sap').val();

                //var ket = 'UPP '+lev;
                $('#hf_keterangan').val(ket);
                $('#hf_lokasi').val(ba);
                $('.spn-lokasi').html(ba);
            } else {
                
            }
            
        });
        
        $('.ajukan').click(function(){
            $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
            });

            var formdata = new FormData();

            var num = 0;
            $('.lampiran').each(function(){
                var name = $(this).attr('name');
                var ofile = $(this)[0].files[0];
                $lampiran = "lampiran"+num;
                formdata.append($lampiran,ofile);
                num++;
            });

            var data = $("#formUpp").serializeArray();
            $.each(data,function(key,input){
                formdata.append(input.name,input.value);
            });
            $('#myModalKonfirmasi').modal('hide');
            $.ajax({
                url   : 'upp/save',
                method  : 'post',
                data  : formdata,
                contentType: false,
                processData: false,
                success : function(data) {
                if (data.wsdl == 'OK'){
                    $('#myModalBerhasilUPP').modal({backdrop: 'static', keyboard: false});
                    $('#doc-upp-code-bsl').html(data.doc_code);
                    $('#tgl-pengajuan-bsl').html(GlobalUpp.getCookie('dateNow'));
                    $('#perusahaan-bsl').html($('#company :selected').text());
                    $('#area-bisnis-bsl').html($('#ba_code :selected').text());
                    $('#jns-pengajuan-bsl').html($('#jp_code :selected').text());
                    $('#jns-terminasi-bsl').html($('#jenis_terminasi').val());
                    $('#nama-karyawan-bsl').html($('#nama_karyawan').val());
                    $('#jabatan-bsl').html($('#jabatan').val());
                    $('#total-tap-bsl').html($('#total_dibayarkan_tap').val());
                    clearSessionUser();
                    //$('#myModalKonfirmasi').modal('hide');
                } else {
                    $('#myModalGagalUPP').modal({backdrop: 'static', keyboard: false});
                    $('#tgl-pengajuan-ggl').html(GlobalUpp.getCookie('dateNow'));
                    $('#perusahaan-ggl').html($('#company :selected').text());
                    $('#area-bisnis-ggl').html($('#ba_code :selected').text());
                    $('#jns-pengajuan-ggl').html($('#jp_code :selected').text());
                    $('#jns-terminasi-ggl').html($('#jenis_terminasi').val());
                    $('#nama-karyawan-ggl').html($('#nama_karyawan').val());
                    $('#jabatan-ggl').html($('#jabatan').val());
                    $('#total-tap-ggl').html($('#total_dibayarkan_tap').val());
                    // $('#myModalKonfirmasi').modal('hide');
                }
              },
              error   : function() {
                $('#myModalGagalUPP').modal({backdrop: 'static', keyboard: false});
                $('#tgl-pengajuan-ggl').html(GlobalUpp.getCookie('dateNow'));
                $('#perusahaan-ggl').html($('#company :selected').text());
                $('#area-bisnis-ggl').html($('#ba_code :selected').text());
                $('#jns-pengajuan-ggl').html($('#jp_code :selected').text());
                $('#jns-terminasi-ggl').html($('#jenis_terminasi').val());
                $('#nama-karyawan-ggl').html($('#nama_karyawan').val());
                $('#jabatan-ggl').html($('#jabatan').val());
                $('#total-tap-ggl').html($('#total_dibayarkan_tap').val());
                // $('#myModalKonfirmasi').modal('hide');
              }
            });
        });
        /*=== End Here ===*/
        
        /*** For button batal ***/
        $('#batal').click(function(e){
            e.preventDefault();
            clearSessionUser();
            window.location = e.target.href;
        });
        /*=== End Here ===*/
        
        /*** For button tutup ***/
        $('#btn-tutup').click(function(){
            $('#myModal').modal('hide');
        });
        /*=== End Here ===*/
        
        /*** For Calculate UPP */
        $('#sisa_cuti_tahunan_kalkulasi').keyup(function(){
            var gapok = numberClean($('#gaji_pokok').val());
            var divide = numberClean($('#divide_cuti').val());
            var multiplier = numberClean($('#sisa_cuti_tahunan_kalkulasi').val());

            var sisaCutiTahuhanCalcVal = $(this).val();
            localStorage.setItem('user' + idUsers + '_sisa_cuti_tahunan_kalkulasi', sisaCutiTahuhanCalcVal);

            var count = multiplier*(gapok/divide);
            //console.log('multiplier : '+ multiplier + '; gapok : '+ gapok+ '; divide :' + divide);
            setNumberFormat($('#sisa_cuti_tahunan'), count);
            localStorage.setItem('user' + idUsers + '_sisa_cuti_tahunan', $('#sisa_cuti_tahunan').val());
            //$('#sisa_cuti_tahunan').val(count);
            calculateUPP();
        });
        
        $('#lain_lain_adj').keydown(function(e) { 
            return numberOnly(e);
        });
        
        $('#lain_lain_adj').blur(function(e) { 
            var lain_lain_adj_val = numberClean($(this).val());
            setNumberFormat($(this), lain_lain_adj_val);
            localStorage.setItem('user' + idUsers + '_lain_lain', $(this).val());
        });
        
        $('#lain_lain').keyup(function(e) {
            calculateUPP();
        });
        
        $('#lain_lain').keydown(function(e) {
            return numberOnly(e);
        });
        
        $('#lain_lain').blur(function() {
            var lain_lain_val = numberClean($(this).val());
            setNumberFormat($(this), lain_lain_val);
            localStorage.setItem('user' + idUsers + '_lain_lain', $(this).val());
        });
        
        $('#potongan').keydown(function(e) {
            return numberOnly(e);
        });

        $('#potongan').keyup(function(){
            calculateUPP();
        });
        
        $('#potongan').blur(function(){
            var potongan_adj_val = numberClean($(this).val());
            setNumberFormat($(this), potongan_adj_val);
            localStorage.setItem('user' + idUsers + '_potongan', $(this).val());
        });
        
        $("#jp_code").on("change", function() {
            if ($(this).val() !== null) {
                if ($('#nik_sap').val() !== null && $('#nik_sap').val() != '') {
                    getCalculateUpp();
                }
            }
        });
        
        /*=== End Here ===*/
    });
    
    /*** For Calculate UPP */
    function getCalculateUpp() {
        var jp_code = $('#jp_code').val();
        var work_period = $('#work_period_year').val();
        var salary = $('#gaji_pokok').val();
        $.ajax({
            url   : 'upp/getCalculateUpp',
            method  : 'post',
            data : {'jp_code' : jp_code, 'work_period' :work_period, 'salary' : salary},
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success : function(data) {
                    if (data) {
                        //$('#uang_pp').val(data.upp);
                        //$('#uang_penghargaan').val(data.reward);
                        //$('#uang_penggantian_hak').val(data.compensation);
                        setNumberFormat($('#uang_pp'), data.upp);
                        localStorage.setItem('user' + idUsers + '_uang_pp', $('#uang_pp').val());

                        setNumberFormat($('#uang_penghargaan'), data.reward);
                        localStorage.setItem('user' + idUsers + '_uang_penghargaan', $('#uang_penghargaan').val());

                        setNumberFormat($('#uang_penggantian_hak'), data.compensation);
                        localStorage.setItem('user' + idUsers + '_uang_penggantian_hak', $('#uang_penggantian_hak').val());
                        
                        calculateUPP();
                    }
            },
            error   : function() {}
        });
    }
    
    function calculateUPP() {
        var uangSisaCuti = numberClean($('#sisa_cuti_tahunan').val())*1;
        var uangPisahPesangon = numberClean($('#uang_pp').val())*1;
        var uangPenghargaan = numberClean($('#uang_penghargaan').val())*1;
        var uangPenggantianHak = numberClean($('#uang_penggantian_hak').val())*1;
        var lainLain = numberClean($('#lain_lain').val())*1;
        
        var totalBruto = uangPisahPesangon + uangPenghargaan + uangPenggantianHak + uangSisaCuti + lainLain;
        setNumberFormat( $('#total_bruto'), totalBruto);
        localStorage.setItem('user' + idUsers + '_total_bruto', $('#total_bruto').val());
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
            
            if (totalBrutoTemp > 50000000 && totalBrutoTemp <= 100000000) {
                if (totalBrutoTemp >= multiplier1) {
                    var multiplier2 = totalBrutoTemp - multiplier1;
                } else {
                    var multiplier2 = totalBrutoTemp;
                }
                totalBrutoTemp = totalBrutoTemp - multiplier1;
                pph2 = multiplier2*0.15;
            } else if (totalBrutoTemp > 100000000 && totalBrutoTemp <= 400000000) {
                var multiplier2 = totalBrutoTemp - 40000000;
                pph2 = multiplier2*0.15;
                totalBrutoTemp = totalBrutoTemp - multiplier1;
            } else if (totalBrutoTemp > 400000000) {
                var multiplier2 = 400000000;
                pph2 = multiplier2*0.15;
                totalBrutoTemp = totalBrutoTemp - multiplier1;
            }
            
            if (totalBrutoTemp > 400000000) {
                var multiplier3 = (totalBrutoTemp)*1 - 400000000;
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
                console.log('sini donkk' + pph2);
                console.log(multiplier2);
                pph2 = multiplier2*0.15
                console.log('ini pph2 ' + pph2);
            } else if (totalBrutoTemp > 100000000) {
                var multiplier2 = totalBrutoTemp - 40000000;
                pph2 = multiplier2*0.15;
            }
        } else if (totalBruto > 50000000 && totalBruto <= 100000000) { //50.000.000 && 100.000.000
            console.log('sini');
            var multiplier1 = totalBruto - 50000000;
            pph1 = multiplier1*0.05;
        }
        console.log('pph1 :'+pph1);
        console.log('pph2 :'+pph2);
        console.log('pph3 :'+pph3);
        var pph = (pph1*1)+(pph2*1)+(pph3*1);
        setNumberFormat($('#pph'), pph);
        localStorage.setItem('user' + idUsers + '_pph', $('#pph').val());
        
        var total_netto = totalBruto - pph;
        setNumberFormat($('#total_netto'), total_netto);
        localStorage.setItem('user' + idUsers + '_total_netto', $('#total_netto').val());
        
        var potongan = numberClean($('#potongan').val());
        var totalPayment = (total_netto*1) - (potongan*1);
        setNumberFormat($('#total_dibayarkan_tap'), totalPayment);
        localStorage.setItem('user' + idUsers + '_total_dibayarkan_tap', $('#total_dibayarkan_tap').val());
    }
    /*=== End Here ===*/