<?php namespace Effektiv\Base\Components;

use Flash;
use Mail;
use Input;
use Cms\Classes\ComponentBase;

class SendMail extends ComponentBase {

    protected $email = 'info@effekt-iv.ru';

    /**
     * @return array
     */
    public function componentDetails()
    {
        return [
            'name'        => 'SendMail',
            'description' => 'SendMail component.'
        ];
    }

    public function onSendCallBack()
    {
        $vars = (array) Input::get('callBack');
        Mail::send('effektive.sendmail:mail:call_back_form', $vars, function($message) {
            $message->to($this->email);
        });
    }

    public function onSendContactForm()
    {
        $vars = (array) Input::get('contactForm');
        Mail::send('effektive.sendmail:mail:contact_form', $vars, function($message) {
            $message->to($this->email);
        });
    }
}