import DisplayObject from '../displayObject'

export default class GameMap extends DisplayObject {
    constructor(image, scene) {
        super(scene);
        this._image = image;
        this._width = image.width;
        this._height = image.height;
    }

    render(time) {
        let pos = this.canvasPos();
        // Отрисовывает только видимую область карты.
        this.scene.game.context.drawImage(
            this._image,
            -pos.x, -pos.y, this.width, this.height,
            0, 0, this.scene.width, this.scene.height);

        super.render(time);
    }
}
