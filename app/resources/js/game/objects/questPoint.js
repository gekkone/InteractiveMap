import DisplayObject from "../displayObject";

export default class QuestPoint extends DisplayObject {
    constructor(data, scene) {
        super(scene);

        this.data = data;
        this.message = null;

        this.radius = 50;

        this._x = data.mapPoint.x - this._width / 2;
        this._y = data.mapPoint.y - this._height / 2;
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
        let context = this.scene.game.context;

        context.beginPath();
        context.fillStyle = "red";
        context.arc(pos.x + this.radius, pos.y + this.radius, this.radius, 0, 2 * Math.PI, true);
        context.fill();
    }
}
