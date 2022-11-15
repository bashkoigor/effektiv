<?php namespace Effektiv\Base\Updates;

use Schema;
use Illuminate\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

/**
 * Class UpdateTableCategories1
 * @package Effektiv\Base\Updates
 */
class UpdateTableCategories1 extends Migration
{
    const TABLE_NAME = 'lovata_shopaholic_categories';
    
    public function up()
    {
        if (!Schema::hasTable(self::TABLE_NAME)) {
            return;
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

        foreach ($arNewFieldList as $iKey => $sFieldName) {
            if (Schema::hasColumn(self::TABLE_NAME, $sFieldName)) {
                unset($arNewFieldList[$iKey]);
            }
        }

        if (empty($arNewFieldList)) {
            return;
        }

        Schema::table(self::TABLE_NAME, function (Blueprint $obTable) use ($arNewFieldList) {
            
            foreach ($arNewFieldList as $sFieldName) {
                $obTable->text($sFieldName)->nullable();
            }

        });
    }

    public function down()
    {
        if (!Schema::hasTable(self::TABLE_NAME)) {
            return;
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

        foreach ($arNewFieldList as $iKey => $sFieldName) {
            if (!Schema::hasColumn(self::TABLE_NAME, $sFieldName)) {
                unset($arNewFieldList[$iKey]);
            }
        }

        if (empty($arNewFieldList)) {
            return;
        }

        Schema::table(self::TABLE_NAME, function (Blueprint $obTable) use ($arNewFieldList) {
            $obTable->dropColumn($arNewFieldList);
        });
    }
}
