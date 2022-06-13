<?php namespace Effektiv\Base\Components;

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

    public function onSend()
    {
        $vars = (array) Input::get('callBack');
        Mail::send('effektive', $vars, function($message) {
            $message->to('igor.bashko@yandex.ru');
            $message->subject('Обратный звонок');
        });
    }
}