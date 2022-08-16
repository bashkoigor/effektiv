// Global variable
const cdekShippingTypeId = 2;

// Modal menu by Ajax, show categorys.
$.request('onAjax', {
    update: { 'site/modal-menu': '.modal-menu-wrap' }
});

// Mobile style
window.onscroll = function() {
    if (window.pageYOffset == 0) {
        document.getElementById("to-top").style.display = "none";
    } else {
        document.getElementById("to-top").style.display = "block";
    }

    if ((window.innerHeight + window.scrollY + 900) >= document.body.offsetHeight) {
        document.getElementById("mobile-menu").style.setProperty("display", "none", "important");
    } else {
        document.getElementById("mobile-menu").style.display = "block";
    }
}

// Scroll to top
document.getElementById("to-top").onclick = function() { scrollToTop() };
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Open call back modal form
$(document).on('click', '#btn-call-back', (e) => {
    $('#callBackForm').modal('show');
});

//
$(document).on('click', '.btn-add-to-cart', (e) => {
    removeCdekData();
});

$(document).on('click', '.btn-quick-order', (e) => {
    removeCdekData();
});

// Locale switcher
$(".locale-picker .dropdown .title").click(function () {
    $(this).parent().toggleClass("closed");
});

function removeCdekData() {
    let cdekData = {
        'property': {
            'cdek_info': '',
            'cdek_price': ''
        }
    };

    // Delete cdek data from user cart if shipping type id is CDEK
    if (Cookies.get('shippingTypeId') == cdekShippingTypeId) {
        $.request('Cart::onSaveData', {
            'data': cdekData
        });
    }
}

function sendCallBack(name, phone) {
    let data = {
        'callBack': {
            'name': name,
            'phone': phone
        }
    };
    $.request('SendMail::onSendCallBack', {
        'data': data,
        'update': {'site/success-call-back': '#successCallBackForm'}
    });
}

function sendContactForm(name, email, phone, message, product) {
    let data = {
        'contactForm': {
            'name': name,
            'email': email,
            'phone': phone,
            'text': message,
            'product': product
        }
    };
    $.request('SendMail::onSendContactForm', {
        'data': data,
        'update': {'site/contact-form-result': '#contactFormResult'},
        beforeUpdate: function() {
            $("#contact-form-spinner").removeClass( "d-none" ).addClass( "d-inline-block" );
        },
        afterUpdate: function() {
            $("#contact-form-spinner").removeClass( "d-inline-block" ).addClass( "d-none" );
        }
    });
}

(function () {
    'use strict'

    // Validate quick order modal form

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.call-back-needs-validation')

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
                    sendCallBack(name, phone);
                }
                form.classList.add('was-validated')
            }, false)
        })

    // Validate contact form

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms_ = document.querySelectorAll('.contact-form-needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms_)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    var name = form.querySelector('[name="first_name"]').value;
                    var email = form.querySelector('[name="email"]').value;
                    var phone = form.querySelector('[name="phone"]').value;
                    var message = form.querySelector('[name="message"]').value;
                    var product = form.querySelector('[name="product"]').value;
                    sendContactForm(name, email, phone, message, product);
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
