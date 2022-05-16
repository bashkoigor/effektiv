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

    // Send ajax request and update cart items
    $.request('Cart::onUpdate', {
        'data': data,
        'update': {'cart/cart-table': '.cart-table-wrapper','cart/header-cart-info': '.header-cart-wrapper'},
    });
});

// Event add product to cart
$(document).on('click', '.cart-remove', (e) => {

    const button = $(e.currentTarget),
        form = button.parents('.product-wrapper');

    let data = {
    'cart': [
                form.find('input[name="offer_id"]').val()
        ]
    };

    $.request('Cart::onRemove', {
        'data': data,
        'update': {'cart/cart-table': '.cart-table-wrapper', 'cart/header-cart-info': '.header-cart-wrapper'},
    });

});

