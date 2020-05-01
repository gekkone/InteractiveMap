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

        player.x = 600;
        player.y = 600;
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
        player.moveTo(questPoint.x - player.width / 2, questPoint.y - player.height, 4);
        this.currentQuestPoint = questPoint;
    }

    playerArrivedPosition() {
        let player = this._objects.get('player');
        if (player == null || this.currentQuestPoint == null) {
            return;
        }

        // let leftSpace = this.camera.x - player.x;
        // let topSpace = this.camera.y - player.y;
        // let rightSpace = this.camera.x + this.camera.width - player.x - player.width;
        // let bottomSpace = this.camera.y + this.camera.height - player.y - player.height;

        let msgPos = {x: 0, y: 0};

        let msg = new QuestMessage(this);
        this.addObject('questionMsg', msg);

        // switch (Math.max(leftSpace, topSpace, rightSpace, bottomSpace)) {
        //     case leftSpace:
        //         msgPos.x = player.x - msg.maxWidth - CONSTANTS.PLAYER_MSG_MARGIN;
        //         msgPos.y = player.y;
        //         break;
        //     case topSpace:
        //         msgPos.x = player.x;
        //         msgPos.y = player.y - msg.maxHeight - CONSTANTS.PLAYER_MSG_MARGIN;
        //         break;
        //     case rightSpace:
        //         msgPos.x = player.x + player.width + msg.maxWidth + CONSTANTS.PLAYER_MSG_MARGIN;
        //         msgPos.y = player.y;
        //         break;
        //     case bottomSpace:
        //         msgPos.x = player.x;
        //         msgPos.y = player.y + player.height + msg.maxHeight + CONSTANTS.PLAYER_MSG_MARGIN;
        // }

        msg.x = player.x + player.width + CONSTANTS.PLAYER_MSG_MARGIN;
        msg.y = player.y;

        let data = this.currentQuestPoint.data;
        msg.setText(data.message);

        data.decisions.forEach(elm => {
            msg.addAction({
                text: elm.text,
                fn: () => {
                    msg.hide();
                    this.takingDecision(elm.id);
                }
            })
        });

        msg.show();
    }

    takingDecision(id) {
        this.setCurrentQuestPoint(this.createQuestPoint(id));
    }
}
