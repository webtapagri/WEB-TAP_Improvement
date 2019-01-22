<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use App;

class ApprovalReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'approval:reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email to reminding pending approval';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(Request $request)
    {
		return App::make('App\Http\Controllers\ApprovalController')->reminderPendingApproval($request);
    }
}
