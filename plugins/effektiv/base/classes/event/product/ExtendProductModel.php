<?php namespace Effektiv\Base\Classes\Event\Product;

use Lovata\Shopaholic\Models\Product;

/**
 * Class ExtendProductModel
 * @package Effektiv\Base\Classes\Event\Product
 * @author  Igor Bashko
 */
class ExtendProductModel
{
    public function subscribe()
    {
        Product::extend(function ($obProduct) {

            /** @var Product $obProduct */
            $obProduct->attachMany['benefits_images'] = 'System\Models\File';
            $obProduct->attachMany['carousel_in_color'] = 'System\Models\File';
            $obProduct->attachMany['description_block'] = 'System\Models\File';

            $obProduct->addCachedField(['carousel','carousel_in_color','description_block']);
        });
    }
}
