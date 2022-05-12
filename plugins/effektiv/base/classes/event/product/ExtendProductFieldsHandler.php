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
            'partial_product_info' => [
                'label'     => 'Информация',
                'tab'       => 'Блоки',
                'type'    => 'textarea',
                'size'    => 'small',
                'span' => 'left',
                'comment' => '',
            ],
            'partial_product_property' => [
                'label'   => 'Свойства',
                'tab'     => 'Блоки',
                'type'    => 'textarea',
                'span' => 'right',
                'size'    => 'small',
            ],
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
