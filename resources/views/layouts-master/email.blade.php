<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="oauthAccessToken" content="<?php echo Session::get('token_type').' '.Session::get('access_token');?>">
    <link href="{{ asset('/assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('dist/plugins/select2/select2.css') }}">
    <link href="{{ asset('/assets/css/sb-admin.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/dist/css/AdminLTE.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/font-awesome-4.7.0/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">
    <!-- dataTables -->
    <link rel="stylesheet" href="{{ asset('/plugins/datatables/dataTables.bootstrap.css') }}">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="{{ asset('/dist/plugins/datetimepicker/css/bootstrap-datetimepicker.min.css') }}">
    <!-- iCheck for checkboxes and radio inputs -->
    <link rel="stylesheet" href="{{ asset('/plugins/iCheck/all.css') }}">

    <!-- Toastr Notification -->
    <link rel="stylesheet" type="text/css" href="{{ asset('/toastr8/style.css') }}">
    <!-- PACE -->
    <!-- <link rel="stylesheet" href="{{ asset('/dist/plugins/pace-1.0.2/templates/pace-theme-bounce.tmpl.css') }}"> -->
    <!-- PACE -->
    <!-- <link rel="stylesheet" href="{{ asset('/dist/plugins/pace-1.0.2/themes/green/pace-theme-loading-bar.css') }}"> -->


    <style type="text/css">
        body{
            font-family: "arial";
            font-size: 13px;
        }

        h3 {
            font-family: "arial";
            font-size: 18px;
        }

        label{
            font-weight: 100;
        }

        .box-title{
            font-size: 13px !important;
            font-weight: bold;
        }

        .form-control{
             font-size: 12px;
             height: 27px;
             padding:2px 5px;
        }

        .form-group{
            margin-bottom: 6px;
        }

        .select2 {
             font-size: 12px;
        }

        .select2-container--default .select2-selection--single, .select2-selection .select2-selection--single {
            height: 27px;
            padding: 2px 5px;
        }

        .input-group-addon {
            background-color: #eee;
            border: 1px solid #ccc;
            border-radius: 4px;
            color: #555;
            font-size: 14px;
            font-weight: 400;
            line-height: 1;
            padding: 2px 12px;
            text-align: center;
        }

        .select2-results__option {
            -moz-user-select: none;
            padding: 5px;
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow b {
            top: 38%;
        }

        .select2-selection__clear{
            padding-right: 5px;
        }

        .select2-container .select2-selection--single .select2-selection__rendered {
            margin-top: -3px;
        }

        .btn{
            font-size: 13px;
        }

        /*Navbar Header*/
        .navbar-inverse {
            background-color: rgb(111,220,69);
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
        .navbar-inverse .navbar-nav > .active > a {
            color: #000000; /*fff => Dashboard*/
            background-color: #eee;
        }

        .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {
            color: #ffffff;
            background-color: transparent;
        }


        /* Level Satu*/
        .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
            color: #ffffff;
            background-color: transparent;
        }

        .navbar-inverse .navbar-nav > li > a {
            color: #000000; /*#fff*/
        }
        /* /Level Satu*/

        .side-nav > li > ul > li > a { /*Level Dua*/
            display: block;
            padding: 5px 15px 5px 30px;
            text-decoration: none;
            color: #000000; /*#fff*/
        }

        .side-nav li a:hover, .side-nav li a:focus {
            outline: none;
            color: #ffffff;
            background-color: rgb(195,190,190)/*#eee */!important;
        }

        .side-nav > li > ul > li > ul > li > a { /*Level Tiga*/
            display: block;
            padding: 5px 15px 5px 30px; /*10px 15px 10px 38px; atas kanan bawah kiri*/
            text-decoration: none;
            color: #000000; /*#fff*/
        }

        .side-nav > li > ul > li > ul > li > ul > li > a { /*Level Empat*/
            display: block;
            padding: 5px 15px 5px 30px; /*10px 15px 10px 38px; atas kanan bawah kiri*/
            text-decoration: none;
            color: #000000; /*#fff*/
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
            background-color: #fff; /*logo color */
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
            background-color: rgb(111,220,69)/*#6A9B28*/;
        }

        .navbar-inverse {
            /*height: 15%;   #660099*/
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
        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
          font-family: arial;
          font-size: 12px;
        }
        .table > thead > tr > th {
          border-bottom: 2px solid #f4f4f4;
          text-align: center;
        }

        .box-header{
            background: #ddd; margin-top:10px;
        }
        
        table.floatThead-table {
            border-top: none;
            border-bottom: none;
            background-color: #fff;
        }


        .chosen-container-single .chosen-single {
            height: 30px;
            border-radius: 3px;
            border: 1px solid #CCCCCC;
        }
        .chosen-container-single .chosen-single span {
            padding-top: 2px;
        }
        .chosen-container-single .chosen-single div b {
            margin-top: 2px;
        }
        .chosen-container-active .chosen-single, .chosen-container-active.chosen-with-drop .chosen-single {
            border-color: #ccc;
            border-color: rgba(119, 193, 58, .8);
            outline: 0;
            outline: thin dotted \9;
            -moz-box-shadow: 0 0 8px rgba(119, 193, 58, .6);
            box-shadow: 0 0 8px rgba(119, 193, 58, .6);
        }

        .custom-tooltip {
            position: relative;
            display: inline-block;
        }

        .custom-tooltip .custom-tooltiptext {
            visibility: hidden;
            width: 100px;
            /*background-color: #6FDC45;*/
            background-color: #555;
            color: #fff;
            font-weight: 900;
            text-align: center;
            border-radius: 3px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -60px;
            opacity: 0;
        }

        .custom-tooltip .custom-tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: 3px;
            border-width: 5px;
            border-style: solid;
            /*border-color: #6FDC45 transparent transparent transparent;*/
            border-color: #555 transparent transparent transparent;
        }

        .custom-tooltip:hover .custom-tooltiptext {
            visibility: visible !important;
            opacity: 1;
        }   
    </style>

    @yield('cascanding')
    <!-- jQuery Version 2.2.3 -->
    <script src="{{ asset('/dist/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
    <!-- jQuery  -->
    <script src="{{ asset('/dist/plugins/jQueryUI/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('/toastr8/script.js') }}"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="{{ asset('/assets/js/bootstrap.min.js') }}"></script>
    <!-- PACE JavaScript -->
    <!-- <script src="{{ asset('/dist/plugins/pace-1.0.2/pace.min.js') }}"></script> -->
    <script type="text/javascript" src="{{ asset('js/jquery.floatThead.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/pages/global.js') }}"></script>

</head>

<body>
    <div id="wrapper">
        <div id="page-wrapper">
            <div class="container-fluid">
                @yield('content')
            </div>
        </div>
    </div>
</body>

</html>
