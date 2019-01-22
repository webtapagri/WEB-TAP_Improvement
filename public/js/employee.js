var url         = "employee";

window.onload = function() {
  // Check for LocalStorage support.
  if (localStorage) {

    $("#txtkode").keyup(function() {
      var kode = $('#txtkode').val();
      localStorage.setItem('Kode', kode)
    });

    $("#txtname").keyup(function() {
      var name = $('#txtname').val();
      localStorage.setItem('Name', name)
    });

    $("#txtaddress").keyup(function() {
      var address = $('#txtaddress').val();
      localStorage.setItem('Address', address)
    });

    $("#txtemail").keyup(function() {
      var email = $('#txtemail').val();
      localStorage.setItem('Email', email)
    });

    // if ($('#radio1').iCheck('check')) {
    //   var gender = "Female";
    //   localStorage.setItem('Gender', gender)
    // } else {
    //   var gender = "Male";
    //   localStorage.setItem('Gender', gender)
    // }

    //GET DATA FROM LOCAL STORAGE
    var kode = localStorage.getItem('Kode');
    if (kode != "undefined" || kode != "null") {
      $('#txtkode').val(kode);
    } else{
      $('#txtkode').val("");
    }

    var name = localStorage.getItem('Name');
    if (name != "undefined" || name != "null") {
      $('#txtname').val(name);
    } else{
      $('#txtname').val("");
    }

    var address = localStorage.getItem('Address');
    if (address != "undefined" || address != "null") {
      $('#txtaddress').val(address);
    } else{
      $('#txtaddress').val("");
    }

    var email = localStorage.getItem('Email');
    if (email != "undefined" || email != "null") {
      $('#txtemail').val(email);
    } else{
      $('#txtemail').val("");
    }

    // var gender = localStorage.getItem('Gender');
    // if (gender == 'Male') {
    //   $('#radio1').iCheck('check');
    // }
    // else if (gender == 'Female') {
    //   $('#radio2').iCheck('check');
    // }

  } else {
    // No support. Use a fallback such as browser cookies or store on the server.
    alert("Not Support Local Storage");
  }
}

$(document).ready(function() {
  $('.rb').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
     radioClass: 'iradio_flat-blue'
   });
   $('#radio1').iCheck('check');
   $('#btn-tambah').show('slow');
});

function ajaxSetup(){
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
      }
  });
}


function hapus(ID) {
    ajaxSetup();
    $.ajax({
        type: "delete",
        url: url + '/' + ID,
        success: function(data) {
          if (data.success ==  true ) {
            $("#employees-table").DataTable().ajax.reload()
            hide();
          }else{
            alert("Gagal");
          }
        },
        error: function(data) {
            alert('Cek Your Connection Data', data);
        }
    });
}

$("#btn-save").click(function() {
    ajaxSetup();
    var formData = $("#form-employees").serialize();
    $.ajax({
        type: "POST",
        url: '/api/getemploy',
        data: formData,
        success: function(data) {
          if (data.success ==  true ) {
            $("#employees-table").DataTable().ajax.reload();
              $('#formtambah').hide('slow');
              $('#btn-tambah').show('slow');
              hide();
          }else {
              alert("Gagal");
          }
        },
        error: function(data) {
            alert('Cek Your Connection Data', data);
        }
    });
});

$("#btn-update").click(function() {
    ajaxSetup();
    var ID = $('#txtid').val();
    var formData = $("#form-employees").serialize();
    console.log(formData);
    $.ajax({
        type: "POST",
        url: url + '/' + ID,
        data: formData,
        success: function(data) {
          if (data.success ==  true ) {
            $("#employees-table").DataTable().ajax.reload()
            hide();
            $('#formtambah').hide('slow');
            $('#btn-tambah').show('slow');
          }else {
              alert("Gagal");
          }
        },
        error: function(data) {
              alert('Cek Your Connection Database', data);
        }
    });
});

$("#btn-tambah").click(function(){
  $('#btn-update').hide();
  $('#formtambah').show('slow');
  $('#btn-save').show();
  $('#btn-tambah').hide('slow');
});

function hide() {
  $('#formtambah').hide('slow');
  $('#btn-save').hide();
  $('#btn-update').hide();
  $('#btn-tambah').show('slow');
  $('.form-control').val("");
  $('#radio1').iCheck('check');
  localStorage.clear();
}
