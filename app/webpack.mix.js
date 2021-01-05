const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.ts', 'public/js/app');

mix.styles(['resources/css/map.css'], 'public/css/map.css');

mix.webpackConfig({
    resolve: {
        modules: [
            path.resolve(__dirname, 'vendor/laravel/spark/resources/assets/js'),
            path.resolve('./node_modules')
        ]
    }
});

mix.disableNotifications();

// if (mix.inProduction()) {
mix.version();
// }

mix.browserSync({
    proxy: 'localhost',
    port: 8000
});
