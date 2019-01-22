<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    {{-- <meta name="csrf-token" content="{{ csrf_token() }}" /> --}}
    <title>SS Online - Login</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="{{ asset('/dist/bootstrap/css/bootstrap.min.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('/dist/font-awesome-4.6.3/css/font-awesome.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('/dist/adminLTE/css/AdminLTE.min.css') }}">
    <!-- Parsley -->
    <link rel="stylesheet" type="text/css" href="{{ asset('dist/Parsley.js-2.6.0/src/parsley.css') }}">
    <style type="text/css">.login-page, .register-page {background: #fff;} .bg-green {background-color: #8dc63f !important;} .btn-success{border-color: #8dc63f;} .version > center > p{margin: 0px;}</style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>Registrasi SS Online</b></a>
      </div><!-- /.login-logo -->
      <div class="login-box-body">
		@if(session('pesan'))
			{!! session('pesan') !!}
			{{session()->forget('pesan')}}
        @endif
        <form method="post" action="{{url('submitlogin')}}" id="form" data-parsley-validate="">
            {{ csrf_field() }}
            <div class="form-group has-feedback">
                <input type="text" class="form-control" id="inputEmail3" placeholder="Username" name="username" required="">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password" name="password" required="">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="form-group">
                <input class="btn btn-success btn-block btn-flat bg-green" value="Masuk" type="submit" id="btn-masuk">
            </div>
        </form>
      </div><!-- /.login-box-body -->
      <div class="login-box-body">
          <div class="form-group version">
            <center>
              <p>Version 1.0.0</p>
              <p>Copyright &copy; PT Triputra Agro Persada</p>
              <p>All Rights Reserved</p>
            </center>
          </div>
      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->

     <!-- jQuery Version 2.2.3 -->
    <script src="{{ asset('/dist/plugins/jQuery/jquery-2.2.3.min.js') }}"></script>
    <!-- jQuery  -->
    <script src="{{ asset('/dist/plugins/jQueryUI/jquery-ui.min.js') }}"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="{{ asset('/dist/bootstrap/js/bootstrap.min.js') }}"></script>
    <!-- PARSLEY -->
    <script src="{{ asset('/dist/Parsley.js-2.6.0/dist/parsley.min.js') }}"></script>
    <script src="{{ asset('/dist/Parsley.js-2.6.0/dist/i18n/idn.js') }}"></script>
    <script>
      $(document).ready(function(){
        
        // setTimeout(function(){
        //   window.location.reload();
        // }, 50000);
      });
      
      $(function () {
          $('#form').parsley().on('field:validated', function() {
              var ok = $('.parsley-error').length === 0;
          })
          .on('form:submit', function() {
            // goLogin();
            return true; // Don't submit form for this demo
          });
      });
    </script>
  </body>
</html>