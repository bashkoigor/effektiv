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

// Open review modal form
$(document).on('click', '#btn-review', (e) => {
    e.preventDefault()
    $('#reviewForm').modal('show');
});

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

function sendCallBack(formData) {
    let data = {
        'callBack': formData
    };
    $.request('SendMail::onSendCallBack', {
        'data': data,
        'update': {'site/success-call-back': '#successCallBackForm'}
    });
}

function sendContactForm(formData) {
    let data = {
        'contactForm': formData
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

function sendSupportForm(formData) {
    let data = {
        'supportForm': formData
    };
    $.request('SendMail::onSendSupportForm', {
        'data': data,
        'update': {'site/success-call-back': '#supportFormResult'}
    });
}

function bootstrapValidation(formId, callBack) {
    // Validate form

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(formId)

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()

                    const inputs = form.elements;
                    var formData = {};
                    // Iterate over the form controls
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].nodeName === "INPUT" || inputs[i].nodeName === "TEXTAREA") {
                            formData[inputs[i].name] = inputs[i].value;
                        }
                    }
                    callBack(formData);
                }
                form.classList.add('was-validated')
            }, false)
        })
}

// IIFE (Immediately Invoked Function Expression)
(function () {
    'use strict'

    bootstrapValidation('.support-form-needs-validation', sendSupportForm);
    bootstrapValidation('.call-back-needs-validation', sendCallBack);
    bootstrapValidation('.contact-form-needs-validation', sendContactForm);

})()
