<?php namespace App\Library;

use Url;

define("PUBLIC_UPLOAD_PATH",url('/').'/uploads/Improvement/');
define("PRIVATE_UPLOAD_PATH",public_path().'/uploads/Improvement/');

class Config {
    static $publicUploadPath = PUBLIC_UPLOAD_PATH;
    static $privateUploadPath = PRIVATE_UPLOAD_PATH;
}