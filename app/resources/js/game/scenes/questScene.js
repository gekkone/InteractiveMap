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
        this.setCurrentQuestPoint(1);
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

    setCurrentQuestPoint(questPointId) {
        let questPoint = this._objects.get(`quest-point-${questPointId}`);
        if (!questPoint) {
            questPoint = this.createQuestPoint(questPointId);
        }


        if (!questPoint instanceof QuestPoint) {
            console.error("Не удалось установить текущую точку квеста, передан невалидный объект");
            console.error(questPoint);
            return;
        }

        let player = this._objects.get('player');
        let differenceWidth = Math.abs((player.width - questPoint.width) / 2);
        let playerPoint = 0;

        if (player.width >= questPoint.width) {
            playerPoint = questPoint.x - differenceWidth;
        } else {
            playerPoint = questPoint.x + differenceWidth;
        }


        player.moveTo(playerPoint, questPoint.y - player.height, 4);
        this.currentQuestPoint = questPoint;
    }

    playerArrivedPosition() {
        let player = this._objects.get('player');
        if (player == null || this.currentQuestPoint == null) {
            return;
        }

        let msg = new QuestMessage(this);
        this.addObject('questionMsg', msg);

        let data = this.currentQuestPoint.data;
        msg.setText(data.message);

        data.decisions.forEach(elm => {
            msg.addAction({
                text: elm.text,
                fn: () => {
                    msg.hide();
                    setTimeout(() => {
                        msg.remove();
                        this.removeObject('questionMsg');
                        this.takingDecision(elm.id);
                    }, 500);
                }
            })
        });

        msg.show();
    }

    takingDecision(id) {
        this.setCurrentQuestPoint(id);
    }
}
