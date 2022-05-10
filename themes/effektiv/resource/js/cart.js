import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';
import ShopaholicCartRemove from '@lovata/shopaholic-cart/shopaholic-cart-remove';

const obShopaholicCartUpdate = new ShopaholicCartUpdate();
obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData) => {
    obRequestData.update = {
        'cart/header-cart-info': '.header-cart-wrapper'
    };
    return obRequestData;
}).init();

const obShopaholicCartRemove = new ShopaholicCartRemove();
obShopaholicCartRemove.setAjaxRequestCallback((obRequestData) => {
    obRequestData.update = {
        'cart/cart-table': '.cart-table-wrapper',
        'cart/header-cart-info': '.header-cart-wrapper'
    };
    return obRequestData;
}).init();
