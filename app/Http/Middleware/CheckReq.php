<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use URL;
use Sinergi\BrowserDetector\Browser;

class CheckReq
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		$checkBrowser = $this->checkBrowser();
		if($checkBrowser["success"]){
			if($this->checkSession()){				
				return $next($request);
			}
			else{
				return Redirect('/login');
			}
		}
		else{
			return view('errors.415', $checkBrowser);
		}
    }
	private function checkBrowser(){
        $browser = new Browser();
        if ($browser->getName() != Browser::IE && $browser->getName() != Browser::EDGE && $browser->getName() != Browser::UNKNOWN) {
            if ($browser->getName() == 'Firefox' && $browser->getversion() >= 52.0 || $browser->getName() == 'Chrome' && $browser->getversion() >= 57.0 || $browser->getName() == 'Opera' || $browser->getName() == 'Safari' && $browser->getversion() >= 10.1) {
				return ["success"=>true];
            }
            else {
				return ["success"=>false,"pesan"=>'Minimun Versi Browser Firefox 52.0 atau Chrome 57.0 .'];
            }
        }
        else {
			return ["success"=>false,"pesan"=>'Silahkan beralih ke browser Firefox 52.0 atau Chrome 57.0'];
        }
	}
	private function checkSession(){
		if (Session::get('nik') != null) {
			return true;
		}
		else{		
			//Session::flush();
			Session::put('pre-url', URL::current());
			Session::save();
			return false;
		}
	}
}
