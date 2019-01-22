        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" id="header-navbar">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand hidden-xs" href="{{ url('/') }}"><img src="{{ asset('/assets/img/pages/logo.png') }}" alt="Brand"> TRIPUTRA AGRO PERSADA</a>
                <a class="navbar-brand visible-xs" href="home">TAP</a>
            </div>
            <!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{ Session::get('user_name') }} <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="{{ asset('logout') }}"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                            <a href="{{ asset('changepass') }}"><i class="fa fa-fw fa-user-secret"></i>Change Password</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav" id="style-3" style="overflow-x: hidden; overflow-y: scroll; height: 85vh;">
                    <li class="active">
                        <a href="{{ url('home') }}"><i class="fa fa-home" aria-hidden="true"></i> Home</a>
                    </li>
					
					@if(session('user_menu'))
						@foreach (Session::get('user_menu') as $menu)
							<li>
								<a href="{{(array_key_exists('submenu',$menu)?'#':url($menu['target']))}}" 
									data-toggle="collapse" data-target="#sub{{$menu['id']}}">
									<i class="{{$menu['iconClass']}}" aria-hidden="true"></i>
									{{$menu['name']}}
									@if(array_key_exists('submenu',$menu))
										<i class="fa fa-fw fa-caret-down"></i>
									@endif
								</a>
								@if(array_key_exists('submenu',$menu))
									<ul id="sub{{$menu['id']}}" class="collapse">
										@foreach($menu['submenu'] as $submenu)
											<li>
												<a href="{{url($submenu['target'])}}" data-toggle="collapse" data-target="#sub{{$submenu['id']}}">
													<i class="{{$submenu['iconClass']}}" aria-hidden="true"></i>
													{{$submenu['name']}}
												</a>
											</li>
										@endforeach
									</ul>
								@endif
							</li>
						@endforeach
					@endif
                </ul>
            </div>
            <!-- /.navbar-collapse -->
            <div style="width: 100%;  margin-top: 1%; "></div><!--border: 1px solid #fff;-->
        </nav>
        <script type="text/javascript">
            $(document).ready(function(){
                $('.side-nav').append("{!! Session::get('treeMenu') !!}");
            });

            // function clearSessionUser(){
            //     var idUser = '{{Session::get("user_id")}}';
            //     var searchThis = 'user' + idUser + '_';
            //     var asd = [];
            //     Object.keys(localStorage)
            //       .forEach(function(key){
            //         var value = key;
            //         var low = value.toLowerCase();
            //         var cek = low.match(searchThis);
            //         if (cek) {
            //           // asd.push(key);
            //           localStorage.removeItem(key);
            //         }
            //     });
            //     // localStorage.clear();
            //     // console.log(asd);
            // }

            function clearSessionUser(){
                localStorage.clear();
            }
        </script>
