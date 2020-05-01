import Scene from '../scene';
import GameMap from '../objects/gameMap';
import Camera from '../camera';
import Player from '../objects/player';
import QuestPoint from '../objects/questPoint'
import QuestMessage from '../objects/questMessage';
import QuestPointManager from '../questPointManager';
import CONSTANTS from '../constants';

export default class QuestScene extends Scene {
    constructor(name, game) {
        super(name, game)
        this.camera = new Camera(600, 600, this.game.canvas.width, this.game.canvas.height, this);
        this.camera.scale = 1;

        this.questPointManager = new QuestPointManager();
        this.currentQuestPoint = null;
    }

    load() {
        return new Promise((resolve, reject) => {
            this.resourceManager.loadImages(new Map([
                ['map', '/img/game/map.jpg'],
                ['player', '/img/game/player.png'],
                ['questPoint', '/img/game/quest-point.png']
            ])).then(() => {
                this._initObjects();
                this._isLoad = true;

                resolve();
            }).catch(e => {
                console.error(e);
                reject(e);
            });
        });
    }

    _initObjects() {
        let map = new GameMap(this.resourceManager.resource('map'), this);
        this.addObject('map', map);

        this.width = map.width;
        this.height = map.height;

        let player = new Player(this.resourceManager.resource('player'), this);
        this.addObject('player', player);
        this.camera.followAt(player, CONSTANTS.CAMERA_FOLLOW_OBJECT_BORDER_DISTANCE);
        player.addEventListener('arrivedPosition', this.playerArrivedPosition.bind(this));

        player.x = 800;
        player.y = 700;
        this.setCurrentQuestPoint(this.createQuestPoint(1));
    }

    createQuestPoint(id) {
        let data = this.questPointManager.questPoint(id);
        if (data == null) {
            console.error(`Не удалось получить квестовую точку ${id}`);
            return;
        }

        let questPoint = new QuestPoint(data, this);
        this.addObject(`quest-point-${id}`, questPoint);

        return questPoint;
    }

    setCurrentQuestPoint(questPoint) {
        if (!questPoint instanceof QuestPoint) {
            console.error("Не удалось установить текущую точку квеста, передан невалидный объект");
            console.error(questPoint);
        }

        let player = this._objects.get('player');
        player.moveTo(questPoint.x - player.width / 3.6, questPoint.y - player.height, 4);
        this.currentQuestPoint = questPoint;
    }

    playerArrivedPosition() {
        let player = this._objects.get('player');
        if (player == null || this.currentQuestPoint == null) {
            return;
        }

        let leftSpace = player.x - this.camera.x;
        let topSpace = player.y - this.camera.y;
        let rightSpace = this.camera.x + this.camera.width - player.x - player.width;
        let bottomSpace = this.camera.y + this.camera.height - player.y - player.height;

        console.debug(leftSpace, topSpace, rightSpace, bottomSpace);

        let msg = new QuestMessage(this);
        this.addObject('questionMsg', msg);

        let data = this.currentQuestPoint.data;
        msg.setText(data.message);

        data.decisions.forEach(elm => {
            msg.addAction({
                text: elm.text,
                fn: () => {
                    msg.hide();
                    msg.remove();
                    this.removeObject('questionMsg');
                    this.takingDecision(elm.id);
                }
            })
        });

        switch (Math.max(leftSpace, topSpace, rightSpace, bottomSpace)) {
            case leftSpace:
                console.debug(msg.width, msg._element.offsetWidth);
                msg.x = player.x - msg.width - CONSTANTS.PLAYER_MSG_MARGIN;
                msg.y = player.y;
                break;
            case topSpace:
                msg.x = player.x;
                msg.y = player.y - msg.maxHeight - CONSTANTS.PLAYER_MSG_MARGIN;
                break;
            case rightSpace:
                msg.x = player.x + player.width + CONSTANTS.PLAYER_MSG_MARGIN;
                msg.y = player.y;
                break;
            case bottomSpace:
                msg.x = player.x;
                msg.y = player.y + player.height + CONSTANTS.PLAYER_MSG_MARGIN;
        }

        msg.show();
    }

    takingDecision(id) {
        this.setCurrentQuestPoint(this.createQuestPoint(id));
    }
}
