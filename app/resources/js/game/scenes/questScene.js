import Scene from '../scene'
import ImageLoader from '../imageLoader';
import GameMap from '../objects/gameMap';
import Camera from '../camera';
import Player from '../objects/player';
import QuestMessage from '../objects/questMessage';

export default class QuestScene extends Scene {
    constructor(name, game) {
        super(name, game)
        this.camera = new Camera(0, 0, this.game.canvas.width, this.game.canvas.height, this);
    }

    load() {
        let loader = new ImageLoader(new Map([
            ['map', '/img/game/map.jpg'],
            ['player', '/img/game/player.png']
        ]));

        return new Promise((resolve, reject) => {
            loader.load().then(() => {
                this.imageResources = loader.images;

                this._initObjects();

                this._isLoad = true;
            }).catch((e) => {
                reject(e);
            });
        });
    }

    _initObjects() {
        let map = new GameMap(this.imageResources.get('map'), this);
        this.addObject('map', map);

        let player = new Player(this.imageResources.get('player'), this);
        this.addObject('player', player);



        setTimeout(() => {
            let msg = new QuestMessage(this);
        let pos = map.posFrom(1655, 925);
        msg.setPosition(pos.x, pos.y);
        msg.setActions([
            {
                text: "Тестовое событие 1",
                fn: () => {
                    alert("Вы нажали на тестовое событие 1");
                }
            },
            {
                text: "Тестовое событие 2",
                fn: () => {
                    alert("Вы нажали на тестовое событие 2");
                }
            },
            {
                text: "Тестовое событие 3",
                fn: () => {
                    alert("Вы нажали на тестовое событие 3");
                }
            }
        ]);
            setTimeout(() => {
                msg.show();
            }, 100);
        }, 1);
    }
}
