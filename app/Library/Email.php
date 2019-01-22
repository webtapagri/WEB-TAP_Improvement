<?php namespace App\Library;

use Mail;

class Email {
    public static function sendRequestNotificationEmail($data,$to,$subject)
    {
		$data['base_url'] = "http://ssdev.tap-agri.com";
		Mail::send('Emails/notification',$data, function ($message) use ($to,$subject)
		{
			$message->from('no-reply@tap-agri.com', 'Improvement Admin');
			$message->bcc('system.administrator@tap-agri.com', 'Improvement Admin');
			$message->to($to);
			$message->subject($subject);
		});
    }
    public static function sendReminderEmail($data,$to,$subject)
    {
		$data['base_url'] = "http://ssdev.tap-agri.com";
		Mail::send('Emails/reminder',$data, function ($message) use ($to,$subject)
		{
			$message->from('no-reply@tap-agri.com', 'Improvement Admin');
			$message->bcc('system.administrator@tap-agri.com', 'Improvement Admin');
			$message->to($to);
			$message->subject($subject);
		});
    }
    public static function sendRejectNotificationEmail($data,$to,$subject)
    {
		$data['base_url'] = "http://ssdev.tap-agri.com";
		Mail::send('Emails/reject',$data, function ($message) use ($to,$subject)
		{
			$message->from('no-reply@tap-agri.com', 'Improvement Admin');
			$message->bcc('system.administrator@tap-agri.com', 'Improvement Admin');
			$message->to($to);
			$message->subject($subject);
		});
    }
}