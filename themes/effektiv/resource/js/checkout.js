import ShopaholicOrder from '@lovata/shopaholic-cart/shopaholic-order';

const obShopaholicOrder = new ShopaholicOrder();

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
                    obShopaholicOrder.create(); // Create order
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
