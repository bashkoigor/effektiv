$.request('onAjax', {
    //update: { 'product/product-list': '.product-list' }
});

// Event add product to cart
$(document).on('click', '.btn-quick-order, .btn-add-to-cart', (e) => {

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

    let btnClass = button.attr('class');

    addOfferToCart(form, button, data, btnClass);

});

// Add product to cart, if quick order show modal form
function addOfferToCart(form, button, data, btnClass) {

    if (btnClass == 'btn btn-add-to-cart') {
        
        $.request('Cart::onAdd', {
            'data': data,
            'update': {'cart/header-cart-info': '.header-cart-wrapper'},
        });

    } else {
        
        $.request('Cart::onAdd', {
            'data': data,
            'update': {'cart/header-cart-info': '.header-cart-wrapper'},
            'beforeUpdate': function(response) {
                if (response.status === true) {
                    $('#quickOrder').modal('show');
                } else {
                    console.log(response.message);
                }
            }
        });

    }
}

// Create quick order
function createQuickOrder(name, phone) {

    let data = {
        'order': {
            'payment_method_id': 1,
            'shipping_type_id': 1
        },
        'user': {
            'name': name,
            'phone': phone            
        }
    };

    $.request('MakeOrder::onCreate', {
        'data': data
    });
}

// Validate quick order modal form
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.quick-order-needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    var name = form.querySelector('[name="first_name"]').value;
                    var phone = form.querySelector('[name="phone"]').value;
                    createQuickOrder(name, phone);
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

// Enable tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Product Carousel
const productCarousel = new Carousel(document.querySelector("#product-carousel"), {
    Dots: false,
});
const thumbCarousel = new Carousel(document.querySelector("#product-thumb-carousel"), {
    Sync: {
        target: productCarousel,
        friction: 0,
    },
    Dots: false,
    Navigation: false,
    center: true,
    slidesPerPage: 1,
    infinite: false,
});
// Carousel block
const galleryCarousel = new Carousel(document.querySelector("#gallery-carousel"), {
    slidesPerPage : 1,
    center : false
});
Fancybox.bind("#gallery-carousel a", {
    caption: function (fancybox, carousel, slide) {},
});
// Other blocks
const inColorCarousel = new Carousel(document.querySelector("#in-color-carousel"), {
    slidesPerPage: 1,
    center: false
});
Fancybox.bind("#in-color-carousel a", {
    caption: function (fancybox, carousel, slide) {},
});