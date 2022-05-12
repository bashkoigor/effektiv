<?php namespace Effektiv\Base\Updates;

use Schema;
use Illuminate\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

/**
 * Class UpdateTableProducts1
 * @package Effektiv\Base\Updates
 */
class UpdateTableProducts1 extends Migration
{
    const TABLE_NAME = 'lovata_shopaholic_products';

    public function up()
    {
        if (!Schema::hasTable(self::TABLE_NAME)) {
            return;
        }

        $arNewFieldList = [
            'partial_product_info',
            'partial_product_property',
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
            if (in_array('partial_product_info', $arNewFieldList)) {
                $obTable->text('partial_product_info')->nullable();
            }
            if (in_array('partial_product_property', $arNewFieldList)) {
                $obTable->text('partial_product_property')->nullable();
            }
        });
    }

    public function down()
    {
        if (!Schema::hasTable(self::TABLE_NAME)) {
            return;
        }

        $arNewFieldList = [
            'partial_product_info',
            'partial_product_property',
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
