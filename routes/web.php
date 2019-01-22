<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', "HomeController@login");
Route::post('/submitlogin', "HomeController@submitLogin");
Route::group(['middleware'=>'checkreq'], function(){
	Route::get('/', "HomeController@index");
	Route::get('/home', "HomeController@index");
	Route::get('/logout', "HomeController@logout");
	Route::get('/changepass', "HomeController@changePass");
	Route::post('/submitchangepass', "HomeController@submitChangePass");
});
Route::group(['prefix' => 'master','middleware'=>'checkreq'], function(){
	Route::get('/company', "CompanyController@index");
	Route::get('/user', "UserController@index");
	Route::get('/location', "LocationController@index");
	Route::get('/division', "DivisionController@index");
	Route::get('/type', "TypeController@index");
});
Route::group(['prefix' => 'user','middleware'=>'checkreq'], function(){
    Route::get('/',"UserController@index");
    Route::get('list',"UserController@index");
    Route::get('create',"UserController@create");
    Route::get('create/changeemployee',"UserController@changeEmployee");
    Route::get('chooseemployee/{nik?}',"UserController@chooseEmployee")->where('nik','(.*)');
    Route::get('detail/{nik?}',"UserController@detail")->where('nik','(.*)');
    Route::get('changestatus/{current}/{nik?}',"UserController@changeStatus")->where('nik','(.*)');
    Route::get('resetpass/{nik?}',"UserController@resetPass")->where('nik','(.*)');
    Route::post('create/submit',"UserController@submit");
	Route::post('/getalluser', "UserController@getAllUser");
	Route::post('/getallemployee', "UserController@getAllEmployee");
	Route::post('/getemployee/{nik?}', "UserController@getEmployee")->where('nik','(.*)');
	Route::post('/resetpass/', "UserController@resetPass")->where('nik','(.*)');
    Route::post('/edit/submit',"UserController@submitEdit");
});
Route::group(['prefix' => 'improvement','middleware'=>'checkreq'], function(){
    Route::get('/',"ImprovementController@index");
    Route::get('list',"ImprovementController@index");
	Route::post('/submitimprovement', "ImprovementController@submitImprovement");
});
Route::group(['prefix' => 'company','middleware'=>'checkreq'], function(){
    Route::get('/',"CompanyController@index");
    Route::get('list',"CompanyController@index");
    Route::post('insert',"CompanyController@insertCompany");
    Route::get('delete/{id}',"CompanyController@deleteCompany");
	Route::post('/change', "CompanyController@submitChange");
});
Route::group(['prefix' => 'division','middleware'=>'checkreq'], function(){
    Route::get('/',"DivisionController@index");
    Route::get('list',"DivisionController@index");
    Route::post('insert',"DivisionController@insertDivision");
    Route::get('delete/{id}',"DivisionController@deleteDivision");
	Route::post('/change', "DivisionController@submitChange");
});
Route::group(['prefix' => 'location','middleware'=>'checkreq'], function(){
    Route::get('/',"LocationController@index");
    Route::get('list',"LocationController@index");
    Route::post('insert',"LocationController@insertLocation");
    Route::get('delete/{id}',"LocationController@deleteLocation");
	Route::post('/change', "LocationController@submitChange");
});
Route::group(['prefix' => 'type','middleware'=>'checkreq'], function(){
    Route::get('/',"TypeController@index");
    Route::get('list',"TypeController@index");
    Route::post('insert',"TypeController@insertType");
    Route::get('delete/{id}',"TypeController@deleteType");
	Route::post('/change', "TypeController@submitChange");
});
Route::group(['prefix' => 'approval','middleware'=>'checkreq'], function(){
    Route::get('/',"ApprovalController@index");
    Route::get('/tracking/',"ApprovalController@tracking");
    Route::get('/detail/{improvementId?}',"ApprovalController@detail");
    Route::post('/submitapproval',"ApprovalController@submitApproval");
	Route::post('/getallpendingapproval', "ApprovalController@getAllPendingApproval");
});
