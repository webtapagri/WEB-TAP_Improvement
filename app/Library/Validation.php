<?php namespace App\Library;

class Validation {
	
    public static function validationMessage($isiPesan)
    {
        $pesan = "<div class='alert alert-danger alert-dismissible' role='alert'>
					<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
					<strong>Warning!</strong> " . $isiPesan . " .
				</div>";
        return $pesan;
    }
    public static function successMessage($isiPesan)
    {
        $pesan = "<div class='alert alert-success alert-dismissible' role='alert'>
					<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
					<strong>Success!</strong> " . $isiPesan . " .
				</div>";
        return $pesan;
    }
}