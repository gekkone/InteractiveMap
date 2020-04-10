import './bootstrap';

import { Engine } from './game/egine';
import QuestScene from './game/scenes/questScene';

window.addEventListener('load', () => {
    let canvas = document.querySelector('.map_canvas');
    let game = new Engine(canvas);
    let scene = new QuestScene('Quest', game);

    game.addScene(scene);
    game.setActiveScene('Quest');
    game.run();
});

