var date = new Date();
var today = moment(localStorage.getItem('NOW'));
var this_month = date.getMonth()+1;
var this_year = date.getFullYear();

if(this_month > 12){
    this_month='01';
}

var Global={
    SERVER          :   localStorage.getItem('SERVER'),    // option:local,dev,qa,live,
    site            :   'bpmweb', // tergantung doc root,
    onDebug         :   true,
    file    :   {
        blob    :   null,
        ext     :   null,
        width   :   0,
        height  :   0,
        size    :   0
    },
    maxFileSize :   5,//kb
    allowedSize :   false,
    BASE_URL        :   function (){

        // var $this=this;
        // var s;

        // switch(Global.SERVER){

        //     case    "local":

        //         s= 'http://10.0.3.239/bpmweb/public/';

        //     break;
        //     case    "dev":

        //         s="http://tap-flowdev.tap-agri.com/";

        //     break;
        //     case    "qa":

        //         s="http://tap-flowqa.tap-agri.com/";

        //     break;
        //     case    "live":

        //         s="http://tap-flowqa.tap-agri.com/";

        //     break;
        // }

        return Global.SERVER;
    },
    CDN         :   function (){
        var $this=this;

        return $this.BASE_URL()+"cdn/";
    },
    cekConsole  :   function(){
        var $this=this;

        if(!$this.onDebug){
            $this.clearConsole();
        }
    },
    param           :   {},
    data            :   [],
    listChk         :   [],
    listStatusEmp   :   [],
    itemTA          :   [],
    modules :   [
        {module:'terminasi',name:'Request',api:true},
        {module:'terminasi',name:'Employee',api:false},
        {module:'terminasi',name:'Component',api:true},
        {module:'terminasi',name:'Terminasi',api:true},
        {module:'terminasi',name:'Terminasi_nonactive',api:true}
    ],
    getModalBtnNotif    :   function(){

        $('#btnConfirm').hide();
        $('#btnCancelModal').text("Tutup");

    },
    checkMime   :   function(s){

        var x=["png","PNG","gif","jpg","JPG","jpeg","JPEG","pdf","doc","docx","txt"];
        var r= false;

        for(var i=0;i < x.length;i++){
            if(s==x[i]){
                r=true;
                break;
            }
        }

        return r;
    },
    showFile   :   function(o){
        var $this=this;

        $("#"+o).on('change', function () {

            //Get count of selected files
            var countFiles = $(this)[0].files.length;

            var filePath = $(this)[0].value;
            var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
            var allowedMime=$this.checkMime(ext);
            var fileHolder = $('#fileHolder1');

            switch(o){
                case    "fileSuratPhk":
                    fileHolder = $('#fileHolder1');
                    $('#fileHolder1').empty();
                break;
                case    "fileClearance":
                    fileHolder = $('#fileHolder2');
                    $('#fileHolder2').empty();
                break;
                case    "fileLampiran":
                    fileHolder = $('#fileHolder3');
                    $('#fileHolder3').empty();
                break;
                case    "filePengunduranDiri":
                    fileHolder = $('#fileHolder1');
                    $('#fileHolder1').empty();
                break;
            }


            if(allowedMime){

                $('#btnAjukan').attr('disabled','disabled').text("validating file ...");

                if (typeof (FileReader) != "undefined") {

                    for (var i = 0; i < countFiles; i++) {
                        var reader = new FileReader();
                        reader.onload = function (e) {

                            $('#'+o+"-notif").remove();


                            if(ext=='jpg' || ext=='JPG' || ext=='png' || ext=='PNG' || ext=='jpeg' || ext=='JPEG' || ext=='gif' || ext=='GIF' || ext=='ico'){

                                $("<img />", {
                                    "src"   : e.target.result,
                                    "class" : "thumb-image",
                                    //"id"    :   "img-"+o
                                })
                                .appendTo(fileHolder)
                                .css({
                                    width   :   '200px',
                                    height  :   '150px',
                                })
                                .load(function(){

                                    var file=this;

                                    $this.getFileSize(o,function(){

                                        var msg = "<span id='"+o+"-notif' style='color:red;'>File tidak boleh melebihi ukuran 5 MB</span>";

                                        $('#btnAjukan').removeAttr('disabled').text("Ajukan");

                                        $this.file.blob     = e.target.result;
                                        $this.file.ext      = ext,
                                        $this.file.width    = file.naturalWidth;
                                        $this.file.height   = file.naturalHeight;

                                        console.log(o+" width   : "+file.naturalWidth);
                                        console.log(o+" height  : "+file.naturalHeight);
                                        console.log(o+" size    : "+$this.file.size);
                                        console.log(o+" max.size    : "+$this.maxFileSize);

                                        if($this.file.size < $this.maxFileSize){

                                            switch(o){
                                                case    "fileSuratPhk":
                                                    Global.param.suratPHK=$this.file.blob;
                                                    Global.param.suratPHKname=$('#'+o).val();

                                                break;
                                                case    "fileClearance":
                                                    Global.param.suratClearance=$this.file.blob;
                                                    Global.param.suratClearanceName=$('#'+o).val();

                                                break;
                                                case    "fileLampiran":
                                                    Global.param.suratLampiran=$this.file.blob;
                                                    Global.param.suratLampiranName=$('#'+o).val();

                                                break;
                                                case    "filePengunduranDiri":
                                                    Global.param.suratPengunduran=$this.file.blob;
                                                    Global.param.suratPengunduranName=$('#'+o).val();

                                                break;

                                            }

                                           $('#'+o+"-notif").remove();

                                        }else{

                                            $('#'+o).parent().append(msg);

                                            $('#'+o).val("");

                                            return false;

                                        }


                                    });



                                });

                            }else{

                                //mime document


                                $this.getFileSize(o,function(){

                                    var msg = "<span id='"+o+"-notif' style='color:red;'>UKURAN FILE TIDAK BOLEH LEBIH DARI 5MB</span>";

                                    $('#btnAjukan').removeAttr('disabled').text("Ajukan");;

                                    $this.file.blob     = e.target.result;
                                    $this.file.ext      = ext;

                                    console.log(o+" size    : "+$this.file.size);
                                    console.log(o+" max.size    : "+$this.maxFileSize);


                                    if($this.file.size < $this.maxFileSize){

                                        switch(o){
                                            case    "fileSuratPhk":
                                                Global.param.suratPHK=$this.file.blob;
                                                Global.param.suratPHKname=$('#'+o).val();

                                            break;
                                            case    "fileClearance":
                                                Global.param.suratClearance=$this.file.blob;
                                                Global.param.suratClearanceName=$('#'+o).val();

                                            break;
                                            case    "fileLampiran":
                                                Global.param.suratLampiran=$this.file.blob;
                                                Global.param.suratLampiranName=$('#'+o).val();

                                            break;
                                            case    "filePengunduranDiri":
                                                Global.param.suratPengunduran=$this.file.blob;
                                                Global.param.suratPengunduranName=$('#'+o).val();


                                            break;

                                        }

                                        $('#'+o+"-notif").remove();

                                    }else{


                                        $('#'+o).parent().append(msg);

                                        $('#'+o).val("");

                                        return false;

                                    }

                                });

                            }
                        }

                        reader.readAsDataURL($(this)[0].files[i]);
                    }

                } else {

                    Component.create({
                        title       :   "NOTIFIKASI",
                        type        :   "modal",
                        width       :   600,
                        height      :   350,
                        content     :   "<div class='alert alert-danger'><center>This Browser is not supported </center></div>",
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
            }else{

                $('#'+o+"-notif").remove();

                var msg = "<span id='"+o+"-notif' style='color:red;'>Format File is not allowed</span>";

                $('#'+o).parent().append(msg);

                $('#'+o).val("");

                return false;
            }
        });
    },
    createRequestObject : function () {
        var xhr;
        try {
                xhr = new XMLHttpRequest();
        }
        catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        return xhr;
    },
    checkIE : function (){

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
            // If Internet Explorer, return version number
            //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
            console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
            return true;

        } else {
            // If another browser, return 0
            console.log('it is not IE ');
            return false;
        }

    },
    getFileSize : function (o,f) {
        var $this = this;

        try {

            var fileSize = 0;
            //for IE
            if($this.checkIE()) {//we could use this $.browser.msie but since it's depracted we'll use this function
                //before making an object of ActiveXObject,
                //please make sure ActiveX is enabled in your IE browser
                var objFSO = new ActiveXObject("Scripting.FileSystemObject"); var filePath = $("#" + o)[0].value;
                var objFile = objFSO.getFile(filePath);
                var fileSize = objFile.size; //size in kb
                fileSize = fileSize / 1048576; //size in mb

            }else {

                fileSize = $("#" + o)[0].files[0].size //size in kb
                fileSize = fileSize / 1048576; //size in mb
            }

            $this.file.size = fileSize;

            f();

        }catch (e) {

            console.log("Error is :" + e);

            return false;
        }

    },
    b64EncodeUnicode :  function(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1){
            return String.fromCharCode('0x' + p1);
        }));
    },
    b64DecodeUnicode : function(str) {
            return atob(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    },
    renderEmptyRecord   :   function(t,s){
        return "<div class='alert alert-"+t+"'>"+s+"</div>";
    },
    replaceNull :   function(s){
        var str = s==null || s=='null'?"-":s;
        return str;
    },
    iCheck    :   function () {
        if (!$().iCheck)  return;
        $(':checkbox:not(.js-switch, .switch-input, .switch-iphone, .onoffswitch-checkbox, .ios-checkbox), :radio').each(function() {

            var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
            var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';

            if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
                $(this).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: radioClass,
                    insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
                });
            } else {
                $(this).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: radioClass
                });
            }
        });
    },
    hitungMasaBakti :   function(x,y){

        var $this=this;
        var res= {};

        var a   = x.split('-');
        var b   = y.split('-');
        var tahun = parseInt(a[0]) - parseInt(b[2]);
        var bulan=0;

        if(parseInt(a[1]) < $this.convertMonthToNumeric(b[1])){
            tahun = parseInt(tahun) - 1;
            bulan =(12-($this.convertMonthToNumeric(b[1]) - parseInt(a[1])))
        }else{
            bulan = parseInt(a[1]) - $this.convertMonthToNumeric(b[1]);
        }

        return res={
            tahun   :   tahun,
            bulan   :   bulan
        }

    },
    convertMonthToEng   :   function(x){
        var $this=this;

        var a   = x.split(' ');
        var b   = a[0].split('-');

        return b[2]+"-"+$this.convertMonthToNumeric(b[1])+"-"+b[0];

    },
    convertMonthToNumeric   :   function(s){

        var z;

        switch(s){

            case    "Jan":
                z=01;
            break;
            case    "Feb":
                z=02;
            break;
            case    "Mar":
                z=03;
            break;
            case    "Apr":
                z=04;
            break;
            case    "May":
                z=05;
            break;
            case    "Jun":
                z=06;
            break;
            case    "Jul":
                z=07;
            break;
            case    "Aug":
                z=08;
            break;
            case    "Sep":
                z=09;
            break;
            case    "Oct":
                z=10;
            break;
            case    "Nov":
                z=11;
            break;
            case    "Dec":
                z=12;
            break;

        }

        return z;
    },
    convertMonthToString   :   function(s){

        var z;

        switch(s){

            case    "01":
                z="Jan";
            break;
            case    "02":
                z="Feb";
            break;
            case    "03":
                z="Mar";
            break;
            case    "04":
                z="Apr";
            break;
            case    "05":
                z="Mei";
            break;
            case    "06":
                z="Jun";
            break;
            case    "07":
                z="Jul";
            break;
            case    "08":
                z="Ags";
            break;
            case    "09":
                z="Sep";
            break;
            case    "10":
                z="Okt";
            break;
            case    "11":
                z="Nov";
            break;
            case    "12":
                z="Des";
            break;

            case    "1":
                z="Jan";
            break;
            case    "2":
                z="Feb";
            break;
            case    "3":
                z="Mar";
            break;
            case    "4":
                z="Apr";
            break;
            case    "5":
                z="Mei";
            break;
            case    "6":
                z="Jun";
            break;
            case    "7":
                z="Jul";
            break;
            case    "8":
                z="Ags";
            break;
            case    "9":
                z="Sep";
            break;
            case    "10":
                z="Okt";
            break;
            case    "11":
                z="Nov";
            break;
            case    "12":
                z="Des";
            break;

        }

        return z;
    },
    convertDate :   function(d){

        var $this=this;
        console.log(typeof d+": "+d);
        var x = d.split("-");

        var m = $this.convertMonthToNumeric(x[1]);

        // if (m.toString().length<2) {
        //     m = '0'+m;
        // }

        return x[2]+"-"+m+"-"+x[0];

    },
    convertDateInd :   function(d){

        var $this=this;
        var x = d.split("-");

        var m = $this.convertMonthToString(x[1]);
        var tgl = x[2].split(" ");
        return tgl[0]+"-"+m+"-"+x[0];

    },
    detailEmployee  :   function(){

        var $this=this;
        var data = Request.data;

        $('#txtNama').val(data[0].EMPLOYEE_NAME);
        $('#txtNamaSap').val(data[0].EMPLOYEE_NAME);

        $('#txtPob').val(data[0].POB);
        $('#txtDob').val(data[0].DOB);
        $('#txtAgama').val(data[0].RELIGION);

        $('#txtKtp').val(data[0].NO_KTP);
        $('#txtNpwp').val(typeof data[0].NPWP=='undefined'?'-':data[0].NPWP);

        $('#txtAlamat').val(data[0].ADDRESS);
        $('#txtNpwp').val(data[0].NPWP);
        $('#txtHp').val(data[0].MOBILE_PHONE);
        $('#txtTlp').val(data[0].PHONE);
        $('#txtJoinDate').val(data[0].JOIN_DATE);

        $('#txtJabatan').val(data[0].JOB_CODE);

        $('#txtStatusKaryawan').val(data[0].STATUS);

        Global.setCookie('jobType',data[0].JOB_TYPE);

        var s=$('#txtEfektifDateHidden').val();


        if(s==""){ // PS
            $('#txtEfektifDateHidden').val($this.convertMonthToEng($('#txtEfektifDate').val()));
            $('#txtNikSapHidden').val(data[0].NIK);
            $('#txtNikNationalHidden').val(data[0].NIK_NASIONAL);
            $('#txtNamaHidden').val(data[0].EMPLOYEE_NAME);

        }else if(Global.getCookie('code')=='JT02'){
            $('#txtNikSapHidden').val($('#optKaryawan').val());
            $('#txtNikNationalHidden').val('-');
            $('#txtNamaHidden').val($('#txtNama').val());
        }


        var lama = $this.hitungMasaBakti($('#txtEfektifDateHidden').val(),$('#txtJoinDate').val());

        console.log(" Tahun Lama Kerja : "+lama.tahun+ " Tahun "+lama.bulan+" Bulan");

        $('#txtLamaKerjaTahun').val(lama.tahun);
        $('#txtLamaKerjaBulan').val(lama.bulan);


    },
    disabled    :   function(){
        console.log('disabled');
        $('#txtNikSap').prop('disabled','disabled');
        //$('#txtNikNational').prop('disabled','disabled');
        $('#txtNamaSap').prop('disabled','disabled');

        $('#txtPob').prop('disabled','disabled');
        $('#txtDob').prop('disabled','disabled');
        $('#txtAgama').prop('disabled','disabled');

        $('#txtKtp').prop('disabled','disabled');
        $('#txtNpwp').prop('disabled','disabled');

        $('#txtAlamat').prop('disabled','disabled');
        $('.txtAlamat').prop('disabled','disabled');

        $('#txtTlp').prop('disabled','disabled');
        $('#txtHp').prop('disabled','disabled');

        $('#txtLamaKerjaTahun').prop('disabled','disabled');
        $('#txtLamaKerjaBulan').prop('disabled','disabled');


        $('#txtJoinDate').prop('disabled','disabled');

        $('#txtJabatan').prop('disabled','disabled');
        $('#txtStatusKaryawan').prop('disabled','disabled');

    },
    disabled1    :   function(){

        $('#txtNikSap').prop('disabled','disabled');
        $('#txtNikNational').prop('disabled','disabled');
        $('#txtNamaSap').prop('disabled','disabled');

        $('#txtPob').prop('disabled','disabled');
        $('#txtDob').prop('disabled','disabled');
        $('#txtAgama').prop('disabled','disabled');

        $('#txtKtp').prop('disabled','disabled');
        $('#txtNpwp').prop('disabled','disabled');

        $('#txtAlamat').prop('disabled','disabled');
        $('.txtAlamat').prop('disabled','disabled');

        $('#txtTlp').prop('disabled','disabled');
        $('#txtHp').prop('disabled','disabled');

        $('#txtLamaKerjaTahun').prop('disabled','disabled');
        $('#txtLamaKerjaBulan').prop('disabled','disabled');


        $('#txtJoinDate').prop('disabled','disabled');

        $('#txtJabatan').prop('disabled','disabled');
        $('#txtStatusKaryawan').prop('disabled','disabled');

    },
    clearConsole    :   function () {
        if(window.console || window.console.firebug) {
         console.clear();
        }
    },
    loadModules  :function(){

        var $this=this;
        var modules={};
        var script;

        try{
            for(var key in $this.modules){
                var name=$this.modules[key]['name'];
                modules.module=$this.modules[key]['module'];
                modules.name=$this.modules[key]['name'];

                script=$this.getScriptName(modules);

                try{
                    if(!$this.isScriptAlreadyIncluded(script)){
                        try{
                            $($this.createScript(modules)).appendTo($('body'));
                        }catch(e){
                            return false;
                        }
                    }
                }catch(e){

                }

                //$this.clearConsole();
            }
        }catch(e){

        }

    },
    getScriptName   :   function(m){
        return 'public/js/module/'+m.module+'/'+m.name+'.js';
    },
    isScriptAlreadyIncluded :   function (src){
        var scripts = document.getElementsByTagName("script");
        for(var i = 0; i < scripts.length; i++)
           if(scripts[i].getAttribute('src') == src) return true;
        return false;
    },
    createScript    :   function(m){
        var $this=this;
        var js=document.createElement('script');
            js.type='text/javascript';
            js.async=true;
            js.src='/js/module/'+m.module+'/'+m.name+'.js';
        return js;
    },
    countSummaryArrayItem   :   function(arr){
        var $this = this;

        var s="";
        var counts = {};

        for(var i = 0; i< Global.listStatusEmp.length; i++) {
            var num = Global.listStatusEmp[i];

            counts[num] = counts[num] ? counts[num]+1 : 1;

        }

        /*
        var kt  =   typeof counts['KT'] != 'undefined'?counts['KT']:0;
        var kl  =   typeof counts['KL'] != 'undefined'?counts['KL']:0;
        var kk  =   typeof counts['KK'] != 'undefined'?counts['KK']:0;

        s += "KT , Sebanyak " + kt + " Orang<br>";
        s += "KL , Sebanyak " + kl + " Orang<br>";
        s += "KK , Sebanyak " + kk + " Orang<br>";

        */
        if(typeof counts['KT'] != 'undefined' && typeof counts['KL'] != 'undefined' && typeof counts['KK'] != 'undefined' ) {

            s += "KT , Sebanyak " + counts['KT'] + " Orang<br>";
            s += "KL , Sebanyak " + counts['KL'] + " Orang<br>";
            s += "KK , Sebanyak " + counts['KK'] + " Orang<br>";

        }else if(typeof counts['KT'] != 'undefined' && typeof counts['KL'] != 'undefined' && typeof counts['KK'] == 'undefined' ){

            s += "KT , Sebanyak " + counts['KT'] + " Orang<br>";
            s += "KL , Sebanyak " + counts['KL'] + " Orang<br>";

        }else if(typeof counts['KT'] == 'undefined' && typeof counts['KL'] != 'undefined' && typeof counts['KK'] != 'undefined' ){

            s += "KL , Sebanyak " + counts['KL'] + " Orang<br>";
            s += "KK , Sebanyak " + counts['KK'] + " Orang<br>";

        }else if(typeof counts['KT'] != 'undefined' && typeof counts['KL'] == 'undefined' && typeof counts['KK'] != 'undefined' ){

            s += "KT , Sebanyak " + counts['KT'] + " Orang<br>";
            s += "KL , Sebanyak " + counts['KL'] + " Orang<br>";

        }else if(typeof counts['KT'] != 'undefined' && typeof counts['KL'] == 'undefined' && typeof counts['KK'] == 'undefined' ){

            s+="KT , Sebanyak "+counts['KT']+" Orang<br>";

        }else if(typeof counts['KT'] == 'undefined' && typeof counts['KL'] != 'undefined' && typeof counts['KK'] == 'undefined' ){

            s+="KL , Sebanyak "+counts['KL']+" Orang<br>";

        }else if(typeof counts['KT'] == 'undefined' && typeof counts['KL'] == 'undefined' && typeof counts['KK'] != 'undefined' ){

            s+="KK , Sebanyak "+counts['KK']+" Orang<br>";
        }



        return s;


    },
    groupArrayItem :   function( array , f ){
        var groups = {};
        array.forEach( function( o )
        {
          var group = JSON.stringify( f(o) );
          groups[group] = groups[group] || [];
          groups[group].push( o );
        });
        return Object.keys(groups).map( function( group )
        {
          return groups[group];
        })
    },
    removeArrayItem : function(arr,i) {

        var l=arr.length;
        for(var b=l;b > 0;b--){
            var item=arr.indexOf(i); // return index

            for(var f=0;f <= arr.length;f++){

                if(arr[f]==i){
                    arr.splice(f,1);
                }
            }
        }

        return arr;
    },
    removeArrayIndex : function(arr,i) {

        //console.log("remove index : "+i);
        arr.splice(i,1);

        return arr;
    },
    findIndexByObject   :   function(array,attr,value){

        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }

    },
    findObjectElement   :   function(array,value){

        var index = array.map(function(item){
            return item;

        }).indexOf(value);

        return array[index];
    },
    setCookie : function(key, value) {
        var expires = new Date();
        var time=expires.getTime();
        time+=3600 * 1000; //set to 1 hour
        expires.setTime(expires.getTime() + 31536000000); //1 year
        window.localStorage.setItem(key, value);
    },
    getCookie   :   function(key) {
        var value = window.localStorage.getItem(key);
        return value;
    },
    clearCookie :   function(){
        var $this=this;

        $this.setCookie('companyCode',null);
        $this.setCookie('company',null);

        $this.setCookie('areaCode',null);
        $this.setCookie('area',null);

        $this.setCookie('linkCode',null);
        $this.setCookie('typeTRM',null);

        $this.listChk=[];
    },
    setDataTmp  :   function(arr){

        var $this=this;

        if(arr.length > 0){
            $.each(arr[0],function(i,e){
                var s = i.split('_');

                if(s[0] != undefined && s[0] !='FILE'){
                    $this.setCookie(i+Global.getCookie('myUserId'),e);
                }

            });
        }

        return true;
    },
    getDataTemp :   function(){
        var $this=this;


        if($this.getCookie('COMP_CODE'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('COMP_CODE'+Global.getCookie('myUserId'))!= 'undefined'){

            }
        }

        if($this.getCookie('BA_CODE'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('BA_CODE'+Global.getCookie('myUserId'))!= 'undefined'){

            }
        }

        if($this.getCookie('JT'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('JT'+Global.getCookie('myUserId'))!= 'undefined'){

            }
        }

        if($this.getCookie('CURRENT_STATUS_KARYAWAN'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('CURRENT_STATUS_KARYAWAN'+Global.getCookie('myUserId'))!= 'undefined'){

            }
        }

        if($this.getCookie('CURRENT_TA'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('CURRENT_TA'+Global.getCookie('myUserId'))!= 'undefined'){

            }
        }

        if($this.getCookie('NIK_SAP'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('NIK_SAP'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtNikSapHidden').val($this.getCookie('NIK_SAP'+Global.getCookie('myUserId')));
                $('#txtNikSap').val($this.getCookie('NIK_SAP'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NIK_NATIONAL'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('NIK_NATIONAL'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtNikNationalHidden').val($this.getCookie('NIK_NATIONAL'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('EMP_NAME'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('EMP_NAME'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtNamaHidden').val($this.getCookie('EMP_NAME'+Global.getCookie('myUserId')));
                $('#txtNamaSap').val($this.getCookie('EMP_NAME'+Global.getCookie('myUserId')));
            }

            $('#txtNamaHidden').val($this.getCookie('EMP_NAME'+Global.getCookie('myUserId')));
        }

        if($this.getCookie('POB'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('POB'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtPob').val($this.getCookie('POB'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('DOB'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('DOB'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtDob').val($this.getCookie('DOB'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('KTP'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('KTP'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtKtp').val($this.getCookie('KTP'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NPWP'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('NPWP'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtNpwp').val($this.getCookie('NPWP'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('ADDRESS'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('ADDRESS'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtAlamat').val($this.getCookie('ADDRESS'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('PHONE'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('PHONE'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtTlp').val($this.getCookie('PHONE'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('MOBILE_PHONE'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('MOBILE_PHONE'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtHp').val($this.getCookie('MOBILE_PHONE'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('EFEKTIF_DATE'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('EFEKTIF_DATE'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtEfektifDateHidden').val($this.getCookie('EFEKTIF_DATE'+Global.getCookie('myUserId')));
            }

            $('#txtEfektifDateHidden').val($this.getCookie('EFEKTIF_DATE'+Global.getCookie('myUserId')));
        }else{
            //code
        }

        if($this.getCookie('JOIN_DATE'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('JOIN_DATE'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtJoinDate').val($this.getCookie('JOIN_DATE'+Global.getCookie('myUserId')));

                var lama = $this.hitungMasaBakti($('#txtEfektifDateHidden').val(),$('#txtJoinDate').val());

                console.log(" Tahun Lama Kerja : "+lama.tahun+ " Tahun "+lama.bulan+" Bulan");

                $('#txtLamaKerjaTahun').val(lama.tahun);
                $('#txtLamaKerjaBulan').val(lama.bulan);
            }
        }

        if($this.getCookie('WORK_PERIOD'+Global.getCookie('myUserId')) != 'null' || Global.getCookie('WORK_PERIOD'+Global.getCookie('myUserId'))!= 'undefined'){



        }

        if($this.getCookie('JOB'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('JOB'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtJabatan').val($this.getCookie('JOB'+Global.getCookie('myUserId')));
            }

        }

        if($this.getCookie('EMP_STAT'+Global.getCookie('myUserId')) != 'null'){
            if(Global.getCookie('EMP_STAT'+Global.getCookie('myUserId'))!= 'undefined'){
                $('#txtStatusKaryawan').val($this.getCookie('EMP_STAT'+Global.getCookie('myUserId')));
            }
        }

        if(Global.getCookie('optAlasan'+Global.getCookie('myUserId'))!= 'null'){
            if(Global.getCookie('optAlasan'+Global.getCookie('myUserId'))!= 'undefined'){
                if(Global.getCookie('optAlasan'+Global.getCookie('myUserId'))== 'pensiun'){

                    $('#optPensiun').attr('checked','checked');

                }else if(Global.getCookie('optAlasan'+Global.getCookie('myUserId'))!= 'meninggal'){

                    $('#optMeninggal').attr('checked','checked');

                }
            }
        }

        if($this.getCookie('CASH_RECEIPT'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('CASH_RECEIPT'+Global.getCookie('myUserId')) != 'undefined'){
                if($this.getCookie('CASH_RECEIPT'+Global.getCookie('myUserId'))=='1'){
                    $('#optTJKasbonSelesai').attr('checked','checked');
                    $('#txtNoteKasbon').removeAttr('required');
                }else{
                    $('#optTJKasbonBelum').attr('checked','checked');
                    $('#txtNoteKasbon').attr('required','required');
                }

            }else{
                $('#optTJKasbonBelum').attr('checked','checked');
            }
        }else{
            $('#optTJKasbonBelum').attr('checked','checked');
        }

        if($this.getCookie('OTHERS_RESPONSIBILITY'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('OTHERS_RESPONSIBILITY'+Global.getCookie('myUserId')) != 'undefined'){
                if($this.getCookie('OTHERS_RESPONSIBILITY'+Global.getCookie('myUserId'))=='1'){
                    $('#optTJLainSelesai').attr('checked','checked');
                    $('#txtNoteTJLain').removeAttr('required');
                }else{
                    $('#optTJLainBelum').attr('checked','checked');
                    $('#txtNoteTJLain').attr('required','required');
                }
            }else{
                $('#optTJLainBelum').attr('checked','checked');
            }
        }else{
            $('#optTJLainBelum').attr('checked','checked');
        }

        if($this.getCookie('BALANCE_LIABILITY_EMPLOYEES'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('BALANCE_LIABILITY_EMPLOYEES'+Global.getCookie('myUserId')) != 'undefined'){
                if($this.getCookie('BALANCE_LIABILITY_EMPLOYEES'+Global.getCookie('myUserId'))==1){
                    $('#optSaldoSelesai').attr('checked','checked');
                    $('#txtNoteSaldo').removeAttr('required');
                }else{
                    $('#optSaldoBelum').attr('checked','checked');
                    $('#txtNoteSaldo').attr('required','required');
                }
            }else{
                $('#optSaldoBelum').attr('checked','checked');
            }
        }else{
            $('#optSaldoBelum').attr('checked','checked');
        }

        if($this.getCookie('MOBILE_WORK'+Global.getCookie('myUserId')) != 'null'){

            if($this.getCookie('MOBILE_WORK'+Global.getCookie('myUserId')) != 'undefined'){

                if($this.getCookie('MOBILE_WORK'+Global.getCookie('myUserId'))=='1'){

                    $('#optFasilitasEBCCselesai').attr('checked','checked');
                    $('#txtNoteFasilitasEBCC').removeAttr('required');


                }else{

                    $('#optFasilitasEBCCbelum').attr('checked','checked');
                    $('#txtNoteFasilitasEBCC').attr('required','required');
                }
            }else{
                $('#optFasilitasEBCCbelum').attr('checked','checked');
            }
        }else{
            $('#optFasilitasEBCCbelum').attr('checked','checked');
        }

        if($this.getCookie('OTHER_EMPLOYEE_AMENETIES'+Global.getCookie('myUserId')) != 'null'){

            if($this.getCookie('OTHER_EMPLOYEE_AMENETIES'+Global.getCookie('myUserId')) != 'undefined'){

                if($this.getCookie('OTHER_EMPLOYEE_AMENETIES'+Global.getCookie('myUserId'))=='1'){

                    $('#optFasilitasLainSelesai').attr('checked','checked');
                    $('#txtNoteFasilitasLain').removeAttr('required');

                }else{

                    $('#optFasilitasBelum').attr('checked','checked');
                    $('#txtNoteFasilitasLain').attr('required','required');
                }
            }else{
                $('#optFasilitasBelum').attr('checked','checked');
            }
        }else{
            $('#optFasilitasBelum').attr('checked','checked');
        }

        if($this.getCookie('NO_DOCUMENT_SANKSI'+Global.getCookie('myUserId')) != 'null'){

            if($this.getCookie('NO_DOCUMENT_SANKSI'+Global.getCookie('myUserId')) != 'undefined'){

                $('#txtDoc').val($this.getCookie('NO_DOCUMENT_SANKSI'+Global.getCookie('myUserId'))).attr('disabled','disabled');
            }
        }else{

            //alert("aku");

        }

        if($this.getCookie('COMP_NAME'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('COMP_NAME'+Global.getCookie('myUserId')) != 'undefined'){

        }

        if($this.getCookie('BA_NAME'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('BA_NAME'+Global.getCookie('myUserId')) != 'undefined' ){

        }
        if($this.getCookie('BPM_CODE'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('BPM_CODE'+Global.getCookie('myUserId')) != 'undefined' ){

        }
        if($this.getCookie('JOBTYPE'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('JOBTYPE'+Global.getCookie('myUserId')) != 'undefined'){

        }

        if($this.getCookie('TRM_TYPE'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('TRM_TYPE'+Global.getCookie('myUserId')) != 'undefined'){

        }
        if($this.getCookie('TRM_CODE'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('TRM_CODE'+Global.getCookie('myUserId')) != 'undefined'){

        }
        if($this.getCookie('JENIS_TERMINASI'+Global.getCookie('myUserId')) != 'null' || $this.getCookie('JENIS_TERMINASI'+Global.getCookie('myUserId')) != 'undefined'){

        }

        if($this.getCookie('REASON_RESIGN'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('REASON_RESIGN'+Global.getCookie('myUserId')) != 'undefined'){
                $('#txtAlasan').val($this.getCookie('REASON_RESIGN'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NOTE_KASBON'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('NOTE_KASBON'+Global.getCookie('myUserId')) != 'undefined'){
                $('#txtNoteKasbon').val($this.getCookie('NOTE_KASBON'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NOTE_TANGGUNGAN'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('NOTE_TANGGUNGAN'+Global.getCookie('myUserId')) != 'undefined'){
                $('#txtNoteTJLain').val($this.getCookie('NOTE_TANGGUNGAN'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NOTE_SALDO'+Global.getCookie('myUserId')) != "null"){

            if($this.getCookie('NOTE_SALDO'+Global.getCookie('myUserId')) != 'undefined'){
                $('#txtNoteSaldo').val($this.getCookie('NOTE_SALDO'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NOTE_EBCC'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('NOTE_EBCC'+Global.getCookie('myUserId')) != 'undefined'){
                $('#txtNoteFasilitasEBCC').val($this.getCookie('NOTE_EBCC'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('NOTE_FASILITAS'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('NOTE_FASILITAS') != 'undefined'+Global.getCookie('myUserId')){
                $('#txtNoteFasilitasLain').val($this.getCookie('NOTE_FASILITAS'+Global.getCookie('myUserId')));
            }
        }

        if($this.getCookie('FILE_PHK'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_PHK'+Global.getCookie('myUserId')) != 'undefined'){

            }
        }

        if($this.getCookie('FILE_PHK_NAME'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_PHK_NAME'+Global.getCookie('myUserId')) != 'undefined'){
                //$('#fileSuratPhk').val($this.getCookie('FILE_PHK_NAME'));
            }
        }

        if($this.getCookie('FILE_CLEARANCE'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_CLEARANCE'+Global.getCookie('myUserId')) != 'undefined'){

            }
        }

        if($this.getCookie('FILE_CLEARANCE_NAME'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_CLEARANCE_NAME'+Global.getCookie('myUserId')) != 'undefined'){
                //$('#fileClearance').val($this.getCookie('FILE_CLEARANCE_NAME'));
            }
        }

        if($this.getCookie('FILE_LAMPIRAN'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_LAMPIRAN'+Global.getCookie('myUserId')) != 'undefined'){

            }
        }

        if($this.getCookie('FILE_LAMPIRAN_NAME'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_LAMPIRAN_NAME'+Global.getCookie('myUserId')) != 'undefined'){
                //$('#fileLampiran').val($this.getCookie('FILE_LAMPIRAN_NAME'));
            }

        }

        if($this.getCookie('FILE_PENGUNDURAN'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_PENGUNDURAN'+Global.getCookie('myUserId')) != 'undefined'){

            }
        }

        if($this.getCookie('FILE_PENGUNDURAN_NAME'+Global.getCookie('myUserId')) != 'null'){
            if($this.getCookie('FILE_PENGUNDURAN_NAME'+Global.getCookie('myUserId')) != 'undefined' ){
                //$('#filePengunduranDiri').val($this.getCookie('FILE_PENGUNDURAN_NAME'));
            }
        }

    },
    clearDataTmp  :   function(){

        var $this=this;

        //param post kill from save temp

        $this.setCookie('COMP_CODE'+Global.getCookie('myUserId'),null);

        $this.setCookie('BA_CODE'+Global.getCookie('myUserId'),null);

        $this.setCookie('JT'+Global.getCookie('myUserId'),null);

        $this.setCookie('CURRENT_STATUS_KARYAWAN'+Global.getCookie('myUserId'),null);

        $this.setCookie('CURRENT_TA'+Global.getCookie('myUserId'),null);


        $this.setCookie('BB'+Global.getCookie('myUserId'),null);

        $this.setCookie('CC'+Global.getCookie('myUserId'), null);

        $this.setCookie('DD'+Global.getCookie('myUserId'),null)

        $this.setCookie('NIK_SAP'+Global.getCookie('myUserId'),null);

        $this.setCookie('NIK_NATIONAL'+Global.getCookie('myUserId'),null);

        $this.setCookie('EMP_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('DOC_FILING_PHK'+Global.getCookie('myUserId'),null);

        $this.setCookie('POB'+Global.getCookie('myUserId'),null);

        $this.setCookie('DOB'+Global.getCookie('myUserId'),null);

        $this.setCookie('KTP'+Global.getCookie('myUserId'),null);

        $this.setCookie('NPWP'+Global.getCookie('myUserId'),null);

        $this.setCookie('ADDRESS'+Global.getCookie('myUserId'),null);

        $this.setCookie('PHONE'+Global.getCookie('myUserId'),null);

        $this.setCookie('MOBILE_PHONE'+Global.getCookie('myUserId'),null);

        $this.setCookie('JOIN_DATE'+Global.getCookie('myUserId'),null);

        $this.setCookie('WORK_PERIOD'+Global.getCookie('myUserId'),null);

        $this.setCookie('JOB'+Global.getCookie('myUserId'),null);

        $this.setCookie('EMP_STAT'+Global.getCookie('myUserId'),null);

        $this.setCookie('CASH_RECEIPT'+Global.getCookie('myUserId'),null);

        $this.setCookie('OTHERS_RESPONSIBILITY'+Global.getCookie('myUserId'),null);

        $this.setCookie('BALANCE_LIABILITY_EMPLOYEES'+Global.getCookie('myUserId'),null);

        $this.setCookie('MOBILE_WORK'+Global.getCookie('myUserId'),null);

        $this.setCookie('OTHER_EMPLOYEE_AMENETIES'+Global.getCookie('myUserId'),null);

        $this.setCookie('NO_DOCUMENT_SANKSI'+Global.getCookie('myUserId'),null);

        $this.setCookie('COMP_CODE'+Global.getCookie('myUserId'),null);

        $this.setCookie('COMP_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('BA_CODE'+Global.getCookie('myUserId'),null);

        $this.setCookie('BA_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('BPM_CODE'+Global.getCookie('myUserId'),null);

        $this.setCookie('JOBTYPE'+Global.getCookie('myUserId'),null);

        $this.setCookie('EFEKTIF_DATE'+Global.getCookie('myUserId'),null);

        $this.setCookie('TRM_TYPE'+Global.getCookie('myUserId'),null);

        $this.setCookie('TRM_CODE'+Global.getCookie('myUserId'),null);

        $this.setCookie('JENIS_TERMINASI'+Global.getCookie('myUserId'),null);

        $this.setCookie('REASON_RESIGN'+Global.getCookie('myUserId'),null);

        $this.setCookie('NOTE_KASBON'+Global.getCookie('myUserId'),null);

        $this.setCookie('NOTE_TANGGUNGAN'+Global.getCookie('myUserId'),null);

        $this.setCookie('NOTE_SALDO'+Global.getCookie('myUserId'),null);

        $this.setCookie('NOTE_EBCC'+Global.getCookie('myUserId'),null);

        $this.setCookie('NOTE_FASILITAS'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_PHK'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_PHK_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_CLEARANCE'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_CLEARANCE_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_LAMPIRAN'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_LAMPIRAN_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_PENGUNDURAN'+Global.getCookie('myUserId'),null);

        $this.setCookie('FILE_PENGUNDURAN_NAME'+Global.getCookie('myUserId'),null);

        $this.setCookie('LIST_CHK'+Global.getCookie('myUserId'),Global.listChk,null);


    },
    closeWin    :   function() {
        window.close();
    },
    validateForm    :   function(o){

        var validate = $('#'+o).parsley().validate("first");

        return validate;

    },
    select2_failed : function (id_div){

        var messages = '';
        var elementSelect = $(id_div + ' > select');
        var elementbox = $(id_div+' > span > span > span');

        if (elementSelect.val() == null || elementSelect.val() == "" || elementSelect.val().length == 0){

            messages = $(id_div).find('ul');
            $(id_div).append(messages);
            elementbox.css('background-color', '#f2dede');
        } else {
            messages = $(id_div).find('ul > li').text('');
            elementbox.css('background-color', '#dff0d8');
        }
    },
    select2_failed1 : function (id_div){

        var messages = '';
        var elementSelect = $(id_div + ' > input');
        var elementbox = $(id_div+' > span > span > span');

        if (elementSelect.val() == null || elementSelect.val() == "" || elementSelect.val().length == 0){

            messages = $(id_div).find('ul');
            $(id_div).append(messages);
            elementbox.css('background-color', '#f2dede');
        } else {
            messages = $(id_div).find('ul > li').text('');
            elementbox.css('background-color', '#dff0d8');
        }
    },
    cekParsley : function (id_div,error){

        var messages = '';
        if (error){
            messages = "<span id='msg' style='color:red;'><center>Salah satu harus di pilih!</center></span>";
            $(id_div).append(messages);
            $(id_div).css('background-color', '#f2dede');

        } else {

            $('#msg').remove();
            $(id_div).css('background-color', '#dff0d8');
        }
    }

}



var Request={
    headers  :   { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },
    data        :   {},
    notif   :   {
        success   :   function(content,msg){
            Component.create({
                title       :   "NOTIFIKASI",
                type        :   "dialog",
                width       :   750,
                height      :   600,
                content     :   content,
                renderTo    :   'body',
                notif       :   {
                    render  :   true,
                    type    :   "success",
                    message :   msg
                },
                buttons :   {
                    confirm :   {
                        label   :   'Tutup'
                    },
                    cancel  :   {
                        label   :   'Batal'
                    }
                }
            },function(){
                $('#dialog').dialog('close');
                window.location.href=Global.BASE_URL()+"create-terminasi";
            });
        },
        error     :   function(content,msg){
            Component.create({
                title       :   "NOTIFIKASI",
                type        :   "dialog",
                width       :   600,
                height      :   450,
                content     :   content,
                renderTo    :   'body',
                notif       :   {
                    render  :   true,
                    type    :   "error",
                    message :   msg
                },
                buttons :   {
                    confirm :   {
                        label   :   'Tutup'
                    },
                    cancel  :   {
                        label   :   'Batal'
                    }
                }
            },function(){
                $('#dialog').dialog('close');
            });
        }
    },
    Form    :   {
        Filter :   function(){
            return Global.BASE_URL()+"terminasi-get";
        },
    },
    Company :   {
        code    :   function(){
            return Global.BASE_URL()+"api/getCompany/"+Global.getCookie('myAreaCode');
        },
        area    :   function(){
            return Global.BASE_URL()+"api/getAreaByCompany/"+Global.getCookie('COMP_CODE'+Global.getCookie('myUserId'));
        }
    },
    Employee    :   {
        status  :   function(){
            return Global.BASE_URL()+"api/getStatusKaryawanTerminasi";
        },
        byNIK :   function(){
            return Global.BASE_URL()+"api/getEmployeeByNik";
        },
        FOTO :   function(){
            return Global.BASE_URL()+"api/getEmployeeFotoByNik";
        },
        all :   function(val,s_type){
            return Global.BASE_URL()+"api/getEmployeeAll/"+val+"/"+Global.getCookie('areaCode')+'/'+s_type;
        },
        unpresent   :   function(d,s,r){
            return Global.BASE_URL()+"api/getEmployeeUnpresent/"+d+"/"+s+"/"+r+"/"+Global.getCookie('areaCode');
        },
        getJabatanByJobCode   :   function(jc){
            return Global.BASE_URL()+"api/getJabatanByJobCode/"+jc;
        },
        getPDM  :   function(){
            return Global.BASE_URL()+"api/getPDM"+"/"+Global.getCookie('areaCode');
        },
        getMaster  :   function(f,k){
            return Global.BASE_URL()+"api/get-master/"+f+"/"+k;
        }
    },
    Terminasi   :   {
        get :   function(t){
            return Global.BASE_URL()+"terminasi-get";
        },
        set :   function(t){
            return Global.BASE_URL()+"terminasi-set/"+t;
        }
    },
    Approval   :   {
        data    :   {
            get :   {
                history :   function(){
                    return Global.BASE_URL()+"terminasi-approval-history";
                },
                pic :   function(id){
                    return Global.BASE_URL()+"terminasi-approval-pic/"+id;
                }
            }
        },
        act :   function(t,a,f,c){ ///terminasi-approval/{type}/{act}/{from}/{code}
            return Global.BASE_URL()+"terminasi-approval/"+t+"/"+a+"/"+f+"/"+c;
        }
    }
}

var Employee ={
    view  :   {
        setDetail  :   function(){
            var data = Request.data;
            var count = Request.data.length;
            var nikNational = data[0].NIK_NATIONAL != null ? data[0].NIK_NATIONAL :"-";

            $('.txtNikSAP').val(data[0].NIK);
            $('.txtNikNational').val(nikNational);
            $('.txtNama').val(data[0].EMPLOYEE_NAME);
            $('.txtPob').val(data[0].POB);
            $('.txtDob').val(data[0].DOB);
            $('.txtAgama').val(data[0].RELIGION);

            $('.txtKtp').val(data[0].NO_KTP);
            $('.txtAlamat').val(data[0].ADDRESS);

            $('.txtJabatan').val(data[0].JOB_CODE);
            $('.txtStatusKaryawan').val(data[0].STATUS);

            $(".form-group > input,textarea[name!='catatan']").prop('disabled','disabled');

            Terminasi.action.get.employee_foto(data[0].NIK,function(){
                var data = Request.data;

                if(data != null){

                    var foto = "data:"+data[0].mime_type+";base64,"+data[0].blob_content;

                    $('#foto').remove();
                    $('#fotoContainer')
                        .append("<img src='"+foto+"' style='width:150px;height:200px;' />");
                        //.append("<img src='http://localhost:81/bpmweb/public/assets/img/pages/card.png' style='width:150px;height:200px;' />");

                }

                console.log("Foto : "+Request.data+" tipe data : "+typeof Request.data);

            });

        },
        detail  :   function(){
            var el="";
                el+="<div class='row'>";
                    el+="<div class='col-md-12'>";

                        el+="<div class='box box-default box-solid'>";
                            el+="<div class='box-header bg-green with-border'>";
                                el+="<h3 class='box-title'>IDENTITAS KARYAWAN</h3>";
                            el+="</div>";

                            el+="<form role='form'>";
                                el+="<div class='box-body'>";

                                    el+="<div class='row'>";
                                        el+="<div class='col-md-8'>";

                                            el+="<div class='form-group'>";
                                                el+="<label >NIK SAP</label>";
                                                el+="<input type='text' placeholder='NIK ...' id='txtNikSAP' class='form-control txtNikSAP' name='nik' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >NIK National</label>";
                                                el+="<input type='text' placeholder='NIK ...' id='txtNikNational' class='form-control txtNikNational' name='nik' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Nama Lengkap</label>";
                                                el+="<input type='text' placeholder='Nama ...' id='txtNama' class='form-control txtNama' name='nik' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Tempat/Tanggal Lahir</label>";

                                                el+="<div class='row'>";

                                                    el+="<div class='col-sm-5'>";
                                                        el+="<input type='text' placeholder='Tempat ...' id='txtPob' class='form-control txtPob' name='nik' data-parsley-group='first' required disabled>";
                                                    el+="</div>";

                                                    el+="<div class='col-sm-1'>";
                                                        el+="/";
                                                    el+="</div>";

                                                    el+="<div class='col-sm-5'>";
                                                        el+="<input type='text' placeholder='Tanggal Lahir ...' id='txtDob' class='form-control txtDob' name='tglLahir' data-parsley-group='first' required disabled>";
                                                    el+="</div>";

                                                el+="</div>";

                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Agama</label>";
                                                el+="<input type='text' placeholder='Agama ...' id='txtAgama' class='form-control txtAgama' name='agama' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.KTP</label>";
                                                el+="<input type='text' placeholder='No. KTP ...' id='txtKtp' class='form-control txtKtp' name='ktp' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.NPWP</label>";
                                                el+="<input type='text' placeholder='No. NPWP ...' id='txtKtp' class='form-control' name='npwp' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Alamat</label>";
                                                el+="<textarea placeholder='Alamat ...' id='txtAlamat' class='form-control txtAlamat' name='npwp' data-parsley-group='first' required></textarea>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.Telp</label>";
                                                el+="<input type='text' placeholder='No.Telpon ...' id='txtTlp' class='form-control txtTlp' name='telp' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >No.Handphone</label>";
                                                el+="<input type='text' placeholder='No.Handphone ...' id='txtHp' class='form-control txtHp' name='telp' data-parsley-group='first' required>";
                                            el+="</div>";


                                        el+="</div>";

                                        el+="<div class='col-md-4' id='fotoContainer'>";
                                            el+="<input id='foto' style='color: transparent;text-shadow: 0 0 0 red;height: 180px;' placeholder='Foto Karyawan' type='text' readonly data-parsley-group='first' name='foto' class='form-control'>";
                                            //el+="<img class='img-rounded' src='dist/img/avatar.png' />";

                                        el+="</div>";

                                    el+="</div>";

                                el+="</div>";

                            el+="</form>";
                        el+="</div>";
                    el+="</div>";
                el+="</div>";

                el+="<div class='row'>";
                    el+="<div class='col-md-12'>";

                        el+="<div class='box box-default box-solid'>";
                            el+="<div class='box-header bg-green with-border'>";
                                el+="<h3 class='box-title'>STATUS KARYAWAN</h3>";
                            el+="</div>";

                            el+="<form role='form'>";
                                el+="<div class='box-body'>";

                                    el+="<div class='row'>";
                                        el+="<div class='col-md-12'>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Jabatan</label>";
                                                el+="<input type='text' placeholder='Jabatan ...' id='txtJabatan' class='form-control txtJabatan' name='jabatan' data-parsley-group='first' required>";
                                            el+="</div>";

                                            el+="<div class='form-group'>";
                                                el+="<label >Status Karyawan</label>";
                                                el+="<input type='text' placeholder='Status Karyawan ...' id='txtStatusKaryawan' class='form-control txtStatusKaryawan' name='nik' data-parsley-group='first' required>";
                                            el+="</div>";

                                        el+="</div>";

                                        el+="<div class='col-md-4'>";

                                            el+="<div class='form-group'>";

                                            el+="</div>";
                                        el+="</div>";

                                    el+="</div>";

                                el+="</div>";

                            el+="</form>";
                        el+="</div>";
                    el+="</div>";
                el+="</div>";

            return el;
        },
        konfirmasi  :   function(note,type){
            var el="";

                el+="<table class='table' id='kon'>";
                    el+="<tr id='ContCnfID'>";
                        el+="<td style='width:40%;border:0px;'><b>No Dokumen</b></td>";
                        el+="<td style='width:5px;padding-right:5px;border:0px;'>:</td>";
                        el+="<td style='border:0px;'>";
                            el+="<span class='cnfID'></span>";
                        el+="</td>";
                    el+="</tr>";

                    el+="<tr >";
                        el+="<td style='border:0px;'><b>Tanggal Efektif Terminasi</b></td>";
                        el+="<td style='border:0px;'>:</td>";
                        el+="<td style='border:0px;'>";
                            el+="<span class='cnpTglEfektifTerminasi'></span>";
                        el+="</td>";
                    el+="</tr>";

                    el+="<tr >";
                        el+="<td style='border:0px;'><b>Perusahaan</b></td>";
                        el+="<td style='border:0px;'>:</td>";
                        el+="<td style='border:0px;'>";
                            el+="<span class='cnfPerusahaan'></span>";
                        el+="</td>";
                    el+="</tr>";

                    el+="<tr >";
                        el+="<td style='border:0px;'><b>Bisnis Area</b></td>";
                        el+="<td style='border:0px;'>:</td>";
                        el+="<td style='border:0px;'>";
                            el+="<span class='cnfArea'></span>";
                        el+="</td>";
                    el+="</tr>";

                    if(type=='ta'){

                        el+="<tr>";
                            el+="<td style='border:0px;'><b>Karyawan yang akan diterminasi</b></td>";
                            el+="<td style='border:0px;'>:</td>";
                            el+="<td class='cnfKaryawan' style='border:0px;'>";

                                el+=Global.countSummaryArrayItem(Global.listStatusEmp);

                            el+="</td>";
                        el+="</tr>";
                    }
                    else{

                        el+="<tr>";
                            el+="<td style='border:0px;'><b>NIK SAP</b></td>";
                            el+="<td style='border:0px;'>:</td>";                    
                            el+="<td style='border:0px;'>";

                                 el+="<span class='cnfNikSap'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td style='border:0px;'><b>NIK National</b></td>";
                            el+="<td style='border:0px;'>:</td>";                    
                            el+="<td style='border:0px;'>";

                                 el+="<span class='cnfNikNational'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td style='border:0px;'><b>Nama Karyawan</b></td>";
                            el+="<td style='border:0px;'>:</td>";                    
                            el+="<td style='border:0px;'>";

                                 el+="<span class='cnfNamaKaryawan'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td style='border:0px;'><b>No KTP</b></td>";
                            el+="<td style='border:0px;'>:</td>";                    
                            el+="<td style='border:0px;'>";

                                 el+="<span class='cnfNoKtp'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td style='border:0px;'><b>No NPWP</b></td>";
                            el+="<td style='border:0px;'>:</td>";                    
                            el+="<td style='border:0px;'>";

                                 el+="<span class='cnfNoNpwp'></span>";

                            el+="</td>";
                        el+="</tr>";

                    }

                    if(note){
                        el+="<tr id='cnfNoteKonfirmasi'>";
                            el+="<td style='border:0px;'><b>Alasan / Catatan</b></td>";
                            el+="<td style='border:0px;'>:</td>";
                            el+="<td style='border:0px;'>";
                                el+="<span class='txtNoteKonfirmasi'></span>";
                            el+="</td>";
                        el+="</tr>";
                    }

                el+="</table>";


            return el;
        },
        konfirmasi1  :   function(note,type){
            var el="";

                el+="<table class='table'>";
                    el+="<tr id='ContCnfID'>";
                        el+="<td style='width:100px;'>No Dokumen</td>";
                        el+="<td style='width:10px;'>:</td>";
                        el+="<td>";
                            el+="<span class='cnfID'></span>";
                        el+="</td>";
                    el+="</tr>";

                    el+="<tr >";
                        el+="<td style='width:100px;'>Lokasi</td>";
                        el+="<td style='width:10px;'>:</td>";
                        el+="<td>";
                            el+="<span class='cnfArea'></span>";
                        el+="</td>";
                    el+="</tr>";

                    if(type=='ta'){

                        el+="<tr>";
                            el+="<td style='width:100px;'>Keterangan</td>";
                            el+="<td style='width:10px;'>:</td>";
                            el+="<td class='cnfKaryawan'>";
                            el+="</td>";
                        el+="</tr>";

                    }else{

                        el+="<tr>";
                            el+="<td>NIK SAP</td>";
                            el+="<td>:</td>";                    
                            el+="<td>";

                                 el+="<span class='cnfNikSap'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td>NIK National</td>";
                            el+="<td>:</td>";                    
                            el+="<td>";

                                 el+="<span class='cnfNikNational'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td>Nama Karyawan</td>";
                            el+="<td>:</td>";                    
                            el+="<td>";

                                 el+="<span class='cnfNamaKaryawan'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td>No KTP</td>";
                            el+="<td>:</td>";                    
                            el+="<td>";

                                 el+="<span class='cnfNoKtp'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td>No NPWP</td>";
                            el+="<td>:</td>";                    
                            el+="<td>";

                                 el+="<span class='cnfNoNpwp'></span>";

                            el+="</td>";
                        el+="</tr>";

                        el+="<tr>";
                            el+="<td style='width:150px;'>Keterangan</td>";
                            el+="<td style='width:50px;'>:</td>";
                            el+="<td>";
                                el+=$('#txtCatatan').val();
                            el+="</td>";
                        el+="</tr>";

                    }

                    if(note){
                        el+="<tr id='cnfNoteKonfirmasi'>";
                            el+="<td style='width:150px;'>Alasan / Catatan </td>";
                            el+="<td style='width:30px;'>:</td>";
                            el+="<td >";
                                el+="<textarea class='form-control' id='txtNoteKonfirmasi'></textarea>";
                            el+="</td>";
                        el+="</tr>";
                    }

                el+="</table>";


            return el;
        },
        konfirmasiPHK  :   function(type,note){
            var el="";

            el+="<table class='table table-striped'>";

                el+="<tr id='ContCnfID'>";
                    el+="<td >NO Dokumen</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfID' id='cnfID'></span>";
                    el+="</td>";
                el+="</tr>";



                el+="<tr >";
                    el+="<td>Jenis Terminasi</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnpJenisTerminasi' id='cnpJenisTerminasi'></span>";
                    el+="</td>";
                el+="</tr>";


                el+="<tr >";
                    el+="<td>Tanggal Efektif Terminasi</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnpTglEfektifTerminasi' id='cnpTglEfektifTerminasi'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>Perusahaan</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfPerusahaan' id='cnfPerusahaan'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>Bisnis Area</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfArea' id='cnfArea'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>NIK SAP</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp' id='cnfNikSap'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>NIK NATIONAL</td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfNikNational' id='cnfNikNational'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>NAMA KARYAWAN  </td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfNama' id='cnfNama'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>No KTP  </td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfKtp' id='cnfKtp'></span>";
                    el+="</td>";
                el+="</tr>";

                el+="<tr >";
                    el+="<td>No NPWP  </td>";
                    el+="<td >:</td>";
                    el+="<td>";
                        el+="<span class='direct-chat-timestamp cnfNpwp' id='cnfNpwp'></span>";
                    el+="</td>";
                el+="</tr>";


                if(note){
                    el+="<tr id='cnfNoteKonfirmasi'>";
                        el+="<td>Alasan / Catatan </td>";
                        el+="<td >:</td>";
                        el+="<td text-align='right' >";
                            el+="<textarea class='form-control txtNoteKonfirmasi' id='txtNoteKonfirmasi'></textarea>";
                        el+="</td>";
                    el+="</tr>";
                }

            el+="</table>";

            return el;
        },
        notifikasi  :   function(type,o,m){

            var $this=this;
            var el=$this.konfirmasi1(false,type);

                if(o==1){
                    el+="<div class='alert alert-success' id='txtNotifResult'><center><i>"+m+"</i></center></div>";
                }else if(0==10){
                    el+="<div class='alert alert-danger' id='txtNotifResult'><center><i>"+m+"</i></center></div>";
                }
                else{
                    el+="<div class='alert alert-warning' id='txtNotifResult'><center><i>"+m+"</i></center></div>";
                }

            return el;
        },
    },
    setProperty :   function(){

        var efektif_date = Global.getCookie('code')=="JT01"?$('#show_date').val():$('#txtEfektifDateHidden').val()

        if(Global.getCookie('code')!="JT01"){

            $('#cnpJenisTerminasi').text($('#txtJenisTerminasi').val().toUpperCase());
            $('.cnpJenisTerminasi').text($('#txtJenisTerminasi').val().toUpperCase());
            
        }        
        

        $('#cnpTglEfektifTerminasi').text(Global.getCookie('code')=="JT01"?$('#show_date').val():Global.convertDateInd($('#txtEfektifDateHidden').val()));
        $('#cnfPerusahaan').text(Global.getCookie('company'));
        $('#cnfArea').text(Global.getCookie('area'));

        $('#cnfNikSap').text($('#txtNikSapHidden').val());
        $('#cnfNikNational').text($('#txtNikNational').val());

        $('#cnfNama').text($('#txtNamaSap').val());
        $('#cnfKtp').text($('#txtKtp').val());
        $('#cnfNpwp').text($('#txtNpwp').val());

        $('.cnpTglEfektifTerminasi').text(Global.getCookie('code')=="JT01"?$('#show_date').val():Global.convertDateInd($('#txtEfektifDateHidden').val()));
        $('.cnfPerusahaan').text(Global.getCookie('company'));
        $('.cnfArea').text(Global.getCookie('area'));
        
        $('.cnfNikSap').text($('#txtNikSapHidden').val());
        $('.cnfNikNational').text($('#txtNikNational').val());
        
        $('.cnfNama').text($('#txtNamaSap').val());
        $('.cnfKtp').text($('#txtKtp').val());
        $('.cnfNpwp').text($('#txtNpwp').val());                               
    },
    renderData  :   {
        nonActiveEmployee   :   function(){

            var no=1;
            var el="<h6>Pilih Karyawan yang akan di terminasi : </h6>";
                el+="<table class='table table-bordered' id='myTable' style='font-size:11px;'>";
                    el+="<thead>";
                        el+="<tr>";
                            el+="<th style='width: 10px'>#</th>";
                            el+="<th><input type='checkbox' class='chkAllEmployees'>Select All</th>";
                            el+="<th>NIK SAP</th>";
                            el+="<th>NIK National</th>";
                            el+="<th>Nama Karyawan</th>";
                            el+="<th>Jabatan</th>";
                            el+="<th>Status</th>";
                            el+="<th>Aktivitas Terakhir</th>";
                            el+="<th>Alasan Berhenti Bekerja</th>";
                        el+="</tr>";
                    el+="</thead>";
                    el+="</tbody>";
                    console.log('Data unpresent');
                    console.log(Request.data);
                    //render data here
                    $.each(Request.data,function(i,e){

                        var nik_national=e.NIK_NATIONAL==null?"-":e.NIK_NATIONAL;

                        el+="<tr>";
                            el+="<td>"+no+"</td>";

                            el+="<td><input type='checkbox' class='minimal-blue chkEmployee' \n\
                                data-nik='"+e.NIK+"' \n\
                                data-niknnational='"+e.NIK_NATIONAL+"' \n\
                                data-employeename='"+e.EMPLOYEE_NAME+"' \n\
                                data-attandancedate='"+e.ATTENDANCE_DATE+"' \n\
                                data-jobcode='"+e.JOB_CODE+"' \n\
                                data-jobtype='"+e.JOB_TYPE+"' \n\
                                data-profname='"+e.PROF_NAME+"' \n\
                                data-defaultreason='"+e.DEFAULT_REASON+"' \n\
                                data-employeestatus='"+e.EMPLOYEE_STATUS+"'>";
                            el+="</td>";
                            el+="<td><a href='#' class='employee' data-nik='"+e.NIK+"'>"+e.NIK+"</a></td>";
                            el+="<td>"+nik_national+"</td>";
                            el+="<td>"+e.EMPLOYEE_NAME+"</td>";
                            el+="<td>"+e.JOB_CODE+"</td>";
                            el+="<td>"+e.EMPLOYEE_STATUS+"</td>";
                            el+="<td>"+e.ATTENDANCE_DATE+"</td>";
                            el+="<td>"+e.DEFAULT_REASON+"</td>";
                        el+="</tr>";
                        no++;
                    });

                    el+="</tbody>";
                el+="</table>";

            return el;
        }
    },
    form    :   {
        typeOfTermination   :   function(){
            var el="";
                el+="<div class='row'>";
                    el+="<div class='col-md-12'>";

                        el+="<div class='box box-success box-solid'>";
                            el+="<div class='box-header bg-green with-border'>";
                                el+="<h5 class='box-title'>Anda Akan Melakukan Terminasi Untuk :</h5>";
                            el+="</div>";


                            el+="<div class='box-body'>";

                                el+="<form role='form' id='formTerminasi' name='formTerminasi'>";

                                    el+="<div class='form-group'>";

                                        el+="<label for='optPerusahaan'>Perusahaan</label>";

                                        el+="<div id='box-optPerusahaan'>";
                                            el+="<select class='form-control' id='optPerusahaan' data-parsley-group='first' required>";
                                                el+="<option value=''>-- Pilih Perusahaan --</option>";
                                            el+="</select>";
                                        el+="</div>";

                                    el+="</div>";

                                    el+="<div class='form-group'>";
                                        el+="<label for='optBisnisArea'>Bisnis Area</label>";

                                        el+="<div id='box-optBisnisArea'>";
                                            el+="<select class='form-control ' id='optBisnisArea' data-parsley-group='first' required=''>";
                                                el+="<option value=''>-- Pilih Bisnis Area --</option>";
                                            el+="</select>";
                                        el+="</div>";

                                    el+="</div>";

                                    el+="<div class='form-group'>";
                                        el+="<label for='exampleInputEmail1'>Jenis Terminasi</label>";

                                        el+="<div id='box-optTypeTermination'>";
                                            el+="<select class='form-control' id='optTypeTermination' data-parsley-group='first' required=''>";
                                                el+="<option value=''>-- Pilih Jenis Terminasi --</option>";
                                            el+="</select>";
                                        el+="</div>";

                                    el+="</div>";

                                el+="</form>";

                            el+="</div>";

                            el+="<div class='box-footer'>";
                                el+="<div class='row'>";
                                    el+="<div class='col-xs-2'>";
                                        el+="<a href='#' class='btn btn-default btn-flat ' id='btnCancel'>Batal ";
                                    el+="</div>";
                                    el+="<div class='col-xs-10 '>";
                                        el+="<a href='#' class='btn btn-success btn-flat bg-green pull-right' id='btnCommit'>Lanjutkan";
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";

                        el+="</div>";
                    el+="</div>";

                el+="</div>";
            return el;
        },
        typeOfApproval   :   function(){
            var el="";
                el+="<div class='row'>";
                    el+="<div class='col-md-2'>";

                    el+="</div>";

                    el+="<div class='col-md-8'>";

                        el+="<div class='box box-success box-solid'>";
                            el+="<div class='box-header with-border'>";
                                el+="<h5 class='box-title'>Anda Akan Melakukan Approval Untuk :</h5>";
                            el+="</div>";

                            el+="<form role='form' id='formApproval'>";
                                el+="<div class='box-body'>";

                                    el+="<div class='form-group'>";
                                        el+="<label for='exampleInputEmail1'>Jenis Approval</label>";
                                        el+="<select class='form-control' id='optTypeApproval' data-parsley-group='first' required=''>";
                                            el+="<option value=''>-- Pilih Jenis Approval --</option>";
                                        el+="</select>";
                                    el+="</div>";
                                el+="</div>";

                                el+="<div class='box-footer'>";
                                    el+="<div class='row'>";
                                        el+="<div class='col-xs-2'>";
                                            el+="<a href='#' class='btn btn-default' id='btnCancel'>Batal ";
                                        el+="</div>";
                                        el+="<div class='col-xs-10 '>";
                                            el+="<a href='#' class='btn btn-success pull-right' id='btnCommit'>Lanjutkan";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";

                            el+="</form>";

                        el+="</div>";
                    el+="</div>";

                    el+="<div class='col-md-2'>";

                    el+="</div>";
                el+="</div>";
            return el;
        },
        nonActiveEmployeeTermination   :   function(){
            var el="";
                el+="<div class='row'>";
                    el+="<div class='col-md-12'>";

                        el+="<div class='box box-success box-solid'>";
                            el+="<div class='box-header bg-green with-border'>";
                                el+="<h3 class='box-title'>Karyawan Tidak Aktif</h3>";
                            el+="</div>";

                            el+="<form role='form'>";
                                el+="<div class='box-body'>";
                                    el+="<div class='box-body-data'>";
                                        el+=Employee.renderData.nonActiveEmployee();
                                    el+="</div>";
                                el+="</div>";

                                el+="<div class='box-footer'>";
                                    el+="<div class='row'>";
                                        el+="<div class='col-xs-6'>";
                                            el+="<a href='#' class='btn btn-default' id='btnCancel'>Batal ";
                                        el+="</div>";
                                        el+="<div class='col-xs-6'>";
                                            el+="<a href='#' class='btn btn-success btn-flat bg-green pull-right' id='btnAjukan'>Ajukan";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";

                            el+="</form>";

                        el+="</div>";
                    el+="</div>";
                el+="</div>";
            return el;
        },
        reason  :   function(n){
            var el="";

            switch(n){
                case    'JT02':
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box'>";
                                el+="<div class='box-header with-border'>";
                                    el+="<h3 class='box-title'>ALASAN</h3>";
                                el+="</div>";

                                el+="<form role='form'>";
                                    el+="<div class='box-body' id='boxAlasan'>";

                                       //render by db master alasan here...

                                    el+="</div>";
                                el+="</form>";
                            el+="</div>";

                            //CONTENT BOX LAMPIRAN
                            el+="<div class='row'>";
                                el+="<div class='col-md-12'>";

                                    el+="<div class='box '>";
                                        el+="<div class='box-header with-border'>";
                                            el+="<h3 class='box-title'>LAMPIRAN</h3>";
                                        el+="</div>";

                                        el+="<form role='form' id='formLampiran'>";
                                            el+="<div class='box-body'>";

                                                el+="<table class='table'>";

                                                    el+="<tr>";
                                                        el+="<td>Surat Pengunduran Diri</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder1'></div>";
                                                                el+="<input type='file'  id='filePengunduranDiri' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>";
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Exit Clearance Form</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder2'></div>";
                                                                el+="<input type='file' id='fileClearance' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                el+="</table>";

                                            el+="</div>";
                                        el+="</form>";
                                    el+="</div>";

                                el+="</div>";

                            el+="</div>";


                        el+="</div>";

                    el+="</div>";

                break;
                case    'JT03':
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box'>";
                                el+="<div class='box-header with-border'>";
                                    el+="<h3 class='box-title'>ALASAN</h3>";
                                el+="</div>";

                                el+="<form role='form'>";
                                    el+="<div class='box-body' id='boxAlasan1'>";

                                        el+="<div class='form-group'>";
                                            el+="<label></label>";
                                            el+="<textarea id='txtAlasan' class='form-control' placeholder='Tulis alasan ...' data-parsley-group='first' required=''></textarea>";
                                        el+="</div>";

                                        // el+="<table class='table'>";

                                        //     el+="<tr>";
                                        //         el+="<td>";
                                        //             el+="<div class='radio'>";
                                        //                 el+="<label>";
                                        //                   el+="<input type='radio' name='optAlasan' class='optAlasan' id='optPensiun' value='pensiun'>";
                                        //                   el+="Pensiun";
                                        //                 el+="</label>";
                                        //             el+="</div>";
                                        //         el+="</td>";
                                        //     el+="</tr>";
                                        //     el+="<tr>";
                                        //         el+="<td>";
                                        //             el+="<div class='radio'>";
                                        //                 el+="<label>";
                                        //                   el+="<input type='radio' name='optAlasan' class='optAlasan' id='optMeninggal' value='meninggal'>";
                                        //                   el+="Meninggal";
                                        //                 el+="</label>";
                                        //             el+="</div>";
                                        //         el+="</td>";
                                        //     el+="</tr>";

                                        // el+="</table>";

                                    el+="</div>";
                                el+="</form>";
                            el+="</div>";

                            //CONTENT BOX LAMPIRAN
                            el+="<div class='row'>";
                                el+="<div class='col-md-12'>";

                                    el+="<div class='box '>";
                                        el+="<div class='box-header with-border'>";
                                            el+="<h3 class='box-title'>LAMPIRAN</h3>";
                                        el+="</div>";

                                        el+="<form role='form' id='formLampiran'>";
                                            el+="<div class='box-body'>";

                                                el+="<table class='table'>";

                                                    el+="<tr>";
                                                        el+="<td>Surat PHK</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder1'></div>";
                                                                el+="<input type='file'  id='fileSuratPhk' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>";
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Exit Clearance Form</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder2'></div>";
                                                                el+="<input type='file'  id='fileClearance' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Lampiran lainnya</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder3'></div>";
                                                                el+="<input type='file'  id='fileLampiran' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                el+="</table>";

                                            el+="</div>";
                                        el+="</form>";
                                    el+="</div>";

                                el+="</div>";

                            el+="</div>";

                        el+="</div>";

                    el+="</div>";

                break;

                case    'JT05':
                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box'>";
                                el+="<div class='box-header with-border'>";
                                    el+="<h3 class='box-title'>ALASAN</h3>";
                                el+="</div>";

                                el+="<form role='form'>";
                                    el+="<div class='box-body' id='boxAlasan1'>";

                                        el+="<div class='form-group'>";
                                            el+="<label></label>";
                                            el+="<textarea id='txtAlasan' class='form-control' placeholder='Tulis alasan ...' data-parsley-group='first' required=''></textarea>";
                                        el+="</div>";

                                        // el+="<table class='table'>";

                                        //     el+="<tr>";
                                        //         el+="<td>";
                                        //             el+="<div class='radio'>";
                                        //                 el+="<label>";
                                        //                   el+="<input type='radio' name='optAlasan' class='optAlasan' id='optPensiun' value='pensiun'>";
                                        //                   el+="Pensiun";
                                        //                 el+="</label>";
                                        //             el+="</div>";
                                        //         el+="</td>";
                                        //     el+="</tr>";
                                        //     el+="<tr>";
                                        //         el+="<td>";
                                        //             el+="<div class='radio'>";
                                        //                 el+="<label>";
                                        //                   el+="<input type='radio' name='optAlasan' class='optAlasan' id='optMeninggal' value='meninggal'>";
                                        //                   el+="Meninggal";
                                        //                 el+="</label>";
                                        //             el+="</div>";
                                        //         el+="</td>";
                                        //     el+="</tr>";

                                        // el+="</table>";

                                    el+="</div>";
                                el+="</form>";
                            el+="</div>";

                            //CONTENT BOX LAMPIRAN
                            el+="<div class='row'>";
                                el+="<div class='col-md-12'>";

                                    el+="<div class='box '>";
                                        el+="<div class='box-header with-border'>";
                                            el+="<h3 class='box-title'>LAMPIRAN</h3>";
                                        el+="</div>";

                                        el+="<form role='form' id='formLampiran'>";
                                            el+="<div class='box-body'>";

                                                el+="<table class='table'>";

                                                    el+="<tr>";
                                                        el+="<td>Surat PHK</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder1'></div>";
                                                                el+="<input type='file'  id='fileSuratPhk' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>";
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Exit Clearance Form</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder2'></div>";
                                                                el+="<input type='file'  id='fileClearance' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Lampiran lainnya</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder3'></div>";
                                                                el+="<input type='file'  id='fileLampiran' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                el+="</table>";

                                            el+="</div>";
                                        el+="</form>";
                                    el+="</div>";

                                el+="</div>";

                            el+="</div>";

                        el+="</div>";

                    el+="</div>";

                break;

                default:

                    el+="<div class='row'>";
                        el+="<div class='col-md-12'>";

                            el+="<div class='box'>";
                                el+="<div class='box-header with-border'>";
                                    el+="<h3 class='box-title'>ALASAN</h3>";
                                el+="</div>";

                                el+="<form role='form'>";
                                    el+="<div class='box-body' id='boxAlasan1'>";

                                        // el+="<div class='form-group'>";
                                        //     el+="<label></label>";
                                        //     el+="<textarea id='txtAlasan' class='form-control' placeholder='Tulis alasan ...' data-parsley-group='first' required=''></textarea>";
                                        // el+="</div>";

                                        el+="<table class='table'>";

                                            el+="<tr>";
                                                el+="<td>";
                                                    el+="<div class='radio'>";
                                                        el+="<label>";
                                                          el+="<input type='radio' name='optAlasan' class='optAlasan' id='optPensiun' value='pensiun'>";
                                                          el+="Pensiun";
                                                        el+="</label>";
                                                    el+="</div>";
                                                el+="</td>";
                                            el+="</tr>";
                                            el+="<tr>";
                                                el+="<td>";
                                                    el+="<div class='radio'>";
                                                        el+="<label>";
                                                          el+="<input type='radio' name='optAlasan' class='optAlasan' id='optMeninggal' value='meninggal'>";
                                                          el+="Meninggal";
                                                        el+="</label>";
                                                    el+="</div>";
                                                el+="</td>";
                                            el+="</tr>";

                                        el+="</table>";

                                    el+="</div>";
                                el+="</form>";
                            el+="</div>";

                            //CONTENT BOX LAMPIRAN
                            el+="<div class='row'>";
                                el+="<div class='col-md-12'>";

                                    el+="<div class='box '>";
                                        el+="<div class='box-header with-border'>";
                                            el+="<h3 class='box-title'>LAMPIRAN</h3>";
                                        el+="</div>";

                                        el+="<form role='form' id='formLampiran'>";
                                            el+="<div class='box-body'>";

                                                el+="<table class='table'>";

                                                    el+="<tr>";
                                                        el+="<td>Surat PHK</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder1'></div>";
                                                                el+="<input type='file'  id='fileSuratPhk' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>";
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Exit Clearance Form</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder2'></div>";
                                                                el+="<input type='file'  id='fileClearance' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                    el+="<tr>";
                                                        el+="<td>Lampiran lainnya</td>";
                                                        el+="<td>:</td>";
                                                        el+="<td>";
                                                            el+="<div class='form-group'>";
                                                                el+="<div id='fileHolder3'></div>";
                                                                el+="<input type='file'  id='fileLampiran' data-parsley-group='first' required>";
                                                            el+="</div>";
                                                        el+="</td>"; ;
                                                    el+="</tr>";

                                                el+="</table>";

                                            el+="</div>";
                                        el+="</form>";
                                    el+="</div>";

                                el+="</div>";

                            el+="</div>";

                        el+="</div>";

                    el+="</div>";

                break;

            }

            return el;
        },
        askApproval   :   function(){
            var el="";
                el+="<div class='row'>";
                    el+="<div class='col-sm-12'>";

                            el+="<form role='form' id='formApprovalTanya'>";

                                el+="<div class='form-group'>";
                                    el+="<label for='exampleInputEmail1'>Pilih User : </label>";
                                    el+="<select class='form-control' id='optUser' data-parsley-group='first' required=''>";
                                    el+="</select>";
                                el+="</div>";

                                el+="<div class='form-group'>";
                                    el+="<label for='exampleInputEmail1'>Catatan : </label>";
                                        el+="<textarea class='form-control' id='txtNoteKonfirmasi' disabled></textarea>";
                                el+="</div>";


                            el+="<form>";

                        el+="</div>";
                    el+="</div>";
                el+="</div>";

            return el;

        }
    }

}


var Component ={
    init    :   function(cmp,t,c){
        var el="";

        switch(cmp){
            case    "modal":
                el+="<div class='modal fade' id='myModal'>";
                    el+="<div class='modal-dialog modal-md'>";
                        el+="<div class='modal-content'>";
                            //el+="<div class='modal-header bg-green'>";
                            el+="<div class='modal-header'>";
                                el+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                                el+="<h4 class='modal-title'>Modal Default</h4>";
                            el+="</div>";
                            el+="<div class='modal-body'>";
                                //render body modal here...
                            el+="</div>";
                            el+="<div class='modal-footer'>";
                                //el+="<center>";
                                    el+="<button type='button' id='btnConfirm' class='btn btn-success'>Save changes</button>";
                                    el+="<button type='button' id='btnCancelModal' class='btn btn-default' data-dismiss='modal'>Close</button>";
                                //el+="</center>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                el+="</div>";

            break;
            case    "dialog":
                el+=" <div id='dialog' title='Dialog Title'>";
                    el+="<div id='dialog-content'></div>";
                el+="</div>";
            break;
            case    "loader":
                el+=" <div style='position:absolute;z-index:0;top:20%;margin-left:50%;' id='loader'>";
                    el+="<div class='alert alert-warning'><center><h5>"+t+"</h5></center></div>";
                el+="</div>";
            break;
            case    "alert":
                el+="<div class='alert alert-"+p.alertType+"'><center>"+p.title+"</center></div>";
            break;

        }

        return el;
    },
    loader  :   {
        show    :   function(t){
            var x = scroll.top;
            var y=scroll.left;

            //Component.create({type:'loader',text:t,renderTo:'navbar-header',display:true,x:40,y:56,class:true});
            $('.overlay').show();
        },
        hide    :   function(){

            setTimeout(function(){

                //$('#loader').remove();
                $('.overlay').hide();

            },'1000');

        }
    },
    render  :   function(o,el,f){
        $('#'+o).empty().html(el);
        f();
    },
    tableHeader :   function(){
        var el="";

        return el;
    },
    create  :   function(p,f){
        var $this=this;
        var o=$this.init(p.type,p.text,p.title);

        if(typeof p.class== 'undefined'){
            $(o).appendTo(p.renderTo);
        }else{
            $(o).appendTo('.'+p.renderTo);
        }

        $this.open(p,f);

    },
    open    :   function(p,f){

        var $this=this;

        switch(p.type){
            case    "modal":
                $('#myModal').modal({
                    backdrop: 'static',
                    keyboard: false  // to prevent closing with Esc button (if you want this too)
                });

                $('.modal-title').text(p.title);
                $('.modal-body').empty().html(p.content);

                $('#btnCancel').text(p.buttons.cancel.label);
                $('#btnConfirm').text(p.buttons.confirm.label);

            break;
            case    "loader":
                if(p.display){
                    $('#loader').show();
                    $('#mainContent').css({
                        //opacity :   0.5
                    });
                }else{

                    $('#mainContent').css({
                        opacity :   1
                    });

                    $('#loader').remove();


                }

            break;
            case    "dialog":

                var title,btnOk,width,height,
                        btnStatus="btn btn-success";

                var content=p.content;


                if(typeof p.notif != 'undefined'){

                    if(p.notif.type =='success'){

                        btnStatus="btn btn-success";

                        content+="<div class='alert alert-success'><center>"+p.notif.message+"</center></div>";

                    }else if(p.notif.type=='error'){

                        btnStatus="btn btn-warning";

                        content+="<div class='alert alert-warning'><center>"+p.notif.message+"</center></div>";
                    }
                }

                if(typeof p.title != 'undefined'){
                    title = p.title;
                }else{
                    alert("Error Component : [ TITLE IS NOT SET ]");
                    return false;
                }

                if(typeof p.width != 'undefined'){
                    width = p.width;
                }else{
                    width = 'auto';
                }

                if(typeof p.height != 'undefined'){
                    height = p.height;
                }else{
                    height = 'auto';
                }

                if(typeof p.buttons != 'undefined'){
                    btnOk = p.buttons.confirm.label;
                }else{
                    alert("Error Component : [ BUTTON IS  NOT SET ]");
                    return false;
                }

                $('#dialog').dialog({
                    title   :   title,
                    autoOpen:   true,
                    width   :   width,
                    height  :   height,
                    modal   :   true,
                    hide    :   "puff",
                    show    :   "slide",
                    buttons : [
                        {
                            text: btnOk,
                            /*
                            icons: {
                                primary: "ui-icon-heart"
                            },
                            */
                            click: function() {
                                f();
                            }
                        },
                        {
                            text: p.buttons.cancel.label,
                            click: function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    ]
                });

                $('.ui-dialog-titlebar').addClass('bg-green');

                $('.ui-dialog-buttonset > button').addClass(btnStatus);

                $( "#dialog-content" ).empty().html(content);

            break;
        }

    }
}
