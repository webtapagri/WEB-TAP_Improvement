Terminasi.ph ={
    trm_code    :   Global.getCookie('code'),    
    pop_up      :   "modal",
    default :   function(){
            
        var $this=this;  
        
        switch(Global.getCookie('code')){
            case    "JT01"://phk tidak aktif
                Terminasi.trm_alias = "TA";
            break;
            case    "JT02"://phk keinginan sendiri
                Terminasi.trm_alias = "PS";
            break;
            case    "JT03": //phk keinginan perusahaan
                Terminasi.trm_alias = "PH";
            break;
            default:
                Terminasi.trm_alias = "PS";
            break;
        }
        
        Global.data = [];
        
    },
    load    :   function(){
        var $this=this;
        
        $this.default();                     
        
        Component.render("mainContent",Terminasi.render.form.ph(),function(){
            //SET OR RELOAD TEMP DATA            
            var _NIK_SAP='';
            Global.getDataTemp();
            //Global.clearDataTmp();
                                    
            $('#txtJenisTerminasi').val(Global.getCookie('typeTRM'));
                     
            if(Global.getCookie('code')=='JT02' || Global.getCookie('code') =='JT04' || Global.getCookie('code') =='JT05'){ //PS

                $('#txtEfektifDate').datetimepicker({
                    format      : 'DD-MMM-YYYY',            
                    defaultDate : moment(localStorage.getItem('NOW')),
                    minDate     : today
                }).on('blur',function(){
                                                    
                    $('#txtEfektifDateHidden').val(Global.convertMonthToEng($(this).val()));
                    
                });
                
                $("#optKaryawan").select2({
                    
                    placeholder : "Pilih NIK SAP",
                    allowClear  : true,
                    ajax : {
                      url : function(params){
                        return Request.Employee.all(params.term,'1');
                      },
                      method        : 'GET',
                      dataType      : 'JSON',
                      delay         : 250,                      
                      processResults : function(data,params) {
                          
                        console.log(data)                              
                        params.page = params.page || 1;
                        
                        return {
                          results : $.map(data, function(obj) {                            
                            return {
                              id : obj.nik,
                              text : obj.nik
                            }
                            
                          }),
                          pagination : {
                            more : (params.page * 2) < data.total_count
                          }
                        };              
                      },
                      cache : true
                    },
                    minimumInputLength:1,
                    width:'100%'
                }).change(function(){

                    Global.setCookie('NIK_SAP'+Global.getCookie('myUserId'),$("#optKaryawan").val());
                    
                   // Global.select2_failed('#box-optKaryawan');
                   // Global.select2_failed('#box-txtKaryawan');

                    $('#btnViewDetail').trigger('click');

                });

                $("#txtNikNational").select2({
                    
                    placeholder : "Pilih NIK Nasional",
                    allowClear  : true,
                    ajax : {
                      url : function(params){
                        return Request.Employee.all(params.term,'2');
                      },
                      method        : 'GET',
                      dataType      : 'JSON',
                      delay         : 250,                      
                      processResults : function(data,params) {
                          
                        console.log(data)                              
                        params.page = params.page || 1;
                        
                        return {
                          results : $.map(data, function(obj) {                         
                            return {
                              id : obj.nik,
                              text : obj.nik_nasional
                            }
                            
                          }),
                          pagination : {
                            more : (params.page * 2) < data.total_count
                          }
                        };              
                      },
                      cache : true
                    },
                    minimumInputLength:1,
                    width:'100%'
                }).change(function(){
                    //Testing DNN
                    Global.setCookie('NIK_SAP'+Global.getCookie('myUserId'),$("#txtNikNational").val());
                   //Global.select2_failed('#box-optKaryawan');
                   // Global.select2_failed('#box-txtKaryawan');

                    $('#btnViewDetail').trigger('click');

                });

                
                $("#txtNama").select2({
                    
                    placeholder : "Pilih NIK Nama Karyawan",
                    allowClear  : true,
                    ajax : {
                      url : function(params){
                        return Request.Employee.all(params.term,'3');
                      },
                      method        : 'GET',
                      dataType      : 'JSON',
                      delay         : 250,                      
                      processResults : function(data,params) {
                          
                        console.log(data)                              
                        params.page = params.page || 1;
                        
                        return {
                          results : $.map(data, function(obj) {  
                            return {
                              id : obj.nik,
                              text : obj.employee_name
                            }

                            
                          }),
                          pagination : {
                            more : (params.page * 2) < data.total_count
                          }
                        };              
                      },
                      cache : true
                    },
                    minimumInputLength:1,
                    width:'100%'
                }).change(function(){
                    //Testing DNN
                    Global.setCookie('NIK_SAP'+Global.getCookie('myUserId'),$("#txtNama").val());
                   // Global.select2_failed('#box-optKaryawan');
                   // Global.select2_failed('#box-txtKaryawan');
                    $('#btnViewDetail').trigger('click');

                });


            
            }else{
                $('#optKaryawan').prop('disabled', true);
                $('#txtNikNational').prop('disabled', true);
                $('#txtNama').prop('disabled', true);
                $('#txtEfektifDate').prop('disabled', true);
            }
            
           
            $this.eventListener(Terminasi.trm_alias,function(){
                
            });                

        });
    },
    post    :   function(t){
                       
        
        Terminasi.action.set({'post':Global.data},function(){
            
            $('#btnAjukan').removeAttr('disabled');                        
                        
            Component.create({

            title       :   "NOTIFIKASI",
            type        :   'modal',
            width       :   600,                            
            height      :   350,                            
            content     :   Employee.view.konfirmasiPHK(false)+"<div class='alert alert-success'><center>"+Request.data.msg+"</center></div>",
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

            if(Request.data.status==1){                                
                
                $('#btnAjukan').text('Ajukan').attr('disabled','disabled');
                
                $('#btnConfirm').hide();
                $('#btnCancelModal').removeAttr('data-dismiss').text("Tutup").off().on('click',function(){

                    window.location.href=Global.BASE_URL()+"outstanding";

                });

                $('#ContCnfID').show();
                $('#cnfID').show();
                $('#cnfID').html("<b>"+Request.data.DOC_TERMINATION_CODE+"</b>"); 
                $('.cnfID').html("<b>"+Request.data.DOC_TERMINATION_CODE+"</b>");                

                Global.listChk=[];
                Global.data=[];
                Global.param={};
                
                Global.clearDataTmp();

            }else{

                $('#ContCnfID').hide();
                $('#cnfNoteKonfirmasi').hide();
                
            }

            Employee.setProperty();

            $('#ContCnfID').show();
        });

    },
    action  :   {
        get :   {
            PDM :   function(f){
                
                $.ajaxSetup({
                    headers: Request.headers
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Employee.getPDM(),
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
                        Request.data=r;                    
                        Component.loader.hide();
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });

            },        
            MASTER :   function(field,key,f){
                
                $.ajaxSetup({
                    headers: Request.headers
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Employee.getMaster(field,key),
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
                        Request.data=r;                    
                        Component.loader.hide();
                        
                        Global.cekConsole();
                        
                        f();
                    }

                });

            },        
        },
    },
    setProperty :   function(p){

        $('#txtDoc').val(p.code).attr('disabled','disabled');
        Global.select2_failed1('#box-txtDoc');                
        
        //$('#txtNikNational').val(p.nikNational).attr('disabled','disabled');
        //$('#txtNikSap').val(p.nikSap).attr('disabled','disabled');        
        //$('#txtNama').val(p.nama).attr('disabled','disabled');
        //$('#txtEfektifDate').val(Global.convertDateInd(p.efektif)).attr('disabled','disabled');
                
        $('#txtEfektifDate').datetimepicker({
            format      : 'DD-MMM-YYYY',  
            minDate     : today
        });
        
        //hidden field
        $('#txtNikSapHidden').val(p.nikSap).attr('disabled','disabled');                
        $('#txtNikNationalHidden').val(p.nikNational).attr('disabled','disabled');                
        $('#txtEfektifDateHidden').val(p.efektif).attr('disabled','disabled');
        
        if(Global.getCookie('code')=='JT03'){
            
            $('#txtNamaHidden').val(p.nama).attr('disabled','disabled');
        }
        
        
        $('#txtBpmCode').val(p.bpm_code).attr('disabled','disabled');
        Global.setCookie('bpm_code',p.bpm_code);
        
    },    
    render  :   {                        
        listPDM :   function(){
            
            var $this=this;
            var el="";
                                        
            el+="<table class='table table-bordered' style='font-size:10px;' id='myTable'>";
                el+="<thead>";
                    el+="<tr>";
                        el+="<th></th>";
                        el+="<th>No.Dokumen PHK</th>";
                        el+="<th>NIK National</th>";
                        el+="<th>NIK SAP</th>";
                        el+="<th>Nama Karyawan</th>";
                        el+="<th>Tanggal Efektif</th>";
                    el+="</tr>";
                el+="</thead>";
                el+="<tbody>";

                    if(Request.data.list.length > 0){

                        $.each(Request.data.list,function(i,e){

                            el+="<tr>";
                            
                                el+="<td>";
                                    el+="<button class='btn btn-sm btn-success doc' \n\
                                            data-code='"+e.doc_code+"' \n\
                                            data-bpm='"+e.bpm_code+"' \n\
                                            data-nikNational='"+Global.replaceNull(e.nik_national)+"' \n\
                                            data-nik='"+e.nik_sap+"' \n\
                                            data-nama='"+e.employee_name+"'\n\
                                            data-efektif='"+e.effective_date+"'\n\
                                        >Pilih</button>";
                                el+="</td>";
                                
                                el+="<td>"+e.doc_code+"</td>";
                                el+="<td>"+Global.replaceNull(e.nik_national)+"</td>";
                                el+="<td>"+e.nik_sap+"</td>";
                                el+="<td>"+e.employee_name  +"</td>";
                                el+="<td>"+e.effective_date+"</td>";
                            el+="</tr>";

                        });                                            
                    }
                
                el+="</tbody>";
            el+="</table>";
                
            
            return el;
            
        },
        alasanPersonal :   function(o){
            
            var $this=this;
            var split=3;
            var no=1;
            var j=1;
            var el="";
            var chk="";                                                
            var a=[];
            var b;
            
            if(Global.getCookie('LIST_CHK'+Global.getCookie('myUserId')) != 'null'){
                if(Global.getCookie('LIST_CHK'+Global.getCookie('myUserId')) != 'undefined'){
                                        
                    chk = Global.getCookie('LIST_CHK'+Global.getCookie('myUserId'));
                                                            
                    if(chk !== null){
                        a = chk.split(',');                    
                    }
                                                            
                    console.log(" will be looped : "+chk);                   
                    
                }                    
            }           
                                                    
            if(Request.data.list.length > 0){
                                               
                el+="<h6>Dapat dipilih lebih dari satu</h6>";
                el+="<div class='row'>";
                
                    el+="<div class='col-md-4'>";                        
                        el+="<div class='form-group'>";
                
                    $.each(Request.data.list,function(i,e){
                        var checked="";
                        
                        if(a.length > 0){
                            
                            b=Global.findObjectElement(a,e.description_code);
                            
                            if(b==e.description_code){
                                
                                Global.listChk.push(b); // update last array checked
                                
                            }
                            
                        }
                                                
                
                        checked=b==e.description_code?"checked":"";
                        
                                                                                                                                                
                        el+="<div class='checkbox'>";
                            el+="<label>";
                                el+="<input type='checkbox' data-key='"+e.description_code+"' class='minimal-blue chkAlasan' value='"+e.description_code+"' "+checked+"/> ";
                                el+=e.description;
                            el+="</label>";
                        el+="</div>";

                        if(j==split){
                            el+="</div>";
                            el+="</div>";
                            el+="<div class='col-md-4'>";                        
                            el+="<div class='form-group'>";
                            
                            
                            no=0;
                            j=0;
                        }
                                 
                        no++;
                        j++;
                    });
                    
                el+="</div>";
            }
              
            $('#'+o).empty().html(el);
            
        }
    },
    eventListener   :   function(type,f){ //type=PH,PS
        var $this=this;
        
        Global.showFile("fileSuratPhk");
        Global.showFile("fileClearance");
        Global.showFile("fileLampiran");
        Global.showFile("filePengunduranDiri");
                        
           
        if(Terminasi.trm_alias=='PH'){  
            
            var code=   Global.getCookie('code');                                                
            var nik =   Global.getCookie('NIK_SAP'+Global.getCookie('myUserId'));
            var pdm =   $('#txtDoc').val();            
                               
            
            if(nik !="" ){
                                
                Terminasi.action.get.employee_nik(nik,function(){
                                                    
                    if(Request.data.length > 0){

                        Global.detailEmployee();                        
                        
                        Global.disabled();

                    }else{

                        Component.loader.show('Internet Connection failure...');
                        setTimeout(function(){
                            Component.loader.hide();
                        },'5000');
                    }

                });

                Terminasi.action.get.employee_foto(nik,function(){

                    if(Request.data != null){
                        var foto = "data:"+Request.data.mime_type+";base64,"+Request.data.blob_content;
                        $('#photo').html("<img id='foto' name='foto' src='"+foto+"' style='color: transparent;text-shadow: 0 0 0 red;height: 180px;'/>");

                    }else{

                        Component.loader.show('Internet Connection failure...');
                        setTimeout(function(){
                            Component.loader.hide();
                        },'5000');
                    }

                });
                                                            
            }
            
        }
        
        //render alasan dari table general
        $this.action.get.MASTER('GENERAL_CODE','ALASAN_TERMINASI',function(){

            $this.render.alasanPersonal("boxAlasan");
            
            Global.iCheck();

            $('.chkAlasan').on('ifChanged', function (event) {

                if ($(this).prop('checked')) {


                    Global.listChk.push($(this).data('key'));


                } else {


                    Global.listChk   = Global.removeArrayItem(Global.listChk, $(this).data('key'));


                }
                
                Global.setCookie('LIST_CHK'+Global.getCookie('myUserId'),Global.listChk);
                
                console.log("listChk value : " + Global.listChk);
                console.log("listChk value Session  : " + Global.getCookie('LIST_CHK'+Global.getCookie('myUserId')));

            });

        });
                    
        
        //EVENT RADIO BUTTON
                
        
        $('.optAlasan').on('ifChanged', function (event){
            
            if ($(this).prop('checked')){
                
                var val=$(this).val();
                                                
                Global.setCookie('optAlasan',val);
            }            
            
        });
        
        $('.optTJKasbon').on('ifChanged', function (event){
            
            if ($(this).prop('checked')){
                
                var val=$(this).val();
                
                if(val=="0"){                                        
                    
                    $('#txtNoteKasbon').focus().attr('required','required');
                    
                }else{
                    $('#txtNoteKasbon').removeAttr('required');
                }
                                
                Global.param.kasbon=val;
                Global.setCookie('CASH_RECEIPT'+Global.getCookie('myUserId'),val);
                
                
            }            
            
            console.log(Global.param);
            
        });

        $('#txtNoteKasbon').keyup(function(e){
            Global.setCookie('NOTE_KASBON'+Global.getCookie('myUserId'),$(this).val());
        });

        
        $('.optTJLain').on('ifChanged', function(event){
            
            if ($(this).prop('checked')){
                
                var val=$(this).val();
                
                if(val=="0"){
                    
                    $('#txtNoteTJLain').focus().attr('required','required');
                    
                }else{
                    $('#txtNoteTJLain').removeAttr('required');
                }           
                
                Global.param.tanggungan=val;
                Global.setCookie('OTHERS_RESPONSIBILITY'+Global.getCookie('myUserId'),val);
                
            } 
            
            console.log(Global.param);
            
        });

        $('#txtNoteTJLain').keyup(function(e){
            Global.setCookie('NOTE_TANGGUNGAN'+Global.getCookie('myUserId'),$(this).val());
        });

        
        $('.optSaldo').on('ifChanged', function(event){
            
            if ($(this).prop('checked')){
                
                var val=$(this).val();
                
                if(val=="0"){                                    
                    
                    $('#txtNoteSaldo').focus().attr('required','required');                    
                    
                }else{
                    $('#txtNoteSaldo').removeAttr('required');
                }
                
                Global.param.saldo=val;
                Global.setCookie('BALANCE_LIABILITY_EMPLOYEES'+Global.getCookie('myUserId'),val);
            }            
            
            console.log(Global.param);
            
        });


        $('#txtNoteSaldo').keyup(function(e){
            Global.setCookie('NOTE_SALDO'+Global.getCookie('myUserId'),$(this).val());
        });



        $('.optFasilitasEBCC').on('ifChanged', function(event){
            
            if ($(this).prop('checked')){
                
                var val=$(this).val();
                
                if(val=="0"){
                    
                    $('#txtNoteFasilitasEBCC').focus().attr('required','required');
                    
                }else{
                    $('#txtNoteFasilitasEBCC').removeAttr('required');
                }
                
                Global.param.EBCC=val;
                Global.setCookie('MOBILE_WORK'+Global.getCookie('myUserId'),val);
                
            }            
            
            console.log(Global.param);
            
        });

        $('#txtNoteFasilitasEBCC').keyup(function(e){
            Global.setCookie('NOTE_EBCC'+Global.getCookie('myUserId'),$(this).val());
        });
        
        $('.optFasilitasLain').on('ifChanged', function(event){
            
            if ($(this).prop('checked')){
                
                var val=$(this).val();
                
                if(val=="0"){
                    
                    $('#txtNoteFasilitasLain').focus().attr('required','required');
                    
                }else{
                    $('#txtNoteFasilitasLain').removeAttr('required');
                }
                
                Global.param.fasilitas=val;
                Global.setCookie('OTHER_EMPLOYEE_AMENETIES'+Global.getCookie('myUserId'),val);
                
            }            
            
            console.log(Global.param);
            
        });

        $('#txtNoteFasilitasLain').keyup(function(e){
            Global.setCookie('NOTE_FASILITAS'+Global.getCookie('myUserId'),$(this).val());
        });
                
                
                                             
        $('#btnPilihSurat').off().on('click',function(){
                        
                                    
            Terminasi.ph.action.get.PDM(function(){
                
                Component.create({
                    title       :   'NO.DOKUMEN SURAT PENGAJUAN PHK',
                    type        :   $this.pop_up,
                    width       :   900,
                    height      :   500,
                    content     :   $this.render.listPDM(),
                    renderTo    :   'body',
                    buttons     :   {
                        confirm :   {   
                            label   :   'Ok'
                        },
                        cancel  :   {
                            label   :   'Tutup'
                        }
                    }
                },function(){});
                
                //button
                $('#btnCancelModal').text("Tutup");
                $('#btnConfirm').hide();
                
                $('#myTable').dataTable();
                
                $('#myTable tbody ').on('click','.doc', function (){
                                                                               
                    
                    //set current selected nik to local storage
                    Global.setCookie('NO_DOCUMENT_SANKSI'+Global.getCookie('myUserId'),$(this).data('code'));
                    Global.setCookie('NIK_SAP'+Global.getCookie('myUserId'),$(this).data('nik'));                    
                    Global.setCookie('EFEKTIF_DATE'+Global.getCookie('myUserId'),$(this).data('efektif'));                    
                    Global.setCookie('EMP_NAME'+Global.getCookie('myUserId'),$(this).data('nama'));                    
                    
                    $this.setProperty({
                        code            :    $(this).data('code'),
                        bpm_code        :    $(this).data('bpm'),
                        nikNational     :    $(this).data('niknational'),
                        nikSap          :    $(this).data('nik'),
                        nama            :    $(this).data('nama'),                        
                        efektif         :    $(this).data('efektif')
                    });
                    
                    //trigger btn tampilkan
                    
                    $('#btnViewDetail').trigger('click');
                    $('#btnCancelModal').trigger('click');
                })
                
            });            
                        
            
            return false;
        });  
        
        $('#btnViewDetail').off().on('click',function(){
                        
            var code=   Global.getCookie('code');                                                
            var nik =   Global.getCookie('NIK_SAP'+Global.getCookie('myUserId'));
            var pdm =   $('#txtDoc').val();
        
            if(nik !="" ){
                                
                Terminasi.action.get.employee_nik(nik,function(){
                                                    
                    if(Request.data.length > 0){

                        Global.detailEmployee();                        
                        
                        Global.disabled();
                        var _nik_nasional= Request.data[0].NIK_NASIONAL != null ? Request.data[0].NIK_NASIONAL :"-" ;
                        $('#optKaryawan option').remove();
                        $('#txtNikNational option').remove();
                        $('#txtNama option').remove();
                        $('#optKaryawan').append('<option selected>'+ Request.data[0].NIK +'</option>');
                        $('#txtNikNational').append('<option selected>'+_nik_nasional+'</option>');
                        $('#txtNama').append('<option selected>'+Request.data[0].EMPLOYEE_NAME+'</option>');
                        $('#txtEfektifDate').data('DateTimePicker').date(moment( Request.data[0].EFFECTIVE_DATE));


                    }else{

                        Component.loader.show('Internet Connection failure...');
                        setTimeout(function(){
                            Component.loader.hide();
                        },'5000');
                    }

                });

                Terminasi.action.get.employee_foto(nik,function(){
                    if(Request.data != null){
                        var foto = "data:"+Request.data.mime_type+";base64,"+Request.data.blob_content;
                        $('#photo').html("<img id='foto' name='foto' src='"+foto+"' style='color: transparent;text-shadow: 0 0 0 red;height: 180px;'/>");

                    }else{

                        Component.loader.show('Internet Connection failure...');
                        setTimeout(function(){
                            Component.loader.hide();
                        },'5000');
                    }

                });
                                                            
            }
            

            return false;
        });
        
        $('#btnAjukan').off().on('click',function(){
                    
            //$('#btnViewDetail').trigger('click');
            
            var alasan = null;
            var no_pdm = $('#txtDoc').val();
            debugger;
            Global.data=[];//refresh param                                    
            console.log(Global.validateForm('formTerminasi'));
            console.log(Global.validateForm('formKewajiban'));
            console.log(Terminasi.trm_alias);
            if(Terminasi.trm_alias=='PH'){
                Global.validateForm('formAlasan');
            }
            
            if(Global.validateForm('formKewajiban')){
                Global.setCookie('NO_DOCUMENT_SANKSI'+Global.getCookie('myUserId'),$('#txtDoc').val());
                Global.select2_failed('#box-optKaryawan');                
                Global.select2_failed('#box-txtKaryawan');
                
                console.log(Global.validateForm('formLampiran'));
                if(Global.validateForm('formLampiran')){ //parsley lampiran
                                            
                    Global.param.kasbon = Global.getCookie('CASH_RECEIPT'+Global.getCookie('myUserId'));
                    Global.param.tanggungan = Global.getCookie('OTHERS_RESPONSIBILITY'+Global.getCookie('myUserId'));
                    Global.param.fasilitas = Global.getCookie('OTHER_EMPLOYEE_AMENETIES'+Global.getCookie('myUserId'));
                    Global.param.EBCC = Global.getCookie('MOBILE_WORK'+Global.getCookie('myUserId'));
                    Global.param.saldo=Global.getCookie('BALANCE_LIABILITY_EMPLOYEES'+Global.getCookie('myUserId'));
                    
                    //alert(Global.param.kasbon);return false;
                   
                    
                    if(typeof Global.param.saldo != 'undefined' &&
                        typeof Global.param.EBCC != 'undefined' &&
                        typeof Global.param.fasilitas != 'undefined' &&
                        typeof Global.param.kasbon != 'undefined' &&
                        typeof Global.param.tanggungan != 'undefined' 
                    ){
                        
                        if(type=='PS'){

                            alasan = Global.listChk;//array format
                            debugger;
                            var _code=Global.getCookie('code');
                            if(_code=='JT02' && Global.validateForm('formTerminasi')){
                                if(alasan.length==0){
                                    Global.cekParsley('#boxAlasan',true);
                                    return false;
                                }else{
                                    Global.cekParsley('#boxAlasan',false);
                                }
                            }else{
                                console.log('hasil update');
                               Global.cekParsley('#boxAlasan',false); 

                            } 

                             if(_code=='JT05' ||_code=='JT03'){ 
                                alasan = $('#txtAlasan').val();
                                if(alasan.length==0){
                                    Global.cekParsley('#txtAlasan',true);
                                    return false;
                                }else{
                                      Global.cekParsley('#txtAlasan',false);
                                }
                             } 

                            
                        }else if(type="PH"){

                            alasan = $('#txtAlasan').val();
                            console.log('Ini alasan yg dibuat: '+ alasan);
                            if(alasan ==""){
                                Global.cekParsley('#boxAlasan',true);
                                return false;
                            }else{
                                Global.cekParsley('#boxAlasan',false);
                            }

                        }
                        
                        //console.log(Global.param.suratPHK);return false;
                        //console.log("d : ");return false;
                        
                        Global.data.push({
                            'BB'                            :   Terminasi.trm_alias,
                            'CC'                            :   this_month,
                            'DD'                            :   this_year,
                            'NIK_SAP'                       :   $('#txtNikSapHidden').val(),
                            'NIK_NATIONAL'                  :   $('#txtNikNationalHidden').val(),
                            'EMP_NAME'                      :   $('#txtNamaSap').val(),
                            'DOC_FILING_PHK'                :   null,                
                            'POB'                           :   $('#txtPob').val(),
                            'DOB'                           :   $('#txtDob').val(),
                            'KTP'                           :   $('#txtKtp').val(),
                            'NPWP'                          :   $('#txtNpwp').val(),
                            'ADDRESS'                       :   $('#txtAlamat').val(),
                            'PHONE'                         :   $('#txtTlp').val(),
                            'MOBILE_PHONE'                  :   $('#txtHp').val(),
                            'JOIN_DATE'                     :   $('#txtJoinDate').val(),
                            'WORK_PERIOD'                   :   $('#txtLamaKerjaTahun').val()+" Tahun "+$('#txtLamaKerjaBulan').val()+" Bulan",
                            'JOB'                           :   $('#txtJabatan').val(),
                            'EMP_STAT'                      :   $('#txtStatusKaryawan').val(),                
                            'CASH_RECEIPT'                  :   Global.param.kasbon=="null"?0:Global.param.kasbon,
                            'OTHERS_RESPONSIBILITY'         :   Global.param.tanggungan=="null"?0:Global.param.tanggungan,
                            'BALANCE_LIABILITY_EMPLOYEES'   :   Global.param.saldo=="null"?0:Global.param.saldo,                
                            'MOBILE_WORK'                   :   Global.param.EBCC=="null"?0:Global.param.EBCC,
                            'OTHER_EMPLOYEE_AMENETIES'      :   Global.param.fasilitas==null?0:Global.param.fasilitas,                
                            'NO_DOCUMENT_SANKSI'            :   $('#txtDoc').val(),
                            'COMP_CODE'                     :   Global.getCookie('companyCode'),
                            'COMP_NAME'                     :   Global.getCookie('company'),
                            'BA_CODE'                       :   Global.getCookie('areaCode'),
                            'BA_NAME'                       :   Global.getCookie('area'),
                            'BPM_CODE'                      :   $('#txtBpmCode').val(),
                            'JOBTYPE'                       :   Global.getCookie('jobType'),
                            'EFEKTIF_DATE'                  :   $('#txtEfektifDateHidden').val(),                
                            'TRM_TYPE'                      :   $this.trm_code,
                            'TRM_CODE'                      :   $this.trm_alias,
                            'JENIS_TERMINASI'               :   $('#txtJenisTerminasi').val(),                                                
                            'REASON_RESIGN'                 :   alasan,                
                            'NOTE_KASBON'                   :   $('#txtNoteKasbon').val(),                
                            'NOTE_TANGGUNGAN'               :   $('#txtNoteTJLain').val(),                
                            'NOTE_SALDO'                    :   $('#txtNoteSaldo').val(),                
                            'NOTE_EBCC'                     :   $('#txtNoteFasilitasEBCC').val(),                
                            'NOTE_FASILITAS'                :   $('#txtNoteFasilitasLain').val(),
                            'WSDL_NOTES'                    :   'PHK '+$('#txtNamaSap').val()+' : '+$('#txtNikSapHidden').val(),                        
                            'FILE_PHK'                      :   Global.param.suratPHK,
                            'FILE_PHK_NAME'                 :   Global.param.suratPHKname,
                            'FILE_CLEARANCE'                :   Global.param.suratClearance,
                            'FILE_CLEARANCE_NAME'           :   Global.param.suratClearanceName,
                            'FILE_LAMPIRAN'                 :   Global.param.suratLampiran,
                            'FILE_LAMPIRAN_NAME'            :   Global.param.suratLampiranName,
                            'FILE_PENGUNDURAN'              :   Global.param.suratPengunduran,
                            'FILE_PENGUNDURAN_NAME'         :   Global.param.suratPengunduranName,
                            'CREATED_BY'                    :   Global.getCookie('myUserId')
                        });

                        Global.setDataTmp(Global.data);
                        //console.log(Global.data);return false;

                        Component.create({
                            title       :   "KONFIRMASI",
                            type        :   $this.pop_up,
                            width       :   750,                            
                            height      :   500,                            
                            content     :   Employee.view.konfirmasiPHK(false),
                            renderTo    :   'body',
                            buttons :   {
                                confirm :   {   
                                    label   :   'Ajukan'
                                },
                                cancel  :   {
                                    label   :   'Tutup'
                                }
                            }
                        },function(){});                        
                        
                        $('#btnCancelModal').text("Tutup");
                        $('#btnConfirm').show().off().on('click',function(){
                            
                            Component.loader.show('Mohon Tunggu ...');
                            
                            $('#btnAjukan').text('Procesing ...');                            
                            
                            $this.post('modal');

                            $('.close').trigger('click');

                        });


                        Employee.setProperty();
                        $('#ContCnfID').hide();

                    }else{

                        Component.create({                        
                            title       :   "NOTIFIKASI",
                            type        :   "modal",
                            width       :   600,                            
                            height      :   350,                            
                            content     :   "<div class='alert alert-danger'><center>KEWAJIBAN PENGEMBALIAN BELUM DIPILIH! </center></div>",
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

                        Global.getModalBtnNotif();


                        return false;
                    }
                    
                    console.log(Global.param);
                    

                    
                }
            }
            
            Global.select2_failed('#box-optKaryawan');
            Global.select2_failed('#box-txtKaryawan');
            return false;
            
        });
        
        
        $('#btnCancel').off().on('click',function(){                            
            window.location.href="create-terminasi";            
            return false;
        });
                
        f();
    }
}
