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

function sendMail(name, phone) {
    let data = {
        'callBack': {
            'name': name,
            'phone': phone
        }
    };
    $.request('SendMail::onSend', {
        'data': data,
        'update': {'site/success-call-back': '#successCallBackForm'},
    });
}

// Validate quick order modal form
(function () {
    'use strict'

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
                    sendMail(name, phone);
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
