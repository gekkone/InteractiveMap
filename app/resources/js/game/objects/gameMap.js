import ImageLoader from "../imageLoader"
import DisplayObject from '../displayObject'

export default class GameMap extends DisplayObject {
    constructor(image, scene) {
        super(scene);
        this._image = image;
        // let xScale =  this.scene.camera.width / image.width;
        // let yScale =  this.scene.camera.height / image.height;
        this._scale = 0.7;
    }

    // У камеры иной расчёт координат потому что они определяют
    // левый верхний угол изображения с которого отрисовывается карта
    get x() {
        return this.scene.camera != null ? this._x + this.scene.camera.x : this._x;
    }
    get y() {
        return this.scene.camera != null ? this._y + this.scene.camera.y : this._y;
    }

    render(time) {
        let width = this.scene.camera.width / this.scene.camera.scale / this._scale;
        let height = this.scene.camera.height / this.scene.camera.scale / this._scale;
        this.scene.game.context.drawImage(
            this._image,
            this.x, this.y, width, height,
            0, 0, this.scene.camera.width, this.scene.camera.height);

        let pos = this.posFrom(1655, 925);
        this.scene.game.context.fillStyle = "orange";
        this.scene.game.context.fillRect(pos.x - 5, pos.y - 5, 10 , 10);
        super.render(time);
    }

    posTo(canvasX, canvasY) {
        if (this.scene.camera != null) {
            canvasX += this.scene.camera.x;
            canvasY += this.scene.camera.y;
        }

        canvasX /= this._scale;
        canvasY /= this._scale;

        return { x: canvasX, y: canvasY };
    }

    posFrom(mapX, mapY) {
        mapX *= this._scale;
        mapY *= this._scale;

        if (this.scene.camera != null) {
            mapX -= this.scene.camera.x;
            mapX -= this.scene.camera.y
        }

        return { x: mapX, y: mapY };
    }
}
