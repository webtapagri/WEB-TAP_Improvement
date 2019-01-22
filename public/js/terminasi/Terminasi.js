var Terminasi ={
    trm_code    :   "TA",
    trm_alias   :   null,
    default :   function(){
            
        //Global.clearCookie();
                        
        
        console.log("USER ID:"+Global.getCookie('myUserId'));
        console.log("AREA CODE:"+Global.getCookie('myAreaCode'));
        console.log("NIK:"+Global.getCookie('myNik'));
        console.log("NAMA:"+Global.getCookie('myNama'));
        console.log("USERNAME:"+Global.getCookie('myUsername'));
        console.log("EMAIL:"+Global.getCookie('myEmail'));
        console.log("JOB CODE:"+Global.getCookie('myJobCode'));
        
        
    },
    load    :   function(){
        var $this=this;
        debugger;
        $this.default();   
                        
        Component.render("mainContent",Employee.form.typeOfTermination(),function(){
                                    
            $this.action.get.company(function(){
                
                if(Request.data.length > 0){

                    var el="";
                    var selected="";
                    var currentCompany = Global.getCookie('COMP_CODE'+Global.getCookie('myUserId'));
                                        

                    $.each(Request.data,function(i,e){
                        
                        if(e.id == currentCompany){
                            selected = "selected";
                        }else{
                            selected="";
                        }
                        
                        el+="<option value='"+e.id+"' text='"+e.text+"' "+selected+">"+e.text+"</option>";
                        
                    });

                    $(el).appendTo($("#optPerusahaan"));
                    
                    $("#optPerusahaan").select2({
                        placeholder : "Perusahaan",
                        allowClear:true,                        
                    }).change(function(){
                        
                    $("#optBisnisArea option").remove();
                    Global.setCookie('COMP_CODE'+Global.getCookie('myUserId'),$(this).val());     
                     $this.action.get.bisnis_area(function(){                
                        
                        if(Request.data.length > 0){

                            var el="";
                            var selected="";
                            var currentBA = Global.getCookie('BA_CODE'+Global.getCookie('myUserId'));

                            $.each(Request.data,function(i,e){
                                
                                if(e.id == currentBA){
                                    selected = "selected";
                                }else{
                                    selected="";
                                }
                                
                                el+="<option value='"+e.id+"' text='"+e.text+"' "+selected+">"+e.text+"</option>";
                            });

                            $(el).appendTo($("#optBisnisArea"));                
                            
                            $("#optBisnisArea").select2({
                                placeholder : "Bisnis Area",
                                allowClear:true
                                
                            }).change(function(){
                                
                                Global.setCookie('BA_CODE'+Global.getCookie('myUserId'),$(this).val());                        
                                Global.select2_failed('#box-optBisnisArea');                                        
                                                        
                            });
                        }
                    });
                    Global.select2_failed('#box-optPerusahaan');                        
                                                
                    });

                }
                
            });

            $this.action.get.bisnis_area(function(){                
                
                if(Request.data.length > 0){

                    var el="";
                    var selected="";
                    var currentBA = Global.getCookie('BA_CODE'+Global.getCookie('myUserId'));

                    $.each(Request.data,function(i,e){
                        
                        if(e.id == currentBA){
                            selected = "selected";
                        }else{
                            selected="";
                        }
                        
                        el+="<option value='"+e.id+"' text='"+e.text+"' "+selected+">"+e.text+"</option>";
                    });

                    $(el).appendTo($("#optBisnisArea"));                
                    
                    $("#optBisnisArea").select2({
                        placeholder : "Bisnis Area",
                        allowClear:true
                        
                    }).change(function(){
                        
                        Global.setCookie('BA_CODE'+Global.getCookie('myUserId'),$(this).val());                        
                        Global.select2_failed('#box-optBisnisArea');                                        
                                                
                    });
                }
            });
            
            
            $this.action.get.JT(function(){
                
                if(Request.data.trm_type.length > 0){

                    var el="";
                    var val="";
                    var selected="";
                    var currentJT = Global.getCookie('JT'+Global.getCookie('myUserId'));

                    $.each(Request.data.trm_type,function(i,e){ 
                            
                            val="terminasi-phk";
                            
                            //get for the link JT02=JT03
                            switch(e.description_code){
                                case    "JT01":
                                    val="terminasi-nonactive";
                                break;
                                case    "JT02":
                                    val="terminasi-phk";
                                break;
                                case    "JT03":
                                    val="terminasi-phk";
                                break;

                            }                        
                            
                            if(e.description_code == currentJT){
                            
                                selected = "selected";

                            }else{
                                selected="";
                            }
                                                        
                                                
                        el+="<option value='"+val+"' code='"+e.description_code+"' text='"+e.description+"' "+selected+">"+e.description+"</option>";
                        
                    });

                    $(el).appendTo($("#optTypeTermination"));                    
                    
                    $("#optTypeTermination").select2({
                        placeholder : "Jenis Terminasi",
                        allowClear:true,           
                        
                    }).change(function(){
                        Global.setCookie('JT'+Global.getCookie('myUserId'),$(this).find(':selected').attr('code'));                        
                        Global.select2_failed('#box-optTypeTermination');
                        
                    });
                }
            });

            $this.eventListener();                

        });
    },
    action  :   {
        get :   {
            unpresent :   function(p,f){
                
                $.ajaxSetup({
                    headers: Request.headers
                }); 

                $.ajax({
                    type        :   'get',
                    url         :   Request.Employee.unpresent(p.date,p.status,p.ref_month),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();
                        
                        $('#btnCommit').text("Wait ...").attr('disabled','disabled');
                        
                        Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');
                        }
                    },
                    success :   function(r){
                        
                        $('#btnCommit').text("Tampilkan").removeAttr('disabled');
                        
                        Component.loader.hide();
                        
                        Request.data=r;
                        
                        Global.cekConsole();
        
                        f();
                    }
                });
            },
            employee_all :   function(f){
                
                $.ajaxSetup({
                    headers: Request.headers
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Employee.all(),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();
                        Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {
                            Component.loader.show('Koneksi bermasalah !!! ...');
                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');

                        }
                    },
                    success :   function(r){
                        Component.loader.hide();
                        Request.data=r;  
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            employee_status :   function(f){
                
                $.ajaxSetup({
                    headers: Request.headers
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Employee.status(),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();
                        Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {
                            Component.loader.show('Koneksi bermasalah !!! ...');
                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');

                        }
                    },
                    success :   function(r){
                        Component.loader.hide();
                        Request.data=r;  
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            employee_nik :   function(nik,f){
                
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'post',
                    url         :   Request.Employee.byNIK(),
                    dataType    :   'json',
                    data        :   {'nik':nik},
                    beforeSend  :   function(){
                        
                        Global.cekConsole();
                        //Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');
                            
                        }
                    },
                    success :   function(r){    
                        Request.data=r;
                        Component.loader.hide();
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            employee_foto :   function(nik,f){
                
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'post',
                    url         :   Request.Employee.FOTO(),
                    dataType    :   'json',
                    data        :   {'nik':nik},
                    beforeSend  :   function(){
                        
                        Global.cekConsole();
                        Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');
                            
                        }
                    },
                    success :   function(r){    
                        Request.data=r;
                        Component.loader.hide();
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            filterForm  :   function(){
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Form.Filter(),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();                        
                        Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) { 
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');
                        }
                    },
                    success :   function(r){    
                        Component.loader.hide();
                        Request.data=r;                    
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            company :   function(f){
                $.ajaxSetup({
                    headers: Request.headers
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Company.code(),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();                        
                        Component.loader.show('Mohon Tunggu ...');
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');
                        }
                    },
                    success :   function(r){    
                        Component.loader.hide();
                        Request.data=r;
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            bisnis_area :   function(f){
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Company.area(),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();
                        Component.loader.show('Mohon Tunggu ...');
                        
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) {
                            
                            Component.loader.show('Koneksi bermasalah !!! ...');
                            setTimeout(function(){
                                Component.loader.hide();
                            },'1000');
                        }
                    },
                    success :   function(r){
                        Component.loader.hide();
                        Request.data=r;
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
            JT :   function(f){
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Terminasi.get(),
                    dataType    :   'json',
                    beforeSend  :   function(){
                        
                        Global.cekConsole();                        
                        Component.loader.show('Mohon Tunggu ...');
                        
                    },
                    statusCode: {
                        200: function (r) {

                        },
                        201: function (r) {

                        },
                        400: function (r) {

                        },
                        404: function (r) {

                        },
                        500: function (r) {
                            
                            Component.loader.show('Reconnecting ...');
                            //call back connection
                            setTimeout(function(){
                                Terminasi.load();
                            },'1000');
                        }
                    },
                    success :   function(r){    
                        Component.loader.hide();
                        Request.data=r;
                        
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });
            },
        },
        set :   function(data,f){
            
            $.ajaxSetup({
                
                headers: Request.headers
                
            });  

            $.ajax({
                type        :   'post',
                url         :   Request.Terminasi.set('set'),                
                dataType    :   'json',
                data        :   data,
                beforeSend  :   function(){
                    
                    Global.cekConsole();
                    Component.loader.show('Mohon Tunggu ...');                                
                    
                },
                statusCode: {
                    200: function (r) {
                        
                        Global.clearDataTmp();
                        
                    },
                    201: function (r) {

                    },
                    302 :   function(r){
                        Component.loader.show('Your Session has been expire !!! ...');
                        setTimeout(function(){
                            window.location.href=Global.BASE_URL();
                        },'3000');
                    },
                    400: function (r) {
                        

                    },
                    404: function (r) {
                                         
                        $('#btnAjukan').removeAttr('disabled');
                        Request.data=r;                          
                        
                        Component.create({

                            title       :   "NOTIFIKASI",
                            type        :   'modal',
                            width       :   600,                            
                            height      :   350,                            
                            content     :   Employee.view.konfirmasiPHK(false)+"<div class='alert alert-success'><center>PROSES PENGAJUAN TERMINASI BERHASIL</center></div>",
                            renderTo    :   'body',
                            buttons :   {
                                    confirm :   {   
                                        label   :   'Tutup'
                                    },
                                    cancel  :   {
                                        label   :   'Tutup'
                                    }
                                }
                        },function(){});

                        $('#btnConfirm').hide();
                        $('#btnCancelModal').removeAttr('data-dismiss').text("Tutup").off().on('click',function(){

                            window.location.href=Global.BASE_URL();

                        });
                        
                        $('#ContCnfID').hide();                        
                        $('#cnfID').show();
                        $('#cnfID').html("<b>"+Request.data.DOC_TERMINATION_CODE+"</b>"); 
                        
                        Global.listChk=[];
                        Global.data=[];
                        Global.param={};

                        Employee.setProperty();
                        
                        
                    },
                    500: function (r) {
                        
                        Request.data=r;                                                                          
                        
                        Component.loader.hide('Mohon Tunggu ...');
                        $('#btnAjukan').removeAttr('disabled').text("Ajukan");
                        
                        Component.create({
                        
                            title       :   "NOTIFIKASI",
                            type        :   "modal",
                            width       :   600,                            
                            height      :   350,                            
                            content     :   Employee.view.konfirmasi(false,Terminasi.trm_alias)+"<div class='alert alert-danger'><center>PROSES PENGAJUAN TERMINASI GAGAL<br>NO.DOKUMEN TIDAK TERSIMPAN</center></div>",
                            renderTo    :   'body',
                            buttons :   {
                                    confirm :   {   
                                        label   :   'Tutup'
                                    },
                                    cancel  :   {
                                        label   :   'Tutup'
                                    }
                                }
                            },function(){});
                            
                            Employee.setProperty();
                                
                            $('#ContCnfID').hide();
                            $('#btnConfirm').text("Ajukan Kembali");
                        
                    }
                },
                success :   function(r){
                    
                    Component.loader.hide();
                    Request.data=r;  
                                        
                    Global.cekConsole();
                    Global.clearDataTmp();
                    
                    f();
                }

            });

        },        
    },
    render  :   {                        
        form    :   {
            nonactive  :   function(id){
                var el="";
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box box-success box-solid'>";
                                el+="<div class='box-header bg-green with-border'>";
                                    el+="<h5 class='box-title'>Kelompok Karyawan</h5>";
                                el+="</div>";
                                
                                el+="<div class='box-body'>";
                                
                                    el+="<form  id='formAjuan' name='formAjuan' >";

                                        el+="<div class='row'>";

                                            el+="<div class='col-md-6'>";

                                                el+="<div class='form-group'>";
                                                    el+="<label for='exampleInputEmail1'>Status Karyawan</label>";
                                                    
                                                    el+="<div id='box-optStatusKaryawan'>";
                                                    
                                                        el+="<select class='form-control' id='optStatusKaryawan' data-parsley-group='first' required=''>";
                                                            el+="<option value=''>-- Pilih Status --</option>";
                                                           // el+="<option value='all'>All</option>";
                                                        el+="</select>";                                                    
                                                        
                                                    el+="</div>";
                                                    
                                                el+="</div>";

                                                el+="<div class='form-group'>";
                                                    el+="<label for='exampleInputEmail1'>Lama Tidak Aktif</label>";
                                                    
                                                    el+="<div id='box-optLamaTa'>";
                                                    
                                                        el+="<select class='form-control' id='optLamaTa' name='optLamaTa' data-parsley-group='first' required=''>";
                                                            el+="<option value=''>-- Pilih --</option>";
                                                            el+="<option value='1'>1 Bulan</option>";
                                                            el+="<option value='2'>2 Bulan</option>";
                                                            el+="<option value='3'>>= 3 Bulan</option>";
                                                        el+="</select>";
                                                        
                                                    el+="</div>";
                                                    
                                                el+="</div>";

                                            el+="</div>";

                                            el+="<div class='col-md-6'>";

                                                el+="<div class='form-group'>";
                                                    el+="<label for='exampleInputEmail1'>Tanggal Efektif Terminasi</label>";
                                                    el+="<input type='text' placeholder='DD-MMM-YYYY' id='show_date' class='form-control' name='request_date' data-parsley-group='first' required=''>";
                                                el+="</div>";
                                            el+="</div>";

                                        el+="</div>";

                                    el+="</form>";

                                el+="</div>";

                                el+="<div class='box-footer'>";
                                    el+="<div class='row'>";
                                        el+="<div class='col-xs-2'>";    
                                            el+="<button class='btn btn-success bg-green btn-flat' id='btnCommit'>Tampilkan </button>";
                                        el+="</div>";
                                        el+="<div class='col-xs-10'>";

                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                                                                                                
                            el+="</div>";
                        el+="</div>";    
                    el+="</div>";
                        
                return el;
                
            } ,             
            ph  :   function(){
                var el="";
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box box-success box-solid'>";
                                el+="<div class='box-header bg-green with-border'>";
                                    el+="<h5 class='box-title'>INPUT PERMOHONAN</h5>";
                                el+="</div>";

                                el+="<form role='form' id='formTerminasi'>";
                                
                                    el+="<div class='box-body'>";
                                    
                                        //hidden field
                                        el+="<div class='form-group'>";                                                    
                                            el+="<input type='hidden' placeholder='BPM_CODE' id='txtBpmCode' value=1 class='form-control' name='jenisTerminasi' data-parsley-group='first' required=''>";
                                        el+="</div>";
                                        
                                        el+="<div class='form-group'>";                                                    
                                            el+="<input type='hidden' placeholder='Efektif Date' id='txtEfektifDateHidden' class='form-control' name='jenisTerminasi' data-parsley-group='first' required=''>";
                                        el+="</div>";
                                        
                                        el+="<div class='form-group'>";                                                    
                                            el+="<input type='hidden' placeholder='Nama' id='txtNamaHidden' class='form-control' name='jenisTerminasi' data-parsley-group='first' required=''>";
                                        el+="</div>";
                                        
                                        el+="<div class='form-group'>";                                                    
                                            el+="<input type='hidden' placeholder='NIK SAP' id='txtNikSapHidden' class='form-control' name='jenisTerminasi' data-parsley-group='first' required=''>";
                                        el+="</div>";
                                        
                                        el+="<div class='form-group'>";                                                    
                                            el+="<input type='hidden' placeholder='NIK NATIONAL' value='0' id='txtNikNationalHidden' class='form-control' name='jenisTerminasi' data-parsley-group='first' >";
                                        el+="</div>";
                                        
                                        //end hidden field

                                        el+="<div class='row'>";
                                            el+="<div class='col-md-6'>";
                                                
                                                el+="<div class='form-group'>";
                                                    el+="<label for='exampleInputEmail1'>Jenis Terminasi</label>";
                                                    el+="<input disabled type='text' placeholder='Jenis Terminasi' id='txtJenisTerminasi' class='form-control' name='jenisTerminasi' data-parsley-group='first' required=''>";
                                                el+="</div>";
                                                                                                    
                                                //exception based on type of termination
                                                
                                                // if(Global.getCookie('code') =="JT02" || Global.getCookie('code') =="JT04" || Global.getCookie('code') =="JT05"){ //phk sendiri
                                                    
                                                    el+="<div class='form-group'>";
                                                        el+="<label for='exampleInputEmail1'>NIK SAP</label>";
                                                        
                                                    el+="<div id='box-optKaryawan'>";
                                                        el+="<select class='form-control select2_change' id='optKaryawan' data-parsley-group='first' required=''>";
                                                        el+="<option value=''>-- Pilih NIK  --</option>";                                                                                                                    
                                                        el+="</select>";                                                    
                                                    el+="</div>";
                                                        
                                                    el+="</div>";
                                                    
                                                    el+="<div class='form-group'>";
                                                        el+="<label for='exampleInputEmail1'>NIK National</label>";
                                                        el+="<div>";
                                                            el+="<select class='form-control select2_change' id='txtNikNational'>";
                                                            el+="<option value=''>-- Pilih NIK Nasional --</option>";                                                                                                                    
                                                            el+="</select>";                                                    
                                                        el+="</div>";
                                                        // el+="<label for='exampleInputEmail1'>NIK National</label>";
                                                        // el+="<input type='text' placeholder='NIK National' id='txtNikNational' class='form-control' name='jenisTerminasi' data-parsley-group='first' disabled>";
                                                    el+="</div>";
                                                                                                        

                                                    el+="<div class='form-group'>";
                                                        el+="<label for='exampleInputEmail1'>Nama Karyawan</label>";
                                                        el+="<div id='box-txtKaryawan'>";
                                                            el+="<select class='form-control select2_change' id='txtNama' data-parsley-group='first' required=''>";
                                                            el+="<option value=''>-- Pilih NIK Nasional --</option>";                                                                                                                    
                                                            el+="</select>";                                                    
                                                        el+="</div>";


                                                        // el+="<label for='exampleInputEmail1'>Nama Karyawan</label>";
                                                        // el+="<input type='text' placeholder='Nama Karyawan' id='txtNama' class='form-control' name='jenisTerminasi' data-parsley-group='first' disabled>";
                                                    el+="</div>";

                                                    el+="<div class='form-group'>";
                                                        el+="<label for='exampleInputEmail1'>Tanggal Efektif Terminasi</label>";
                                                        el+="<input type='text' placeholder='DD-MMM-YYYY' id='txtEfektifDate' class='form-control' name='request_date' data-parsley-group='first' required=''>";
                                                    el+="</div>";
                                                // }
                                                                                                
                                                el+="<div class='form-group'>";
                                                    el+="<button class='btn btn-success btn-flat bg-green' id='btnViewDetail'>Tampilkan </button>";
                                                el+="</div>";
                                                
                                            el+="</div>";

                                            if(Global.getCookie('code') =="JT03" ){ //phk perusahaan
                                                el+="<div class='col-md-4'>";
                                                    el+="<div class='form-group'>";
                                                        el+="<div id='box-txtDoc'>";
                                                        el+="<label for='exampleInputEmail1'>No Dokumen Pengajuan Surat PHK</label>";
                                                            el+="<input type='text' placeholder='No Dokumen PHK' id='txtDoc' class='form-control' name='jenisTerminasi' data-parsley-group='first' required=''> ";                                                    
                                                        el+="</div>";
                                                    el+="</div>";
                                                el+="</div>";
                                                
                                                el+="<div class='col-md-2'>";
                                                        el+="<a class='btn btn-success' id='btnPilihSurat' style='margin-top:15%;'>Pilih</a>";
                                                el+="</div>";
                                            }
                                                                                        

                                        el+="</div>";

                                    el+="</div>";
                                    
                                el+="</form>";
                            el+="</div>";
                            
                        el+="</div>";    
                    el+="</div>";
                    
                    //END BOX 1
                    
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box box-success box-solid'>";
                                el+="<div class='box-header bg-green with-border'>";
                                    el+="<h5 class='box-title'>IDENTITAS KARYAWAN</h5>";
                                el+="</div>";
                                
                                el+="<div class='box-body'>";

                                    el+="<div class='row'>";
                                        el+="<div class='col-md-8'>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Nama Lengkap</label>";
                                                el+="<input type='text' placeholder='Nama ...' id='txtNamaSap' class='form-control' name='nik' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";

                                                el+="<label >Tempat/Tanggal Lahir</label>";

                                                el+="<div class='row'>";
                                                    el+="<div class='col-sm-5'>";
                                                        el+="<input type='text' placeholder='Tempat ...' id='txtPob' class='form-control' name='nik' data-parsley-group='first' required disabled>";
                                                    el+="</div>";

                                                    el+="<div class='col-sm-1'>";
                                                        el+="/";
                                                    el+="</div>";

                                                    el+="<div class='col-sm-5'>";
                                                        el+="<input type='text' placeholder='Tanggal Lahir ...' id='txtDob' class='form-control pull-left' name='tglLahir' data-parsley-group='first' required disabled>";
                                                    el+="</div>";

                                                el+="</div>";

                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Agama</label>";
                                                el+="<input type='text' placeholder='Agama ...' id='txtAgama' class='form-control' name='agama' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.KTP</label>";
                                                el+="<input type='text' placeholder='No. KTP ...' id='txtKtp' class='form-control' name='ktp' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.NPWP</label>";
                                                el+="<input type='text' placeholder='No. NPWP ...' id='txtNpwp' class='form-control' name='npwp' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Alamat</label>";
                                                el+="<textarea placeholder='Alamat ...' id='txtAlamat' class='form-control' name='npwp' data-parsley-group='first' required disabled></textarea>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.Telp</label>";
                                                el+="<input type='text' placeholder='No.Telpon ...' id='txtTlp' class='form-control' name='telp' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.Handphone</label>";
                                                el+="<input type='text' placeholder='No.Handphone ...' id='txtHp' class='form-control' name='telp' data-parsley-group='first' required disabled>";
                                            el+="</div>";


                                        el+="</div>";

                                        el+="<div class='col-md-2'>";
                                            el+="<div class='form-group' id='photo'>";

                                                el+="<input id='foto' style='color: transparent;text-shadow: 0 0 0 red;height: 180px;' placeholder='Foto Karyawan' type='text' readonly data-parsley-group='first' name='foto' class='form-control'>";
                                                //el+="<img class='img-rounded' src='dist/img/avatar.png' />";

                                            el+="</div>";                                                
                                        el+="</div>";


                                    el+="</div>";

                                el+="</div>";                                    
                                                                
                            el+="</div>";
                            
                        el+="</div>";    
                    el+="</div>";
                    
                    //END BOX 2
                    
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box box-success box-solid'>";
                                el+="<div class='box-header bg-green with-border'>";
                                    el+="<h3 class='box-title'>STATUS KARYAWAN</h3>";
                                el+="</div>";
                                
                                el+="<div class='box-body'>";

                                    el+="<div class='row'>";
                                        el+="<div class='col-md-8'>";

                                            el+="<div class='form-group'>";
                                                el+="<label for='exampleInputEmail1'>Tanggal Masuk Kerja</label>";
                                                el+="<input type='text' placeholder='DD-MMM-YYYY' id='txtJoinDate' class='form-control' name='request_date' data-parsley-group='first' required='' disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Lama Bekerja</label>";

                                                el+="<br>";
                                                el+="<label >Tahun</label>";
                                                el+="<input type='text' placeholder='Tahun ...' id='txtLamaKerjaTahun' class='form-control' name='jabatan' data-parsley-group='first' required disabled>";

                                            el+="</div>";

                                            el+="<div class='form-group'>";                                                    
                                                el+="<label >Bulan</label>";
                                                el+="<input type='text' placeholder='Bulan ...' id='txtLamaKerjaBulan' class='form-control' name='jabatan' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Jabatan</label>";
                                                el+="<input type='text' placeholder='Jabatan ...' id='txtJabatan' class='form-control' name='jabatan' data-parsley-group='first' required disabled>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Status Karyawan</label>";
                                                el+="<input type='text' placeholder='Status Karyawan ...' id='txtStatusKaryawan' class='form-control' name='nik' data-parsley-group='first' required disabled>";
                                            el+="</div>";                                                                                                

                                        el+="</div>";

                                        el+="<div class='col-md-4'>";

                                            el+="<div class='form-group'>";                                                    

                                            el+="</div>";
                                        el+="</div>";

                                    el+="</div>";

                                el+="</div>";                                   
                                
                            el+="</div>";
                        el+="</div>";    
                    el+="</div>";
                
                    //END BOX 3                    
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";
                        
                        el+="<form id='formKewajiban'>";
                        
                            el+="<div class='box box-success box-solid'>";
                                el+="<div class='box-header bg-green with-border'>";
                                    el+="<h3 class='box-title'>KEWAJIBAN PENGEMBALIAN</h3>";
                                el+="</div>";
                                
                                el+="<div class='box-body'>";

                                    el+="<div class='row'>";
                                        el+="<div class='col-md-12'>";

                                            el+="<table class='table'>";

                                                el+="<tr>";
                                                    el+="<td><b>Pertanggungjawaban</b></td>";
                                                    el+="<td>:</td>";
                                                    el+="<td></td>";
                                                    el+="<td></td>";
                                                    el+="<td></td>";
                                                    el+="<td></td>";
                                                el+="</tr>";

                                                el+="<tr>";
                                                    el+="<td>Kas Bon</td>";
                                                    el+="<td>:</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' name='optTJKasbon' class='optTJKasbon' id='optTJKasbonSelesai' value='1'> ";
                                                              el+="Selesai";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' name='optTJKasbon' class='optTJKasbon' id='optTJKasbonBelum' value='0'> ";
                                                              el+="Belum";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>";
                                                    el+="<td>";
                                                        el+="<input type='text' placeholder='*Wajib diisi jika belum ...' id='txtNoteKasbon' class='form-control' name='nik' data-parsley-group='first' required>";;
                                                    el+="</td>";
                                                    el+="<td><i>*Wajib diisi jika belum</i></td>";
                                                el+="</tr>";
                                                el+="<tr>";
                                                    el+="<td>Pertanggungjawaban Lainnya</td>";
                                                    el+="<td>:</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optTJLain' name='optTJLain' id='optTJLainSelesai' value='1' > ";
                                                              el+="Selesai";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optTJLain' name='optTJLain' id='optTJLainBelum' value='0' > ";
                                                              el+="Belum";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>"
                                                    el+="<td>";
                                                        el+="<input type='text' placeholder='*Wajib diisi jika belum ...' id='txtNoteTJLain' class='form-control' name='nik' data-parsley-group='first' required>";;
                                                    el+="</td>";
                                                    el+="<td><i>*Wajib diisi jika belum</i></td>";
                                                el+="</tr>";
                                                el+="<tr>";
                                                    el+="<td>Saldo Kewajiban Karyawan</td>";
                                                    el+="<td>:</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optSaldo' name='optSaldo' id='optSaldoSelesai' value='1' > ";
                                                              el+="Selesai";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optSaldo' name='optSaldo' id='optSaldoBelum' value='0' > ";
                                                              el+="Belum";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>"
                                                    el+="<td>";
                                                        el+="<input type='text' placeholder='*Wajib diisi jika belum ...' id='txtNoteSaldo' class='form-control' name='nik' data-parsley-group='first' required>";;
                                                    el+="</td>";
                                                    el+="<td><i>*Wajib diisi jika belum</i></td>";
                                                el+="</tr>";
                                                el+="<tr>";
                                                    el+="<td><b>Fasilitas Karyawan</b></td>";
                                                    el+="<td>:</td>";
                                                    el+="<td></td>";
                                                    el+="<td></td>";
                                                    el+="<td></td>";
                                                    el+="<td></td>";
                                                el+="</tr>";

                                                el+="<tr>";
                                                    el+="<td>Alat Kerja mobile EBCC </td>";
                                                    el+="<td>:</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optFasilitasEBCC' name='optFasilitasEBCC' id='optFasilitasEBCCselesai' value='1' > ";
                                                              el+="Selesai";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optFasilitasEBCC' name='optFasilitasEBCC' id='optFasilitasEBCCbelum' value='0' > ";
                                                              el+="Belum";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>"
                                                    el+="<td>";
                                                        el+="<input type='text' placeholder='*Wajib diisi jika belum ...' id='txtNoteFasilitasEBCC' class='form-control' name='nik' data-parsley-group='first' required>";;
                                                    el+="</td>";
                                                    el+="<td><i>*Wajib diisi jika belum</i></td>";
                                                el+="</tr>";

                                                el+="<tr>";
                                                    el+="<td>Fasilitas Karyawan Lainnya</td>";
                                                    el+="<td>:</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optFasilitasLain' name='optFasilitasLain' id='optFasilitasLainSelesai' value='1'> ";
                                                              el+="Selesai";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>";
                                                    el+="<td>";
                                                        el+="<div class='radio'>";
                                                            el+="<label>";
                                                              el+="<input type='radio' class='optFasilitasLain' name='optFasilitasLain' name='optFasilitasLain'  id='optFasilitasBelum' value='0'> ";
                                                              el+="Belum";
                                                            el+="</label>";
                                                        el+="</div>";
                                                    el+="</td>"
                                                    el+="<td>";
                                                        el+="<input type='text' placeholder='*Wajib diisi jika belum ...' id='txtNoteFasilitasLain' class='form-control' name='nik' data-parsley-group='first' required>";;
                                                    el+="</td>";
                                                    el+="<td><i>*Wajib diisi jika belum</i></td>";
                                                el+="</tr>";

                                            el+="</table>";


                                        el+="</div>";                                           

                                    el+="</div>";

                                el+="</div>";                                   
                                
                            el+="</div>";
                            
                            el+="</form>";
                            
                        el+="</div>";    
                    el+="</div>";
                    
                    //END BOX 4
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box box-success box-solid'>";
                                el+="<div class='box-header bg-green with-border'>";
                                    el+="<h3 class='box-title'>LAMPIRAN LAINNYA</h3>";
                                el+="</div>";
                                
                                el+="<form id='formAlasan'>";
                                el+="<div class='box-body'>";

                                    //CONTENT BOX ALASAN
                                    el+=Employee.form.reason(Global.getCookie('code'));                                                                                

                                el+="</div>";
                                                                
                                el+="</form>";
                                
                            el+="</div>";
                        el+="</div>";    
                    el+="</div>";
                    
                    el+="</form>";
                    
                    el+="<div class='box-footer'>";
                        el+="<div class='row'>";
                            el+="<div class='col-xs-6'>";    
                                el+="<button class='btn btn-default' id='btnCancel'>Batal </button>";
                            el+="</div>";
                            el+="<div class='col-xs-6'>";
                                el+="<button class='btn btn-success btn-flat bg-green pull-right' id='btnAjukan'>Ajukan</button>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                    
                    //END BOX 5
                return el;
                
            }              
        }        
    },
    eventListener   :   function(){
        
        if(!Global.onDebug){
            Global.clearConsole();
        }
                        
        $('#btnCommit').off().on('click',function(){            
            
            
            
            if(Global.validateForm('formTerminasi')){                                            
                //set session with localStorage                                
                
                Global.select2_failed('#box-optPerusahaan');
                Global.select2_failed('#box-optBisnisArea');                
                Global.select2_failed('#box-optTypeTermination');
                
                Global.setCookie('companyCode',$('#optPerusahaan').find(':selected').val());
                Global.setCookie('company',$('#optPerusahaan').find(':selected').attr('text'));

                Global.setCookie('areaCode',$('#optBisnisArea').find(':selected').val());
                Global.setCookie('area',$('#optBisnisArea').find(':selected').attr('text'));

                Global.setCookie('code',$('#optTypeTermination').find(':selected').attr('code'));                
                Global.setCookie('typeTRM',$('#optTypeTermination').find(':selected').text());                                
                
                //end set session
                
                var link=$('#optTypeTermination').find(':selected').val();                                                                                
                                                
                window.location.href=link;                
                
            }
            
            Global.select2_failed('#box-optPerusahaan');
            Global.select2_failed('#box-optBisnisArea');                
            Global.select2_failed('#box-optTypeTermination');
            
            return false;
        });

        $('#btnCancel').off().on('click',function(){

            window.location.href=Global.BASE_URL()+"home";            

            return false;
        });                                
    }
}

$('#btn-sync-sap').click(function(){
    var data = {'doc_code':$('#txtNoDokumen').val()};
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      url   : "../../terminasi-sync-sap",
      method  : 'post',
      data: data,
      success : function(data) {
        $('.spn-no-dokumen').html($('#txtNoDokumen').val());
        $('.spn-lokasi').html($('#txtViewArea').val());

        if(data == 'OK'){
            $('.alert').addClass('alert-success');
            $('#label-status').html("SYNC SAP BERHASIL");
            $('#myModalBerhasil').modal('show');
            $('.loading').hide();
        }
        else{
            $('.alert').addClass('alert-danger');
            $('#label-status').html("SYNC SAP GAGAL");
            $('#myModalBerhasil').modal('show');
            $('.loading').hide();
        }
      },
      error   : function() {

            $('.loading').hide();
        }
    });
});

$('#btn-selesai').click(function(){
    var data = {'doc_code':$('#txtNoDokumen').val()};
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
$('.loading').show();
    $.ajax({
      url   : "../../terminasi-complete",
      method  : 'post',
      data: data,
      success : function(data) {
        $('.spn-no-dokumen').html($('#txtNoDokumen').val());
        $('.spn-lokasi').html($('#txtViewArea').val());

        if(data == 'OK'){
            $('.alert').addClass('alert-success');
            $('#label-status').html("PROSES PENYELESAIAN BERHASIL");
           $('#myModalBerhasil').modal('show');
           $('.loading').hide();
        }
        else{
            $('.alert').addClass('alert-danger');
            $('#label-status').html("PROSES PENYELESAIAN GAGAL");
            $('#myModalBerhasil').modal('show');
           $('.loading').hide();
            
        }
      },
      error   : function() {

            $('.loading').hide();
        }
    });
});