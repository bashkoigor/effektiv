var productProperties = [];
$(document).on('click', '.openCdekModal', (e) => {
    productProperties = onProductProperties();
    for (let i = 0; i < productProperties.length; i++) {
        widjet.cargo.add ({
            length: productProperties[i].length,
            width: productProperties[i].width,
            height: productProperties[i].height,
            weight: productProperties[i].weight
        });
    }
    //console.log(widjet.cargo.get());
    widjet.open();
});

$(document).on('click', '.CDEK-widget__popup__close-btn', (e) => {
    location.reload();
});

var widjet = new ISDEKWidjet({
    showWarns: true,
    showErrors: true,
    showLogs: true,
    hideMessages: false,
    path: 'https://widget.cdek.ru/widget/scripts/',
    //servicepath: 'https://widget.cdek.ru/widget/scripts/service.php', //ссылка на файл service.php на вашем сайте
    servicepath: 'https://effektiv.ie/sdek/service.php',
    choose: true,
    popup: true,
    country: 'Россия',
    defaultCity: 'Калининград',
    //defaultCity: 'auto',
    cityFrom: 'Москва',
    link: false,
    hidedress: true,
    hidecash: true,
    hidedelt: false,
    detailAddress: false,
    region: true,
    inregion: true,
    apikey: '',
    onReady: onReady,
    onChoose: onChoose,
    onChooseProfile: onChooseProfile,
    onCalculate: onCalculate
});

function onReady(wat) {
    //console.log('Виджет загружен');
    //console.log(widjet.city.get());
}

function onChoose(wat) {
    let cdek_info = 'Выбран пункт выдачи заказа ' + wat.PVZ.Address + ", " +
                    'цена ' + wat.price + ", " +
                    'срок ' + wat.term + " дн. " +
                    'город ' + wat.cityName;
    let data = {
        'property': {
            'cdek_info': cdek_info, 
            'cdek_price': wat.price
        }
    };
    $.request('Cart::onSaveData', {
        'data': data
    });

    $.request('onAjax', {
        update: { 'cart/cart-table': '.cart-table-wrapper' }
    });

    setTimeout(function () {
        location.reload();            
    }, 1000);

    //widjet.cargo.reset();
    
}

function onChooseProfile(wat) {
    let cdek_info = 'Выбрана доставка курьером в город ' + wat.cityName + ", " +
                    'цена ' + wat.price + " " +
                    'срок ' + wat.term + ' дн.';

    let data = {
        'property': {
            'cdek_info': cdek_info, 
            'cdek_price': wat.price
        }
    };
    $.request('Cart::onSaveData', {
        'data': data
    });
}

function onCalculate(wat) {
    //console.log('Расчет стоимости доставки произведен');
    //console.log('Расчет доставки ', wat);
}

function onProductProperties() {
    var j = 0;
    var productProperties = [];
    $(".cartData > tbody > tr").each(function () {
        
        var quantity = $(this).find('input[name="quantity"]').val();
        for (var i = 0; i < quantity; i++) {
            productProperties[j] = { 
                length: $(this).find('input[name="length"]').val(), 
                width: $(this).find('input[name="width"]').val(), 
                height: $(this).find('input[name="height"]').val(), 
                weight: $(this).find('input[name="weight"]').val() 
            };
            j++;
        }
        
    });
    return productProperties;
}