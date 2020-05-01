import DisplayObject from "../displayObject";

export default class QuestPoint extends DisplayObject {
    constructor(data, scene) {
        super(scene);

        this.data = data;
        this.message = null;

        this.radius = 100;

        this._x = data.mapPoint.x - this._width / 2;
        this._y = data.mapPoint.y - this._height / 2;

        this._image = this.scene.resourceManager.resource('questPoint');
        if (typeof this._image == 'undefined') {
            console.error("Для отображения квестовой точки требуется ресурс questPoint");
        }
    }

    get radius() {
        return this.height / 2;
    }
    set radius(value) {
        this._height = value / 2;
        this._width = value / 2;
    }

    get width() {
        return super.width;
    }
    set width(value) {
        this.radius = value;
    }

    get height() {
        return super.height;
    }
    set height(value) {
        this.radius = value;
    }

    render(time) {
        super.render(time);

        let pos = this.canvasPos();

        this.scene.game.context.filter = 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.8))';
        this.scene.game.context.drawImage(
            this._image,
            pos.x,
            pos.y,
            this.width,
            this.height);
        this.scene.game.context.filter = 'none';

        super.render(time);
    }
}
