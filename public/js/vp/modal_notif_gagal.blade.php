<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>TAP - @yield('tittle')</title>

    <link href="{{ asset('/assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('dist/plugins/select2/select2.css') }}">
    <link href="{{ asset('/assets/css/sb-admin.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/dist/css/AdminLTE.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/font-awesome-4.1.0/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">
    <!-- dataTables -->
    <link rel="stylesheet" href="{{ asset('/plugins/datatables/dataTables.bootstrap.css') }}">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="{{ asset('/dist/plugins/datetimepicker/css/bootstrap-datetimepicker.min.css') }}">
    <!-- iCheck for checkboxes and radio inputs -->
    <link rel="stylesheet" href="{{ asset('/plugins/iCheck/all.css') }}">
    <!-- PACE -->
    <!-- <link rel="stylesheet" href="{{ asset('/dist/plugins/pace-1.0.2/templates/pace-theme-bounce.tmpl.css') }}"> -->
    <!-- PACE -->
    <!-- <link rel="stylesheet" href="{{ asset('/dist/plugins/pace-1.0.2/themes/green/pace-theme-loading-bar.css') }}"> -->

    <style type="text/css">
        /*Navbar Header*/
        .navbar-inverse {
            background-color: #8dc63f;
            border-color: #8dc63f;
            padding: 20px 20px 4px 20px;
        }

        .top-nav > li > a {
            padding-top: 15px;
            padding-bottom: 15px;
            line-height: 20px;
            color: #fff;
        }

        .top-nav > li > a:hover, .top-nav > li > a:focus, .top-nav > .open > a, .top-nav > .open > a:hover, .top-nav > .open > a:focus {
            color: #fff;
            background-color: #79B429;
        }

        .navbar-inverse .navbar-brand {
            color: #FFF;
        }

        .navbar-inverse .navbar-collapse, .navbar-inverse .navbar-form {
            border-color: #eee;
        }

        /*Menu Samping kiri*/
        .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {
            color: #428bca; /*fff*/
            background-color: #eee;
        }

        .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
            color: #428bca;
            background-color: transparent;
        }

        .navbar-inverse .navbar-nav > li > a {
            color: #428bca; /*#fff*/
        }

        .side-nav > li > ul > li > a { /*Level Dua*/
            display: block;
            padding: 5px 15px 5px 30px;
            text-decoration: none;
            color: #428bca; /*#fff*/
        }

        .side-nav li a:hover, .side-nav li a:focus {
            outline: none;
            background-color: #eee !important;
        }

        .side-nav > li > ul > li > ul > li > a { /*Level Tiga*/
            display: block;
            padding: 5px 15px 5px 30px; /*10px 15px 10px 38px; atas kanan bawah kiri*/
            text-decoration: none;
            color: #428bca; /*#fff*/
        }

        .side-nav > li > ul > li > ul > li > ul > li > a { /*Level Empat*/
            display: block;
            padding: 5px 15px 5px 30px; /*10px 15px 10px 38px; atas kanan bawah kiri*/
            text-decoration: none;
            color: #428bca; /*#fff*/
        }

        .side-nav ul {
            list-style-type: none; /* Remove list bullets */
        }

        .dropdown-menu {
            min-width: 280px;
        }

        @media screen and (max-width: 767px) {
            .navbar-inverse .navbar-collapse, .navbar-inverse .navbar-form {
                background-color: #eee;
            }

            .dropdown-menu {
                min-width: 240px;
            }
        }

        .navbar-brand {
            padding: 0px; /* firefox bug fix */
        }
        .navbar-brand>img {
            height: 100%;
            padding: 15px;  /*firefox bug fix */
            width: auto;
            background-color: #fff;
            padding: 1px;
        }

        /*.side-nav>li>ul>li>ul>li>a {
            margin-left: -70px;
            width: 225px;
        }*/

        /*Toggle menu*/
        .navbar-inverse .navbar-toggle {
            border-color: #FCFCFC;
        }

        .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {
            background-color: #6A9B28;
        }

        .navbar-inverse {
            /*height: 15%;*/
        }

        .side-nav {
            top: 91px;
        }

        /*Body*/
        #page-wrapper {
            padding: 45px 10px 10px 10px;
            min-height: 100vh;
        }

        .typeahead { width: 90%; }

        .failed-text
        {
            background: #f2dede;
        }

        .success-text
        {
            background: #DFF0D8;
        }

        #style-3::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #ddd;
        }

        #style-3::-webkit-scrollbar
        {
            width: 6px;
            background-color: #ddd;
        }

        #style-3::-webkit-scrollbar-thumb
        {
            background-color: #ddd;
        }

        .card {
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          transition: 0.3s;
          width: 100%;
        }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

        .container-c {
            padding: 15px 25px 15px 25px;
        }
        .td-bold {
          font-weight: bold;
          padding: 5px;
        }
        td {
          padding: 10px;
        }
        table {
          width: 100%;
        }
  </style>
  <!-- jQuery Version 2.2.3 -->
    <!-- <script src="{{ asset('/dist/plugins/jQuery/jquery-2.2.3.min.js') }}"></script> -->
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-lg-offset-3">
        <div class="card">
          <div class="container-c">
            <div class="row">
              <div class="col-lg-12" style="margin-top: 1%;">
                <div class="box box-default">
                  <div class="box-header" style="background-color: rgb(128, 128, 128); color: #fff; font-weight: 900;">
                    NOTIFIKASI
                  </div>
                  <div class="box-body">
                    <div class="row">
                      <div class="col-xs-12">
                        <div class="form-group">
                            <label class="col-sm-3">No Dokumen </label> <p class="col-sm-9">: {{ $doc_code }}</p>
                        </div>
                        @if($tlk)
                        <div class="form-group">
                          <label class="col-sm-3">Keterangan </label> <p class="col-sm-9">: {{ $keterangan }}</p>
                        </div>
                        @endif
                      </div>
                    </div>
                    <div class="col-lg-12 td-bold" style="text-align: center; background-color: #eee;">
                        {{ $action }}
                    </div>
                  </div>
                  <div class="box-footer">
                    <center>
                      <button class="btn btn-default btn-sm" style="width: 100px;" onclick="closeWin();return false;">Tutup</button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript">
    function closeWin() {
@if($tutup)
    window.location.replace('/outstanding');
@else
    window.close();
@endif
    }
  </script>
</body>
</html>