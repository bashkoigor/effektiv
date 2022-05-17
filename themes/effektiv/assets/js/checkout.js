// Create order
function createkOrder(userFields) {

    let data = {
        'order': {
            'payment_method_id': 1,
            'shipping_type_id': 1
        },
        'user': userFields
    };

    $.request('MakeOrder::onCreate', {
        'data': data
    });
    
}

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    const userFields = {
                        'name': form.querySelector('[name="first_name"]').value,
                        'last_name': form.querySelector('[name="last_name"]').value,
                        'shipping_address1': form.querySelector('[name="address"]').value,
                        'comment': form.querySelector('[name="comment"]').value,
                        'phone': form.querySelector('[name="phone"]').value,
                        'email': form.querySelector('[name="email"]').value
                    };
                    createkOrder(userFields); // Create order
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
