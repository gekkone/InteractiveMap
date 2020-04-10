<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ mix('/css/map.css') }}">
    <script src="{{ mix('/js/app/app.js') }}"> </script>
    <title>Демо</title>
</head>

<body>
    <canvas class="map_canvas">Ваш браузер не поддерживает эту игру. Установите современный браузер</canvas>
</body>

</html>
