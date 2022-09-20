<?php namespace Effektiv\Base\Components;

use Flash;
use Mail;
use Input;
use Cms\Classes\ComponentBase;

class SendMail extends ComponentBase {

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

    public function defineProperties()
    {
        return [
            'email' => [
                'title'       => 'Email',
                'default' => 'info@effekt-iv.ru',
                'description' => 'На этот email будут приходить оповещения о обратном звонке и контактной формы.',
            ]
        ];
    }

    public function onSendCallBack()
    {
        $vars = (array) Input::get('callBack');
        Mail::send('effektive.sendmail:mail:call_back_form', $vars, function($message) {
            $message->to($this->property('email'));
        });
    }

    public function onSendContactForm()
    {
        $vars = (array) Input::get('contactForm');
        Mail::send('effektive.sendmail:mail:contact_form', $vars, function($message) {
            $message->to($this->property('email'));
        });
    }
}