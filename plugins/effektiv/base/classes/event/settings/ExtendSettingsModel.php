<?php namespace Effektiv\Base\Classes\Event\Settings;

use Input;
use Effektiv\Base\Models\Settings;
use Lovata\Shopaholic\Models\Price;
use System\Helpers\Cache as CacheHelper;

/**
 * Class ExtendSettingsModel
 * @package Lovata\BaseCode\Classes\Event\Settings
 */
class ExtendSettingsModel
{
	protected $iPriority = 1000;

    public function subscribe($obEvent)
    {
    	$sModelClass = $this->getModelClass();

    	$sModelClass::extend(function ($obElement) {

			/** @var \Model $obElement */
            $obElement->bindEvent('model.beforeSave', function () use ($obElement) {

                $arInput = Input::all();

                $obPrice = new Price();

		        foreach ($arInput["Offer"] as $iProductID => $arPriceTypeID) {
		        	
		        	foreach ($arPriceTypeID as $iPriceTypeID => $price) {
			        	/*if (empty($price)) {
			                continue;
			            }*/

						$obPriceModel = $obPrice->where([
							['item_id', '=', $iProductID],
							['price_type_id', '=', $iPriceTypeID],
						])->first();

		                $obPriceModel->price = $price;
		                $obPriceModel->save();
		        	}
		        }

                CacheHelper::clear();

            }, $this->iPriority);

        });
    }

    /**
	 * Get model class name
	 * @return string
	 */
	protected function getModelClass() : string
	{
	    return Settings::class;
	}

	protected function getPriceClass() : string
	{
	    return Price::class;
	}
}