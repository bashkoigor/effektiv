<?php namespace Effektiv\Base\Classes\Event\Category;

use Lovata\Shopaholic\Models\Category;
use Lovata\Shopaholic\Controllers\Categories;

/**
 * Class ExtendCategoryModel
 * @package Lovata\BaseCode\Classes\Event\Category
 */
class ExtendCategoryModel
{

    // TODO: refactoring
    public function subscribe($obEvent)
    {

        Category::extend(function($obCategory) {
            if (!$obCategory->propertyExists('translatable')) {
                $obCategory->addDynamicProperty('translatable', []);
            }

            $arNewFieldList = [
                'product_video_banner',
                'product_detail',
                'product_benefits',
                'product_models',
                'product_video',
                'product_description',
                'product_specifications',
                'product_list_title'
            ];

            $obCategory->translatable = array_merge($obCategory->translatable, $arNewFieldList);

            $obCategory->addCachedField($arNewFieldList);
        });

        $obEvent->listen('backend.form.extendFieldsBefore', function ($widget) {

            $sControllerClass = $this->getControllerClass();
            $sModelName = $this->getModelClass();

            /** @var \Backend\Widgets\Form $obWidget */
            if (!$widget->getController() instanceof $sControllerClass || $widget->isNested || empty($widget->context)) {
                return;
            }

            if (!$widget->model instanceof $sModelName) {
                return;
            }

            $widget->tabs['fields']['product_video_banner'] = [
                'label' => 'Баннер',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'richeditor',
                'size' => 'huge',
                'language' => 'html',
            ];

            $widget->tabs['fields']['product_detail'] = [
                'label' => 'Товар в деталях',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'textarea',
                'size' => 'huge',
                'language' => 'html',
            ];

            $widget->tabs['fields']['product_benefits'] = [
                'label' => 'Ключевые преимущества (иконки)',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'textarea',
                'size' => 'huge',
                'language' => 'html',
            ];

            $widget->tabs['fields']['product_models'] = [
                'label' => 'Блок фотокарусель (выбор моделей)',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'richeditor',
                'size' => 'huge',
                'language' => 'html',
            ];


            $widget->tabs['fields']['product_video'] = [
                'label' => 'Видео блок',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'textarea',
                'size' => 'huge',
                'language' => 'html',
            ];

            $widget->tabs['fields']['product_description'] = [
                'label' => 'Блок описаня товара',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'richeditor',
                'size' => 'huge',
                'language' => 'html',
            ];

            $widget->tabs['fields']['product_specifications'] = [
                'label' => 'Технические характеристики (таблица)',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => '',
                'span' => 'left',
                'type' => 'richeditor',
                'size' => 'huge',
                'language' => 'html',
            ];

            $widget->tabs['fields']['product_list_title'] = [
                'label' => 'Список товаров (шапка)',
                'tab' => 'Общие элементы в карточке товара',
                'comment' => 'Логика выода товаров - partial/product/product-list.htm',
                'span' => 'left',
                'type' => 'richeditor',
                'size' => 'huge',
                'language' => 'html',
            ];

        });
    }

    /**
     * Get model class name
     * @return string
     */
    protected function getModelClass() : string
    {
        return Category::class;
    }

    /**
     * Get controller class name
     * @return string
     */
    protected function getControllerClass() : string
    {
        return Categories::class;
    }
}