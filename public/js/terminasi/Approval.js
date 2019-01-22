Terminasi.approval ={
    trm_code    :   Global.getCookie('code'),
    trm_alias   :   null,
    trm_key     :   null,
    pop_up      :   "modal",
    default :   function(){
            
        var $this=this;
                            
                
        Global.param.ask_to="";
        
        var x= window.location.pathname;
            x   =   x.split('approve-terminasi');                    
        
        var y=x[1];
                
        
        if(typeof y != 'undefined'){
            
            y = y.split('/');
            
        }else{
            
            console.log(" current key : "+null);
            $this.trm_key = null;
            
        }
        
        
        
        
        //get termination alias=>ta,ps,ph
        
        var a=$('#txtNoDokumen').val();
        a=a.split("TRM-");
        a=a[1].split('/');
        
        $this.trm_alias = a[0].toLowerCase();
                        
        console.log(" url : "+Global.getCookie('approval_uri'));
        
    },
    load    :   function(z,code){ // action type
        var $this=this;
                        
        $this.default();
                                
        console.log("Approval mode user :  "+z+" for doc no : "+code);
        
        Global.param.code = code;
        Global.param.type = $this.trm_alias;
        
        $this.data.get.history(function(){            
            
            $this.render.history(Request.data,'divHistory');
            
        });
                
        
            
        Terminasi.action.get.employee_nik($('#txtNikSap').val(),function(){
                                    
            if(Request.data.length > 0){

                Global.detailEmployee();

                Global.disabled1();           
            }
            
        });
        
                                
        $this.eventListener(z,code);
        
    },
    action  :   function(p,f){
        
        var $this=this;
            
        $.ajaxSetup({
            
            headers: Request.headers
            
        });  

        $.ajax({
            type        :   'post',
            url         :   Request.Approval.act(p.type,p.act,p.from,p.code),            
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Component.loader.show('Mohon Tunggu ...');
                
            },
            statusCode: {
                
                200: function (r) {
                    var xtype = 1;
                    if(r.warning){
                        xtype = 10;
                    }                                         
                        
                    //display notification after konfirmation
                    $this.getNotification(
                    {
                        title   :   "NOTIFIKASI",
                        message :   r.msg,
                        xType   :   xtype,
                        width   :   600,
                        height  :   420,
                    },function(){

                    });
                    
                    
                    $('#optUser').attr('disabled','disabled');
                    $('#btnConfirm').attr('disabled','disabled').text("Ok");
                    
                    $('#btnCancelModal').removeAttr('disabled').text("Tutup").off().on('click',function(){
                        
                        var a = $('#btnTutup').length;
                        
                        if(a==0){
                            
                            window.location.href=Global.BASE_URL()+"outstanding";
                            
                        }else{
                            
                            $('#btnTutup').trigger('click');
                            
                        }
                                                                        
                        
                    });
                    
                    
                    $('.close').off().on('click',function(){
                        
                        var a = $('#btnTutup').length;
                                                
                        if(a==0){
                            
                            window.location.href=Global.BASE_URL()+"outstanding";
                            
                        }else{
                            
                            $('#btnTutup').trigger('click');
                            
                        }
                    });
                                        
                },
                201: function (r) {

                },
                302: function (r) { //MOVED BECAUSE SESSION EXPIRE
            
                    $this.getNotification(
                    {
                        title   :   "NOTIFIKASI",
                        message :   "PROSES PERSETUJUAN GAGAL<br>MOHON ULANGI KEMBALI",
                        xType   :   0, //1=success , 0==error
                        width   :   600,
                        height  :   420
                    },function(){

                    });
                                        
                },
                400: function (r) {

                },
                404: function (r) {
                    
                    $this.getNotification(
                    {
                        title   :   "NOTIFIKASI",
                        message :   "PROSES PERSETUJUAN GAGAL<br>MOHON ULANGI KEMBALI",
                        xType   :   0, //1=success , 0==error
                        width   :   600,
                        height  :   420
                    },function(){

                    });
                },
                500: function (r) {

                    $this.getNotification(
                    {
                        title   :   "NOTIFIKASI",
                        message :   "PROSES PERSETUJUAN GAGAL<br>MOHON ULANGI KEMBALI",
                        xType   :   0, //1=success , 0==error
                        width   :   600,
                        height  :   420
                    },function(){

                    });
                                
                }
            },
            success :   function(r){                    

                Request.data=r;
                Terminasi.approval.default();
                
                Global.cekConsole();
                
                f();
            }
        });
                           
    },
    data  :   {
        get :   {
            history :   function(f){
                
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'post',
                    url         :   Request.Approval.data.get.history(),                    
                    data        :   Global.param,
                    dataType    :   'json',
                    beforeSend  :   function(){

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
                            Component.loader.show('URL tidak valid , proses gagal ...');
                        },
                        500: function (r) {

                            Component.loader.show('Koneksi bermasalah !!! ...');
                        }
                    },
                    success :   function(r){                    
                        Component.loader.hide();
                        Request.data = r;
                        
                        Global.cekConsole();
                        
                        f();
                    }
                });
                
            },
            pic :   function(id,f){
                
                $.ajaxSetup({
                    
                    headers: Request.headers
                    
                });  

                $.ajax({
                    type        :   'get',
                    url         :   Request.Approval.data.get.pic(id),                                        
                    dataType    :   'json',
                    beforeSend  :   function(){

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
                            Component.loader.show('URL tidak valid , proses gagal ...');
                        },
                        500: function (r) {

                            Component.loader.show('Koneksi bermasalah !!! ...');
                        }
                    },
                    success :   function(r){                    
                        
                        Request.data = r;
                        
                        Global.cekConsole();
                        
                        f();
                    }
                });
                
            }    
        }        
    },
    render  :   {
        history :   function(data,o){
            
            var no = 1;
            var el="";
            var j=1;
            var status="";
                        
                    
            if(data.length > 0){
                           
                el +="<table class='table'>";

                el+="<tr>";
                    el+="<td>No.</td>";
                    el+="<td>Nama Lengkap</td>";
                    el+="<td>Status</td>";                    
                    // el+="<td>Dilakukan Oleh</td>";                    
                    el+="<td>Pada</td>";                                                            
                    el+="<td>Catatan</td>";
                el+="</tr>"

                $.each(data,function(i,e){
                                        
                    el+="<tr>";
                        el+="<td>"+no+"</td>";
                        el+="<td>"+Global.replaceNull(e.nama)+"</td>";
                        el+="<td>"+Global.replaceNull(e.status_doc)+"</td>";                        
                        // el+="<td>"+Global.replaceNull(e.nama)+"</td>";                        
                        el+="<td>"+Global.replaceNull(e.update_date)+"</td>";                                                
                        el+="<td>"+Global.replaceNull(e.notes)+"</td>";
                    el+="</tr>";

                    no++;
                    j++;
                });

                el+="<table>";       
            }else{
                el+= Global.renderEmptyRecord("warning","Tidak ada data history untuk No Dokumen : "+Global.getCookie('approval_doc'));
            }
                    
            $('#'+o).empty().html(el);
            
        }
    },
    getConfirmation :   function(s,f){
                
        var $this=this;
                
        Component.create({
            title       :   s.title,
            type        :   $this.pop_up,
            //width       :   s.width,                            
            width       :   'auto',                            
            height      :   s.height,                            
            content     :   Employee.view.konfirmasi(true,$this.trm_alias),
            renderTo    :   'body',
            buttons :   {
                confirm :   {   
                    label   :   'Kirim'
                },
                cancel  :   {
                    label   :   'Tutup'
                }
            }
        },function(){
            
            f();

        });

        //set properti after dialog open
        $('.cnfID').html("<b>"+$('#txtNoDokumen').val()+"</b>");
        $('.cnpTglEfektifTerminasi').text($('#txtTglEfektif').val());
        $('.cnfPerusahaan').html($('#txtViewCompany').val());
        $('.cnfArea').html($('#txtViewArea').val());
        $('.cnfNikSap').html($('#txtNikSap').val());
        $('.cnfNikNational').html($('#txtNikNational').val());
        $('.cnfNamaKaryawan').html($('#txtNamaSap').val());
        $('.cnfNoKtp').html($('#txtKtp').val());
        $('.cnfNoNpwp').html($('#txtNpwp').val());

        $('.cnfKaryawan').html($('#sumK').clone().html());
        $('.txtNoteKonfirmasi').html($('#txtCatatan').val());
                
        $('#ContCnfID').show();
                        
    },
    getNotification :   function(s,f){                
        var $this=this;
        Component.create({
            title       :   s.title,
            type        :   $this.pop_up,
            //width       :   s.width,                            
            width       :   'auto',                            
            height      :   s.height,                            
            content     :   Employee.view.notifikasi($this.trm_alias,s.xType,s.message),
            renderTo    :   'body',
            buttons :   {
                confirm :   {   
                    label   :   'Tutup'
                },
                cancel  :   {
                    label   :   'Tutup'
                }
            }
        },function(){
            
            f();

        });
        
        $('#btnCancelModal').text("Tutup");
        $('#btnConfirm').hide();
        //set properti after dialog open
        
        $('.cnfID').html("<b>"+$('#txtNoDokumen').val()+"</b>");
        $('.cnpTglEfektifTerminasi').text($('#txtTglEfektif').val());
        $('.cnfPerusahaan').html($('#txtViewCompany').val());
        $('.cnfArea').html($('#txtViewArea').val());
        $('.cnfNikSap').html($('#txtNikSap').val());
        $('.cnfNikNational').html($('#txtNikNational').val());
        $('.cnfNamaKaryawan').html($('#txtNamaSap').val());
        $('.cnfNoKtp').html($('#txtKtp').val());
        $('.cnfNoNpwp').html($('#txtNpwp').val());

        $('.cnfKaryawan').append($('#sumK').clone().html());
        $('.txtNoteKonfirmasi').html($('#txtCatatan').val());

        $('#ContCnfID').show();
        $('#cnfNoteKonfirmasi').hide();
                        
    },
    post    :   function(t,f){
        
        var $this=this;
                
        switch(t){
            
            case    "T":
                
                Global.param.type       =   $this.trm_alias; //type terminatioin ta,ps,ph
                Global.param.act        =   t;
                Global.param.ask_to     =   $('#optUser').find(":selected").val();
                Global.param.from       =   'f'; //value u=url,f=form post
                Global.param.code       =   Global.getCookie('approval_doc64');
                Global.param.note       =   $('#txtCatatan').val();
                Global.param.created_by =   Global.getCookie('myUserId');
                Global.param.updated_by =   Global.getCookie('myUserId');
                Global.param.canceled_by=   Global.getCookie('myUserId');
                Global.param.approved_by=   Global.getCookie('myUserId');                               


                $this.action(Global.param,function(){                       


                });
                    
                $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());
                
            break;
            default:                
                
                Global.param={
                    type        :   $this.trm_alias, //type terminatioin ta,ps,ph
                    act         :   t,
                    from        :   'f', //value u=url,f=form post
                    code        :   Global.getCookie('approval_doc64'),
                    note        :   $('#txtCatatan').val(),
                    created_by  :   Global.getCookie('myUserId'),
                    updated_by  :   Global.getCookie('myUserId'),
                    canceled_by :   Global.getCookie('myUserId'),
                    approved_by :   Global.getCookie('myUserId')
                };

               
                $this.action(Global.param,function(){                    

                });
                      
                
            break;            
        }
        
        f();
    },
    eventListener   :   function(z){
        
        var $this=this;
        
        if(!Global.onDebug){
            Global.clearConsole();
        }
                            
        $.each($('.btn-approval'),function(i,e){
            
            $(e).click(function(){
                
                switch($(e).data('command')){
                    
                    case    "B"://BACK
                        
                        Component.loader.show('Kembali ke Task Page , please wait ...!'); 
                        window.location.href=Global.BASE_URL()+"outstanding";
                        
                    break;
                    case    "C": //BATAL
                        
                        if(Global.validateForm('formApproval')){
                            
                            $this.getConfirmation(
                                {
                                    title   :   "KONFIRMASI PEMBATALAN PERSETUJUAN",
                                    width   :   600,
                                    height  :   420
                            },function(){});

                            $('#btnCancelModal').text("Batal");
                            
                            $('#btnConfirm').removeAttr('disabled').show().off().on('click',function(){
                                
                                $('#btnCancelModal').attr('disabled','disabled');
                                $(this).attr('disabled','disabled').text("wait ...");

                                $this.post($(e).data('command'),function(){
                                    
                                });


                            });

                            $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());
                            
                        }
                                                
                    break;
                    case    "T"://TANYA
                                                
                        if(Global.validateForm('formApproval')){
                            
                            Component.create({
                                title       :   "TANYA",
                                type        :   $this.pop_up,
                                width       :   600,                            
                                height      :   450,                            
                                content     :   Employee.form.askApproval(),
                                renderTo    :   'body',
                                buttons :   {
                                    confirm :   {   
                                        label   :   'Kirim'
                                    },
                                    cancel  :   {
                                        label   :   'Batal'
                                    }
                                }
                            },function(){                                                        



                            });

                            $('#btnCancelModal').text("Batal");

                            $('#btnConfirm').removeAttr('disabled').show().off().on('click',function(){
                                
                                if(Global.validateForm('formApprovalTanya')){
                                    
                                    $(this).attr('disabled','disabled').text('wait ...');
                                    
                                    $this.post($(e).data('command'),function(){
                                        
                                    });                                    
                                    
                                }
                                
                            });

                            $this.data.get.pic(Global.getCookie('approval_doc64'),function(){

                                var el="";
                                var note="<dt>";

                                if(Request.data.length > 0){

                                    el+="<option value=''>-- Pilih User --</option>";

                                    $.each(Request.data,function(i,e){
                                        
                                        var selected=e.fl_active==1?"selected":"";
                                        
                                        //find creator,updater,approver from history

                                        el+="<option value='"+e.user_id+"' data-bpm='"+e.bpm_code+"' "+selected+">"+e.nama+"</option>";
                                                                                
                                    });                      

                                    note+="</dt>";

                                }


                                //render opt user
                                $('#optUser').select2({
                                    placeholder :   'Pilih PIC'
                                }).empty().html(el).change(function(){
                                    Global.param.ask_to = $(this).find(":selected").val();
                                });
                                
                                $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());


                            });                        

                            
                        }                        
                            
                    break;
                    case    "A"://APPROVE
                        
                        //if(Global.validateForm('formApproval')){
                            
                            $this.getConfirmation(
                                {
                                        title   :   "KONFIRMASI PERSETUJUAN",
                                        width   :   600,
                                        height  :   420
                            },function(){});

                            $('#btnCancelModal').text("Batal");


                            $('#btnConfirm').removeAttr('disabled').show().off().on('click',function(){

                                $(this).attr('disabled','disabled').text("wait ...");

                                $this.post($(e).data('command'),function(){
                                    
                                });


                            });

                            $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());
                            
                        //}
                                                                       
                    break;
                    case    "R"://REJECT
                        
                        if(Global.validateForm('formApproval')){
                        
                            $this.getConfirmation(
                            {
                                        title   :   "KONFIRMASI PENOLAKAN",
                                        width   :   600,
                                        height  :   420
                            },function(){});

                            $('#btnConfirm').removeAttr('disabled').show().off().on('click',function(){                                                                
                                
                                $(this).attr('disabled','disabled').text("wait ...");

                                $this.post($(e).data('command'),function(){
                                    
                                });

                            });

                            $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());
                        }
                        
                    break;
                    case    "J"://JAWAB
                        
                        if(Global.validateForm('formApproval')){
                        
                            $this.getConfirmation(
                            {
                                title   :   "KONFIRMASI PERSETUJUAN",
                                width   :   600,
                                height  :   420
                            },function(){});

                            $('#btnConfirm').removeAttr('disabled').show().off().on('click',function(){

                                $(this).attr('disabled','disabled').text("wait ...");

                                $this.post($(e).data('command'),function(){
                                    
                                });

                            });

                            $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());
                        }
                        
                    break;
                }
                
                console.log($(e).data('command'));                        
                
                return false;
                
            });
                        
        });
        
        $.each($('.employee'),function(i,e){
            
            $(e).off().on('click',function(){
                
                Terminasi.action.get.employee_nik($(this).data('nik'),function(){
                                
                    if(Request.data.length > 0){
                        
                        Component.create({
                            title       :   'DETAIL KARYAWAN',
                            type        :   'modal',
                            width       :   900,
                            height      :   650,
                            content     :   Employee.view.detail(),
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
                        $('#btnConfirm').hide();
                        $('#btnCancelModal').html('Tutup');
                        Employee.view.setDetail();
                        
                    }else{
                        
                        Component.loader.show('Internet Connection failure...');
                        
                        setTimeout(function(){
                            Component.loader.hide();
                        },'5000');
                        
                    }

                });
                
                return false;
                
            });
        });
        
        
        $('#btnCommit').off().on('click',function(){            
                                                                      
            if(Global.validateForm('formApproval')){                

                $this.getConfirmation(
                {
                    title   :   "KONFIRMASI PENOLAKAN",
                    width   :   600,
                    height  :   420
                    
                },function(){});
                
                $('#btnCancelModal').text('Batal');

                $('#btnConfirm').removeAttr('disabled').show().off().on('click',function(){
                    
                    $("#btnCancelModal").attr('disabled','disabled');
                    
                    $(this).attr('disabled','disabled').text("wait ...");

                    $this.post('R',function(){

                    });

                });

                $('#txtNoteKonfirmasi').attr('disabled','disabled').val($('#txtCatatan').val());
            }
                                
        });
        
         
    }
}
