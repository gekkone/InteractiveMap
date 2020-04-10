import './bootstrap';

import { Engine } from './game/egine';
import { Scene } from './game/scene';
import { SimpleObject } from './game/scenes/simpleObject';

window.onload = () => {
    let canvas = document.querySelector('.map_canvas');
    let game = new Engine(canvas);
    let scene = new Scene('Test', game);
    let object = new SimpleObject(scene);
    object.x = 133;
    object.y = 255;
    object.moveTo(170, 0, 10);

    scene.addObject('text', object);

    game.addScene(scene);
    game.setActiveScene('Test');
    game.run();
};

