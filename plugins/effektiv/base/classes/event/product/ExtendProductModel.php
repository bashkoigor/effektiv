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

            $arNewFieldList = [
                'partial_product_info',
                'partial_product_property',
            ];

            /** @var Product $obProduct */
            foreach ($arNewFieldList as $sFieldName) {
                $obProduct->fillable[] = $sFieldName;
                $obProduct->translatable[] = $sFieldName; // Для перевда
            }

            $obProduct->addCachedField($arNewFieldList);
        });
    }
}
