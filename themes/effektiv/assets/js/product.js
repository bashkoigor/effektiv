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

(function () {
    'use strict'

    // Validate quick order modal form

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
function tooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
}

// Product Carousel
var obProductCarousel = document.querySelector("#product-carousel");
var obThumbCarousel = document.querySelector("#product-thumb-carousel");

if (obProductCarousel && obThumbCarousel) {
    const productCarousel = new Carousel(obProductCarousel, {
        Dots: false,
    });
    const thumbCarousel = new Carousel(obThumbCarousel, {
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
}

// Carousel block
function galleryCarousel() {
    var obGalleryCarousel = document.querySelector("#gallery-carousel");
    if (obGalleryCarousel) {
        const galleryCarousel = new Carousel(obGalleryCarousel, {
            slidesPerPage : 1,
            center : false
        });
        Fancybox.bind("#gallery-carousel a", {
            caption: function (fancybox, carousel, slide) {},
        });
    }
}

// Other blocks
var obInColorCarousel = document.querySelector("#in-color-carousel");
if (obInColorCarousel) {
    const inColorCarousel = new Carousel(obInColorCarousel, {
        slidesPerPage: 1,
        center: false
    });
    Fancybox.bind("#in-color-carousel a", {
        caption: function (fancybox, carousel, slide) {},
    });
}

// Show gallery
window.onload = function (e) {
    document.getElementById("product-gallery").classList.remove('invisible-block');
    document.getElementById("product-gallery").classList.add('visible-block');
}

// Check is element into view
function isScrolledIntoView(element)
{
    let pageTop = $(window).scrollTop();
    let pageBottom = pageTop + $(window).height();
    let elementTop = $(element).offset().top;
    let elementBottom = elementTop + $(element).height();

    //return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    if ((elementTop <= pageBottom) && (elementBottom >= pageTop)) {
        $(element).addClass( "shown" );
        return true;
    }
}

// Show product page partial, via ajax
function showPartial(partial, wrapperElement) {
    $.request('onAjax', {
        update: { [`product/${partial}`]: wrapperElement }
    });
    //console.log(partial);
}

let scrollCheck = function () {

    let benefitWrapper = '.benefit-wrapper';
    if ($(benefitWrapper).hasClass('shown') == false && isScrolledIntoView($(benefitWrapper))) {
        showPartial('benefit', benefitWrapper);
    }

    let bannerWrapper = '.banner-wrapper';
    if ($(bannerWrapper).hasClass('shown') == false && isScrolledIntoView($(bannerWrapper))) {
        showPartial('banner', bannerWrapper);
    }

    let detailWrapper = '.detail-wrapper';
    if ($(detailWrapper).hasClass('shown') == false && isScrolledIntoView($(detailWrapper))) {
        showPartial('detail', detailWrapper);
        setTimeout(() => {
            tooltips();
        }, 1000);
    }

    let descriptionWrapper = '.description-wrapper';
    if ($(descriptionWrapper).hasClass('shown') == false && isScrolledIntoView($(descriptionWrapper))) {
        showPartial('description-block', descriptionWrapper);
    }

    let productListWrapper = '.product-list-wrapper';
    if ($(productListWrapper).hasClass('shown') == false && isScrolledIntoView($(productListWrapper))) {
        showPartial('product-list', productListWrapper);
    }

    let carouselWrapper = '.carousel-wrapper';
    if ($(carouselWrapper).hasClass('shown') == false && isScrolledIntoView($(carouselWrapper))) {
        showPartial('carousel', carouselWrapper);
        setTimeout(() => {
            galleryCarousel();
            document.getElementById("carousel").classList.remove('invisible-block');
            document.getElementById("carousel").classList.add('visible-block');
        }, 1000);
    }

    let benefitsWrapper = '.benefits-wrapper';
    if ($(benefitsWrapper).hasClass('shown') == false && isScrolledIntoView($(benefitsWrapper))) {
        showPartial('benefits', benefitsWrapper);
    }

    let propertyTableWrapper = '.property-table-wrapper';
    if ($(propertyTableWrapper).hasClass('shown') == false && isScrolledIntoView($(propertyTableWrapper))) {
        showPartial('specifications', propertyTableWrapper);
    }

}
$(document).on("scroll", scrollCheck);


