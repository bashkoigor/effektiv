import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';

const obShopaholicCartAdd = new ShopaholicCartAdd();
obShopaholicCartAdd.setAjaxRequestCallback((obRequestData) => {
    obRequestData.update = {
        'cart/header-cart-info': '.header-cart-wrapper'
    };
    return obRequestData;
}).init();

