<?php namespace Effektiv\Main\Components;

use Mail;
use Lang;
use Input;
use Flash;
use Cms\Classes\ComponentBase;
use Effektiv\Main\Models\Review;

/**
 * Reviews Component
 */
class Reviews extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Reviews',
            'description' => 'Product reviews.'
        ];
    }

    public function defineProperties()
    {
        return [
            'status' => [
                'title'       => 'Вкл/Откл',
                'description' => 'Вкл/Откл возможность оставить отзыв.',
                'type'        => 'checkbox',
            ],
            'email' => [
                'title'       => 'Email',
                'description' => 'Если Email указан, на этот email будут приходить оповещения о новых отзывах.',
            ]
        ];
    }

    public function onRender()
    {
        $this->page['status'] = $this->property('status');
        $this->page['reviews'] = Review::where('product_id', $this->property('productId'))->where('status', 1)->get();
    }

    public function onAddItem()
    {
        $data = [
            'product_id' => e(Input::get('product_id')),
            'product'    => e(Input::get('product')),
            'name'       => e(Input::get('name')),
            'rating'     => e(Input::get('rating')),
            'message'    => e(Input::get('message'))
        ];

        $item = new Review;
        $item->product_id = $data['product_id'];
        $item->name       = $data['name'];
        $item->rating     = $data['rating'];
        $item->message    = $data['message'];
        $success = $item->save();

        if ($success === true) {

            $email = $this->property('email');
            if (isset($email)) {
                Mail::send('effektive.sendmail:mail:reviews', $data, function($message) use ($email) {
                    $message->to($email, 'На сайте effektiv появился новый отзыв.');
                });
            }

            Flash::success( Lang::get('effektiv.main::lang.reviews.success') );
        } else {
            Flash::success( Lang::get('effektiv.main::lang.validation.error') );
        }
    }
}
