<?php namespace Effektiv\Base\Classes\Event\Product;

use Lovata\Toolbox\Classes\Event\AbstractBackendFieldHandler;

use Lovata\Shopaholic\Models\Product;
use Lovata\Shopaholic\Controllers\Products;

/**
 * Class ExtendOfferFieldsHandler
 * @package Effektiv\Base\Classes\Event\Product
 * @author  Igor Bashko
 */
class ExtendProductFieldsHandler extends AbstractBackendFieldHandler
{
    /**
     * Extend form fields
     * @param \Backend\Widgets\Form $obWidget
     */
    protected function extendFields($obWidget)
    {
        $arAdditionFields = [
            'benefits_images' => [
                'label'     => 'Ключевые преимущества',
                'tab'       => 'lovata.toolbox::lang.tab.images',
                'type'      => 'fileupload',
                'mode'      => 'image',
                'size'      => 'small',
                'span'      => 'left',
                'fileTypes'   => 'svg,jpg,png',
            ],
            'carousel_in_color' => [
                'label'     => 'Блок фотокарусель (разные цвета)',
                'tab'       => 'lovata.toolbox::lang.tab.images',
                'type'      => 'fileupload',
                'mode'      => 'image',
                'size'      => 'small',
                'span'      => 'left',
                'comment'   => '',
            ],
            'description_block' => [
                'label'     => 'Блок описаня товара',
                'tab'       => 'lovata.toolbox::lang.tab.images',
                'type'      => 'fileupload',
                'mode'      => 'image',
                'size'      => 'small',
                'span'      => 'left',
                'fileTypes'   => 'svg,jpg,png',
            ]
        ];

        $obWidget->addTabFields($arAdditionFields);
    }


    /**
     * Get model class name
     * @return string
     */
    protected function getModelClass() : string
    {
        return Product::class;
    }

    /**
     * Get controller class name
     * @return string
     */
    protected function getControllerClass() : string
    {
        return Products::class;
    }
}
