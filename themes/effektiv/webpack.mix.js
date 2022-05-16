let mix = require('laravel-mix');
const webpackConfig = require('./webpack.config');
//const bootstrap = require('bootstrap');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your theme assets. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig(webpackConfig)
    .copy('node_modules/jquery/dist/jquery.min.js', 'assets/vendor/jquery.min.js')
    .copy('node_modules/bootstrap/dist/css/bootstrap.min.css', 'assets/vendor/bootstrap/bootstrap.min.css')
    .copy('node_modules/bootstrap/dist/css/bootstrap.min.css.map', 'assets/vendor/bootstrap/bootstrap.min.css.map')
    .copy('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'assets/vendor/bootstrap/bootstrap.bundle.min.js')
    .copy('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', 'assets/vendor/bootstrap/bootstrap.bundle.min.js.map')
    .copy('node_modules/@fancyapps/ui/dist/fancybox.css', 'assets/vendor/fancyapps/fancybox.css')
    .copy('node_modules/@fancyapps/ui/dist/fancybox.umd.js', 'assets/vendor/fancyapps/fancybox.umd.js')
    .js('resource/js/app.js', 'assets/js/app.js')
    .js('resource/js/product.js', 'assets/js/product.js')
    .js('resource/js/cart.js', 'assets/js/cart.js')
    .js('resource/js/checkout.js', 'assets/js/checkout.js')
;
