import Scene from '../scene'
import ImageLoader from '../imageLoader';
import GameMap from '../objects/gameMap';
import Camera from '../camera';

export default class QuestScene extends Scene {
    constructor(name, game) {
        super(name, game)

        let map = new GameMap(this);
        this.addObject('map', map);

        this.camera = new Camera(-200, -500, this.game.canvas.width, this.game.canvas.height, this);
    }

    load() {
        let loader = new ImageLoader(new Map([['map', '/img/game/map.jpg']]));

        return new Promise((resolve, reject) => {
            loader.load().then(() => {
                this.imageResources = loader.images;
                this._isLoad = true;
            }).catch((e) => {
                reject(e);
            });
        });
    }
}
