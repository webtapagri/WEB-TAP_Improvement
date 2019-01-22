<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>BPM | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="{{ asset('/dist/bootstrap/css/bootstrap.min.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('/dist/font-awesome-4.6.3/css/font-awesome.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('/dist/adminLTE/css/AdminLTE.min.css') }}">
    <style type="text/css">.login-page, .register-page {background: #fff;}
    .bg-green {background-color: #8dc63f !important;}
    .btn-success{border-color: #8dc63f;}
    .backgrounnd{ 
                position:fixed;
                top:0;
                left:0;
                background:#000;
                opacity:0.8;
                z-index:998;
                height:100%;
                width:100%;}
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition login-page">
    <div class="backgrounnd">
        <div class="col-lg-6 col-lg-offset-3" style="margin-top: 23%;">
            <h1 style="color: #fff; text-align: center;">
            Browser ini tidak support.<br> 
            <span style="font-size: 0.8em;">Silahkan beralih ke browser firefox atau chrome.</span></h1>
        </div>
    </div>
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>TAP</b> FLOW</a>
      </div><!-- /.login-logo -->
      <div class="login-box-body">
        
        <form>
            <div class="form-group has-feedback">
                <input type="text" class="form-control" placeholder="Username"  disabled="">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="Password" disabled="">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="form-group">
                <input class="btn btn-success btn-block btn-flat bg-green" value="Masuk" type="submit" disabled="">
            </div>
        </form>
      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->
  </body>
</html>