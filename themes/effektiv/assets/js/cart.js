// Event update quantity in cart
$(document).on('change', '.cart-quantity', (e) => {
    const button = $(e.currentTarget),
        form = button.parents('.product-wrapper');

    let data = {
        'cart': [
            {
                'offer_id': form.find('input[name="offer_id"]').val(),
                'quantity': form.find('input[name="quantity"]').val(),
            },
        ]
    };

    removeCdekData();

    setTimeout(function () {
        // Send ajax request and update cart items
        $.request('Cart::onUpdate', {
            'data': data,
            'update': {'cart/cart-table': '.cart-table-wrapper','cart/header-cart-info': '.header-cart-wrapper'},
        });
        // Remove delivery info
        resetDeliveryInfo();   
    }, 500);

});

// Event update shipping type
$(document).on('change', 'input[type=radio][name=shipping_type_id]', function () {
    if (this.value == cdekShippingTypeId && $(this).is(':checked')) { // If shipping is CDEK
        Cookies.set('shippingTypeId', cdekShippingTypeId);
        $(".openCdekModal").removeClass( "d-none" ).addClass( "d-inline-block" );
    } else {
        Cookies.set('shippingTypeId', 0);
        $(".openCdekModal").removeClass( "d-inline-block" ).addClass( "d-none" );
        resetDeliveryInfo();
        $.request('onAjax', {
            update: { 'cart/total-price': '.total-price' }
        });
    }
    let data = {
        'shipping_type_id': this.value
    };
    $.request('Cart::onSaveData', {
        'data': data
    });
});

// Event update payment method
$(document).on('change', 'input[type=radio][name=payment_method_id]', function () {
    let data = {
        'payment_method_id': this.value
    };
    $.request('Cart::onSaveData', {
        'data': data
    });
});

// Event remove product from cart
$(document).on('click', '.cart-remove', (e) => {

    const button = $(e.currentTarget),
        form = button.parents('.product-wrapper');

    let data = {
        'cart': [
            form.find('input[name="offer_id"]').val()
        ]
    };

    removeCdekData();

    setTimeout(function () {
        // Send ajax request and update cart items
        $.request('Cart::onRemove', {
            'data': data,
            'update': {'cart/cart-table': '.cart-table-wrapper', 'cart/header-cart-info': '.header-cart-wrapper'},
        });
        // Remove delivery info
        resetDeliveryInfo();   
    }, 500);

});

function resetDeliveryInfo() {
    $(".delivery_info").html("");
}