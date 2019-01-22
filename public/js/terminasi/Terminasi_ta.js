Terminasi.ta ={    
    pop_up      :   "modal",    
    default :   function(){
            
        var $this=this;
            
        $('.btn').removeAttr('disabled');
        $('.overlay').hide();
        
        
        
        switch(Global.getCookie('code')){
            
            case    "JT01"://tidak aktif
                
                Terminasi.trm_alias = "ta";                
                
            break;
            
            case    "JT02"://phk keinginan sendiri
                
                Terminasi.trm_alias = "ps";
                
                
            break;
            
            case    "JT03": //phk keinginan perusahaan
                
                Terminasi.trm_alias = "ph";
                
                
            break;
            
            default: // user trigger dari email langsung ==>cookie ignored
                //
                //code ...
                
                Terminasi.trm_alias = "ph";                
                
            break
        }        
         
    },
    post    :   function(t){
                               
        Terminasi.action.set({'post':Global.data},function(){
                        
            Component.create({

                title       :   "NOTIFIKASI",
                type        :   t,
                width       :   600,                            
                height      :   350,                            
                content     :   Employee.view.konfirmasi(false,Terminasi.trm_alias)+"<div class='alert alert-success'><center>"+Request.data.msg+"</center></div>",
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
                
                $('#btnConfirm').hide();
                    $('#btnCancelModal').removeAttr('data-dismiss').text("Tutup").off().on('click',function(){
                        
                        window.location.href=Global.BASE_URL()+"outstanding";

                    });
                                                    
                $('#ContCnfID').show();
                $('#cnfID').show().html("<b>"+Request.data.DOC_TERMINATION_CODE+"</b>");
                $('.cnfID').show().html("<b>"+Request.data.DOC_TERMINATION_CODE+"</b>");                  
                
                Global.listChk=[];
                
            }else{
                $('#ContCnfID').hide();
                $('#cnfNoteKonfirmasi').hide();
            }
            
            Employee.setProperty();

            $('#ContCnfID').show();

        });

    },
    load    :   function(){
        
        var $this=this;
        
        $this.default();
        
        Component.render("mainContent",Terminasi.render.form.nonactive(),function(){                        
            
            
            Terminasi.action.get.employee_status(function(){
                                
                
                if(Request.data.length > 0){

                    var el="";
                    var selected="";
                    var currentST = Global.getCookie('CURRENT_STATUS_KARYAWAN'+Global.getCookie('myUserId'));                        

                    $.each(Request.data,function(i,e){
                        
                        if(e.id == currentST){
                            
                            selected = "selected";

                        }else{
                            
                            selected="";
                        }
                        
                        el+="<option value='"+e.id+"' "+selected+">"+e.text+"</option>";
                        
                    });

                    $(el).appendTo($("#optStatusKaryawan"));
                                        
                    
                    $("#optStatusKaryawan").select2({
                        
                        placeholder : "Status karyawan",
                        allowClear:true,                        
                        
                    }).change(function(){
                        Global.setCookie('CURRENT_STATUS_KARYAWAN'+Global.getCookie('myUserId'),$(this).val());                        
                        Global.select2_failed('#box-optStatusKaryawan');                        
                        
                    });
                    
                    $("#optLamaTa").select2({
                        
                        placeholder : "Lama tidak aktif",
                        allowClear:true,                        
                        
                    }).change(function(){
                        
                        Global.setCookie('CURRENT_TA'+Global.getCookie('myUserId'),$(this).val());
                                                
                        Global.select2_failed('#box-optLamaTa');
                        
                    });
                
                }
                                
            });
            
            
            $this.eventListener(function(){                                
                
                $('#show_date').on('blur',function(){
                        
                    Global.setCookie('currentDate',$(this).val());
                    
                });
                                                                
                
            });                

        });
    },            
    eventListener   :   function(f){
        
        var $this=this;
        
        if(!Global.onDebug){
            Global.clearConsole();
        }
        
        $('#show_date').datetimepicker({
            format      : 'DD-MMM-YYYY',            
            defaultDate : moment(localStorage.getItem('NOW')),
            minDate     : today
        });
                        
        //set cookie for option lama tidak aktif
        $.each($('#optLamaTa > option'),function(i,e){
            var a=$(e).attr('value');
                        
            if(Global.getCookie('CURRENT_TA'+Global.getCookie('myUserId'))== a){
                
                $(e).attr('selected','selected');
                
            }
        
        });
        
                
        if(Global.getCookie('currentDate') != null){
            
            //$('#show_date').val(Global.getCookie('currentDate'));
        }
        
                                                
        $('#btnCommit').off().on('click',function(){
                                    
            var show_date = Global.convertDate($('#show_date').val());            
            var status=$('#optStatusKaryawan').find(':selected').val();
            var ref_month=$('#optLamaTa').find(':selected').val();           
                        
            
            Global.listChk = [];
                                    
            if(Global.validateForm('formAjuan')){
                
                Global.select2_failed('#box-optStatusKaryawan');
                Global.select2_failed('#box-optLamaTa');
                                
                Terminasi.action.get.unpresent({date:show_date,status:status,ref_month:ref_month},function(){
                                
                    
                    if(Request.data.length == 0){
                        
                        Component.loader.show('Internet problem...');
                        setTimeout(function(){
                            Component.loader.hide();
                        },'5000');
                    }

                    var el="<div id='secDiv'></div>";

                    $(el).appendTo($('#mainContent'));
                    

                    Component.render("secDiv",Employee.form.nonActiveEmployeeTermination(),function(){
                                                
                        
                        //jika ada data button cancel dan ajukan muncul
                        if(Request.data.length == 0){
                            
                            $('btnCancel').hide();
                            $('btnConnfirm').hide();
                            
                        }
                        
                        
                        Global.iCheck();
                        
                        $('#myTable').dataTable();
                                                

                        //fire on all checkbox
                        $('#myTable thead ').on('ifChanged','.chkAllEmployees', function (){

                            var a = $('.chkEmployee');

                            if ($(this).prop('checked')){
                                for (var i = 0; i <= a.length; i++) {
                                    $('.chkEmployee').eq(i).iCheck('check');
                                }
                            }else{
                                for (var i = 0; i <= a.length; i++) {
                                    $('.chkEmployee').eq(i).iCheck('unCheck');
                                }
                            }


                        });

                        $('#myTable tbody ').on('ifChanged','.chkEmployee', function (){
                                                                                   
                            if ($(this).prop('checked')) {

                                Global.listChk.push($(this).data('nik'));
                                Global.listStatusEmp.push($(this).data('employeestatus'));
                                
                                Global.data.push({
                                    'BB'                :   Terminasi.trm_code,
                                    'CC'                :   this_month,
                                    'DD'                :   this_year,
                                    'NIK_SAP'           :   $(this).data('nik'),
                                    'NIK_NATIONAL'      :   Global.replaceNull($(this).data('niknational')),
                                    'EMP_NAME'          :   $(this).data('employeename'),                                    
                                    'LAST_ACTIVITY'     :   $(this).data('attandancedate'),                                    
                                    'JOB'               :   $(this).data('jobcode'),
                                    'DOB'               :   null,
                                    'JOBTYPE'           :   $(this).data('jobtype'),
                                    'PROFNAME'          :   $(this).data('profname'),
                                    'COMP_CODE'         :   Global.getCookie('companyCode'),
                                    'COMP_NAME'         :   Global.getCookie('company'),
                                    'BA_CODE'           :   Global.getCookie('areaCode'), //for wsdl param                                    
                                    'BA_NAME'           :   Global.getCookie('area'),
                                    'TRM_TYPE'          :   Global.getCookie('code'),
                                    'JENIS_TERMINASI'   :   Global.getCookie('typeTRM'),
                                    'REASON_RESIGN'     :   $(this).data('defaultreason'),
                                    'EMP_STAT'          :   $(this).data('employeestatus'),
                                    'EFEKTIF_DATE'      :   $('#show_date').val(),
                                    'WSDL_NOTES'        :   Global.countSummaryArrayItem(Global.listStatusEmp),
                                    'CREATED_BY'        :   Global.getCookie('myUserId')
                                });

                                console.log(Global.countSummaryArrayItem(Global.listStatusEmp));
                                console.log(Global.listChk);
                                console.log("List Status : "+Global.listStatusEmp);
                                


                            } else {


                                var x = $(this).data('nik');
                                var y= $(this).data('employeestatus');
                                
                                $.grep(Global.data,function(o,i) { 
                                    
                                    if(typeof o != "undefined"){
                                        
                                        if(o.NIK_SAP === x){

                                            Global.removeArrayIndex(Global.data,i);

                                        }                                                                        
                                    }
                                                                                                       
                                },true);                                                   
                                
                                Global.listChk = Global.removeArrayItem(Global.listChk, $(this).data('nik'));
                                                                
                                
                                for(var i=0;i< Global.listStatusEmp.length;i++){
                                                                        
                                    if(Global.listStatusEmp[i]==y){
                                        
                                        Global.listStatusEmp = Global.removeArrayIndex(Global.listStatusEmp,i);
                                        break;                                        
                                    }
                                }
                                   
                                Global.data.WSDL_NOTES = Global.countSummaryArrayItem(Global.listStatusEmp);

                                console.log(Global.listChk);
                                console.log(Global.listStatusEmp);


                            }                                                                                                
                                                        
                            

                        });
                        
                        

                        //fire on link NIK SAP
                        $('#myTable tbody ').on('click','.employee', function (){                                                                                                                

                            Terminasi.action.get.employee_nik($(this).data('nik'),function(){
                                
                                if(Request.data.length > 0){
                                    
                                    Component.create({
                                        title       :   'DETAIL KARYAWAN',
                                        type        :   $this.pop_up,
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
                                    
                                    $('#btnCancelModal').text("Tutup");
                                    $('#btnConfirm').hide();
                                    
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

                        //HANDLER
                        $('#btnAjukan').off().on('click',function(){
                                                          
                            console.log(Global.data.length);//return false;
                            
                            if(Global.data.length > 0){
                                          console.log("lebih dari 0");                      
                                Component.create({
                                    title       :   "KONFIRMASI",
                                    type        :   $this.pop_up,
                                    width       :   600,                            
                                    height      :   350,                            
                                    content     :   Employee.view.konfirmasi(false,Terminasi.trm_alias),
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
                                
                                //if the konfirmasi is modal
                                $('#btnCancelModal').text("Tutup").click(function(){
                                    Component.loader.hide();
                                });
                                
                                $('#btnConfirm').show().off().on('click',function(){
                                        
                                    Component.loader.show('Mohon Tunggu ...');
                                    $('#btnAjukan').text('Procesing ...');
                                    
                                    $this.post('modal');
                                    
                                    $('.close').trigger('click');

                                });
                                    

                                Employee.setProperty();
                                
                                $('#ContCnfID').hide();

                            }else{                     
                                var mess = '<div class="form-horizontal">'+
                                                '<div class="form-group">'+
                                                  '<label class="col-sm-12 control-label" for="inputEmail3">'+
                                                    '<span class="alert alert-warning pull-left text-center" style="width: 100%;">'+
                                                      '<b> <i> Data Belum Dipilih ! </i> </b>'+
                                                    '</span>'+
                                                  '</label>'+
                                                '</div>'+
                                              '</div>';

                                $('.modal-body').html(mess);

                                $('#modalPilih').modal('show');
                                
                            }
                            return false;

                        });                                                                        

                        $('#btnCancel').off().on('click',function(){
                            
                            window.location.href=Global.BASE_URL()+"create-terminasi";                            
                            
                            return false;
                        });

                    });
                                        
                });
                                
                                            
            }            
            
            Global.select2_failed('#box-optStatusKaryawan');
            Global.select2_failed('#box-optLamaTa');
                        
            return false;
        });
                
        
        f();
    }
}
